sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code.d07.exercise12.controller.Overview", {
        onInit() {
        },
        onOpenDialog() {
            // alert("test call open dialog: OK");
            if(!this.pDialog) {
                this.pDialog = this.loadFragment({
                    name: "code.d07.exercise12.view.Dialog"
                });
            }
            this.pDialog.then(function (oDialog) {
                oDialog.open();
            },);
        },
        onCloseDialog() {
            this.byId("idDialog").close();
        },
        onOpenLargeDialog() {
            
            this.pDialog ??= this.loadFragment({
                // view가 컨트롤러를 가지고 오는 파일 경로를 확인해보자.
                name: "code.d07.exercise12.view.LargeDialog"
            });
            // alert(1);
            this.pDialog.then((oDialog) => oDialog.open())
        },
        onCloseLargeDialog() {
            var oDialog = this.byId("idLargeDialge");
            if(oDialog) {
                oDialog.close();
            }
        }
    });
});