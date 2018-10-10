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

import { EventEmitter, Injectable } from '@angular/core';
import { Image } from '../model/image.class';

export interface InternalGalleryPayload {
  galleryId: number;
  index: number;
}

export interface InternalGalleryRefresh{
  galleryId:number|string;
  imageIndex: number;
  images:Image[];
}

@Injectable()
export class GalleryService {
  navigate: EventEmitter<InternalGalleryPayload> = new EventEmitter<InternalGalleryPayload>();
  close: EventEmitter<number> = new EventEmitter<number>();
  refresh:EventEmitter<InternalGalleryRefresh> = new EventEmitter<InternalGalleryRefresh>();

  openGallery(galleryId: number | undefined, index: number): void {
    if (galleryId === undefined || galleryId < 0 || index < 0) {
      throw new Error('Cannot open gallery via GalleryService with either index<0 or galleryId<0 or galleryId===undefined');
    }
    this.navigate.emit({
      galleryId: galleryId,
      index: index
    });
  }

  closeGallery(galleryId: number | undefined): void {
    if (galleryId === undefined || galleryId < 0) {
      throw new Error('Cannot close gallery via GalleryService with galleryId<0 or galleryId===undefined');
    }
    this.close.emit(galleryId);
  }

  refreshGallery(galleryId:number|string,imageIndex:number, images :Image[]):void{
    this.refresh.emit({
      galleryId: galleryId,
      imageIndex:imageIndex,
      images: images
    })
  }
}
