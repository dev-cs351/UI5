sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code.d07.exercise29.controller.Order", {
        onInit() {
        },
        onItemPress(oEvent) {
            //console.log(oEvent);
            let oItem = oEvent.getSource(); // 이벤트를 listitem에 있기 때문에 source를 가져온다.

            // oEvent.getParameter(); // 이벤트가 List에 있을 경우 파라미터를 가져온다.
        
            let oBindingCtx = oItem.getBindingContext();
            let sOrderID = oBindingCtx.getProperty("OrderID");
            //alert("주문ID: " + sOrderID);

            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetail", { OrderID: sOrderID });
        }
    });
});