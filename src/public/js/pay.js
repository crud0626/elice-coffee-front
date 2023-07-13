import { makeTemplate } from "./common/template.js";
import { API_END_POINT } from "../constants/index.js";
import g from "./common/common.js";

const API_URL = API_END_POINT;

const body = document.querySelector("body");
const urlParams = new URLSearchParams(window.location.search);
const directFlag = urlParams.get("direct");
// 바로 결제 / 장바구니에서 결제 분기
const baskets = !!directFlag
  ? JSON.parse(localStorage.getItem("directPay"))
  : JSON.parse(localStorage.getItem("checkedCartList")); // 장바구니
let totalPrice = 0; // 총 주문 금액 저장

const user = await getUserInfo();

async function getUserInfo() {
  const res = await fetch(`${API_URL}/auth`, {
    credentials: "include",
  });

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;
    throw new Error(reason);
  }

  const result = await res.json();

  return result.data;
}

// section 영역을 렌더링 한다.
const renderSection = () => {
  return `
    <section class="page-header">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="content">
                        <h1 class="page-name">Checkout</h1>
                        <ol class="breadcrumb">
                            <li><a href="/">Home</a></li>
                            <li class="active">Checkout</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </section>
            `;
};

// body 부분
const render = () => {
  let content = `
                ${renderSection()}
                <div class="page-wrapper">
                    <div class="checkout shopping">
                        <div class="container">
                            <div class="row pay-wrap">
                                <div class="col-md-8">
                                    <div class="block">
                                        <h4 class="widget-title">구매자 정보</h4>
                                        <form class="checkout-form">
                                            <div class="form-group">
                                                <label for="orderName">이름</label>
                                                <input type="text" class="form-control" value="${
                                                  user.name
                                                }" placeholder="" disabled>
                                            </div>
                                            <div class="form-group">
                                                <label for="orderEamil">이메일</label>
                                                <input type="text" class="form-control" value="${
                                                  user.email
                                                }" placeholder="" disabled>
                                            </div>
                                            <div class="form-group">
                                                <label for="orderPhone">연락처</label>
                                                <input type="text" class="form-control" value="${
                                                  user.phone
                                                }" placeholder="" disabled>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="block">
                                        <h4 class="widget-title">받는자 정보</h4>
                                        <form class="checkout-form">
                                            <div class="form-group">
                                                <label for="receiverName">이름</label>
                                                <input type="text" class="form-control" name="receiverName" placeholder="">
                                            </div>
                                            <div class="form-group">
                                                <label for="receiverAddress">배송지 주소</label>
                                                <input type="text" class="form-control" name="receiverAddress" placeholder="">
                                            </div>
                                            <div class="form-group">
                                                <label for="receiverPhone">연락처</label>
                                                <input type="text" class="form-control" name="receiverPhone" placeholder="">
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="row pay-wrap">
                                <div class="col-md-8">
                                    <div class="block">
                                        <h4 class="widget-title">상품 정보</h4>
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
                    `;
  baskets.forEach((basket) => {
    content += `
    
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <img src="../assets/thumbnail/${
                                                          basket.categoryId
                                                        }/${basket.id}/${
      basket.mainImage
    }" alt="제품사진" />
                                                    </td>
                                                    <td>${basket.name}</td>
                                                    <td>${basket.quantity}</td>
                                                    <td>${g.setParseStringAmount(
                                                      basket.quantity *
                                                        basket.price
                                                    )}</td>
                                                </tr>
                                            </tbody>
            
                `;
    totalPrice += basket.quantity * basket.price;
  });
  let fee = 3000;
  if (totalPrice > 50000) {
    fee = 0;
  } else {
    totalPrice += fee;
  }
  content += `
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="footer text-right">
                                <p class="total-price">배송비 : ${fee}원</p>
                                <p class="total-price">총액 : {totalPrice}원</p>
                            <div>
                                <button type="button" class="btn btn-main text-center" id="submitBtn">주문하기</button>
                            </div>
                        </div>
                    </div>
                </div>
  `;
  content = content.replace("{totalPrice}", g.setParseStringAmount(totalPrice));
  return content;
};

makeTemplate(body, render());

const forms = document.querySelectorAll("form");
const submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  // Get the input elements
  const [_, receiver] = forms;
  // 상품 장바구니 담을 변수
  const items = baskets;

  const receiverName = receiver.querySelector("[name=receiverName]").value;
  const receiverAddress = receiver.querySelector(
    "[name=receiverAddress]"
  ).value;
  const receiverPhone = receiver.querySelector("[name=receiverPhone]").value;
  const orderData = {
    items: items,
    itemTotal: totalPrice,
    userId: user.id,
    address: receiverAddress,
    receiver: receiverName,
    receiverPhone: receiverPhone,
  };

  let postResult = await postOrder(orderData);
  // 주문완료시 페이지 이동 필요
  if (!postResult.error) {
    g.redirectUserPage(`/pay/complete?id=${postResult.data._id}`);
  }
  throw new Error(postResult.error);
});

async function postOrder(orderData) {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(orderData),
  });

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = await res.json();

  return result;
}
