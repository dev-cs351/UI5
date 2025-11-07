sap.ui.define([
	"sap/ui/core/mvc/XMLView" 
], function (XMLView) {
	"use strict";

	// App.view.xml 파일 호출
	XMLView.create({viewName: "ui5.quickstart.App"}).then(function (oView) {
		oView.placeAt("content");
	});
});

/*

sap.ui.define([
    // sap.m이 맞지만, 경로를 명시하기 위해 js 에서는 /를 사용한다.
	"sap/m/Button", 
	"sap/m/MessageToast"
], (Button, MessageToast) => { // 위의 배열과 괄호안 변수명이 순서대로 매칭된다.
	"use strict";

	new Button({
		text: "Ready...",
		press: function () {
			MessageToast.show("Hello World!");
		}
	}).placeAt("content");

});

*/