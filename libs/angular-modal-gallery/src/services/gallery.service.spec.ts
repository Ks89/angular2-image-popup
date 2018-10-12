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

import { async, inject, TestBed } from '@angular/core/testing';

import { GalleryService } from './gallery.service';
import { Image } from '@ks89/angular-modal-gallery';

const IMAGE: Image = new Image(0, {
  // modal
  img: '../assets/images/gallery/img1.jpg',
  extUrl: 'http://www.google.com'
});

const expectedValidNums: any[] = [
  {id: 0, index: 0, image: IMAGE},
  {id: 1, index: 5, image: IMAGE},
  {id: 100, index: 12, image: IMAGE},
  {id: 2000, index: 1000, image: IMAGE}
];

const badInputs: any[] = [
  {id: undefined, index: 0},
  {id: undefined, index: 10},
  {id: undefined, index: -1},
  {id: undefined, index: -2},
  {id: -1, index: 0},
  {id: -5, index: 4},
  {id: 0, index: -1},
  {id: 12, index: -2}
];

const errorMessage = 'Cannot open gallery via GalleryService with either index<0 or galleryId<0 or galleryId===undefined';

describe('GalleryService', () => {

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        providers: [GalleryService]
      });
    })
  );

  it('should instantiate service when inject service',
    inject([GalleryService], (service: GalleryService) => {
      expect(service instanceof GalleryService).toEqual(true);
    })
  );

  describe('#openGallery()', () => {
    expectedValidNums.forEach((val, index) => {
      it(`should call openGallery expecting a 'navigate' event with valid numeric parameters. Test i=${index}`,
        inject([GalleryService], (service: GalleryService) => {
          service.navigate.subscribe(result => {
            expect(result.galleryId).toBe(val.id);
            expect(result.index).toBe(val.index);
          });
          service.openGallery(val.id, val.index);
        })
      );
    });

    badInputs.forEach((val, index) => {
      it(`should throw an error because input params aren't valid. Test i=${index}`,
        inject([GalleryService], (service: GalleryService) => {
          expect(() => service.openGallery(val.id, val.index)).toThrow(new Error(errorMessage));
        })
      );
    });
  });

  describe('#closeGallery()', () => {
    expectedValidNums.forEach((val, index) => {
      it(`should call closeGallery expecting a 'close' event with valid id. Test i=${index}`,
        inject([GalleryService], (service: GalleryService) => {
          service.close.subscribe(result => {
            expect(result).toBe(val.id);
          });
          service.closeGallery(val.id);
        })
      );
    });

    badInputs.forEach((val, index) => {
      it(`should throw an error because input params aren't valid. Test i=${index}`,
        inject([GalleryService], (service: GalleryService) => {
          expect(() => service.openGallery(val.id, val.index)).toThrow(new Error(errorMessage));
        })
      );
    });

    it(`should call closeGallery with an undefined galleryId expecting an error`,
      inject([GalleryService], (service: GalleryService) => {
        const error = new Error('Cannot close gallery via GalleryService with galleryId<0 or galleryId===undefined');
        expect(() => service.closeGallery(undefined)).toThrow(error);
      })
    );
  });

  describe('#updateGallery()', () => {
    expectedValidNums.forEach((val, index) => {
      it(`should call updateGallery expecting an 'update' event with valid numeric parameters. Test i=${index}`,
        inject([GalleryService], (service: GalleryService) => {
          service.update.subscribe(result => {
            expect(result.galleryId).toBe(val.id);
            expect(result.index).toBe(val.index);
            expect(result.image).toBe(val.image);
          });
          service.updateGallery(val.id, val.index, val.image);
        })
      );
    });

    badInputs.forEach((val, index) => {
      it(`should throw an error because input params aren't valid. Test i=${index}`,
        inject([GalleryService], (service: GalleryService) => {
          const error = new Error('Cannot update gallery via GalleryService with either index<0 or galleryId<0 or galleryId===undefined');
          expect(() => service.updateGallery(val.id, val.index, IMAGE)).toThrow(error);
        })
      );
    });

    expectedValidNums.forEach((val, index) => {
      it(`should throw an error because the input image is not valid. Test i=${index}`,
        inject([GalleryService], (service: GalleryService) => {
          const error = new Error('Cannot update gallery via GalleryService, because image is not valid');
          expect(() => service.updateGallery(val.id, val.index, null)).toThrow(error);
        })
      );
    });
  });
});
