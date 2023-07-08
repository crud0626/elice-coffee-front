import { userData } from '../../../mock/user.js';
import { makeTemplate } from '../../common/template.js';

const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

function render(userData) {
    const { name, email, phoneNumber, address } = userData;

    return `
        <main>
            <section class="signin-page account">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 col-md-offset-3">
                            <div class="block text-center">
                                <h2 class="text-center withdrawalBtn">회원 정보 수정</h2>
                                <form id="editForm" class="text-left clearfix">
                                    <div class="form-group">
                                        <input 
                                            name="name"
                                            type="text" 
                                            class="form-control" 
                                            value="${name}" 
                                            disabled
                                        />
                                    </div>
                                    <div class="form-group">
                                        <input 
                                            name="email"
                                            type="email" 
                                            class="form-control"  
                                            placeholder="이메일을 입력해주세요." 
                                            value="${email}"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <input 
                                            name="address"
                                            type="text" 
                                            class="form-control"  
                                            placeholder="주소를 입력해주세요." 
                                            value="${address}"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <input 
                                            name="phoneNumber"
                                            type="text" 
                                            class="form-control"  
                                            placeholder="전화번호를 입력해주세요." 
                                            value="${phoneNumber}"
                                        />
                                    </div>
                                    <!-- password -->
                                    <div class="form-group">
                                        <input 
                                            name="currentPassword" 
                                            type="password" 
                                            class="form-control"  
                                            placeholder="현재 비밀번호"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <input 
                                            id="newPassword" 
                                            name="newPassword" 
                                            type="password" 
                                            class="form-control"  
                                            placeholder="새로운 비밀번호"
                                        />
                                        <span class="help-block small-block" aria-labelledby="newPassword">
                                            * 최소 8자리, 한개 이상의 대소문자, 숫자, 특수문자( !, @, #, $, %, &, *, ? )를 사용해야 합니다.
                                        </span>
                                    </div>
                                    <div class="form-group">
                                        <input 
                                            name="confirmNewPassword" 
                                            type="password" 
                                            class="form-control"  
                                            placeholder="새로운 비밀번호 확인"
                                        />
                                    </div>
                                </form>
                                <div class="btns">
                                    <button class="btn btn-main text-center delete">회원 탈퇴</button>
                                    <button 
                                        type="submit" 
                                        class="btn btn-main text-center" 
                                        form="editForm"
                                    >
                                        수정 완료
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `;
}

const body = document.querySelector('body');
makeTemplate(body, render(userData));

/* */

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