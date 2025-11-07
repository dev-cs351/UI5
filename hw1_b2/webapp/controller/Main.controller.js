sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code.d07.hw1b2.controller.Main", {
        onInit() {
        },
        onOpenDialog(){
            // alert(1);
            this.pDialog ??= this.loadFragment({
                name: "code.d07.hw1b2.view.Dialog"
            });

            // this.pDialog.then( (oDialog) => oDialog.open() );
            this.pDialog.then( function(oDialog) {
                oDialog.open();
            } )
        },
        onCloseDialog() {
            //alert(1);
            let oDialog = this.byId("idDialog");
            if(oDialog) {
                oDialog.close();
            }
        }
    });
});