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
    if (!currentPassword) {
        throw new Error("현재 비밀번호를 입력해주세요.");
    }

    if (!newPassword) {
        throw new Error("새로운 비밀번호를 입력해주세요.");
    }

    // API에서 검증이 필요하기 때문에 추후 삭제해야 할 수도 있음.
    if (newPassword !== confirmNewPassword) {
        throw new Error("비밀번호 확인이 일치하지 않습니다.");
    }

    if (!pwdRegex.test(newPassword)) {
        throw new Error("규칙에 맞지 않는 비밀번호입니다.");
    }

    // 현재 비밀번호가 맞지 않음 or 비밀번호 변경 성공 처리
    if (!fetchNewPassword(currentPassword)) {
        // API 응답에 따라 조건 처리 필요할 수 있음. Ex) 현재 비밀번호가 맞지 않는 등
        throw new Error("비밀번호 재설정에 실패하였습니다. 다시 시도해주세요.");
    }
}

formElem.addEventListener('submit', (event) => {
    event.preventDefault();

    const currentPassword = event.target.currentPassword.value;
    const newPassword = event.target.newPassword.value;
    const confirmNewPassword = event.target.confirmNewPassword.value;

    if (!currentPassword && !newPassword) {
        return;
    }

    validatePassword(currentPassword, newPassword, confirmNewPassword)
    .then(() => {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        // 리다이렉트 처리 필요
    })
    .catch((err) => {
        alert(err.message);
    });
});