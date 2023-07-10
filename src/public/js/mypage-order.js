import { orderData } from '../mock/order.js';
import { makeTemplate } from "./common/template.js";

/* 공통으로 사용 할 예정 */
const orderStatus = {
  paid: "결제완료",
  preparing: "배송준비중",
  shipping: "배송중",
  delivered: "배송완료",
  pending: "취소대기중",
  canceled: "취소완료",
};

/* 렌더링 로직 */
function renderProduct() {
  return `
        <tr>
            <td>
                <img src="../../../assets/thumbnail/brazil-cerrado.jpg" alt="제품사진" />
            </td>
            <td>나이키</td>
            <td>3</td>
            <td>150원</td>
        </tr>
    `;
}

function renderOrder(orderData) {
  const { orderId, items, status, itemTotal, orderDate } = orderData;
  const totalPrice = itemTotal.toLocaleString();
  const displayDate = `${orderDate.getFullYear()}. ${
    orderDate.getMonth() + 1
  }. ${orderDate.getDay()}`;

  return `
        <div class="block">
            <h4 class="widget-title">${displayDate} (${orderId})</h4>
            <p class="status">${orderStatus[status]}</p>
            <table class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>제품명</th>
                        <th>수량</th>
                        <th>결제 금액</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${items.map((item) => renderProduct(item)).join("")}
                </tbody>
            </table>
            <div class="footer text-right">
                <p class="total-price">총액 : ${totalPrice}원</p>
                <div>
                    <a href="order.html" class="btn btn-default">주문수정</a>
                    <button class="btn btn-default cancelBtn" disabled>주문취소</button>
                </div>
            </div>
        </div>
    `;
}

function render(orderData) {
  return `
        <section class="page-header">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="content">
                            <h1 class="page-name">주문 목록</h1>
                            <ol class="breadcrumb">
                                <li><a href="index.html">Home</a></li>
                                <li class="active">주문 목록</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="user-dashboard page-wrapper">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="dashboard-wrapper user-dashboard">
                            <div class="table-responsive">
                                ${renderOrder(orderData)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

const body = document.querySelector("body");
makeTemplate(body, render(orderData));

/* 일반 함수 */

/**
 * 배송 상태에 대한 응답값은 아래와 같다고 가정
 * 결제완료: payComplete
 * 상품준비중: preparing
 * 배송중: shipping
 * 배송완료: deliveryComplete
 */

function validateCancel(status) {
    const isCancelable = !(status === "shipping" || status === "deliveryComplete");
    
    return isCancelable;
}

function cancelOrder() {
    // 데모
    const product = {
        id: 1,
        status: "shipping"
    }

    // shipping, deliveryComplete인 경우 alert
    if (!validateCancel(product.status)) {
        alert("이미 배송이 시작되어 주문 취소가 불가합니다.");
        return;
    }

    // preparing
    if (product.status === "preparing") {
        alert("상품을 준비중이어서 관리자의 승인 여부에 따라 취소가 불가할 수 있습니다.");
        return;
    }

    alert("주문이 취소되었습니다.");
}

// 테스트용
const cancelBtns = document.querySelectorAll('.cancelBtn');
cancelBtns.forEach((btn) => btn.addEventListener('click', cancelOrder));

// 테스트 코드
// console.log(validateCancel("shipping")); // false
// console.log(validateCancel("preparing")); // true