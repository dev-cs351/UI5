sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code.d07.exercise33.controller.Main", {
        onInit() {
            // onInit에선 모델 정보를 불러올 수 없다.
            let oData = {
                Input: {
                    Name: "",
                    Gender: "",
                    Age: 0,
                    Address: "",
                    Cash: 0,
                    Currency: "KRW"
                },
                Members: [
                    {
                        Name: "홍길동",
                        Gender: "남",
                        Age: 999,
                        Address: "조선",
                        Cash: 10000000,
                        Currency: "KRW"
                    }
                ]
            }

            let oModel = new JSONModel(oData);
            let oView = this.getView();
            oView.setModel(oModel);
        },
        onButtonAddPress() {
            /** 0. 뷰, 모델 호출  */
            let oView = this.getView();
            let oModel = oView.getModel(); // 모델 이름이 있는 경우 () 안에 적어준다.
            // let aMembers = oModel.getProperty("/Members"); // 경로 [/Members]에 있는 데이터를 가져온다.
            // debugger;

            /** 1. 입력받은 데이터 불러오기 */
            let oInput = this._setInputData(oModel);

            /** 2. 모델의 Member에 값 대입 */
            let aMembers = oModel.getProperty("/Members");
            aMembers.push(oInput);

            /** 3. 모델의 Input 초기화 */
            oInput = {
                Name: "",
                Gender: "",
                Age: 0,
                Cash: 0,
                Currency: "KRW"
            }
            oModel.setProperty("/Input", oInput);

            /** 4. 화면 갱신 */
            oModel.refresh();
            
            /**
                    // 1. 입력받은 데이터 불러오기  
                    let oInput = oModel.getProperty("/Input"); // 경로 [/Input]에 있는 데이터를 가져온다.

                    if(!oInput.Name){
                        sap.m.MessageBox.error("이름은 필수 입력 입니다.");
                        return;
                    }

                    let oRadioButtonGroup = this.byId("idRadioButtonGroup");
                    // debugger;
                    let oSelectedRaioButton = oRadioButtonGroup.getSelectedButton();
                    let sSelectedGender = oSelectedRaioButton.getProperty("text");
                    // alert(sSelectedGender);

                    ComboBox 로직
                    let oComboBox = this.byId("idGenderComboBox");
                    let sKey = oComboBox.getSelectedKey();  
                    
                    // key 값에 따라 gender 정보를 결정한다.
                    switch( sKey) {
                        case "M": 
                            oInput.Gender = '남';
                            break;
                        case "F":
                            oInput.Gender = '여';
                            break;
                        default:
                            oInput.Gender = 'NA';
                    }   
                    

                    // RadioButton 로직
                    switch( sSelectedGender ) {
                        case "남자": 
                            oInput.Gender = '남';
                            break;
                        case "여자":
                            oInput.Gender = '여';
                            break;
                        default:
                            oInput.Gender = 'NA';
                    }
             */

            /** 2. 모델의 Member에 값 대입 */
            // aMembers.push(oInput);
            
            /** 3. 모델의 Input 초기화 */
            // 경로 [/Input]의 데이터가 aMembers와 공유하고 있기 때문에
            // 새로운 oInput 데이터로 덮어쓰지 않으면 경로 [/Members]의 값이 영향 받는다.
            // oInput = {
            //     Name: "",
            //     Gender: "",
            //     Age: 0,
            //     Cash: 0,
            //     Currency: "KRW"
            // }


            // 경로 [/Input]에 새로운 데이터로 기록한다.
            // oModel.setProperty("/Input", oInput);

            /** 4. 화면 갱신 */
            // 모델의 변경된 내용이 화면에 갱신되도록 최신화
            // oModel.refresh();
        },
        onButtonDeletePress() {
            
            /** 0. 뷰, 모델 호출 */
            let oView = this.getView();
            let oModel = oView.getModel();

            let oBundle = oView.getModel("i18n").getResourceBundle();
            
            /** 1. 테이블에서 선택된 아이템의 모델 주솟값 불러오기 
             *  - 함수 _getTableItemPath() 에 인자로 테이블 객체 전달.
            */
            // Table에 선택된 행을 삭제하기 위해서는
            // 먼저 Table 객체부터 가져와야 한다.
            let oTable = this.byId("idMemberTable");
            let index = this._getTableItemPath(oTable);

            //debugger;
            /** 2. 제거될 아이템 알림 후 제거 */
            let aMembers = oModel.getProperty("/Members");
            sap.m.MessageToast.show(aMembers[index].Name + ` ${oBundle.getText("nim")}` + "\n" + "멤버 목록에서 제거");

            // 선택한 행을 배열에서 Index 기준으로 찾아서 삭제한다.
            aMembers.splice(index, 1);

            /** 3. 화면 새로 고침 및 아이템 선택 초기화 */
            //변경된 모델의 내용이 View에 반영되도록 새로고침한다.
            oModel.refresh();
            //테이블에 어떤 item도 선택되어 있지 않도록 초기화 한다.
            oTable.removeSelections(true);

            /**
            // Table 객체에게 현재 테이블에 선택된 Item을 가져온다.
            // getSelectedItem sap.m.Table method에서 확인 가능
            let oSelectedItem = oTable.getSelectedItem();

            // 선택된 Iteml의 모델 정보를 가져온다.
            let oBindingContext = oSelectedItem.getBindingContext();
            debugger;
            let sPath = oBindingContext.getPath();

            // alert(sPath);
            // /Members/0
            // index 정보를 가지고 올 수 있다.
            // 배열에서 해당 index에 해당하는 행을 제거한다.
            // "/"를 기준으로  split 하면, ["", "Member", 0]이 된다.

            let index = sPath.split("/").pop();
            */
        },

        /** - onButtonAddPress() 의
         *      "1. 입력받은 데이터 불러오기"
         *      에서 사용된 함수. 
         *  - 모델에 직접 전달받지 않은 값을 모델에 넣어주는 함수입니다.
         *      현재  Radio Button 으로 전달 받은 값을 적절하게 모델에 넣어줍니다.
         * */
        _setInputData(objectModel){
            /** 1. 입력받은 데이터 불러오기  */
            // 입력받은 objectModel의 경로 [/Input]에 있는 데이터를 가져온다.
            let objectInput = objectModel.getProperty("/Input"); 

            // 이름을 입력받지 않았다면 에러 호출
            if(!objectInput.Name){
                sap.m.MessageBox.error("이름은 필수 입력 입니다.");
                return;
            }

            // Gender 는 Radio Button 으로 값을 입력 받으므로,
            // Radio Button 에서 text를 추출해서 모델에 값을 넣어준다.
            let oRadioButtonGroup = this.byId("idRadioButtonGroup");
            let oSelectedRaioButton = oRadioButtonGroup.getSelectedButton();
            let sSelectedGender = oSelectedRaioButton.getProperty("text");
            // alert(sSelectedGender);

            // RadioButton 로직
            switch( sSelectedGender ) {
                case "남자": 
                    objectInput.Gender = '남';
                    break;
                case "여자":
                    objectInput.Gender = '여';
                    break;
                default:
                    objectInput.Gender = 'NA';
            }

            /** ComboBox 로직
            // Combo Box 에서 key 를 추출해서 모델에 값을 넣어준다.
            let oComboBox = this.byId("idGenderComboBox");
            let sKey = oComboBox.getSelectedKey();  
             
            // key 값에 따라 gender 정보를 결정한다.
            switch( sKey) {
                case "M": 
                    oInput.Gender = '남';
                    break;
                case "F":
                    oInput.Gender = '여';
                    break;
                default:
                    oInput.Gender = 'NA';
            }   
             */

            return objectInput;
        },

        /** - onButtonDeletePress 의  
         *      '1. 테이블에서 선택된 아이템의 모델 주솟값 불러오기'
         *      에서 사용되는 함수
         *  - 전달받은 테이블에서 선택된 아이템의 모델 주솟값(인덱스값)을 리턴한다.
         */
        _getTableItemPath(objectTable) {
            // Table 객체에게 현재 테이블에 선택된 Item을 가져온다.
            // getSelectedItem sap.m.Table method에서 확인 가능
            let oSelectedItem = objectTable.getSelectedItem();

            // 선택된 Iteml의 모델 정보를 가져온다.
            let oBindingContext = oSelectedItem.getBindingContext();
            debugger;
            let sPath = oBindingContext.getPath();

            // alert(sPath);
            // /Members/0
            // index 정보를 가지고 올 수 있다.
            // 배열에서 해당 index에 해당하는 행을 제거한다.
            // "/"를 기준으로  split 하면, ["", "Member", 0]이 된다.

            let indexNumber = sPath.split("/").pop();

            return indexNumber;
        }
    });
});