import { API_END_POINT } from "/constants/index.js";
import { makeTemplate } from "/js/common/template.js";
import g from "/js/common/common.js";

const productId = window.location.pathname.split("/")[2]; // 마지막 pathname
const API_URL = `${API_END_POINT}/products/${productId}`;

fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    let result = data.data;

    const {
      categoryId,
      description,
      id,
      keyWord,
      name,
      mainImage,
      subImage,
      price,
      _id,
    } = result;

    const body = document.querySelector("body");
    makeTemplate(body, productContent(result));

    const modal = document.querySelector(".modal");
    const modalCancleButton = document.querySelector("#button-cancle");
    const moveToCartButton = document.querySelector("#button-move-to-cart");

    // 상품 옵션 선택시, 미리보기
    const productOption = document.querySelector("#product-option");
    productOption.addEventListener("change", function () {
      // 옵션 용량을 선택했을 때만 실행
      if (productOption.value !== "*") {
        const tbody = document.querySelector("tbody");
        tbody.insertAdjacentHTML("beforeend", addItem(result));

        // 이미 존재하면
        updateTotalPrice(price);
        quantityInput = document.querySelector("#option-count-input");
        quantityButton = document.querySelector(".option-count-button");
        quantityIncreaseButton = quantityButton.firstElementChild;
        quantityDecreaseButton = quantityButton.lastElementChild;
        quantityDeleteButton = document.querySelector("#delete-button");

        quantityIncreaseButton.addEventListener("click", function () {
          increaseQuantity(price);
        });
        quantityDecreaseButton.addEventListener("click", function () {
          decreaseQuantity(price);
        });
        quantityDeleteButton.addEventListener("click", function () {
          removeProduct(this);
        });
      }
    });

    // 장바구니에 담기
    const setCartButton =
      document.querySelector(".buy-button").firstElementChild;
    setCartButton.addEventListener("click", function () {
      const itemCount = document.querySelector("tr");

      // 선택한 옵션이 없을 경우
      if (itemCount === null) {
        alert("상품을 선택해주세요.");
        return;
      } else {
        const option =
          document.querySelector(".option-name").firstElementChild.textContent;
        const quantity = Number(
          document.querySelector(".option-count").firstElementChild.value
        );

        const cartItem = {
          categoryId: categoryId,
          id: id,
          description: description,
          keyWord: keyWord,
          name: name,
          mainImage: mainImage,
          subImage: subImage,
          option: option,
          price: price,
          quantity: quantity,
          check: false,
          _id: _id,
        };
        const baskets = JSON.parse(localStorage.getItem("baskets")) || []; // 로컬 장바구니 불러오기, 데이터 없으면 배열로 장바구니 생성.
        baskets.push(cartItem);
        localStorage.setItem("baskets", JSON.stringify(baskets));

        modal.style.display = "flex";
      }
    });

    // 모달창 닫기
    modalCancleButton.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // 장바구니로 바로 이동
    moveToCartButton.addEventListener("click", function () {
      modal.style.display = "none";
      location.href = "/cart";
    });

    // 바로구매
    const directPayButton =
      document.querySelector(".buy-button").lastElementChild;
    directPayButton.addEventListener("click", function () {
      if (productOption.value !== "*") {
        location.href = "/pay";
      } else {
        alert("상품을 선택해주세요.");
        return;
      }
    });
  });

let quantityInput = "";
let quantityButton = "";
let quantityIncreaseButton = "";
let quantityDecreaseButton = "";
let quantityDeleteButton = "";

// 상품정보
function productContent(data) {
  const {
    categoryId,
    id,
    description,
    keyWord,
    name,
    price,
    option,
    mainImage,
    subImage,
    _id,
  } = data;

  const mainImgSrc = `/assets/thumbnail/${categoryId}/${id}/${mainImage}`;
  const subImgSrc1 = `/assets/thumbnail/${categoryId}/${id}/${subImage[0]}`;
  const subImgSrc2 =
    `/assets/thumbnail/${categoryId}/${id}/${subImage[1]}` || "";
  let totalPrice = 0;

  let keyword = "";
  keyWord.forEach((e) => {
    keyword += `#${e}`;
  });

  return `
        <section class="single-product">
        <div class="container">

            <div class="product-info row mt-20">
                <!-- 사진 -->
                <div class="col-md-5">
                    <div class="single-product">
                        <div id='carousel-custom' class='carousel slide' data-ride='carousel'>
                            <div class='carousel-outer'>
                                <!-- me art lab slider -->
                                <div class='carousel-inner '>
                                    <div class='item active'>
                                        <img src='${mainImgSrc}'
                                            style="width: 100%; height: auto;" alt='' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 상품 정보 -->
                <div class="col-md-7">
                    <div class="buy-wrapper">
                        <div class="buy-scroll-box">
                            <h2 class="item_name">${name}</h2>
                            <p class="taste">
                                #${description}<br>
                                ${keyword}
                            </p>
                            <!-- 상품명 -->
                            <div style="border-top: 1px solid #ccc; padding-top: 10px;">
                                <div class="color displaynone"></div>
                            </div>
                            <div class="product-detail-list mb-4">
                                <dl>
                                    <dt>판매가</dt>
                                    <dd id="product-price">${g.setParseStringAmount(
                                      price
                                    )}원</dd>
                                </dl>
                                <dl>
                                    <dt>적립금</dt>
                                    <dd>${g.setParseStringAmount(
                                      price * 0.01
                                    )}원</dd>
                                </dl>
                                <dl>
                                    <dt>옵션<span>(필수)</span></dt>
                                    <dd>
                                        <select name="product-option-select" required="true" id="product-option">
                                            <option value="*" selected>-- 옵션을 선택해 주세요 --</option>
                                            <option value="**" disabled>-----------------------</option>
                                            <option value="**">${option}</option>
                                        </select>
                                    </dd>
                                </dl>
                            </div>

                            <div class="option-area">
                                <table>
                                    <colgroup>
                                        <col style="width: auto">
                                        <col style="width: 65px;">
                                        <col style="width: 85px;">
                                        <col style="width: 30px;">
                                    </colgroup>
                                    <tbody>
                                    </tbody>
                                    </table>
                                </div>
                                <div class="price-area">
                                    <dl class="total-amount">
                                        <dt>총 상품금액</dt>
                                        <dd>${totalPrice}원</dd>
                                    </dl>
                                </div>
                                <div class="buy-button">
                                    <button>장바구니</button>
                                    <button>바로구매</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div style="border-top: 1px solid #ccc; padding-top: 10px;">
                    <div class="color displaynone"></div>
                </div>

                <div class="row">
                    <div class="detail-container mt-20">
                        <a style="font-size: 30px; margin-top: 10%;">Details</a>
                        <div class="details-img">
                            <img src="${subImgSrc1}">
                            <img src="${subImgSrc2}">
                        </div>
                    </div>
                </div>

                <div class="modal">
                    <div class="modal-container">
                        <p>
                            <strong>상품이 장바구니에 담겼습니다.</strong><br>
                            </br>
                            바로 확인하시겠습니까?
                        </p>
               
                        <div class="modal-button">
                            <button id="button-cancle">취소</button>
                            <button id="button-move-to-cart">이동</button>
                        </div>
                    </div>
                </div>
        </section>
    `;
}

