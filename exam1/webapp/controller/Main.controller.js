sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code.d07.exam1.controller.Main", {
        onInit() {
            // Input ID로 접근해서 데이터를 가지고 온다면,
            // Input의 Constraints에 있는 제한 조건에 부합하지 않은 데이터가 있어도
            // 해당 데이터를 가지고 오게 된다.
            // 따라서 조건에 맞는 데이터를 가지고 오기 위해서 모델을 이용한다.
            // 모델은 조건에 맞는 데이터만 저장한다. 

            // JSON 모델로 입력값과 사칙연산 결과 데이터 세팅
            var oData = {
                Input: {
                    num1: 0,
                    num2: 1
                },
                Output: {
                    Add: 0,
                    Sub: 0,
                    Mul: 0,
                    Div: 0
                }
            }
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },
        

        // 더하기 수행 함수
        onButtonAdd() {
            let oView = this.getView();
            let oModel = oView.getModel();

            let fNum1 = oModel.getProperty("/Input/num1");
            let fNum2 = oModel.getProperty("/Input/num2");
            // this.byId("idValue1").getValue(); 
            // 문자열로 데이터를 가지고 온다.
            // 이처럼 Input ID로 데이터를 가지고 오면 
            // 1. 제약조건 패싱
            // 2. 데이터 호출시 타입을 string으로 변환
            // 등등 이 발생할 수 있다.

            let fAddResult = fNum1 + fNum2;
            oModel.setProperty("/Output/Add", fAddResult)
        },
        // 뺴기 수행 함수
        onButtonSub() {
            let oView = this.getView();
            let oModel = oView.getModel();

            let fNum1 = oModel.getProperty("/Input/num1");
            let fNum2 = oModel.getProperty("/Input/num2");

            let fSubResult = fNum1 - fNum2;
            oModel.setProperty("/Output/Sub", fSubResult)
        },
        // 곱하기 수행 함수
        onButtonMul() {
            let oView = this.getView();
            let oModel = oView.getModel();

            let fNum1 = oModel.getProperty("/Input/num1");
            let fNum2 = oModel.getProperty("/Input/num2");

            let fMulResult = fNum1 * fNum2;
            oModel.setProperty("/Output/Mul", fMulResult)
        },
        // 나누기 수행 함수
        onButtonDiv() {
            let oView = this.getView();
            let oModel = oView.getModel();

            let fNum1 = oModel.getProperty("/Input/num1");
            let fNum2 = oModel.getProperty("/Input/num2");

            if(fNum2 !== 0) {
                var fDivResult = fNum1 / fNum2;
            } else {
                Error;
                sap.m.MessageBox.error("0으로 나눌 수 없습니다.");
            }

            oModel.setProperty("/Output/Div", fDivResult)
        }
    });
});