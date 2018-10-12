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

import { Action } from './action.enum';
import { Size } from './size.interface';
import { SafeResourceUrl } from '@angular/platform-browser';

/**
 * Class `Image` that represents an image with both `modal` and `plain` configurations.
 * Both image `id` and `modal` are mandatory, instead `plain` is optional.
 */
export class Image {
  id: number;

  modal: ModalImage;
  plain?: PlainImage;

  constructor(id: number, modal: ModalImage, plain?: PlainImage) {
    this.id = id;
    this.modal = modal;
    this.plain = plain;
  }
}

/**
 * Interface `ImageData` to configure an image, but it isn't used directly.
 * Please, refers to `PlainImage` or `ModalImage`.
 */
export interface ImageData {
  img: string | SafeResourceUrl;
  description?: string;
  title?: string;
  alt?: string;
  ariaLabel?: string;
}

/**
 * Interface `ModalImage` to configure the modal image.
 */
export interface ModalImage extends ImageData {
  extUrl?: string;
  downloadFileName?: string;
}

/**
 * Interface `PlainImage` to configure the plain image.
 */
export interface PlainImage extends ImageData {
  size?: Size;
}

/**
 * Class `ImageModalEvent` that represents the event payload with the result and the triggered action.
 */
export class ImageModalEvent {
  action: Action;
  result: number | boolean;

  constructor(action: Action, result: number | boolean) {
    this.action = action;
    this.result = result;
  }
}