// 상품 담기
function addItem(data) {
  const { option, price } = data;

  return `
        <tr>
            <td class="option-name">
                <div>${option}</div>
            </td>
            <td>
                <div class="option-count">
                    <input type="text" size="1" value="1" id="option-count-input">
                    <span class="option-count-button">
                        <img src="https://img.echosting.cafe24.com/design/skin/default/product/btn_count_up.gif" alt="수량증가">
                        <img src="https://img.echosting.cafe24.com/design/skin/default/product/btn_count_down.gif" alt="수량감소">
                    </span>
                </div>
            </td>
            <td id="product-amount">${g.setParseStringAmount(price)}원</td>
            <td>
                <button id="delete-button">
                    <img src="https://cdn-pro-web-216-165.cdn-nhncommerce.com/xnshtr1333_godomall_com/data/skin/front/mo_designart_1/img/icon/shop_cart/ico_cart_del.png" alt="삭제">
                </button>
            </td>
        </tr>
    `;
}

// function modal() {
//     <div class="modal">
//         <div class="modal-container">
//             <h2>장바구니 담기</h2>
//             <button class="close-modal">닫기</button>
//             <div class="modal-content">
//                 <p>
//                     <strong>상품이 장바구니에 담겼습니다.</strong><br>
//                     </br>
//                     바로 확인하시겠습니까?
//                 </p>
//             </div>
//             <div class="modal-button">
//                 <button>취소</button>
//                 <button>확인</button>
//             </div>
//         </div>
//     </div>
// }

// 수량 및 옵션 선택에 따라 총 가격을 업데이트
function updateTotalPrice(price) {
  const quantity = document.querySelector("#option-count-input")
    ? document.querySelector("#option-count-input").value
    : 0;
  const productAmount = document.querySelector("#product-amount");
  const totalAmount = document.querySelector(".total-amount").lastElementChild;
  const totalPrice = quantity * price;
  if (productAmount && totalAmount) {
    productAmount.textContent = `${g.setParseStringAmount(totalPrice)}원`;
    totalAmount.textContent = `${g.setParseStringAmount(totalPrice)}원`;
  }

  return totalPrice;
}

// 수량 증가
function increaseQuantity(price) {
  const quantity = document.querySelector("#option-count-input");
  document.querySelector("#option-count-input").value = +quantity.value + 1;
  updateTotalPrice(price);
}

// 수량 감소
function decreaseQuantity(price) {
  const quantity = Number(document.querySelector("#option-count-input").value);
  if (quantity > 1) {
    document.querySelector("#option-count-input").value = quantity - 1;
    updateTotalPrice(price);
  } else {
    alert("최소 주문수량은 1개입니다.");
  }
}

// 상품 삭제
function removeProduct(t) {
  const tr = t.closest("tr");
  tr.remove();
  // 총 금액 수정
  updateTotalPrice(0);
  const totalAmount = document.querySelector(".total-amount");
  totalAmount.lastElementChild.textContent = "0원";
  // 옵션 selectbox 초기화 (선택하세요 문구)
  setSelectedOption("*");
}

// 바로 주문하기
function productSubmit() {
  const optionValue = document.getElementById("product-option").value;
  if (optionValue === "*") {
    alert("필수 옵션을 선택해주세요.");
  } else {
    // 주문 페이지로 이동..
  }
}

// 선택해주세요 문구를 선택하는 함수
function setSelectedOption(value) {
  for (const option of document.getElementById("product-option").options) {
    if (option.value === value) {
      option.selected = true;
    }
  }
}
