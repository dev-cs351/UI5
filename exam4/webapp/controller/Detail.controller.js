sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/base/strings/formatMessage",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/core/routing/History"
], (Controller, formatMessage, JSONModel, formatter, History) => {
    "use strict";

    return Controller.extend("code.d07.exam4.controller.Detail", {

        // i18n 이용을 위한 formatMessge 설정
        formatMessage: formatMessage,
        // model.formatter 설정
        formatter: formatter,
        
        onInit() {
            // 라우터를 이용해 주소 Orders([OrderID])에서
            // [OrderID]에 따라 바인딩
            let oRouter = this.getOwnerComponent().getRouter();
            let oRoute = oRouter.getRoute("RouteDetail");
            oRoute.attachPatternMatched(this._onPatternMatched, this);
            
            // 현재 OData에 Currency와 Unit이 부재하므로 JSONModel 형태로 설정
            let oData = {
                Currency: "EUR",
                Unit: "EA"
            }
            let oModel = new JSONModel(oData);
            let oView = this.getView()
            oView.setModel(oModel, "model");
        
        },
        onPageNavButtonPress() {
            // 페이지의 History에 접근하여 뒤로가기 버튼 활성화
            //  History에 데이터가 없다면, 초기 화면으로 이동
            let oHistory = History.getInstance();
            let sPreviousHash = oHistory.getPreviousHash();
            if(sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteMain");
            }
        },
        _onPatternMatched (oEvent) {
            // 이벤트에서 [OrderID] 경로에 맞는 데이터를 가져오고,
            // expand를 통해 josn 파일 경로 하위 데이터도 읽어들임
            let oArgs = oEvent.getParameter("arguments");
            let sOrderID = oArgs.OrderID;
            let sPath = "/Orders(" + sOrderID + ")";
            let oView = this.getView();
            oView.bindElement({
                path: sPath,
                parameters: {
                    expand: 'Customer, Employee, Order_Details'
                }
            });
        }
    });
});