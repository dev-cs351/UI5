function sayTimeTable() {
	//debugger;
	let oInput = document.getElementById("idInput");
	let iMul = oInput.value;
	if(typeof(iMul) != "number") {
		iMul = Number(iMul);
	}
	let iResult = 0;
	let sResult = "";
				
	if ( iMul>9 | iMul<2 ) { 
		return alert("유효한 숫자를 넣어주세요."); 
	}

	for ( let count = 1; count<10; count++ ) {
		iResult += iMul;
		sResult += iMul + " * " + count + " = " + iResult + "\n";
	}
	//console.log(typeof(oInput.value)); // string // getElement로 가져온 값은 string 타입이다.
	alert(sResult);
}
