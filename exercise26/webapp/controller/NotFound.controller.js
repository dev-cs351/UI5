sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code.d07.exercise26.controller.NotFound", {
        onInit() {
        },
        onNavView1() {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView1");
        }
    });
});