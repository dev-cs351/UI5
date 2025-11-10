sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter"
], (Controller, formatter) => {
    "use strict";

    return Controller.extend("code.d07.exam3.controller.Main", {
        
        formatter: formatter,
        
        onInit() {
        },
        // 선택한 행의 정보로 바인딩된 팝업창을 여는 함수
        onOpenDetailDialog(oEvent) {
            // alert(1); // 버튼 활성화 확인
            // 이벤트에서 oBindingContext 추출

            // press 이벤트를 ColumnListItem 에서 발생시킴
            // 그렇다면 이벤트의 source에는 선택된 이벤트 객체의 바인딩 정보가 있을 것이다.
            let oItem = oEvent.getSource();
            // let oItem = oEvent.getParameter("listItem");
            // debugger;
            let oBindingContext = oItem.getBindingContext();

            // View에 oBindingContext에 있는 정보 바인딩
            // let oView = this.getView();
            // oView.setBindingContext(oBindingContext);

            // fragment파일로 팝업창 실행
            this.pDialog ??= this.loadFragment({
                name: "code.d07.exam3.view.Detail"
            });
            this.pDialog.then(function(oDialog){
                oDialog.setBindingContext(oBindingContext);
                oDialog.open();
            });
        },
        // 팝업창 닫기
        onCloseDialog() {
            let oDialog = this.byId("idDialog");
            oDialog.close();
        }
    });
});