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
    var core_1, ImageModal;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            ImageModal = (function () {
                function ImageModal() {
                    this.opened = false;
                    this.currentImageIndex = 0;
                    this.loading = false;
                    this.showRepeat = false;
                    this.cancelEvent = new core_1.EventEmitter();
                }
                ImageModal.prototype.ngOnInit = function () {
                    this.loading = true;
                    if (this.imagePointer >= 0) {
                        this.showRepeat = false;
                        this.openGallery(this.imagePointer);
                    }
                    else {
                        this.showRepeat = true;
                    }
                };
                ImageModal.prototype.closeGallery = function () {
                    this.opened = false;
                    this.cancelEvent.emit(null);
                };
                ImageModal.prototype.prevImage = function () {
                    this.loading = true;
                    this.currentImageIndex = this.prevIndex(this.currentImageIndex);
                    this.openGallery(this.currentImageIndex);
                };
                ImageModal.prototype.nextImage = function () {
                    this.loading = true;
                    this.currentImageIndex = this.nextIndex(this.currentImageIndex);
                    this.openGallery(this.currentImageIndex);
                };
                ImageModal.prototype.openGallery = function (index) {
                    this.currentImageIndex = index;
                    this.opened = true;
                    this.imgSrc = this.modalImages[this.currentImageIndex].img;
                    this.loading = false;
                };
                ImageModal.prototype.nextIndex = function (index) {
                    // -2   -1  -1
                    // -1   0   0
                    //  0   1   1
                    //  1   2   2
                    //  2   3   0  (modalImages.length == 3 for instance)
                    //  3   4   4
                    //  4   5   5
                    //  5   6   6
                    //  6   7   7
                    index++;
                    if (index)
                        if (this.modalImages.length === index) {
                            index = 0;
                        }
                    return index;
                };
                ImageModal.prototype.prevIndex = function (index) {
                    // -2   -3  2
                    // -1   -2  2
                    //  0   -1  2
                    //  1   0   0
                    //  2   1   1  (modalImages.length == 3 for instance)
                    //  3   2   2
                    //  4   3   3
                    //  5   4   4
                    //  6   5   5
                    index--;
                    if (index < 0) {
                        index = this.modalImages.length - 1;
                    }
                    return index;
                };
                return ImageModal;
            }());
            __decorate([
                core_1.Input('modalImages'),
                __metadata("design:type", Object)
            ], ImageModal.prototype, "modalImages", void 0);
            __decorate([
                core_1.Input('imagePointer'),
                __metadata("design:type", Number)
            ], ImageModal.prototype, "imagePointer", void 0);
            __decorate([
                core_1.Output('cancelEvent'),
                __metadata("design:type", Object)
            ], ImageModal.prototype, "cancelEvent", void 0);
            ImageModal = __decorate([
                core_1.Component({
                    selector: 'ImageModal',
                    template: "\n   <div class=\"ng-gallery\" *ngIf=\"showRepeat\"> \n     <div *ngFor =\"let i of modalImages; let index = index\">\n       <img src=\"{{ i.thumb }}\" class=\"ng-thumb\" (click)=\"openGallery(index)\" alt=\"Image {{ index + 1 }}\" />\n      </div>\n   </div>\n   <div class=\"ng-overlay\" *ngIf=\"opened\">\n    <div class=\"ng-gallery-content\" >\n    <div class=\"uil-ring-css\" *ngIf=\"loading\"><div></div></div>         \n    <a class=\"close-popup\" (click)=\"closeGallery()\"><i class=\"fa fa-close\"></i></a>\n     <a class=\"nav-left\" *ngIf=\"modalImages.length >1\" (click)=\"prevImage()\"><i class=\"fa fa-angle-left\"></i></a>\n     <img *ngIf=\"!loading\" src=\"{{ imgSrc }}\" (click)=\"nextImage()\" class=\"effect\" />\n     <a class=\"nav-right\" *ngIf=\"modalImages.length >1\" (click)=\"nextImage()\"><i class=\"fa fa-angle-right\"></i></a>\n     <span class=\"info-text\">{{ currentImageIndex + 1 }}/{{ modalImages.length }} - Image {{ currentImageIndex+1 }}</span>\n   </div>\n   </div>\n       "
                })
            ], ImageModal);
            exports_1("ImageModal", ImageModal);
        }
    };
});
//# sourceMappingURL=angular2-image-popup.js.map