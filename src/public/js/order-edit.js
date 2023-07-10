import { makeTemplate } from "./common/template.js";
import { orderData } from "../mock/order.js";

const API_END_POINT = "localhost:3000/api/v1/orders";
const body = document.querySelector('body');

/* Mock 데이터로 구현중 */
function render(orderData) {
    const { orderAddress, receiver, receiverPhone } = orderData;

    return `
        <main>
            <section class="signin-page account">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 col-md-offset-3">
                            <div class="block text-center">
                                <h2 class="text-center withdrawalBtn">주문 정보 수정</h2>
                                <form id="editForm" class="text-left clearfix">
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
                                            value="${orderAddress}"
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
                                </form>
                                <div class="btns">
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

// 이벤트 리스너
function postOrderInfo(newOrderData) {
    /**
     * fetch로직으로 변경 필요
     * fetch(`${API_END_POINT}`, {
     *   method: "POST",
     *   body: JSON.stringify(newOrderData)
     * })
     */
    alert("주문 정보가 정상적으로 변경되었습니다.");
    
    /* 추후 변경 */
    window.location.href = `${window.location.origin}/mypage/order`;
}

/* fetch 로직으로 변경 필요 */
function getOrder() {
    const orderId = window.location.pathname.split("/").pop();

    if (!orderId) {
        window.location.href = window.location.origin;
        return;
    }

    // const data = fetch(`${API_END_POINT}/orders/${orderId}`).then(res => res.json());
    // if (data) {

    // }
    makeTemplate(body, render(orderData));
}

getOrder();

const formElem = document.querySelector('form');

formElem.addEventListener('submit', (event) => {
    event.preventDefault();

    const shouldModify = window.confirm("주문을 수정하시겠습니까?");

    if (shouldModify) {
        const receiver = event.target.name.value;
        const receiverPhone = event.target.phoneNumber.value;
        const orderAddress = event.target.address.value;
        
        const newOrderData = { receiver, receiverPhone, orderAddress };

        postOrderInfo(newOrderData);
    }
});