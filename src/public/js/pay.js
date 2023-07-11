import { orderData } from "../mock/order.js";
import { makeTemplate } from "./common/template.js";
import g from "./common/common.js";

// const API_URL = "http://kdt-sw-5-team03.elicecoding.com:3001/api/v1/auth/login";
const API_URL = "http://localhost:3001/api/v1";

const body = document.querySelector("body");
const dt = new Date();

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
  //   const { name, email, phoneNumber } = getUserInfo();
  return `
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
                                            <input type="text" class="form-control" name="orderName" placeholder="">
                                        </div>
                                        <div class="form-group">
                                            <label for="orderEamil">이메일</label>
                                            <input type="text" class="form-control" name="orderEamil" placeholder="">
                                        </div>
                                        <div class="form-group">
                                            <label for="orderPhone">연락처</label>
                                            <input type="text" class="form-control" name="orderPhone" placeholder="">
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
                                            <input type="text" class="form-control" id="receiverAddress" placeholder="">
                                        </div>
                                        <div class="form-group">
                                            <label for="receiverPhone">연락처</label>
                                            <input type="text" class="form-control" id="receiverPhone" placeholder="">
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
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img src="../../../assets/thumbnail/brazil-cerrado.jpg" alt="제품사진" />
                                                </td>
                                                <td>나이키</td>
                                                <td>3</td>
                                                <td>150원</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="footer text-right">
                                        <p class="total-price">총액 : totalPrice원</p>
                                        <div>
                                            <button type="button" class="btn btn-main text-center" id="submitBtn">주문하기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
         `;
};

const getUserInfo = () => {
  fetch(`${API_URL}/auth`, {
      credentials: 'include'
  })
    .then((res) => res.json())
    .then((data) => {
      let result = data;
      console.log(result);
    });
};

getUserInfo();

makeTemplate(body, render());

const forms = document.querySelectorAll("form");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  // Get the input elements
  const [order, receiver] = forms;

  // Get the value of the input with the name "asdf"
  const orderName = order.querySelector("[name=orderName]").value;
  const orderEmail = order.querySelector("[name=orderEmail]").value;
  const orderPhone = order.querySelector("[name=orderPhone]").value;

  const receiverName = receiver.querySelector("[name=receiverName]").value;
  const receiverAddress = receiver.querySelector(
    "[name=receiverAddress]"
  ).value;
  const receiverPhone = receiver.querySelector("[name=receiverPhone]").value;
});
