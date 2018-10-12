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
import { Image } from '../../model/image.class';
import { InternalLibImage } from '../../model/image-internal.class';
import { Size } from '../../model/size.interface';
import { PreviewConfig } from '../../model/preview-config.interface';
import { SlideConfig } from '../../model/slide-config.interface';

import { NEXT, PREV } from '../../utils/user-input.util';
import { getIndex } from '../../utils/image.util';

/**
 * Component with image previews
 */
@Component({
  selector: 'ks-previews',
  styleUrls: ['previews.scss', 'previews-arrows.scss'],
  templateUrl: 'previews.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewsComponent extends AccessibleComponent implements OnInit, OnChanges {
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
   * Object of type `SlideConfig` to get `infinite sliding`.
   */
  @Input()
  slideConfig: SlideConfig;
  /**
   * Object of type `PreviewConfig` to init PreviewsComponent's features.
   * For instance, it contains a param to show/hide this component, sizes.
   */
  @Input()
  previewConfig: PreviewConfig;
  /**
   * Object of type `AccessibilityConfig` to init custom accessibility features.
   * For instance, it contains titles, alt texts, aria-labels and so on.
   */
  @Input()
  accessibilityConfig: AccessibilityConfig;
  /**
   * Output to emit the clicked preview. The payload contains the `InternalLibImage` associated to the clicked preview.
   */
  @Output()
  clickPreview: EventEmitter<InternalLibImage> = new EventEmitter<InternalLibImage>();

  /**
   * Array of `InternalLibImage` exposed to the template. This field is initialized
   * applying transformations, default values and so on to the input of the same type.
   */
  previews: InternalLibImage[] = [];
  /**
   * Object of type `PreviewConfig` exposed to the template. This field is initialized
   * applying transformations, default values and so on to the input of the same type.
   */
  configPreview: PreviewConfig;

  /**
   * Start index of the input images used to display previews.
   */
  start: number;
  /**
   * End index of the input images used to display previews.
   */
  end: number;

  /**
   * Default preview's size object, also used in the template to apply default sizes to ksSize's directive.
   */
  defaultPreviewSize: Size = { height: '50px', width: 'auto' };

  /**
   * Default preview's config object
   */
  private defaultPreviewConfig: PreviewConfig = {
    visible: true,
    number: 3,
    arrows: true,
    clickable: true,
    // alwaysCenter: false, // TODO still not implemented
    size: this.defaultPreviewSize
  };

  /**
   * Method ´ngOnInit´ to build `configPreview` applying a default value and also to
   * init the `previews` array.
   * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
   * In particular, it's called only one time!!!
   */
  ngOnInit() {
    this.configPreview = Object.assign({}, this.defaultPreviewConfig, this.previewConfig);

    // if number is <= 0 reset to default
    if (this.configPreview && this.configPreview.number && this.configPreview.number <= 0) {
      this.configPreview.number = this.defaultPreviewConfig.number;
    }

    // init previews based on currentImage and the full array of images
    this.initPreviews(this.currentImage, this.images);
  }

  /**
   * Method to check if an image is active (i.e. a preview image).
   * @param InternalLibImage preview is an image to check if it's active or not
   * @returns boolean true if is active, false otherwise
   */
  isActive(preview: InternalLibImage): boolean {
    if (!preview || !this.currentImage) {
      return false;
    }
    return preview.id === this.currentImage.id;
  }

  // TODO improve this method to simplify the sourcecode + remove duplicated codelines
  /**
   * Method ´ngOnChanges´ to update `previews` array.
   * Also, both `start` and `end` local variables will be updated accordingly.
   * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
   * In particular, it's called when any data-bound property of a directive changes!!!
   */
  ngOnChanges(changes: SimpleChanges) {
    const images: SimpleChange = changes.images;
    const currentImage: SimpleChange = changes.currentImage;

    let prev;
    let current;

    if (currentImage) {
      prev = currentImage.previousValue;
      current = currentImage.currentValue;
    } else {
      current = this.currentImage;
    }

    if (current && images && images.previousValue && images.currentValue) {
      // I'm in this if statement, if input images are changed (for instance, because I removed one of them with the 'delete button',
      // or because users changed the images array while modal gallery is still open).
      // In this case, I have to re-init previews, because the input array of images is changed.
      this.initPreviews(current, images.currentValue);
    }

    if (prev && current && prev.id !== current.id) {
      this.updatePreviews(prev, current);
    }
  }

  /**
   * Method called by events from both keyboard and mouse on a preview.
   * This will trigger the `clickpreview` output with the input preview as its payload.
   * @param InternalLibImage preview that triggered this method
   * @param KeyboardEvent | MouseEvent event payload
   */
  onImageEvent(preview: InternalLibImage, event: KeyboardEvent | MouseEvent) {
    if (!this.configPreview || !this.configPreview.clickable) {
      return;
    }
    const result: number = super.handleImageEvent(event);
    if (result === NEXT) {
      this.clickPreview.emit(preview);
    } else if (result === PREV) {
      this.clickPreview.emit(preview);
    }
  }

  /**
   * Method called by events from both keyboard and mouse on a navigation arrow.
   * @param string direction of the navigation that can be either 'next' or 'prev'
   * @param KeyboardEvent | MouseEvent event payload
   */
  onNavigationEvent(direction: string, event: KeyboardEvent | MouseEvent) {
    const result: number = super.handleNavigationEvent(direction, event);
    if (result === NEXT) {
      this.next();
    } else if (result === PREV) {
      this.previous();
    }
  }

  /**
   * Method used in the template to track ids in ngFor.
   * @param number index of the array
   * @param Image item of the array
   * @returns number the id of the item
   */
  trackById(index: number, item: Image): number |string {
    return item.id;
  }

  /**
   * Private method to init previews based on the currentImage and the full array of images.
   * The current image in mandatory to show always the current preview (as highlighted).
   * @param InternalLibImage currentImage to decide how to show previews, because I always want to see the current image as highlighted
   * @param InternalLibImage[] images is the array of all images.
   */
  private initPreviews(currentImage: InternalLibImage, images: InternalLibImage[]) {
    let index: number;
    try {
      index = getIndex(currentImage, images);
    } catch (err) {
      throw err;
    }
    switch (index) {
      case 0:
        // first image
        this.setBeginningIndexesPreviews();
        break;
      case images.length - 1:
        // last image
        this.setEndIndexesPreviews();
        break;
      default:
        // other images
        this.setIndexesPreviews();
        break;
    }
    this.previews = images.filter((img: InternalLibImage, i: number) => i >= this.start && i < this.end);
  }

  /**
   * Private method to init both `start` and `end` to the beginning.
   */
  private setBeginningIndexesPreviews() {
    this.start = 0;
    this.end = Math.min(<number>this.configPreview.number, this.images.length);
  }

  /**
   * Private method to init both `start` and `end` to the end.
   */
  private setEndIndexesPreviews() {
    this.start = this.images.length - 1 - (<number>this.configPreview.number - 1);
    this.end = this.images.length;
  }

  /**
   * Private method to update both `start` and `end` based on the currentImage.
   */
  private setIndexesPreviews() {
    this.start = getIndex(this.currentImage, this.images) - Math.floor(<number>this.configPreview.number / 2);
    this.end = getIndex(this.currentImage, this.images) + Math.floor(<number>this.configPreview.number / 2) + 1;
  }

  /**
   * Private method to update the visible previews navigating to the right (next).
   */
  private next() {
    // check if nextImage should be blocked
    if (this.isPreventSliding(this.images.length - 1)) {
      return;
    }

    if (this.end === this.images.length) {
      return;
    }

    this.start++;
    this.end = Math.min(this.end + 1, this.images.length);

    this.previews = this.images.filter((img: InternalLibImage, i: number) => i >= this.start && i < this.end);
  }

  /**
   * Private method to update the visible previews navigating to the left (previous).
   */
  private previous() {
    // check if prevImage should be blocked
    if (this.isPreventSliding(0)) {
      return;
    }

    if (this.start === 0) {
      return;
    }

    this.start = Math.max(this.start - 1, 0);
    this.end = Math.min(this.end - 1, this.images.length);

    this.previews = this.images.filter((img: InternalLibImage, i: number) => i >= this.start && i < this.end);
  }

  /**
   * Private method to block/permit sliding between previews.
   * @param number boundaryIndex is the first or the last index of `images` input array
   * @returns boolean if true block sliding, otherwise not
   */
  private isPreventSliding(boundaryIndex: number): boolean {
    return !!this.slideConfig && this.slideConfig.infinite === false && getIndex(this.currentImage, this.previews) === boundaryIndex;
  }

  /**
   * Private method to handle navigation changing the previews array and other variables.
   */
  private updatePreviews(prev: InternalLibImage, current: InternalLibImage) {
    // to manage infinite sliding I have to reset both `start` and `end` at the beginning
    // to show again previews from the first image.
    // This happens when you navigate over the last image to return to the first one
    let prevIndex: number;
    let currentIndex: number;
    try {
      prevIndex = getIndex(prev, this.images);
      currentIndex = getIndex(current, this.images);
    } catch (err) {
      console.error('Cannot get previous and current image indexes in previews');
      throw err;
    }
    if (prevIndex === this.images.length - 1 && currentIndex === 0) {
      // first image
      this.setBeginningIndexesPreviews();
      this.previews = this.images.filter((img: InternalLibImage, i: number) => i >= this.start && i < this.end);
      return;
    }
    // the same for the opposite case, when you navigate back from the fist image to go to the last one.
    if (prevIndex === 0 && currentIndex === this.images.length - 1) {
      // last image
      this.setEndIndexesPreviews();
      this.previews = this.images.filter((img: InternalLibImage, i: number) => i >= this.start && i < this.end);
      return;
    }

    // otherwise manage standard scenarios
    if (prevIndex > currentIndex) {
      this.previous();
    } else if (prevIndex < currentIndex) {
      this.next();
    }
  }
}
