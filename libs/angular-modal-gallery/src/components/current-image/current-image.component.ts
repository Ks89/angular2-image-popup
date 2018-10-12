/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';

import { AccessibleComponent } from '../accessible.component';

import { AccessibilityConfig } from '../../model/accessibility.interface';
import { Action } from '../../model/action.enum';
import { Description, DescriptionStrategy, DescriptionStyle } from '../../model/description.interface';
import { Image, ImageModalEvent } from '../../model/image.class';
import { InternalLibImage } from '../../model/image-internal.class';
import { Keyboard } from '../../model/keyboard.enum';
import { KeyboardConfig } from '../../model/keyboard-config.interface';
import { LoadingConfig, LoadingType } from '../../model/loading-config.interface';
import { SlideConfig } from '../../model/slide-config.interface';

import { NEXT, PREV } from '../../utils/user-input.util';
import { getIndex } from '../../utils/image.util';
import { CurrentImageConfig } from '../../model/current-image-config.interface';

/**
 * Interface to describe the Load Event, used to
 * emit an event when the image is finally loaded and the spinner has gone.
 */
export interface ImageLoadEvent {
  status: boolean;
  index: number;
  id: number;
}

/**
 * Component with the current image with some additional elements like arrows and side previews.
 */
@Component({
  selector: 'ks-current-image',
  styleUrls: ['current-image.scss', 'current-image-arrows.scss', 'current-image-previews.scss'],
  templateUrl: 'current-image.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentImageComponent extends AccessibleComponent implements OnInit, OnChanges {
  /**
   * Object of type `InternalLibImage` that represent the visible image.
   */
  @Input()
  currentImage: InternalLibImage;
  /**
   * Array of `InternalLibImage` that represent the model of this library with all images,
   * thumbs and so on.
   */
  @Input()
  images: InternalLibImage[];
  /**
   * Boolean that it is true if the modal gallery is visible.
   * If yes, also this component should be visible.
   */
  @Input()
  isOpen: boolean;
  /**
   * Interface to configure current image in modal-gallery.
   * For instance you can disable navigation on click on current image (enabled by default).
   */
  @Input()
  currentImageConfig: CurrentImageConfig;
  /**
   * Object of type `SlideConfig` to get `infinite sliding`.
   */
  @Input()
  slideConfig: SlideConfig;
  /**
   * Object of type `AccessibilityConfig` to init custom accessibility features.
   * For instance, it contains titles, alt texts, aria-labels and so on.
   */
  @Input()
  accessibilityConfig: AccessibilityConfig;
  /**
   * Object of type `KeyboardConfig` to assign custom keys to both ESC, RIGHT and LEFT keyboard's actions.
   */
  @Input()
  keyboardConfig: KeyboardConfig;

  /**
   * Output to emit an event when images are loaded. The payload contains an `ImageLoadEvent`.
   */
  @Output()
  loadImage: EventEmitter<ImageLoadEvent> = new EventEmitter<ImageLoadEvent>();
  /**
   * Output to emit any changes of the current image. The payload contains an `ImageModalEvent`.
   */
  @Output()
  changeImage: EventEmitter<ImageModalEvent> = new EventEmitter<ImageModalEvent>();
  /**
   * Output to emit an event when the modal gallery is closed. The payload contains an `ImageModalEvent`.
   */
  @Output()
  close: EventEmitter<ImageModalEvent> = new EventEmitter<ImageModalEvent>();

  /**
   * Enum of type `Action` that represents a mouse click on a button.
   * Declared here to be used inside the template.
   */
  clickAction: Action = Action.CLICK;
  /**
   * Enum of type `Action` that represents a keyboard action.
   * Declared here to be used inside the template.
   */
  keyboardAction: Action = Action.KEYBOARD;
  /**
   * Boolean that it's true when you are watching the first image (currently visible).
   * False by default
   */
  isFirstImage = false;
  /**
   * Boolean that it's true when you are watching the last image (currently visible).
   * False by default
   */
  isLastImage = false;
  /**
   * Boolean that it's true if an image of the modal gallery is still loading.
   * True by default
   */
  loading = true;
  /**
   * Object of type `CurrentImageConfig` exposed to the template. This field is initialized
   * applying transformations, default values and so on to the input of the same type.
   */
  configCurrentImage: CurrentImageConfig;

  /**
   * Private object without type to define all swipe actions used by hammerjs.
   */
  private SWIPE_ACTION = {
    LEFT: 'swipeleft',
    RIGHT: 'swiperight',
    UP: 'swipeup',
    DOWN: 'swipedown'
  };

  /**
   * Method ´ngOnInit´ to build `configCurrentImage` applying default values.
   * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
   * In particular, it's called only one time!!!
   */
  ngOnInit() {
    const defaultLoading: LoadingConfig = { enable: true, type: LoadingType.STANDARD };
    const defaultDescriptionStyle: DescriptionStyle = {
      bgColor: 'rgba(0, 0, 0, .5)',
      textColor: 'white',
      marginTop: '0px',
      marginBottom: '0px',
      marginLeft: '0px',
      marginRight: '0px'
    };
    const defaultDescription: Description = {
      strategy: DescriptionStrategy.ALWAYS_VISIBLE,
      imageText: 'Image ',
      numberSeparator: '/',
      beforeTextDescription: ' - ',
      style: defaultDescriptionStyle
    };
    const defaultCurrentImageConfig: CurrentImageConfig = {
      navigateOnClick: true,
      loadingConfig: defaultLoading,
      description: defaultDescription,
      downloadable: false,
      invertSwipe: false
    };

    this.configCurrentImage = Object.assign({}, defaultCurrentImageConfig, this.currentImageConfig);
    this.configCurrentImage.description = Object.assign({}, defaultDescription, this.configCurrentImage.description);
  }

  /**
   * Method ´ngOnChanges´ to update `loading` status and emit events.
   * If the gallery is open, then it will also manage boundary arrows and sliding.
   * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
   * In particular, it's called when any data-bound property of a directive changes!!!
   */
  ngOnChanges(changes: SimpleChanges) {
    const images: SimpleChange = changes.images;
    const currentImage: SimpleChange = changes.currentImage;

    if (currentImage && currentImage.previousValue !== currentImage.currentValue) {
      this.updateIndexes();
    } else if (images && images.previousValue !== images.currentValue) {
      this.updateIndexes();
    }
  }

  /**
   * Method to handle keypress based on the `keyboardConfig` input. It gets the keyCode of
   * the key that triggered the keypress event to navigate between images or to close the modal gallery.
   * @param number keyCode of the key that triggered the keypress event
   */
  onKeyPress(keyCode: number) {
    const esc: number = this.keyboardConfig && this.keyboardConfig.esc ? this.keyboardConfig.esc : Keyboard.ESC;
    const right: number = this.keyboardConfig && this.keyboardConfig.right ? this.keyboardConfig.right : Keyboard.RIGHT_ARROW;
    const left: number = this.keyboardConfig && this.keyboardConfig.left ? this.keyboardConfig.left : Keyboard.LEFT_ARROW;

    switch (keyCode) {
      case esc:
        this.close.emit(new ImageModalEvent(Action.KEYBOARD, true));
        break;
      case right:
        this.nextImage(Action.KEYBOARD);
        break;
      case left:
        this.prevImage(Action.KEYBOARD);
        break;
    }
  }

  /**
   * Method to get the image description based on input params.
   * If you provide a full description this will be the visible description, otherwise,
   * it will be built using the `Description` object, concatenating its fields.
   * @param Image image to get its description. If not provided it will be the current image
   * @returns String description of the image (or the current image if not provided)
   * @throws an Error if description isn't available
   */
  getDescriptionToDisplay(image: Image = this.currentImage): string {
    if (!this.configCurrentImage || !this.configCurrentImage.description) {
      throw new Error('Description input must be a valid object implementing the Description interface');
    }

    const imageWithoutDescription: boolean = !image.modal || !image.modal.description || image.modal.description === '';

    switch (this.configCurrentImage.description.strategy) {
      case DescriptionStrategy.HIDE_IF_EMPTY:
        return imageWithoutDescription ? '' : image.modal.description + '';
      case DescriptionStrategy.ALWAYS_HIDDEN:
        return '';
      default:
        // ----------- DescriptionStrategy.ALWAYS_VISIBLE -----------------
        return this.buildTextDescription(image, imageWithoutDescription);
    }
  }

  /**
   * Method to get `alt attribute`.
   * `alt` specifies an alternate text for an image, if the image cannot be displayed.
   * @param Image image to get its alt description. If not provided it will be the current image
   * @returns String alt description of the image (or the current image if not provided)
   */
  getAltDescriptionByImage(image: Image = this.currentImage): string {
    if (!image) {
      return '';
    }
    return image.modal && image.modal.description ? image.modal.description : `Image ${getIndex(image, this.images) + 1}`;
  }

  /**
   * Method to get the title attributes based on descriptions.
   * This is useful to prevent accessibility issues, because if DescriptionStrategy is ALWAYS_HIDDEN,
   * it prevents an empty string as title.
   * @param Image image to get its description. If not provided it will be the current image
   * @returns String title of the image based on descriptions
   * @throws an Error if description isn't available
   */
  getTitleToDisplay(image: Image = this.currentImage): string {
    if (!this.configCurrentImage || !this.configCurrentImage.description) {
      throw new Error('Description input must be a valid object implementing the Description interface');
    }
    const imageWithoutDescription: boolean = !image.modal || !image.modal.description || image.modal.description === '';
    const description: string = this.buildTextDescription(image, imageWithoutDescription);
    return description;
  }

  /**
   * Method to get the left side preview image.
   * @returns Image the image to show as size preview on the left
   */
  getLeftPreviewImage(): Image {
    const currentIndex: number = getIndex(this.currentImage, this.images);
    if (currentIndex === 0 && this.slideConfig.infinite) {
      // the current image is the first one,
      // so the previous one is the last image
      // because infinite is true
      return this.images[this.images.length - 1];
    }
    this.handleBoundaries(currentIndex);
    return this.images[Math.max(currentIndex - 1, 0)];
  }

  /**
   * Method to get the right side preview image.
   * @returns Image the image to show as size preview on the right
   */
  getRightPreviewImage(): Image {
    const currentIndex: number = getIndex(this.currentImage, this.images);
    if (currentIndex === this.images.length - 1 && this.slideConfig.infinite) {
      // the current image is the last one,
      // so the next one is the first image
      // because infinite is true
      return this.images[0];
    }
    this.handleBoundaries(currentIndex);
    return this.images[Math.min(currentIndex + 1, this.images.length - 1)];
  }

  /**
   * Method called by events from both keyboard and mouse on an image.
   * This will invoke the nextImage method.
   * @param KeyboardEvent | MouseEvent event payload
   * @param Action action that triggered the event or `Action.NORMAL` if not provided
   */
  onImageEvent(event: KeyboardEvent | MouseEvent, action: Action = Action.NORMAL) {
    // check if triggered by a mouse click
    // If yes, It should block navigation when navigateOnClick is false
    if (action === Action.CLICK && !this.configCurrentImage.navigateOnClick) {
      // a user has requested to block navigation via configCurrentImage.navigateOnClick property
      return;
    }

    const result: number = super.handleImageEvent(event);
    if (result === NEXT) {
      this.nextImage(action);
    }
  }

  /**
   * Method called by events from both keyboard and mouse on a navigation arrow.
   * @param string direction of the navigation that can be either 'next' or 'prev'
   * @param KeyboardEvent | MouseEvent event payload
   * @param Action action that triggered the event or `Action.NORMAL` if not provided
   */
  onNavigationEvent(direction: string, event: KeyboardEvent, action: Action = Action.NORMAL) {
    const result: number = super.handleNavigationEvent(direction, event);
    if (result === NEXT) {
      this.nextImage(action);
    } else if (result === PREV) {
      this.prevImage(action);
    }
  }

  /**
   * Method to go back to the previous image.
   * @param action Enum of type `Action` that represents the source
   *  action that moved back to the previous image. `Action.NORMAL` by default.
   */
  prevImage(action: Action = Action.NORMAL) {
    // check if prevImage should be blocked
    if (this.isPreventSliding(0)) {
      return;
    }
    const prevImage: InternalLibImage = this.getPrevImage();
    this.loading = !prevImage.previouslyLoaded;
    this.changeImage.emit(new ImageModalEvent(action, getIndex(prevImage, this.images)));
  }

  /**
   * Method to go back to the previous image.
   * @param action Enum of type `Action` that represents the source
   *  action that moved to the next image. `Action.NORMAL` by default.
   */
  nextImage(action: Action = Action.NORMAL) {
    // check if nextImage should be blocked
    if (this.isPreventSliding(this.images.length - 1)) {
      return;
    }
    const nextImage: InternalLibImage = this.getNextImage();
    this.loading = !nextImage.previouslyLoaded;
    this.changeImage.emit(new ImageModalEvent(action, getIndex(nextImage, this.images)));
  }

  /**
   * Method to emit an event as loadImage output to say that the requested image if loaded.
   * This method is invoked by the javascript's 'load' event on an img tag.
   * @param Event event that triggered the load
   */
  onImageLoad(event: Event) {
    const loadImageData: ImageLoadEvent = {
      status: true,
      index: getIndex(this.currentImage, this.images),
      id: this.currentImage.id
    };

    this.loadImage.emit(loadImageData);

    this.loading = false;
  }

  /**
   * Method used by Hammerjs to support touch gestures (you can also invert the swipe direction with configCurrentImage.invertSwipe).
   * @param action String that represent the direction of the swipe action. 'swiperight' by default.
   */
  swipe(action = this.SWIPE_ACTION.RIGHT) {
    switch (action) {
      case this.SWIPE_ACTION.RIGHT:
        if (this.configCurrentImage.invertSwipe) {
          this.prevImage(Action.SWIPE);
        } else {
          this.nextImage(Action.SWIPE);
        }
        break;
      case this.SWIPE_ACTION.LEFT:
        if (this.configCurrentImage.invertSwipe) {
          this.nextImage(Action.SWIPE);
        } else {
          this.prevImage(Action.SWIPE);
        }
        break;
      // case this.SWIPE_ACTION.UP:
      //   break;
      // case this.SWIPE_ACTION.DOWN:
      //   break;
    }
  }

  /**
   * Method used in `modal-gallery.component` to get the index of an image to delete.
   * @param Image image to get the index, or the visible image, if not passed
   * @returns number the index of the image
   */
  getIndexToDelete(image: Image = this.currentImage): number {
    return getIndex(image, this.images);
  }

  /**
   * Private method to update both `isFirstImage` and `isLastImage` based on
   * the index of the current image.
   * @param number currentIndex is the index of the current image
   */
  private handleBoundaries(currentIndex: number) {
    if (this.images.length === 1) {
      this.isFirstImage = true;
      this.isLastImage = true;
      return;
    }
    if (!this.slideConfig || this.slideConfig.infinite === true) {
      // infinite sliding enabled
      this.isFirstImage = false;
      this.isLastImage = false;
    } else {
      switch (currentIndex) {
        case 0:
          // execute this only if infinite sliding is disabled
          this.isFirstImage = true;
          this.isLastImage = false;
          break;
        case this.images.length - 1:
          // execute this only if infinite sliding is disabled
          this.isFirstImage = false;
          this.isLastImage = true;
          break;
        default:
          this.isFirstImage = false;
          this.isLastImage = false;
          break;
      }
    }
  }

  /**
   * Private method to check if next/prev actions should be blocked.
   * It checks if slideConfig.infinite === false and if the image index is equals to the input parameter.
   * If yes, it returns true to say that sliding should be blocked, otherwise not.
   * @param number boundaryIndex that could be either the beginning index (0) or the last index
   *  of images (this.images.length - 1).
   * @returns boolean true if slideConfig.infinite === false and the current index is
   *  either the first or the last one.
   */
  private isPreventSliding(boundaryIndex: number): boolean {
    return !!this.slideConfig && this.slideConfig.infinite === false && getIndex(this.currentImage, this.images) === boundaryIndex;
  }

  /**
   * Private method to get the next index.
   * This is necessary because at the end, when you call next again, you'll go to the first image.
   * That happens because all modal images are shown like in a circle.
   */
  private getNextImage(): InternalLibImage {
    const currentIndex: number = getIndex(this.currentImage, this.images);
    let newIndex = 0;
    if (currentIndex >= 0 && currentIndex < this.images.length - 1) {
      newIndex = currentIndex + 1;
    } else {
      newIndex = 0; // start from the first index
    }
    return this.images[newIndex];
  }

  /**
   * Private method to get the previous index.
   * This is necessary because at index 0, when you call prev again, you'll go to the last image.
   * That happens because all modal images are shown like in a circle.
   */
  private getPrevImage(): InternalLibImage {
    const currentIndex: number = getIndex(this.currentImage, this.images);
    let newIndex = 0;
    if (currentIndex > 0 && currentIndex <= this.images.length - 1) {
      newIndex = currentIndex - 1;
    } else {
      newIndex = this.images.length - 1; // start from the last index
    }
    return this.images[newIndex];
  }

  /**
   * Private method to build a text description.
   * This is used also to create titles.
   * @param Image image to get its description. If not provided it will be the current image.
   * @param boolean imageWithoutDescription is a boolean that it's true if the image hasn't a 'modal' description.
   * @returns String description built concatenating image fields with a specific logic.
   */
  private buildTextDescription(image: Image, imageWithoutDescription: boolean): string {
    if (!this.configCurrentImage || !this.configCurrentImage.description) {
      throw new Error('Description input must be a valid object implementing the Description interface');
    }

    // If customFullDescription use it, otherwise proceed to build a description
    if (this.configCurrentImage.description.customFullDescription && this.configCurrentImage.description.customFullDescription !== '') {
      return this.configCurrentImage.description.customFullDescription;
    }

    const currentIndex: number = getIndex(image, this.images);
    // If the current image hasn't a description,
    // prevent to write the ' - ' (or this.description.beforeTextDescription)

    const prevDescription: string = this.configCurrentImage.description.imageText ? this.configCurrentImage.description.imageText : '';
    const midSeparator: string = this.configCurrentImage.description.numberSeparator ? this.configCurrentImage.description.numberSeparator : '';
    const middleDescription: string = currentIndex + 1 + midSeparator + this.images.length;

    if (imageWithoutDescription) {
      return prevDescription + middleDescription;
    }

    const currImgDescription: string = image.modal && image.modal.description ? image.modal.description : '';
    const endDescription: string = this.configCurrentImage.description.beforeTextDescription + currImgDescription;
    return prevDescription + middleDescription + endDescription;
  }

  /**
   * Private method to call handleBoundaries when ngOnChanges is called.
   */
  private updateIndexes() {
    let index: number;
    try {
      index = getIndex(this.currentImage, this.images);
    } catch (err) {
      console.error('Cannot get the current image index in current-image');
      throw err;
    }
    if (this.isOpen) {
      this.handleBoundaries(index);
    }
  }
}
