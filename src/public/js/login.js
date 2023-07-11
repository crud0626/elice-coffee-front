import { makeTemplate } from './common/template.js';
import g from './common/common.js';

const loginHTML = `
<section class="signin-page account">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <div class="block text-center">
                        <a class="logo" href="index.html">
                            <img src="images/logo.png" alt="">
                        </a>
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
                        <p class="mt-20">처음 이신가요 ? <a href="../register/register.html"> 회원가입</a></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

const body = document.querySelector('body');
makeTemplate(body, loginHTML);

document.getElementById('submitButton').addEventListener('click', function (event) {
  event.preventDefault();

  // 이메일과 비밀번호 입력란의 값을 변수에 저장
  let userId = document.querySelector('#idInput').value;
  let userPw = document.querySelector('#passwordInput').value;

  // 아이디, 비밀번호 정규표현식을 설정
  const idRegex = /^[a-z0-9]{8,12}$/;
  // 아이디 : 영소문자 및 숫자만 포함. (8~12자)
  const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  // 패스워드 : 최소 8자, 하나 이상의 대소문자 및 하나의 숫자, 하나의 특수문자

  // 입력 값이 조건에 맞지 않을 경우(공백) 사용자에게 알려주고 focus한다.
  if (userId.trim().length === 0) {
    alert('아이디를 입력해주세요.');
    document.querySelector('#idInput').focus();
    return false;
  }

  if (userPw.trim().length === 0) {
    alert('비밀번호를 입력해주세요.');
    document.querySelector('#passwordInput').focus();
    return false;
  }

  postLogin(userId, userPw)
  // console.log(postLogin(userId, userPw));
  // 입력 값이 조건에 맞을 경우, 로그인 처리를 진행합니다.
  // 로그인 처리를 완료한 후 메인 페이지로 이동합니다.
  // window.location.href = '/front-end/src/views/home/home.html';
});

// 엔터키를 눌러도 로그인이 가능하게 한다.
let form = document.querySelector('#form');

form.addEventListener('submit', function(event) {
  if (event.key === 13) {
    event.preventDefault();
    document.getElementById('submitButton').click();
  }
});


// const API_URL = "http://kdt-sw-5-team03.elicecoding.com:3001/api/v1/auth/login";
const API_URL = "http://localhost:3001/api/v1/auth/login";

const postLogin = (id, pw) => {
  fetch(API_URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({id, pw}),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const { loginToken, msg, isLogin } = data.data;
      if(isLogin) {
        g.setCookie("loginToken", loginToken.token);
        g.redirectUserPage("/");
      }
      else {
        alert(msg);
      }
    });
}