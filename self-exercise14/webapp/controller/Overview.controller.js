sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code.d07.selfexercise14.controller.Overview", {
        onInit() {
            var oModel = new JSONModel();
            var oView = this.getView();
            oView.setModel(oModel, "customer");
        },
        changeFunction(oEvent) {
            
            var oListItem = oEvent.getParameter("listItem");
            var oBindingContext = oListItem.getBindingContext();
            
            var oBookingTable = this.byId("idInfoTable");

            oBookingTable.setBindingContext(oBindingContext);
            
        },
        onOpenDialog() {
            this.pDialog ??= this.loadFragment({
                name: "code.d07.selfexercise14.view.Dialog"
            });
            this.pDialog.then((oDialog) => oDialog.open());
        }
    });
});