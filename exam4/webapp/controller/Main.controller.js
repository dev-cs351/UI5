sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter"
], (Controller, formatter) => {
    "use strict";

    return Controller.extend("code.d07.exam4.controller.Main", {
        formatter: formatter,
        onInit() {
        },
        onOpenDetailView(oEvent) {
            // alert(1); // 이벤트 발생 확인
            debugger;
            
            // 이벤트에서 rowContext 파라미터 읽기
            let oRowContext = oEvent.getParameter("rowContext");
            // 파라미터에서 OrderID 추출
            let sOrderID = oRowContext.getProperty("OrderID");            

            // 라우터를 이용해 OrderID에 맞는 View로 이동
            // getOwnerComponent: 현재 컨트롤러가 속한 Component 인스턴스를 반환하는 함수
            // 즉, Component.js의 인스턴스 객체를 가지고 온다.
            // 왜 컴포넌트를 가져와야할까?
            // -> 컴포넌트에서 manifest 정보를 가지고 오고, 라우팅을 실행 하므로,
            //      라우터 정보는 컴포넌트에 있게 된다.
            let oRouter = this.getOwnerComponent().getRouter();
            // 컴포넌트에서 가져온 라우터의 경로를 
            // 코드를 작성한 RouteDetail로 라우팅해주고, 
            // 해당 라우트에 입력해야하는 정보를 입력해준다.
            // 현재 코드에서 입력한 정보는 이벤트에서 추출한 OrderID 값이다.
            oRouter.navTo("RouteDetail", { OrderID: sOrderID });
        }
    });
});