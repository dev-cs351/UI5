sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code.d07.exercise13.controller.Overview", {
        onInit() {
            // JSON Model 생성
            var oModel = new JSONModel(
                {
                    Name: "신사임당",
                    Age: 1300,
                    Zipcode: 32320,
                    Address: "한반도",
                    Phone: "011-2333-3259",
                    Fax: "02-320-3398"
                }
            );
            
            // 컨트롤러와 연결된 view 객체를 가져온다.
            var oView = this.getView();


            // 생성한 Model에 가져온 view 객체를 넣고 "customer"라는 이름으로 설정한다.
            oView.setModel(oModel, "customer");
        },
        onOpenDialog() {
            //alert(1);
            this.pDialog ??= this.loadFragment({
                name: "code.d07.exercise13.view.Dialog"
            })
            
            // this.pDialog.then((oDialog) => oDialog.open());
            this.pDialog.then( function(oDialog) {
                oDialog.open();
            } )
        },
        onCloseDialog() {
            this.byId("idDialog").close(); 
        }
    });
});

