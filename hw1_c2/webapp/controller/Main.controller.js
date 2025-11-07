sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code.d07.hw1c2.controller.Main", {
        onInit() {
        },

        // selectionChange 이벤트는 선택할 때 마다 선택한 행에 대한 정보를 포함해서
        // 객체로 전달 하는데, 이 정보를 onSelectionChange에서는 
        // oEvent라는 변수를 생성해서 전달받아 사용하도록 한다.
        onSelectionChange(oEvent) {
            // alert(1);
            
            // 사용자가 선택한 행의 정보를 oEvent에서 가져온다.
            let oItem = oEvent.getParameter("listItem");
            
            // console.log(oItem);

            // 선택한 행에 연결된 모델 정보 (데이터, 경로 등)를 가져온다.
            // getBindingContext를 사용하기 위해선 모델의 이름을 명시해 줘야만 한다.
            let oBindingContext = oItem.getBindingContext("member");

            //console.log(oBindingContext.getProperty("Name"));
            // console.log(oBindingContext.getProperty("Gender"));
            // console.log(oBindingContext.getProperty("Address"));
            
            let oDetailTable = this.byId("idDetailTable");

            oDetailTable.setBindingContext(oBindingContext, "member");
        }
    });
});