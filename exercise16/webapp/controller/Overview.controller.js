sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code.d07.exercise16.controller.Overview", {
        onInit() {
            var oModel = new JSONModel({
                Date: "2025-10-30",
                Currency: {
                    Key: "KRW",
                    Value: "0"
                }
            });
            var oView = this.getView();

            oView.setModel(oModel, "view");
        }
    });
});