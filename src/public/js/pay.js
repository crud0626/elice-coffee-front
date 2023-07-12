import { makeTemplate } from "./common/template.js";
import g from "./common/common.js";

const API_URL = "http://localhost:3001/api/v1";

const body = document.querySelector("body");
const baskets = JSON.parse(localStorage.getItem("baskets"));

const user = await getUserInfo();
async function getUserInfo() {
  const apiUrl = "http://localhost:3001/api/v1";
  const res = await fetch(`${apiUrl}/auth`, {
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

const render = () => {
  let totalPrice = 0;
  let content = `${renderSection()}
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
                                                        <img src="../${
                                                          basket.mainImage
                                                        }" alt="제품사진" />
                                                    </td>
                                                    <td>${basket.name}</td>
                                                    <td>${basket.quantity}</td>
                                                    <td>${
                                                      +basket.quantity *
                                                      +basket.price
                                                    }</td>
                                                </tr>
                                            </tbody>
            
                `;
    totalPrice += +basket.quantity * +basket.price;
  });
  content += `
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="footer text-right">
                                <p class="total-price">총액 : {totalPrice}원</p>
                            <div>
                                <button type="button" class="btn btn-main text-center" id="submitBtn">주문하기</button>
                            </div>
                        </div>
                    </div>
                </div>
  `;
  content = content.replace("{totalPrice}", totalPrice);
  return content;
};

makeTemplate(body, render());

const forms = document.querySelectorAll("form");
const submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  // Get the input elements
  const [_, receiver] = forms;
  // 상품 장바구니 담을거
  const items = baskets;

  const receiverName = receiver.querySelector("[name=receiverName]").value;
  const receiverAddress = receiver.querySelector(
    "[name=receiverAddress]"
  ).value;
  const receiverPhone = receiver.querySelector("[name=receiverPhone]").value;
  const orderData = {
    items: items,
    itemTotal: 83423,
    userId: user.id,
    address: receiverAddress,
    receiver: receiverName,
    receiverPhone: receiverPhone,
  };

  let a = await postOrder(orderData);
});

async function postOrder(orderData) {
  const apiUrl = "http://localhost:3001/api/v1";
  const bodyData = JSON.stringify(orderData);

  const res = await fetch(`${apiUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: bodyData,
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
