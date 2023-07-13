import { makeTemplate } from "./common/template.js";
import g from "./common/common.js";
import { API_END_POINT } from "../constants/index.js";
const API_URL = API_END_POINT;

const loginHTML = `
<section class="signin-page account">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <div class="block text-center">
                        <h2 class="text-center">WELCOME ☕️ Elice Coffee</h2>
                        <form id="form" class="text-left clearfix" action="index.html">
                            <div class="form-group">
                                <input type="text" id="idInput" class="form-control" placeholder="아이디">
                            </div>
                            <div class="form-group">
                                <input type="password" id="passwordInput" class="form-control"
                                    placeholder="비밀번호">
                            </div>
                            <div class="text-center">
                                <button type="submit" id="submitButton" class="btn btn-main text-center">LOGIN</button>
                            </div>
                        </form>
                        <p class="mt-20">처음 이신가요 ? <a href="/register"> 회원가입</a></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

const body = document.querySelector("body");
makeTemplate(body, loginHTML);

document
  .getElementById("submitButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // 이메일과 비밀번호 입력란의 값을 변수에 저장
    let userId = document.querySelector("#idInput").value;
    let userPw = document.querySelector("#passwordInput").value;

    // 입력 값이 조건에 맞지 않을 경우(공백) 사용자에게 알려주고 focus한다.
    if (userId.trim().length === 0) {
      alert("아이디를 입력해주세요.");
      document.querySelector("#idInput").focus();
      return false;
    }

    if (userPw.trim().length === 0) {
      alert("비밀번호를 입력해주세요.");
      document.querySelector("#passwordInput").focus();
      return false;
    }

    // 입력 값이 조건에 맞을 경우, 로그인 처리를 진행합니다.
    // 로그인 처리를 완료한 후 메인 페이지로 이동합니다.
    postLogin(userId, userPw);
  });

// 엔터키를 눌러도 로그인이 가능하게 한다.
let form = document.querySelector("#form");

form.addEventListener("submit", function (event) {
  if (event.key === 13) {
    event.preventDefault();
    document.getElementById("submitButton").click();
  }
});

async function postLogin(id, pw) {
  const res = await fetch(`${API_URL}/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    // mode: "cors",
    method: "POST",
    body: JSON.stringify({ id, pw }),
  });
  if (!res.ok) {
    const error = await res.json();
    alert(error.errorMessage);
    throw new Error(error.errorMessage);
  }
  const login = await res.json();

  if (login.data.isLogin) {
    g.redirectUserPage("/");
  }

  return;
}
