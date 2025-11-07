sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code.d07.hw1c.controller.Main", {
        onInit() {
        },

        // 조원 목록 테이블의 itemPress 이벤트 발생시 호출되는 함수
        // 조원 목록 테이블에서 선택된 조원의 정보를 Detail 테이블에 전달한다.
        onItemPress(oEvent) {
            // SingleSelectMaster mode 에 의해 
            // 화면에서 선택된 아이템 정보를 불러온다.
            var oListItem = oEvent.getParameter("listItem");

            // 아이템에 연결된 모델 정보를 불러온다.
            var oBindingContext = oListItem.getBindingContext();

            // Detail 테이블을 ID 를 통해 불러온다.
            var oDetailTable = this.byId("idDetailTable");
            
            // Detail 테이블에 아이템에서 불러온 모델 정보를 연결한다.
            oDetailTable.setBindingContext(oBindingContextm);
        }
    });
});