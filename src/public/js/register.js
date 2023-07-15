import { API_END_POINT } from "/constants/index.js";
import { validateRegex } from "/constants/index.js"; // 정규표현식
import { makeTemplate } from "./common/template.js";

const content = `
  <main>
    <section class="signin-page account">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <div class="block text-center">
                        <h2 class="text-center">회원가입</h2>
                        <form class="text-left clearfix" action="index.html">
                            <div class="form-group form-flex">
                                <input type="text" class="form-control"  placeholder="아이디" id="userId">
                                <button type="button" class="btn btn-small text-center" id="idDuplicateButton">중복확인</button>
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control"  placeholder="비밀번호" id="userPwd">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control"  placeholder="비밀번호 재확인" id="userPwdChk">
                                </div>
                            <div class="form-group">
                                <input type="text" class="form-control"  placeholder="이름" id="userName">
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control"  placeholder="이메일 | test@example.com" id="userEmail">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control"  placeholder="전화번호 | 000-0000-0000" id="userTel">
                            </div>
                            <div class="text-center">
                                <button type="button" class="btn btn-main text-center" id="signinButton">가입하기</button>
                            </div>
                        </form>
                        <p class="mt-20">이미 계정이 있으신가요?<a href="/login" class="textCoffee"> 로그인</a></p>
                        <!-- <p><a href="forget-password.html">비밀번호를 잊으셨나요?</a></p> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
  </main>
`;

const body = document.querySelector("body");
makeTemplate(body, content);

const userIdInput = document.querySelector("#userId");
const userPwdInput = document.querySelector("#userPwd");
const userPwdChkInput = document.querySelector("#userPwdChk");
const userNameInput = document.querySelector("#userName");
const emailIdInput = document.querySelector("#userEmail");
const userTelInput = document.querySelector("#userTel");

const signinButton = document.querySelector("#signinButton"); // 회원가입 버튼
const idDuplicateButton = document.querySelector("#idDuplicateButton"); // 아이디 중복체크 버튼
let idValidation = false; // 아이디 중복체크 통과상태

// 회원가입 유효성 검사
const regexCheck = () => {
  const userId = userIdInput.value;
  const userPwd = userPwdInput.value;
  const userPwdChk = userPwdChkInput.value;
  const userName = userNameInput.value;
  const userEmail = emailIdInput.value;
  const userTel = userTelInput.value;

  // 유효성 체크
  const idCheck = validateRegex.id.test(userId);
  const pwdCheck = validateRegex.pw.test(userPwd);
  const pwdDoubleCheck = userPwd == userPwdChk;
  const emailCheck = validateRegex.email.test(userEmail);
  const telCheck = validateRegex.tel.test(userTel);

  if (userId == "") {
    alert("아이디를 입력해주세요.");
    userIdInput.focus();
    return;
  }
  if (!idCheck) {
    alert("아이디는 영소문자 및 숫자, 8자 이상 12자 이하로 입력해주세요.");
    userIdInput.focus();
    return;
  }

  // 아이디 중복체크
  if (!idValidation) {
    alert("아이디 중복확인이 필요합니다.");
    idDuplicateButton.focus();
    return;
  }

  // 유효성 검사
  if (!pwdCheck) {
    alert(
      "비밀번호는 최소 8자, 하나 이상의 대소문자와 숫자, 특수문자를 포함해야 합니다."
    );
    userPwdInput.focus();
    return;
  }
  if (!pwdDoubleCheck) {
    alert("비밀번호가 일치하지 않습니다.");
    userPwdChkInput.focus();
    return;
  }

  if (userName == "") {
    alert("이름을 입력해주세요.");
    userNameInput.focus();
    return;
  }

  if (userEmail == "") {
    alert("이메일을 입력해주세요.");
    emailIdInput.focus();
    return;
  }
  if (!emailCheck) {
    alert("올바른 이메일 형식이 아닙니다. 다시 확인해주세요.");
    emailIdInput.focus();
    return;
  }

  if (userTel == "") {
    alert("전화번호를 입력해주세요.");
    userTelInput.focus();
    return;
  }
  if (!telCheck) {
    alert("올바른 전화번호 형식이 아닙니다. 다시 확인해주세요.");
    userTelInput.focus();
    return;
  }

  // 회원가입 정보
  const registerInfo = {
    id: userId,
    pw: userPwd,
    name: userName,
    email: userEmail,
    phone: userTel,
  };

  postRegister(registerInfo);
  window.location.href = "/register/complete";
};

// 아이디창 데이터 변경 시
userIdInput.addEventListener("input", () => {
  idValidation = false; // 아이디 중복체크 통과상태 false로 변경
});

// 아이디 중복체크
const idDuplicateCheck = async () => {
  const userId = userIdInput.value;

  const idDupStatus = await getIdDupStatus(userId); // 아이디 중복 상태값 받아오기

  // 아이디 중복체크
  if (idDupStatus.data) {
    idValidation = true; // 아이디 중복체크 통과
    alert("사용 가능한 아이디입니다.");
  } else {
    idValidation = false;
    alert("사용 불가능한 아이디입니다.");
  }
};

// 아이디 중복체크 상태값 반환
async function getIdDupStatus(id) {
  // const API_URL = "http://kdt-sw-5-team03.elicecoding.com:3001/api/v1/auth/checkDupId";
  const API_URL = `${API_END_POINT}/auth/checkDupId`;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  });

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = res.json();

  return result;
}

// 회원가입 데이터 전송
async function postRegister(registerInfo) {
  const API_URL = `${API_END_POINT}/auth/register`;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(registerInfo),
  });

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }
  const result = await res.json();

  return result;
}

idDuplicateButton.addEventListener("click", idDuplicateCheck); // 중복체크 버튼
signinButton.addEventListener("click", regexCheck); // 회원가입 버튼
