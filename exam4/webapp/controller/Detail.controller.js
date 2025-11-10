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
            // detail 뷰가 실행될 때 마다 호출하는 로직들
            
            // 라우터를 이용해 주소 Orders([OrderID])에서
            // [OrderID]에 따라 바인딩
            let oRouter = this.getOwnerComponent().getRouter();
            let oRoute = oRouter.getRoute("RouteDetail");
            // detail 화면 루트를 가지고 와서 attachPatternMatched 사용
            // 주소가 일치할 때, this._onPatternMathed 실행
            oRoute.attachPatternMatched(this._onPatternMatched, this);
            
            // 현재 OData에 Currency와 Unit이 부재하므로 JSONModel 형태로 설정
            let oModel = new JSONModel({
                Currency: "EUR",
                Unit: "EA"
            });
            let oView = this.getView();
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
        // Browser에 적힌 URL이 Detail View를 호출하는 pattern일 경우
        // 매번 이 함수가 자동으로 호출되도록 onInit()에서 설정해 두었다.
        _onPatternMatched (oEvent) {
            // 이벤트에서 [OrderID] 경로에 맞는 데이터를 가져오고,
            // expand를 통해 josn 파일 경로 하위 데이터도 읽어들임
            
            // debugger;

            // 이벤트 발생 원인: 메인 컨트롤러에서 라우터 네비게이팅
            // 따라서 게임하고싶다
            // 따라서 이벤트에서 네비게이팅에 사용된 정보가 바인딩 되어 있다.
            // 현재는 라우터에 OrderID 를 이용해서 네비게이팅 했기 떄문에,
            // OrderID 를 가지고 올 수 있을것이라 기대할 수 있다.
            
            // debugger 를 통해 oEvent를 확인해보면, 
            // 파라미터 argument에서 OrderID 를 확인할 수 있다.
            // 왜 argument에 있을까? 
            // ->  우선, 라우터는 모델을 알지 못하기 때문에 
            //          모델 정보가 저장된 바인딩 정보는 생각할 필요가 없고,
            //      arguments는 URL에서 파싱된 네비게이션 상태 == 브라우저 주소창에 기록된 앱의 현재 상태 
            //          를 의미한다.

            // 위와 같은 내용에 따라서, 
            // 이벤트에서 URL 파싱 정보를 가지고 오기 위해 argument 값을 가지고 온다.
            let oArgs = oEvent.getParameter("arguments");
            // 현재 파싱 정보는 라우터에서 설정된 변수인 OrderID에 저장되어 있고,
            // Map 자료 형태로 되어 있으므로, argument에서 OrderID 키의 value를 가지고 온다.
            let sOrderID = oArgs.OrderID;
            // 뷰에 바인딩 정보를 주기 위해
            // 데이터가 있는 oData의 경로를 설정해주고, bindElement로 바인딩 해준다.
            // 왜 setBindingContext가 아닐까?
            // -> bindElement는 OData용 element binding을 만들어 주면서,
            //      요청 파라미터, 데이터 요청/수신 이벤트, 상태 갱신 등등 모두 한번에 처리해준다.
            //      즉, 연관 엔티티를 한 번의 호출로 가져오고 하위 컨트롤의 상대 바인딩이 자동으로 그 데이터를 사용한다.
            //    setBindingContext는 이미 Context 객체를 가지고 있을 때 넣어주는 방법
            //      HTTP 요청 파라미터($expand 등)를 직접 제어하기 어렵다
            // 따라서, 데이터를 어떻게 / 무엇과 함께 요청할지 컨트롤 하려면 bindElemet가 표준적이다. 
            // let sPath = "/Orders(" + sOrderID + ")";
            let oView = this.getView();
            // oView.bindElement({
            //     path: sPath,
            //     parameters: {
            //         expand: 'Customer, Employee, Order_Details'
            //     }
            // });

            let sPath = `/Orders(${sOrderID})`;
            // Detail View의 모델에 접근할 때 전달된 경로를 기준으로 데이터에 접근하도록 한다
            // this.getView().bindElement(sPath); 
            debugger;
            this.getView().bindElement({
                path: sPath,
                parameters: {
                    expand: 'Customer, Employee, Order_Details'
                },
                events: {
                    dataRequested(){
                        debugger;
                        oView.setBusy(true);
                    },
                    dataReceived(){
                        oView.setBusy(false);
                    }
                }
            }); 
        }
    });
});