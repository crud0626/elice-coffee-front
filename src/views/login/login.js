import { makeTemplate } from '../common/template.js';
const section = document.querySelector('section');
makeTemplate(section);

document.getElementById('submitButton').addEventListener('click', function (event) {
  event.preventDefault();

  // 이메일과 비밀번호 입력란의 값을 변수에 저장
  let userId = document.querySelector('#idInput').value;
  let password = document.querySelector('#passwordInput').value;

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

  if (password.trim().length === 0) {
    alert('비밀번호를 입력해주세요.');
    document.querySelector('#passwordInput').focus();
    return false;
  }


  // 입력 값이 조건에 맞을 경우, 로그인 처리를 진행합니다.
  // 로그인 처리를 완료한 후 메인 페이지로 이동합니다.
  window.location.href = '/front-end/src/views/home/home.html';
});

// 엔터키를 눌러도 로그인이 가능하게 한다.
let form = document.querySelector('#form');

form.addEventListener('submit', function(event) {
  if (event.key === 13) {
    event.preventDefault();
    document.getElementById('submitButton').click();
  }
});
