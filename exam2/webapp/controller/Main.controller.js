sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, formatter, Filter, FilterOperator) => {
    "use strict";


    return Controller.extend("code.d07.exam2.controller.Main", {
        
        formatter: formatter,
        
        onInit() {
            // alert(sap.ui.core.ValueState.Success);
        },
        changingComboBoxKey(oEvent) {
            //alert(1); // 이벤트 호출 확인

            // i18n 데이터 호출
            const oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

            // 이벤트에서 선택된 ComboBox 아이템의 키값 추출
            let oItem = oEvent.getParameter("selectedItem");
            let sKey = oItem.getProperty("key");
            
            // 키값에 따른 필터링을 위한 필터 설정
            let aFilter = [];
            aFilter.push(new Filter("Storage", FilterOperator.EQ, sKey)); 

            // 필터링 할 리스트 객체의 바인딩 정보 추출
            let oList = this.byId("idList")
            let oBinding = oList.getBinding("items")

            // "전체" 선택시 필터 제거
            if(sKey == oBundle.getText("textKeyAll")){
                aFilter.pop();
            }
            
            // 필터링 실행
            oBinding.filter(aFilter);
        }   
    });
});