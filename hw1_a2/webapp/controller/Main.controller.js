sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, JSONModel) => {
    "use strict";

    return Controller.extend("code.d07.hw1a2.controller.Main", {
        onInit() {
            // JSON Model을 생성하고, View의 기본모델로 설정
            let oModel = new JSONModel();
            let oView = this.getView();
            oView.setModel(oModel);
        },

        onClickButton() {
            // alert(1);

            // 정석
            let oView = this.getView();
            let oInput = oView.byId("idInput");
            // let oInput = this.byId("idInput");
            // byId를 자주 사용하기 때문에, 
            // this에서 바로 사용할 수 있도록 기능이 추가되었다.
            // 본래 this는 this를 호출한 controller 를 의미한다.

            let sValue = oInput.getValue();
            MessageToast.show(sValue);
        },

        onClickJsonButton() {
            // alert(1);

            // 현재 화면의 기본 모델을 가져온다.
            let oView = this.getView();
            let oModel = oView.getModel();
            
            // 모델의 getPorperty 함수는 전달받은 경로에 대한 값을 가져온다.
            let sValue = oModel.getProperty("/Value");
            MessageToast.show(sValue);
        }
    });
});