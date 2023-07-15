import g from '../js/common/common.js';
import { makeTemplate } from "./common/template.js";
import { API_END_POINT, validateRegex } from "../constants/index.js";

/* 렌더링 로직 */
let orderId = null;

const body = document.querySelector('body');
init();

function render(orderData) {
    const { address, receiver, receiverPhone } = orderData;

    return `
        <main>
            <section class="signin-page account">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 col-md-offset-3">
                            <div class="block text-center">
                                <h2 class="text-center withdrawalBtn">주문 정보 수정</h2>
                                <form class="text-left clearfix">
                                    <div class="form-group">
                                        <input 
                                            name="name"
                                            type="text" 
                                            class="form-control" 
                                            value="${receiver}" 
                                            placeholder="수취인 이름을 입력해주세요." 
                                        />
                                    </div>
                                    <div class="form-group">
                                        <input 
                                            name="address"
                                            type="text" 
                                            class="form-control"  
                                            placeholder="배송받을 주소를 입력해주세요." 
                                            value="${address}"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <input 
                                            name="phoneNumber"
                                            type="text" 
                                            class="form-control"  
                                            placeholder="수취인의 전화번호를 입력해주세요." 
                                            value="${receiverPhone}"
                                        />
                                    </div>
                                    <div class="btns">
                                    <button 
                                        type="submit" 
                                        class="btn btn-main text-center" 
                                    >
                                        수정 완료
                                    </button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `;
}

/* 일반 함수 로직 */
async function init() {
    const params = new URLSearchParams(window.location.search);
    orderId = params.get('orderId');

    if (!orderId) {
        alert("잘못된 접근입니다.");
        g.redirectUserPage('/');
        return;
    }

    try {
        const response = await fetch(`${API_END_POINT}/orders`, { credentials: 'include' }).then(res => res.json());
        const orderData = response.data.find(item => item._id === orderId);

        if (!orderData) {
            throw new Error("해당 주문내역이 조회되지 않습니다.");
        }
        
        makeTemplate(body, render(orderData));

        const formElem = document.querySelector('form');
        formElem.addEventListener('submit', handleSubmit);
    } catch (error) {
        console.error(error);
        alert("에러가 발생했습니다.");
    }
}

async function updateOrder(newOrderData) {
    try {
        const response = await fetch(`${API_END_POINT}/orders/${orderId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(newOrderData)
        });

        if (!response.ok) {
            throw new Error("알 수 없는 에러가 발생하였습니다.");
        }

        alert("주문 정보가 정상적으로 변경되었습니다.");
        g.redirectUserPage('/order');
    } catch (error) {
        console.error(error);
        alert("알 수 없는 에러가 발생하였습니다.");
    }
}

function validateCheck(receiver, receiverPhone, address) {
    if (!receiver) {
        window.alert("수취인 이름을 입력해주세요.");
        return;
    }

    if (!address) {
        window.alert("배송받을 주소를 입력해주세요.");
        return;
    }
    
    if (!receiverPhone) {
        window.alert("수취인의 연락처를 입력해주세요.");
        return;
    }

    if (!validateRegex.tel.test(receiverPhone)) {
        window.alert("유효하지 않은 전화번호 형식입니다.");
        return;
    }

    return true;
}

function handleSubmit(event) {
    event.preventDefault();

    const shouldModify = window.confirm("주문을 수정하시겠습니까?");

    if (shouldModify) {
        const receiver = event.target.name.value;
        const receiverPhone = event.target.phoneNumber.value;
        const address = event.target.address.value;

        if (validateCheck(receiver, receiverPhone, address)) {
            const newOrderData = { receiver, receiverPhone, address, isOrderCancel: false };

            updateOrder(newOrderData);
        }
    }
}