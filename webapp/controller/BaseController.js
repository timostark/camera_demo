sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/routing/History'
], function (Controller, History) {
    'use strict';

    return Controller.extend('com.ui5.camera.controller.BaseController', {
        _oResourceBundle: null,

        onInit: function () {
            this._oResourceBundle = this.getResourceBundle();
        },

        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },

        getModel: function (sName) {
            return this.getView().getModel(sName);
        },

        setModel: function (oModel, sName) {
            return this.getView().setModel(oModel, sName);
        },

        getResourceBundle: function () {
            return this.getOwnerComponent().getModel('i18n').getResourceBundle();
        }
    });
});