sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, JSONModel) => {
    "use strict";

    return Controller.extend("code.d07.hw1a.controller.Main", {
        onInit() {
            // 뷰 실행시 모델 생성
            var oModel = new JSONModel();

            // 현재 뷰
            var oView = this.getView();

            // 생성한 모델을 toast 라는 이름으로 현재 뷰에 연결한다.
            oView.setModel(oModel, "toast");
        },

        // Input ID 를 통해 전달받은 값을 화면에 출력하는 함수
        onMessageToastByID() {

            // byId 간단한 버전
            // var sIDMSG = this.byId("idInput").getValue();
            // byId를 자주 사용하기 때문에, 
            // this에서 바로 사용할 수 있도록 기능이 추가되었다.
            // 본래 this는 this를 호출한 controller 를 의미한다.

            // 정석
            let oView = this.getView();
            let sIDMSG = oView.byId("idInput").getValue();

            // i18n 모델에 있는 데이터 호출
            // var oBundle = this.getView().getModel("i18n").getResourceBundle();
            let oBundle = oView.getModel("i18n").getResourceBundle();

            // 전달받은 값이 없다면 메세지를 출력하지 않는다.
            if(sIDMSG) {
                MessageToast.show(oBundle.getText("useInputIDMessageText") + '\n' + sIDMSG);
            } else {
                MessageToast.show(oBundle.getText("noText"))
            }
        },

        // JSON Model을 통해 전달받은 값을 화면에 출력하는 함수
        onMessageToastByModel() {
            // 뷰에 연결된 모델에서 Message 에 해당하는 값을 불러온다.
            //var sModelMSG = this.getView().getModel("toast").getProperty("/Message");
            let oView = this.getView();

            // 모델의 getPorperty 함수는 전달받은 경로에 대한 값을 가져온다.
            let sModelMSG = oView.getModel("toast").getProperty("/Message");
            
            // var oBundle = this.getView().getModel("i18n").getResourceBundle();
            let oBundle = oView.getModel("i18n").getResouceBundle();


            // 전달받은 값이 없다면 메세지를 출력하지 않는다.
            if(sModelMSG) {
                MessageToast.show(oBundle.getText("useJSONModelMessageText") + '\n' + sModelMSG);
            } else {
                MessageToast.show(oBundle.getText("noText"))
            }
        }
    });
});