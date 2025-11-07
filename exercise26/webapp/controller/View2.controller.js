sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], (Controller, History) => {
    "use strict";

    return Controller.extend("code.d07.exercise26.controller.View1", {
        onInit() {
        },
        onNavView1() {
            // alert(1);
            let oRouter = this.getOwnerComponent().getRouter();

            oRouter.navTo("RouteView1");
        },
        onNavBack() {
            // History는 new를 쓰지 않는다. 대신 getInstance()를 사용해서 객체를 가져온다.
            // 기록이 없는 새 History를 필요 없기 때문에 new를 사용하지 않는다.
            let oHistory = History.getInstance();
            
            // 뒤로 이동할 수 있는지 점검하기 위해 이전 웹페이지에 대한 정보를 다루는 Hash를 가져와본다.
            let sPreviousHash = oHistory.getPreviousHash();

            if(sPreviousHash !== undefined) {
                // 뒤로 이동할 웹 페이지 기록이 있을 경우,
                window.history.go(-1);
            } else {
                // 기록이 전혀 없을 경우,
                // 처음 뷰로 이동하도록 한다.
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouterView1");

                // 컨트롤러에 만들어둔 onNavView1() 을 호출하면, View1.view.xml로 이동하므로,
                // 기존의 만든 기능을 재활용할 수도 있다.
                // this.onNavView1();
            }
            
        }
    });
});