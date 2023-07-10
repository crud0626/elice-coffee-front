const form = document.querySelector('#join');
const userIdInput = document.querySelector('#userId');
const userPwdInput = document.querySelector('#userPwd');
const userPwdChkInput = document.querySelector('#userPwdChk');
const userNameInput = document.querySelector('#userName');
const emailIdInput = document.querySelector('#userEmail');
const userTelInput = document.querySelector('#userTel');

const signinButton = document.querySelector('#signinButton');     // 회원가입 버튼
const idDuplicateButton = document.querySelector('#idDuplicateButton');       // 아이디 중복체크 버튼
let idValidation = false;       // 아이디 중복체크 상태

// 회원가입 유효성 검사
const regexCheck = () => {
    const userId = userIdInput.value;
    const userPwd = userPwdInput.value;
    const userPwdChk = userPwdChkInput.value;
    const userName = userNameInput.value;
    const emailId = emailIdInput.value;
    const userTel = userTelInput.value;

    // 정규표현식
    const idRegex = /^[a-z0-9]{8,12}$/;         // 영소문자 및 숫자만 포함. (8~12자)
    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;  // 최소 8자, 하나 이상의 대소문자 및 하나의 숫자, 하나의 특수문자
    const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;  // '계정@도메인.최상위도메인' 형식
    const telRegex = /^\d{3}-\d{3,4}-\d{4}$/;          // 3자리 / 3~4자리 / 4자리 숫자

    // 유효성 체크
    const idCheck = idRegex.test(userId);
    const pwdCheck = pwdRegex.test(userPwd);
    const pwdDoubleCheck = (userPwd == userPwdChk);
    const emailCheck = emailRegex.test(emailId);
    const telCheck = telRegex.test(userTel);


    // 유효성 검사
    if (userId == "") {
        alert('아이디를 입력해주세요.');
        userIdInput.focus();
        return;
    }
    if (!idCheck) {
        alert('아이디는 영소문자 및 숫자, 8자 이상 12자 이하로 입력해주세요.');
        userIdInput.focus();
        return;
    }

    if (!pwdCheck) {
        alert('비밀번호는 최소 8자, 하나 이상의 대소문자와 숫자, 특수문자를 포함해야 합니다.');
        userPwdInput.focus();
        return;
    }
    if (!pwdDoubleCheck) {
        alert('비밀번호가 일치하지 않습니다.');
        userPwdChkInput.focus();
        return;
    }

    if (userName == "") {
        alert('이름을 입력해주세요.');
        userNameInput.focus();
        return;
    }

    if (emailId == "") {
        alert("이메일을 입력해주세요.");
        emailIdInput.focus();
        return;
    }
    if(!emailCheck) {
        alert('올바른 이메일 형식이 아닙니다. 다시 확인해주세요.');
        emailIdInput.focus();
        return;
    }

    if (userTel == "") {
        alert("전화번호를 입력해주세요.");
        userTelInput.focus();
        return;
    }
    if (!telCheck) {
        alert('올바른 전화번호 형식이 아닙니다. 다시 확인해주세요.');
        userTelInput.focus();
        return;
    }


    // 아이디 중복체크
    if(!idValidation) {
        alert('아이디 중복확인이 필요합니다.');
        idDuplicateButton.focus();
    } else {
        alert('회원가입 유효성 검사를 모두 통과했습니다.');
    }
    
}


// 아이디창 데이터 변경 시
// userIdInput.addEventListener("input", () => {
//     idAvailable.hide();
//     idNotAvailable.hide();
//     idValidation = false;         // 회원가입 유효성 상태 false로 변경
// });


// 아이디 중복체크
const idDuplicateCheck = () => {
    userIdInput;
    idAvailable;
    idNotAvailable;
    
}


idDuplicateButton.addEventListener("click", idDuplicateCheck);     
signinButton.addEventListener("click", regexCheck);

