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

import { AccessibilityConfig } from '../../model/accessibility.interface';
import { Image } from '../../model/image.class';
import { Size } from '../../model/size.interface';
import { AdvancedLayout, GridLayout, LineLayout, PlainGalleryConfig, PlainGalleryStrategy } from '../../model/plain-gallery-config.interface';

import { getIndex } from '../../utils/image.util';

/**
 * Component with the gallery of thumbs.
 * In receives an array of Images, a boolean to show/hide
 * the gallery (feature used by imagePointer) and a config
 * object to customize the behaviour of this component.
 * Also, it emits click events as outputs.
 */
@Component({
  selector: 'ks-plain-gallery',
  styleUrls: ['plain-gallery.scss'],
  templateUrl: 'plain-gallery.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlainGalleryComponent implements OnInit, OnChanges {
  /**
   * Array of `Image` that represent the model of this library with all images, thumbs and so on.
   */
  @Input() images: Image[];
  /**
   * Boolean to show/hide plain gallery. If true the plain gallery will be visible, false otherwise.
   */
  @Input() showGallery: boolean;
  /**
   * Object of type `PlainGalleryConfig` to configure the plain gallery.
   */
  @Input() plainGalleryConfig: PlainGalleryConfig;
  /**
   * Object of type `AccessibilityConfig` to init custom accessibility features.
   * For instance, it contains titles, alt texts, aria-labels and so on.
   */
  @Input() accessibilityConfig: AccessibilityConfig;

  /**
   * Output to emit an event when an image is changed.
   */
  @Output() show: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Object of type `PlainGalleryConfig` to configure this component.
   */
  configPlainGallery: PlainGalleryConfig;

  /**
   * Bi-dimensional array of `Image` object to store images to display as plain gallery.
   * [] by default.
   */
  imageGrid: Image[][] = [];
  /**
   * Size object used in the template to resize images.
   */
  size: Size;
  /**
   * Boolean passed as input to `ks-wrap` directive to configure flex-wrap css property.
   * However it's not enough, because you need to limit the width using `widthStyle` public variable.
   * For more info check https://developer.mozilla.org/it/docs/Web/CSS/flex-wrap
   */
  wrapStyle = false;
  /**
   * String passed as input to `ks-wrap` directive to set width to be able to force overflow.
   * In this way, `wrapStyle` (flex-wrap css property) will be used as requested.
   */
  widthStyle = '';
  /**
   * String passed as input to `ks-direction` directive to set the flex-direction css property.
   * For more info check https://developer.mozilla.org/it/docs/Web/CSS/flex-direction
   */
  directionStyle: string;
  /**
   * String passed as input to `ks-direction` directive to set the justify-content css property.
   * For more info check https://developer.mozilla.org/it/docs/Web/CSS/justify-content
   */
  justifyStyle: string;

  /**
   * Default image size object
   */
  private defaultSize: Size = { width: '50px', height: 'auto' };
  /**
   * Default layout config object
   * Note that length=-1 means infinity
   */
  private defaultLayout: LineLayout = new LineLayout(this.defaultSize, { length: -1, wrap: false }, 'flex-start');
  /**
   * Default plain gallery config object
   */
  private defaultPlainConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.ROW,
    layout: this.defaultLayout,
    advanced: { aTags: false, additionalBackground: '50% 50%/cover' }
  };

  /**
   * Method ´ngOnInit´ to init both `configPlainGallery` calling `initPlainGalleryConfig()`
   * and `imageGrid invoking `initImageGrid()`.
   * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
   * In particular, it's called only one time!!!
   */
  ngOnInit() {
    this.configPlainGallery = this.initPlainGalleryConfig();
    this.initImageGrid();
  }

  /**
   * Method ´ngOnChanges´ to update both `imageGrid` and`configPlainGallery`.
   * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
   * In particular, it's called when any data-bound property of a directive changes!!!
   */
  ngOnChanges(changes: SimpleChanges) {
    const imagesChange: SimpleChange = changes.images;
    const configChange: SimpleChange = changes.plainGalleryConfig;

    // I'm using !change.firstChange because the first time will be called both onInit and onChange and I don't
    // want to execute initialization two times.
    if (
      configChange &&
      !configChange.firstChange &&
      (configChange.previousValue !== configChange.currentValue || (!configChange.previousValue && !configChange.currentValue))
    ) {
      this.configPlainGallery = this.initPlainGalleryConfig();
    }
    if (imagesChange && !imagesChange.firstChange && imagesChange.previousValue !== imagesChange.currentValue) {
      this.initImageGrid();
    }
  }

  /**
   * Method called when you click on an image of the plain (or inline) gallery.
   * This will emit the show event with the index number as payload.
   * @param number index of the clicked image
   */
  showModalGallery(index: number) {
    this.show.emit(index);
  }

  /**
   * Method called when you click on an image of the plain (or inline) gallery.
   * This will emit the show event with the image as payload.
   * @param Image img is the Image to show
   */
  showModalGalleryByImage(img: Image) {
    const index: number = this.images.findIndex((val: Image) => val && img && val.id === img.id);
    this.showModalGallery(index);
  }

  /**
   * Method to get `alt attribute`.
   * `alt` specifies an alternate text for an image, if the image cannot be displayed.
   * @param Image image to get its alt description.
   * @returns string alt description of the image
   */
  getAltPlainDescriptionByImage(image: Image): string {
    if (!image) {
      return '';
    }
    return image.plain && image.plain.description ? image.plain.description : `Image ${getIndex(image, this.images) + 1}`;
  }

  /**
   * Method to get the title for an image.
   * @param Image image to get its title
   * @returns string the title of the input image
   */
  getTitleDisplay(image: Image): string {
    let description = '';

    if (image.plain && image.plain.description) {
      description = image.plain.description;
    } else if (image.modal && image.modal.description) {
      description = image.modal.description;
    }

    const currentIndex: number = getIndex(image, this.images);
    const prevDescription: string = 'Image ' + (currentIndex + 1) + '/' + this.images.length;
    let currImgDescription: string = description ? description : '';

    if (currImgDescription !== '') {
      currImgDescription = ' - ' + currImgDescription;
    }
    return prevDescription + currImgDescription;
  }

  /**
   * Method used in the template to track ids in ngFor.
   * @param number index of the array
   * @param Image item of the array
   * @returns number the id of the item
   */
  trackById(index: number, item: Image): number | string {
    return item.id;
  }

  /**
   * Private method to build and return a `PlainGalleryConfig` object, proving also default values.
   * @returns PlainGalleryConfig the plain gallery configuration
   * @throws an Error if layout and strategy aren't compatible
   */
  private initPlainGalleryConfig(): PlainGalleryConfig {
    const config: PlainGalleryConfig = Object.assign({}, this.defaultPlainConfig, this.plainGalleryConfig);

    if (config.layout instanceof LineLayout) {
      if (config.strategy !== PlainGalleryStrategy.ROW && config.strategy !== PlainGalleryStrategy.COLUMN) {
        throw new Error('LineLayout requires either ROW or COLUMN strategy');
      }
      if (!config.layout || !config.layout.breakConfig) {
        throw new Error('Both layout and breakConfig must be valid');
      }
    }

    if (config.layout instanceof GridLayout) {
      if (config.strategy !== PlainGalleryStrategy.GRID) {
        throw new Error('GridLayout requires GRID strategy');
      }
      if (!config.layout || !config.layout.breakConfig) {
        throw new Error('Both layout and breakConfig must be valid');
      }
      // force wrap for grid layout
      config.layout.breakConfig.wrap = true;
    }

    if (config.layout instanceof AdvancedLayout) {
      if (config.strategy !== PlainGalleryStrategy.CUSTOM) {
        throw new Error('AdvancedLayout requires CUSTOM strategy');
      }
    }
    return config;
  }

  /**
   * Private method to init both `imageGrid` and other style variables,
   * based on the layout type.
   */
  private initImageGrid() {
    const config: PlainGalleryConfig = this.configPlainGallery;

    // reset the array to prevent issues in case of GridLayout
    this.imageGrid = [];

    if (config.layout instanceof LineLayout) {
      const layout: LineLayout = config.layout;
      const row: Image[] = this.images.filter((val: Image, i: number) => i < layout.breakConfig.length || layout.breakConfig.length === -1);
      this.imageGrid = [row];

      this.size = config.layout.size;

      switch (config.strategy) {
        case PlainGalleryStrategy.ROW:
          this.directionStyle = 'row';
          break;
        case PlainGalleryStrategy.COLUMN:
          this.directionStyle = 'column';
          this.wrapStyle = layout.breakConfig.wrap;
          break;
      }
      this.justifyStyle = layout.justify;
    }

    if (config.layout instanceof GridLayout) {
      const layout: GridLayout = config.layout;
      const count: number = Math.ceil(this.images.length / layout.breakConfig.length);
      let start = 0;
      let end: number = layout.breakConfig.length - 1;

      for (let j = 0; j < count; j++) {
        const row: Image[] = this.images.filter((val: Image, i: number) => i >= start && i <= end);
        this.imageGrid.push(row);
        start = end + 1;
        end = start + layout.breakConfig.length - 1;
      }

      this.size = config.layout.size;

      const pixels: number = +layout.size.width.replace('px', '');

      this.widthStyle = pixels * layout.breakConfig.length + pixels / 2 + 'px';
      this.wrapStyle = layout.breakConfig.wrap;

      this.directionStyle = 'row';
    }

    if (config.layout instanceof AdvancedLayout) {
      this.imageGrid = [this.images];
    }
  }
}
