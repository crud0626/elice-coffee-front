import g from './common/common.js';
import { makeTemplate } from "./common/template.js";
import { deliveryStatus, API_END_POINT } from '../constants/index.js';

/* 렌더링 로직 */
const body = document.querySelector("body");
init();

const emptyPage = `
    <section class="empty-cart page-wrapper">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <div class="block text-center">
                        <h2 class="text-center">주문 내역이 없습니다.</h2>
                        <a href="/" class="btn btn-main mt-20">HOME</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

function renderProduct(item) {
    const { name, option, count, price, mainImage } = item;

    return `
        <tr>
            <td>
                <img src="${mainImage}" alt="제품사진" />
            </td>
            <td class="product-info">
                <a href="#">${name}</a>
                <p>[ 옵션: ${option.weight}g ]</p>
            </td>
            <td>${count}</td>
            <td>${price.toLocaleString('en')}원</td>
        </tr>
    `;
}

function renderOrder(orderData) {
    const { id, items, status, itemTotal, createdAt } = orderData;
    
    const totalPrice = g.setParseStringAmount(itemTotal);
    const displayDate = g.formatDate(createdAt);
    const canOrderChange = validateCancel("status") ? "" : "disabled";

    return `
        <div class="block">
            <h4 class="widget-title">${displayDate} (${id})</h4>
            <p class="status">${deliveryStatus[status]}</p>
            <table class="table">
                <colgroup>
                    <col style="width: 27px">
                    <col style="width: auto">
                    <col style="width: 75px">
                    <col style="width: 98px">
                </colgroup>
                <thead>
                    <tr>
                        <th></th>
                        <th>제품명</th>
                        <th>수량</th>
                        <th>결제 금액</th>
                    </tr>
                </thead>
                <tbody>
                    ${items.map((item) => renderProduct(item)).join("")}
                </tbody>
            </table>
            <div class="footer text-right">
                <p class="total-price">총액 : ${totalPrice}원</p>
                <div>
                    <a 
                        href="order/edit?orderId=${id}"
                        class="btn btn-default"
                        ${canOrderChange}
                    >
                        주문수정
                    </a>
                    <button 
                        class="btn btn-default cancelBtn" 
                        data-status="${status}"
                        ${canOrderChange}
                    >
                        주문취소
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderTable(orders) {
    return `
        <section class="user-dashboard page-wrapper">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="dashboard-wrapper user-dashboard">
                            <div class="table-responsive">
                                ${orders.map(order => renderOrder(order)).join("")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function render(orders) {
    const isEmptyOrder = orders.length === 0;

    return `
        <main>
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
            ${isEmptyOrder ? emptyPage : renderTable(orders)}
        </main>
    `;
}

/* 일반 함수 */
async function init() {
    try {
        const result = await fetch(`${API_END_POINT}/orders`, { credentials: "include" }).then(res => res.json());

        if (result.error !== null) {
            throw new Error(result.error);
        }
        
        makeTemplate(body, render(result.data));

        const cancelBtns = document.querySelectorAll('.cancelBtn');
        cancelBtns.forEach((btn) => btn.addEventListener('click', cancelOrder));
    } catch(err) {
        console.error(err);
        alert("데이터를 받아오던 중 에러가 발생했습니다.");
    }
}

function validateCancel(status) {
    const isCancelable = !(
        deliveryStatus[status] === "배송중" || 
        deliveryStatus[status] === "배송완료"
    );
    
    return isCancelable;
}

function cancelOrder(event) {
    const btn = event.target.closest(".cancelBtn");
    const orderStatus = btn.dataset.status;

    // shipping, deliveryComplete인 경우 alert
    if (!validateCancel(orderStatus)) {
        alert("이미 배송이 시작되어 주문 취소가 불가합니다.");
        return;
    }

    // 배송준비중
    if (deliveryStatus[orderStatus] === "배송준비중") {
        alert("상품을 준비중이어서 관리자의 승인 여부에 따라 취소가 불가할 수 있습니다.");
        return;
    }

    alert("주문이 취소되었습니다.");
}