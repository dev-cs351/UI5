sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, sClassFormatter, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("code.d07.exercise14.controller.Overview", {
        onInit() {
        },
        formatter: sClassFormatter,
        onCustomerChange(oEvent) {
            // sap.m.MessageBox.information("고객 변경 실행");
            // sap.m.MessageBox.confirm("고객 변경 실행")
            // sap.m.MessageToast.show("고객 변경 실행");
            
            // 변경된 아이템의 정보를 가져온다.
            var oListItem = oEvent.getParameter("listItem")
            // listItem: The item whose selection has changed. 
            // In MultiSelect mode, only the up-most selected item is returned. 
            // This parameter can be used for single-selection modes.
            
            // 이 아이템에 연결된 모델 내용을 가져온다.
            // 가져온 모델 정보는 예약 테이블에 전달하기 위함이다.
            var oBindingContext = oListItem.getBindingContext(); // items={/Customer} aggregation에 의해 가져와진 바인딩된 객체중 하나.
            
            // 예약 테이블을 가져온다.
            var oBookingTable = this.byId("bookingTable");
            
            // 선택된 고객의 예약 정보를 출력하기 위해 예약 테이블레 가져온 모델 정보를 기록한다.
            oBookingTable.setBindingContext(oBindingContext);

            sap.m.MessageToast.show(oBindingContext.getProperty("CustomerName") + " 고객 님의 예약 정보를 출력합니다.");

        },
        // 공식 명칭: 이벤트 핸들러 메서드
        onFilterCustomers(oEvent) {
            // Filter 객체를 보관할 배열 선언
            var aFilter = [];
            
            // 사용자가 SearchField에 입력한 검색 조건을 가져온다.
            // query에는 사용자가 입력한 검색 조건이 들어있다.
            var sQuery  = oEvent.getParameter("query");
            
            // &&(and) 는 왼쪽과 오른쪽의 조건들이 모두 참일 때 참으로 결과를 반환하는 논리 연산자
            // ||(or) 는 왼쪽과 오른쪽의 조건들 중 하나라도 참일 때 참으로 결과를 반환하는 논리 연산자
            // sQuery는 null 또는 undefinded가 아니고, 길이가 0보다 큰 문자열일 때만 참이다.
            // 사용자가 검색 조건을 입력했는지 따져보기 위한 조건문
            if( sQuery && sQuery.length > 0 ) {
                // Filter(데이터 경로, 비교 방법, 비교값1, 비교값2)
                // 비교값 2가 필요한 경우는 범위로 비교할 때, 예를 들어 From ~ To 로 "C"부터 "E"까지와 같은 조건일 때
                // 사용자가 입력한 검색조건이 포함된 고객명만 검색하겠다.
                aFilter.push( new Filter("CustomerName", FilterOperator.Contains, sQuery));
            }
                
            // 위에서 만든 aFilter에는 검색 기준이 담겨있다. 이 검색 기준을 통해서 
            // 고객 테이블에 특정 데이터만 출력하기 위해 다음과 같이 고객 테이블에 aFilter를 적용한다.
            var oTable = this.byId("idCustomerTable");
            console.log(oTable);
            
             // Aggregation items는 테이블에 데이터를 취급하는 Aggregation 이므로,
             // 이 Aggregation의 Binding 정보를 가져와서 filter를 적용한다.
            var oBinding = oTable.getBinding("items"); 
                
            oBinding.filter(aFilter);
        },
        onOpenDialog() {
            if(!this.pDialog) {
                this.pDialog = this.loadFragment({
                    name: "code.d07.exercise14.view.Dialog"
                });
            }
            this.pDialog.then((oDialog) => {oDialog.open();})
        }
    });
});