import { makeTemplate } from "./common/template.js";
import { API_END_POINT } from "../constants/index.js";
import g from "./common/common.js";

const API_URL = API_END_POINT;

// let cartData = {
//   _id: "64aed1b133874d54264a30b0",
//   id: "honduras-sanandres",
//   name: "온두라스 산안드레스",
//   categoryId: "country",
//   price: 4600,
//   keyWord: ["바디감", "달콤함"],
//   description:
//     "잘 구운 토스트의 고소함과 무화과향이 은은하게 감돌고 부드러운 목 넘김이 더없이 기분 좋은 순간",
//   mainImage: "honduras-sanandres.jpg",
//   subImage: ["section-1.jpg", "section-2.jpg"],
//   quantity: 1,
//   option: "200g",
// };

// let cartData2 = {
//   _id: "64aed1be33874d54264a30b2",
//   id: "elsalvador-apaneca",
//   name: "엘살바도르 아파네카",
//   categoryId: "country",
//   price: 4600,
//   keyWord: ["깔끔함", "복숭아"],
//   description: "부담없이 부드럽고 깔끔하게 즐길 수 있는 커피",
//   mainImage: "elsalvador-apaneca.jpg",
//   subImage: ["section-1.jpg", "section-2.jpg"],
//   quantity: 2,
//   option: "200g",
// };

// const samplebaskets = JSON.parse(localStorage.getItem("baskets")) || []; // 로컬 장바구니 불러오기, 데이터 없으면 배열로 장바구니 생성.
// samplebaskets.push(cartData);
// samplebaskets.push(cartData2);
// localStorage.setItem("baskets", JSON.stringify(samplebaskets));

const body = document.querySelector("body");
const baskets = JSON.parse(localStorage.getItem("baskets")); // 장바구니
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
