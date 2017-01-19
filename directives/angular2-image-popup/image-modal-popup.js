System.register(["./angular2-image-popup"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var angular2_image_popup_1;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (angular2_image_popup_1_1) {
                angular2_image_popup_1 = angular2_image_popup_1_1;
                exportStar_1(angular2_image_popup_1_1);
            }
        ],
        execute: function () {
            exports_1("default", {
                directives: [angular2_image_popup_1.ImageModal]
            });
        }
    };
});
//# sourceMappingURL=image-modal-popup.js.map