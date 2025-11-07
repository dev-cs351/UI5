sap.ui.define( [
	"sap/ui/model/type/Currency"
], (CurrencyType) => {
	"use strict"

	// 통화 타입을 적용하기 위한 객체 선언
	var oCurrencyType = new CurrencyType({
		showMeasure: false,
		currencyCode: true,
		maxFractionDigits: 2
	})

	return {
		// 할인율을 백분율로 출력하기 위한 함수
		discountText(iDiscount) {
			return iDiscount*100;
		},
		// 개당가격, 수량, 할인율, 통화코드를 인자로 받아와,
		// 금액을 계산하고, 통화타입을 적용하기 위한 함수
		calcAmount( iUnitPrice, iQuantity, iDiscount, sCurrency ) {
			var fAmount = Math.round( iUnitPrice * iQuantity * (1 - iDiscount) * 100 ) / 100;
			var sFormattedAmout = oCurrencyType.formatValue([fAmount, sCurrency], "string");

			return sFormattedAmout;
		}
	}
} )