sap.ui.define([
    'com/ui5/camera/controller/BaseController'
], function (BaseController) {
    'use strict';

    return BaseController.extend('com.ui5.camera.controller.App', {
        onInit: function () {
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
        }
    });
});