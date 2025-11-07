sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/base/strings/formatMessage"
], (Controller, MessageToast, formatMessage) => {
    "use strict";

    return Controller.extend("code.d07.exercise32.controller.Main", {
        
        formatMessage: formatMessage,
        
        onInit() {
        },
        onTableSelectionChange(oEvent) {
            // alert(1);
        /** 1. 테이블에서 선택된 아이템을 가져온다. */
            let oItem = oEvent.getParameter("listItem");
            // console.log(oItem);

            // 선택한 ListItem 모델 정보
            let oBindingContext = oItem.getBindingContext();
            // 모델 정보에서 "ContactName"을 가져온다.
            let sContactName = oBindingContext.getProperty("ContactName");
            
            // ContactName을 화면에 출력
            MessageToast.show(sContactName + " 선택");

        /** 2. 현재 뷰에 가져온 아이템을 바인딩한다. */
            // 현재 화면에 내가 선택한 ListItem의 모델 정보를 현재 기준으로 설정한다.
            // 이와 같이 설정하면, 해당 View에서 모델에 상대경로로 접근할 때
            // 내가 선택한 ListItem의 모델 정보를 기준으로 접근하게 된다.
            let oView = this.getView();
            oView.setBindingContext(oBindingContext);
        
        /** 3. fragment.xml 호출
         *      - Dialog 를 화면에 띄운다.
         */
            // webapp/view/CustomerInfo.fragment.xml 파일을 읽도록 시킨다.
            this.pDialog ??= this.loadFragment({
                name: "code.d07.exercise32.view.CustomerInfo"
            });
            // 파일을 읽으면, then() 안의 funciton을 실행한다.
            // function을 실행할 때 function() 안에는
            // fragmenmt에서 가져온 객체를 담을 parameter 변수명을 적는다.
            // fragment에는 <Dialog>만 있으므로, parameter에 전달되는 객체는
            // Dialog 객체가 전달 되므로, parameter 변수명은 oDialog로 명명한다.
            this.pDialog.then(function(oDialog){
                // oDialog.setBindingContext(oBindingContext);
                oDialog.open();
            });
            
        },
        // 열려있는 Dialog를 찾아서 닫는 기능
        onCloseDialog() {
            let oDialog = this.byId("idCustomerInfoDialog");
            if(oDialog){
                oDialog.close();
            }
        }
    });
});