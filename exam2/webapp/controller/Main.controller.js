sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/message/MessageType",
    "sap/m/MessageBox"
], (Controller, formatter, Filter, FilterOperator, JSONModel, MessageType, MessageBox) => {
    "use strict";


    return Controller.extend("code.d07.exam2.controller.Main", {
        
        formatter: formatter,
        
        onInit() {
            // alert(sap.ui.core.ValueState.Success);
            var oData = {
                "Input" : this._initData()
            }
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "new");
        },
        _initData() {
            var oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var sCity = oResourceBundle.getText("textComboSeoul");

            return {
                ProductName: "",
                Price: 0,
                Currency: "KRW",
                Quantity: 0,
                Unit: "BOX",
                City: {
                    Seoul: true,
                    Busan: false
                },
                Storage: sCity
            }
        },
        changingComboBoxKey(oEvent) {
            //alert(1); // 이벤트 호출 확인

            // i18n 데이터 호출
            let oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

            // 이벤트에서 선택된 ComboBox 아이템의 키값 추출
            let oItem = oEvent.getParameter("selectedItem");
            let sKey  = oItem.getProperty("key");
            
            // 키값에 따른 필터링을 위한 필터 설정
            let aFilter = [];
            aFilter.push(new Filter("StorageCode", FilterOperator.EQ, sKey)); 
            // if( sKey&& sKey !== "A" ) {
            //     var oFilter = new Filter("StorageCode", FilterOperator.EQ, sKey);
            //     aFilter.push(oFilter);
            // }

            // 필터링 할 리스트 객체의 바인딩 정보 추출
            let oList    = this.byId("idList");
            let oBinding = oList.getBinding("items");

            // "전체" 선택시 필터 제거
            if(sKey == oBundle.getText("textComboKeyAll")){
                aFilter.pop();
            }
            
            // 필터링 실행
            oBinding.filter(aFilter); 
            // List items 속성에 Filter 속성 추가.
            // 컨트롤러에서 grouping, sorting, filtering 속성 등 바인딩 정보를 추가한다.
        },
        onButtonAddNewGoods() {
            // alert(1);
            
            // 입력된 값이 올바른지 검사
            var oInputProductName = this.byId("idInputProductName");
            var sProductName = oInputProductName.getValue();
            if ( sProductName && sProductName.length > 0 ) {
                // 정상
            } else {
               MessageBox.error("제품명이 비어있습니다.");
                return ;
            }

            // Messgae Manager 에 오류 메시지가 존재하면 중단한다.
            var oMessageManager = sap.ui.getCore().getMessageManager();
            var aMessageData = oMessageManager.getMessageModel().getData();
            
            var hasError = aMessageData.some( (msg) => msg.type === MessageType.Error );
            if( hasError ) {
                MessageBox.error("에러가 존재합니다.");
                return ;
            }

            // 검사 중 오류가 확인되면 중단한다.
            // 검사가 통과되면 상품 목록에 추가하는 로직을 실행한다.

            var oView = this.getView();
            var oNewModel = oView.getModel("new");
            
            /**
             * 경로 /Input의 데이터를 가져온다.
             * 이 데이터는 다음과 같이 이뤄져 있다.
             * {
             *      ProductName: "...",
             *      Price: ...,
             *      Currency: "KRW",
             *      Quantity: ...,
             *      Unit: "BOX",
             *      City: {
             *          Seoul: true / false
             *          Busan: false / true
             *      },
             *      Storage: "서울" / "부산"
             * }
             */
            var oNewProduct = oNewModel.getProperty("/Input");

            if(oNewProduct.City.Seoul) {
                oNewProduct.Storage = "서울";
                oNewProduct.StorageCode = "S";
            } else if(oNewProduct.City.Busan) {
                oNewProduct.Storage = "부산";
                oNewProduct.StorageCode = "B";
            } else {
                oNewProduct.Storage = "?";
            }

            // 기본 모델을 가지고 와서 경로 /Products에 신규 상품 정보를 추가한다.
            var oModel = oView.getModel();
            var aProducts = oModel.getProperty("/Products");
            aProducts.push(oNewProduct);

            // 경로 /Products에 새로운 상품 정보가 추가되었으므로,
            // 화면에 반영하기 위해 Model 정보를 새로고침 한다.
            oModel.refresh();
            
            // new 모델의 경로 /Input에는 입력한 데이터를 초기화 한다.
            oNewProduct.setProperty("/Input", this._initData());
        }
    });
});