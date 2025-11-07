sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/base/strings/formatMessage"
], (Controller, formatMessage) => {
    "use strict"

    return Controller.extend("code.d07.exercise29.controller.Detail", {

        formatMessage: formatMessage,

        onInit() {
            let oRouter = this.getOwnerComponent().getRouter();
            let oRoute = oRouter.getRoute("RouteDetail");

            // 이 루트의 패턴이 일치할 때 마다 
            // ( 웹 주소의 detail/{OrderID} 에 일치하는 경로가 붙었다. )
            // _onPatternMatched 가 자동으로 실행되도록 한다.
            // ( 이벤트가 발생했을 때 실행할 함수, 함수를 실행한 때의 this 컨택스트 전달 )
            oRoute.attachPatternMatched(this._onPatternMatched, this);
        },
        /**
         * "RouteDetail" 라우트가 URL과 일치할 때

            _onPatternMatched() 함수를 자동으로 호출함

            oEvent 객체를 인자로 넘김 (URL 파라미터 포함)

            this는 두 번째 인자에서 지정한 컨텍스트(this, 즉 현재 컨트롤러)를 가리킴
         */

        // _: 해당 파일 내에서만 이용되는 함수임을 표기
        _onPatternMatched (oEvent) {
            // alert(1);
            // debugger;
            let oArgs = oEvent.getParameter("arguments");
            let sOrderID = oArgs.OrderID;

            // alert("주문번호: " + sOrderID);

            // Element Binding
            
            // /Orders(주문ID)
            let sPath = "/Orders(" + sOrderID + ")";
            // Detail View 에 현재 경로를 /Orders(주문ID) 로 설정한다.
            // bindElement 에 의해 설정된 이후부터는 Detail View 에서는
            // 모델의 데이터를 접근할 떄, / 없이 쓸 경우 /Order(주문ID) 에서부터 데이터를
            // 가져오는 것으로 취급된다.
            // 예) <Text text={Customer ID} /> => /Order(주문ID)/CustomerID 를 쓴 것과 같다.
            let oView = this.getView();
            oView.bindElement({
                path: sPath,
                parameters: {
                    expand: "Order_Details"
                }
            });
            //debugger;
        }
    })
});