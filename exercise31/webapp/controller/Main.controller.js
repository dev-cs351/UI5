sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("code.d07.exercise31.controller.Main", {
        onInit() {
            // json 파일 데이터를 가져오는 경우는 hw1c 파일 확인
            var oData= {
                Members: [
                    {
                        name: '홍길동',
                        gender: '남',
                        genderCode: 'M'
                    },
                    {
                        name: '아이유',
                        gender: '여',
                        genderCode: 'F'
                    },
                    {
                        name: '신사임당',
                        gender: '여',
                        genderCode: 'F'
                    }
                ]
            }
            var oModel = new JSONModel(oData);
            var oView = this.getView();

            oView.setModel(oModel, 'member');
        },
        onComboBoxSelectionChange(oEvent) {
            // alert(1);
            // debugger;
        /** 1. 이벤트에서 선택된 아이템을 가져온다. 
         *      - 가져온 아이템에서 성별의 key값을 저장
        */
            let oItem = oEvent.getParameter("selectedItem");
            let sKey = oItem.getKey();

            // sap.m.MessageToast.show(oKey);
        /** 2. 리스트에 가져온 아이템을 바인딩 */
            let oList = this.byId("idList");
            let oBinding =oList.getBinding("items");
        /** 3. key 값에 따라 필터링
         *      - 선택한 성별로 바인딩을 필터링한다.
         *      - 필터된 값만 화면에 출력된다.
         */
            oBinding.filter(this._genderFiltering(sKey));
        },
        _genderFiltering(memberKey) {
            let aFilter=[];
            if(memberKey !== undefined && memberKey !== 'A') {
                // 해당 키값이 존재하면,
                // 그 키에 해당되는 데이터만 출력되도록 Filter를 생성해서 배열에 보관한다.
                
                /** aFilter.push(
                        new Filter({
                            path: 'genderCode', 
                            operator: 'FilterOperator.EQ',
                            value1: memberkey
                        })
                    );  
                */
                
                // Filter(비교 대상, 비교 방법, 비굣값)
                let oFiletr = new Filter("genderCode", FilterOperator.EQ, memberKey);
                aFilter.push(oFiletr);
            }
            return aFilter;
        }
    });
});