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
            oNewModel.setProperty("/Input", this._initData());
        },
        onButtonDeletePress() {
            // alert(1);

            // List 에서 사용되는 데이터 제품 목록
            let oView = this.getView();
            let oModel = oView.getModel();
            let aProducts = oModel.getProperty("/Products");
            
            // List 에서 선택한 항목 가져오기
            let oList = oView.byId("idList");
            let aSelectedItems = oList.getSelectedItems();

            // 선택한 항목 정보를 토대로 aProducts에서 삭제할 데이터를 찾아서 삭제
            // JSON 모델은 데이터가 배열로 이뤄져 있는데, 배열의 데이터를 접근할 때는 Index로 접근한다.
            // 삭제할 데이터의 Index를 알아야 하므로 선택한 항목들마다 연결된 Model 경로에서 
            // Index 정보를 가져와 배열에 따로 보관한다.
            let aIndex = [];
            for( let oItem of aSelectedItems ) {
                // getBIndingContextPath() : 연결된 모델의 경로
                let path = oItem.getBindingContextPath();
                // console.log(path);  // /Products/[index number]
                let index = path.split("/").pop();
                aIndex.push(index);
            }
            
            /** 
                // 오름차순 정렬
                aIndex.sort();    
                let deleteCount = 0;
                for( let index of aIndex ) {
                    // 특정 index부터 1개만 삭제하는 문법: splice
                    aProducts.splice(index - deleteCount++, 1);
                }
             */
            
            // 내림차순 정렬
            let aDescIndex = aIndex.sort((a, b) => b - a);
            for (let index of aDescIndex) {
                aProducts.splice(index, 1);
            }

            oModel.refresh();

            // List에 항목을 선택한 정보를 초기화 한다.
            oList.removeSelections(true);
        }
    });
});