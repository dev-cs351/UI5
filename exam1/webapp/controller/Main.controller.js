sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code.d07.exam1.controller.Main", {
        onInit() {
            // JSON 모델로 사칙연산 결과 데이터 세팅
            let oData = {
                Add: 0,
                Sub: 0,
                Mul: 0,
                Div: 0
            }
            const oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },
        // 더하기 수행 함수
        onAddButton() {
            let oView = this.getView();
            let oModel = oView.getModel();

            let Value1 = oModel.getProperty("/Value1");
            let Value2 = oModel.getProperty("/Value2");

            let addResult = Value1 + Value2;
            oModel.setProperty("/Add", addResult)
        },
        // 뺴기 수행 함수
        onSubButton() {
            let oView = this.getView();
            let oModel = oView.getModel();

            let Value1 = oModel.getProperty("/Value1");
            let Value2 = oModel.getProperty("/Value2");

            let subResult = Value1 - Value2;
            oModel.setProperty("/Sub", subResult)
        },
        // 곱하기 수행 함수
        onMulButton() {
            let oView = this.getView();
            let oModel = oView.getModel();

            let Value1 = oModel.getProperty("/Value1");
            let Value2 = oModel.getProperty("/Value2");

            let mulResult = Value1 * Value2;
            oModel.setProperty("/Mul", mulResult)
        },
        // 나누기 수행 함수
        onDivButton() {
            let oView = this.getView();
            let oModel = oView.getModel();

            let Value1 = oModel.getProperty("/Value1");
            let Value2 = oModel.getProperty("/Value2");

            let divResult = Value1 / Value2;
            oModel.setProperty("/Div", divResult)
        }
    });
});