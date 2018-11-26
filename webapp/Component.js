sap.ui.define([
    'sap/ui/core/UIComponent',
    'sap/ui/Device',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/BindingMode',
], function (UIComponent) {
    'use strict';

    return UIComponent.extend('com.ui5.camera.Component', {
        metadata: {
            manifest: 'json'
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
            this.getRouter().initialize();
        },

        destroy: function () {
            UIComponent.prototype.destroy.apply(this, arguments);
        },

        getContentDensityClass: function () {
            return 'sapUiSizeCompact';
        }
    });
});