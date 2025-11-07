sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code.d07.exam4.controller.Main", {
        onInit() {
        },
        onOpenDetailView(oEvent) {
            // alert(1); // 이벤트 발생 확인
            
            // 이벤트에서 rowContext 파라미터 읽기
            let oRowContext = oEvent.getParameter("rowContext");
            // 파라미터에서 OrderID 추출
            let sOrderID = oRowContext.getProperty("OrderID");            

            // 라우터를 이용해 OrderID에 맞는 View로 이동
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetail", { OrderID: sOrderID });
        }
    });
});