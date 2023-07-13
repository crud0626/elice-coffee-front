import g from '../js/common/common.js';
import { validateRegex, API_END_POINT } from "../constants/index.js";
import { makeTemplate } from "./common/template.js";

/* 렌더링 로직 */
const body = document.querySelector('body');
init();

function render(userData) {
    const { name, email, phone } = userData;

    return `
        <main>
            <section class="signin-page account">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 col-md-offset-3">
                            <div class="block text-center">
                                <h2 class="text-center">회원 정보 수정</h2>
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
                                            name="phone"
                                            type="text" 
                                            class="form-control"  
                                            placeholder="전화번호를 입력해주세요." 
                                            value="${phone}"
                                        />
                                    </div>
                                    <!-- password -->
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
                                    <button 
                                        id="withdrawalBtn" 
                                        class="btn btn-main text-center delete"
                                    >
                                        회원 탈퇴
                                    </button>
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

/* 일반 함수 */
async function init() {
    try {
        const res = await fetch(`${API_END_POINT}/auth`, { credentials: "include" });

        if (!res.ok) {
            throw new Error(result.error);
        }
        
        const { data } = await res.json();
        makeTemplate(body, render(data));

        const formElem = document.querySelector('form');
        formElem.addEventListener('submit', handleSubmit);

        const withdrawalBtn = document.querySelector('#withdrawalBtn');
        console.log(withdrawalBtn);
        withdrawalBtn.addEventListener('click', handleWithdrawal);
    } catch(err) {
        console.error(err);
        alert("데이터를 받아오던 중 에러가 발생했습니다.");
    }
}

function validatePassword(newPassword, confirmNewPassword) {
    if (!newPassword) {
        throw new Error("새로운 비밀번호를 입력해주세요.");
    }

    if (newPassword !== confirmNewPassword) {
        throw new Error("비밀번호 확인이 일치하지 않습니다.");
    }

    if (!validateRegex.pw.test(newPassword)) {
        throw new Error("규칙에 맞지 않는 비밀번호입니다.");
    }

    return true;
}

function updateUserInfo(userInfo) {
    return fetch(`${API_END_POINT}/auth/me`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(userInfo)
    });
}

/* 이벤트 핸들러 */
async function handleSubmit(event) {
    event.preventDefault();
    
    const email = event.target.email.value;
    const address = event.target.address.value;
    const phone = event.target.phone.value;
    const newPassword = event.target.newPassword.value;
    const confirmNewPassword = event.target.confirmNewPassword.value;

    try {
        const newUserInfo = { email, address, phone };

        if (newPassword || confirmNewPassword) {
            const isValid = validatePassword(newPassword, confirmNewPassword);

            if (isValid) {
                newUserInfo['newPw'] = confirmNewPassword;
            }
        }

        const result = await updateUserInfo(newUserInfo).then(res => res.json());
        
        if (result.error === null) {
            alert("정보가 성공적으로 변경되었습니다.");
            g.redirectUserPage('/mypage');
            return;
        }

        throw new Error("알 수 없는 에러가 발생했습니다.");
    } catch (error) {
        alert(error.message);
    }
}

async function handleWithdrawal() {
    const shouldWithdrawal = window.confirm("회원 탈퇴를 진행하시겠습니까?");

    if (!shouldWithdrawal) {
        return;
    }

    try {
        const res = await fetch(`${API_END_POINT}/auth/withdrawal`, {
            method: "PUT",
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error("알 수 없는 에러가 발생했습니다.");
        }

        alert("회원 탈퇴 신청이 완료되었습니다.\n이용해주셔서 감사합니다.");
        g.redirectUserPage('/');
    } catch (error) {
        console.error(error);
        alert("에러가 발생했습니다.");
    }
}