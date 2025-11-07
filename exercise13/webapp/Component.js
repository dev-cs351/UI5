sap.ui.define([
    "sap/ui/core/UIComponent",
    "code/d07/exercise13/model/models",
    "code/d07/exercise13/model/data"
], (UIComponent, models, data) => {
    "use strict";

    return UIComponent.extend("code.d07.exercise13.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
        }
    });
});