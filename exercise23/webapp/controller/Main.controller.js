sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code.d07.exercise23.controller.Main", {
        onInit() {
        },
        onItemPress(oEvent) {
            this.pDialog ??= this.loadFragment({
                name: 'code.d07.exercise23.view.Detail'
            });

            // this가 다른 의미로 변질되므로,
            // 변질되기 전에 this를 that이라는 변수에 보관한다.
            var that = this;

            this.pDialog.then( function(oDialog){
                //
                var oOrderTable = that.byId("inOrderTable");
                
            } );
            //alert(1);
        }
    });
});