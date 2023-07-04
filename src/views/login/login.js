document.getElementById('submitButton').addEventListener('click', function (event) {
  event.preventDefault(); // 폼의 기본 동작인 페이지 새로고침을 방지합니다.

  // 이메일과 비밀번호 입력란의 값을 가져옵니다.
  var userId = document.querySelector('#idInput').value;
  var password = document.querySelector('#passwordInput').value;

  // 아이디, 비밀번호, 이메일, 전화번호의 정규표현식을 설정
  const idRegex = /^[a-z0-9]{8,12}$/;
  // 아이디 : 영소문자 및 숫자만 포함. (8~12자)
  const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  // 패스워드 : 최소 8자, 하나 이상의 대소문자 및 하나의 숫자, 하나의 특수문자

  // 입력 값이 조건에 맞지 않을 경우(공백) 사용자에게 알려준다.
  if (userId.trim().length === 0) {
    alert('아이디를 입력해주세요.');
    return;
  }

  if (password.trim().length === 0) {
    alert('비밀번호를 입력해주세요.');
    return;
  }

  // 엔터키를 눌러도 로그인이 가능하게 한다.
  document.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      login();
    }
  });

  // 입력 값이 조건에 맞을 경우, 로그인 처리를 진행합니다.
  // 로그인 처리를 완료한 후 메인 페이지로 이동합니다.
  window.location.href = 'home.html';
});
