/**
 *  재고 상태의 formatting을 위한 파일 
 */
sap.ui.define([
    "sap/ui/core/ValueState",
], (coreLibrary) => {
    "use strict";

    return {
        // 재고상태의 state를 변경해주는 함수
        quantityState(quantity) {
            if( quantity >= 3000 ) {
                return coreLibrary.Success;
            } else if( quantity < 1000 ) {
                return coreLibrary.Error;
            } else {
                return coreLibrary.Information;
            }
        },
        // 재고의 수에 따라 텍스트 반환
        quantityText(quantity) {
            if( quantity >= 3000 ) {
                return "많음";
            } else if( quantity < 1000 ) {
                return "부족";
            } else {
                return "보통";
            }
        }
    };
});