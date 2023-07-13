import { makeTemplate } from "./common/template.js";
import { API_END_POINT, deliveryStatus } from "./../constants/index.js";
import g from "./common/common.js";

const API_URL = API_END_POINT;

let orderData = await getOrderInfo();
let order = orderData[0];

async function getOrderInfo() {
  const urlParams = new URLSearchParams(window.location.search);

  const res = await fetch(`${API_URL}/orders/${urlParams.get("id")}`, {
    credentials: "include",
  });

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;
    throw new Error(reason);
  }

  const result = await res.json();

  // 주문 완료한 상품 데이터들은 장바구니 목록에서 제거
  const baskets = JSON.parse(localStorage.getItem("baskets"));
  const products = result.data[0].items;
  const productIds = [];
  products.forEach((x) => {
    productIds.push(x.id);
  });
  localStorage.setItem(
    "baskets",
    JSON.stringify(baskets.filter((x) => !productIds.includes(x.id)))
  );

  // 주문 완료한 장바구니 데이터는 로컬스토리지 비우기
  window.localStorage.removeItem(urlParams.get("name"));

  return result.data;
}

function renderProduct() {
  return `
  <div class="block">
  <h4 class="widget-title">${g.formatDate(order.createdAt)}</h4>
  <p class="status">${deliveryStatus[order.status]}</p>
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
          ${renderItem(order.items)}
      </tbody>
  </table>
  <div class="footer text-right">
      <p class="total-price">배송비 : ${g.setParseStringAmount(
        order.itemTotal > 50000 ? 0 : 3000
      )}원</p>
      <p class="total-price">총액 : ${g.setParseStringAmount(
        order.itemTotal
      )}원</p>
      <div>
          <a href="/"
              class="btn btn-default cancelBtn" 
          >
              홈으로
          </a>
      </div>
  </div>
</div>

      
  `;
}

function renderItem(items) {
  let orders = "";

  items.forEach((item) => {
    orders += `
                <tr>
                  <td>
                      <img src="../assets/thumbnail/${item.categoryId}/${
      item.id
    }/${item.mainImage}" alt="제품사진" />
                  </td>
                  <td class="product-info">
                      <a href="#">${item.name}</a>
                      <p>[ 옵션: ${item.option} ]</p>
                  </td>
                  <td>${item.quantity}</td>
                  <td>${(item.quantity * item.price).toLocaleString(
                    "en"
                  )}원</td>
                </tr>
            `;
  });
  return orders;
}

// 마크업
let contentHead = `
    <!-- product list -->
    <section class="page-header">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="content">
                        <h1 class="page-name">주문완료</h1>
                        <ol class="breadcrumb">
                            <li><a href="#">Home</a></li>
                            <li class="active">주문완료</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </section>      
    `;

const body = document.querySelector("body");
makeTemplate(body, contentHead + renderProduct());
