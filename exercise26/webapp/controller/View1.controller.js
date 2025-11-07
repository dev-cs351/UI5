sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code.d07.exercise26.controller.View1", {
        onInit() {
        },
        onNavView2() {
            // alert(1);
            // 라우팅 기능을 사용하기 위해 ( = 페이지 이동을 하기 위해 )
            // 라우터를 가져와야 한다.
            // 컨트롤러의 컴포넌트에 있는 라우터 정보를 가져온다.
            let oRouter = this.getOwnerComponent().getRouter();
            // manifest의 routes의 name 전달
            // 현재 컨트롤러의 라우터에 원하는 경로의 라우터로 경로를 설정한다.
            // 경로는 manifest의 routes 객체중 하나의 경로.
            oRouter.navTo("RouteView2");
            // 해당 route 객체의 경로로 이동하면, 
            // 객체에 있는 target view를 호출함과 동시에
            // 페이지를 pattern 주소로 이동하게 된다.
            // target view는 name 경로를 통해 View 폴더에 있는 view 파일을 호출하게 된다.
        }
    });
});