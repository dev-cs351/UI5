sap.ui.define([
    "sap/ui/core/mvc/Controller",
], (Controller) => {
    "use strict";

    return Controller.extend("code.d07.hw1b.controller.Main", {
        onInit() {
        },

        // idButton 의 press 이벤트 발생시 호출되는 함수
        // Fragment 파일을 호출한다.
        onOpenDialog() {
            // "code.d07.hw1b.view.Dialog" 경로의 fragment 파일이 존재하면 pDialog 변수에 저장
            this.pDialog ??= this.loadFragment({
                name: "code.d07.hw1b.view.Dialog"
            });

            // pDialog 에 fragment 파일이 저장된 후, 해당 파일 open
            this.pDialog.then((oDialog) => oDialog.open());
        },

        // idCloseDialogButton 의 press 이벤트 발생시 호출되는 함수
        // Dialog 창을 닫는다.
        onCloseDialog() {
            // 닫을 Dialog 를 ID 를 통해 호출하고 닫는다.
            this.byId("idDialog").close();
        }
    });
});