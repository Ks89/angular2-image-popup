/*
 * @author Vimala A
 */
System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, AppComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {/*
             * @author Vimala A
             */
            AppComponent = (function () {
                function AppComponent() {
                    this.openModalWindow = false;
                    this.images = [
                        { thumb: './app/assets/images/gallery/thumbs/img1.jpg', img: './app/assets/images/gallery/img1.jpg', description: 'Image 1' },
                        { thumb: './app/assets/images/gallery/thumbs/img2.jpg', img: './app/assets/images/gallery/img2.jpg', description: 'Image 2' },
                        { thumb: './app/assets/images/gallery/thumbs/img3.jpg', img: './app/assets/images/gallery/img3.jpg', description: 'Image 3' },
                        { thumb: './app/assets/images/gallery/thumbs/img4.jpg', img: './app/assets/images/gallery/img4.jpg', description: 'Image 4' },
                        { thumb: './app/assets/images/gallery/thumbs/img5.jpg', img: './app/assets/images/gallery/img5.jpg', description: 'Image 5' }
                    ];
                }
                AppComponent.prototype.OpenImageModel = function (imageSrc, images) {
                    var imageModalPointer;
                    for (var i = 0; i < images.length; i++) {
                        if (imageSrc === images[i].img) {
                            imageModalPointer = i;
                            break;
                        }
                    }
                    this.openModalWindow = true;
                    this.images = images;
                    this.imagePointer = imageModalPointer;
                };
                AppComponent.prototype.cancelImageModel = function () {
                    this.openModalWindow = false;
                };
                return AppComponent;
            }());
            AppComponent = __decorate([
                core_1.Component({
                    selector: 'my-app',
                    template: "\n      <h2> Example - Default</h2>\n      <p> you can directly access \"ImageModel\" directive for both listing thumbnails and popup images</p>\n\n      <ImageModal [modalImages]=\"images\"></ImageModal>\n      <h2>  Example with thumbnail pointers </h2>\n      <p> you can list images in your file and then calling \"ImageModel\" directive to show images on popup only</p>\n      <div *ngFor=\"let img of images; let i= index\"> \n        <div class=\"float-left\" *ngIf=\"i <= 2\" >\n          <a class=\"more\" *ngIf=\"i==2\" (click)=\"OpenImageModel(img.img,images)\"> +{{images.length - 3}} more </a> \n          <img class=\"list-img\" src=\"{{img.thumb}}\"(click)=\"OpenImageModel(img.img,images)\" alt='Image' />\n        </div>\n      </div>\n      <div *ngIf=\"openModalWindow\">\n        <ImageModal [modalImages]=\"images\" [imagePointer] = \"imagePointer\" (cancelEvent) =\"cancelImageModel()\"></ImageModal>\n      </div>\n\t"
                }),
                __metadata("design:paramtypes", [])
            ], AppComponent);
            exports_1("AppComponent", AppComponent);
        }
    };
});
//# sourceMappingURL=app.component.js.map