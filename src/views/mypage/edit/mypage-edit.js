const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const formElem = document.querySelector('form');
const withdrawalBtn = document.querySelector('.withdrawalBtn');

// 변경할 비밀번호 테스트 완료 (aA123456789!!!!!)
const mockupPw = "1234";

async function fetchNewPassword(currentPassword) {
    // 임시
    return mockupPw === currentPassword;

    // try {
        // const response = await fetch('https', { method: 'PATCH' });

    //     if (response.ok) {
    //         return true;
    //     }

    //     throw new Error("비밀번호 재설정이 실패하였습니다. 다시 시도해주세요.");
    // } catch (error) {
    //     throw new Error(error);
    // }
}

async function validatePassword(currentPassword, newPassword, confirmNewPassword) {
    if (newPassword !== confirmNewPassword) {
        throw new Error("비밀번호 확인이 일치하지 않습니다.");
    }

    // 비밀번호가 정규식에 부합하는지
    if (!pwdRegex.test(newPassword)) {
        throw new Error("규칙에 맞지 않는 비밀번호입니다.");
    }

    // fetch
    if (!fetchNewPassword(currentPassword)) {
        // API 응답에 따라 조건 처리 필요할 수 있음. Ex) 현재 비밀번호가 맞지 않는 등
        alert();
        throw new Error("비밀번호 재설정에 실패하였습니다. 다시 시도해주세요.");
    }
}

formElem.addEventListener('submit', (event) => {
    event.preventDefault();

    const currentPassword = event.target.currentPassword.value;
    const newPassword = event.target.newPassword.value;
    const confirmNewPassword = event.target.confirmNewPassword.value;

    validatePassword(currentPassword, newPassword, confirmNewPassword)
    .then(() => {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        // 리다이렉트 처리 필요할 수 있음.
    })
    .catch((err) => {
        alert(err.message);
    });
});