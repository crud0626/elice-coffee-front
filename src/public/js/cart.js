// import g from "/common/common.js";

/**
{
    "_id": "64aa59be2fcdf059ffc9246d",
    "id": "costarica",
    "name": "costarica",
    "categoryId": "testcategoryId",
    "price": 14900,
    "keyword": [],
    "description": "desc",
    "mainImage": "costarica",
    "subImage": [
        "sub1111",
        "sub2222"
    ],
    "__v": 0
}
 */

let cartData = {
    _id: '64aa59be2fcdf059ffc9246d',
    name: "Brazil Cerrado",
    categoryId: "testcategoryId",
    price: 3400,
    keyword: [],
    description: "desc",
    mainImage: "../../assets/thumbnail/brazil-cerrado.jpg",
    subImage: [
        "sub1111",
        "sub2222"
    ],
    quantity: 1,
    option: '200g',
};

let cartData2 = {
    _id: '71aa59be2fcdf059ffc9246d',
    name: "Brazil Santos",
    categoryId: "testcategoryId2",
    price: 3200,
    keyword: [],
    description: "desc",
    mainImage: "../../assets/thumbnail/brazil-santos.jpg",
    subImage: [
        "sub1111",
        "sub2222"
    ],
    quantity: 1,
    option: '300g',
};

let cartData3 = {
    _id: '83aa59be2fcdf059ffc9246d',
    name: "colombia-supremo",
    categoryId: "testcategoryId3",
    price: 5500,
    keyword: [],
    description: "desc",
    mainImage: "../../assets/thumbnail/colombia-supremo.jpg",
    subImage: [
        "sub1111",
        "sub2222"
    ],
    quantity: 3,
    option: '400g',
};

// 장바구니 데이터 생성
// const baskets = JSON.parse(localStorage.getItem("baskets")) || [];      // 로컬 장바구니 불러오기, 데이터 없으면 배열로 장바구니 생성.
// baskets.push(cartData);
// localStorage.setItem("baskets", JSON.stringify(baskets));
// baskets.push(cartData2);
// localStorage.setItem("baskets", JSON.stringify(baskets));
// baskets.push(cartData3);
// localStorage.setItem("baskets", JSON.stringify(baskets));


const cartList = JSON.parse(localStorage.getItem("baskets")) || [];


const tbody = document.querySelector('tbody');                                  // 장바구니 리스트 tbody
const totalAmountElement = document.querySelector("#total-amount");             // 총 상품금액
const totalPaymentElement = document.querySelector("#total-payment");           // 총 결제금액
const totalShippingFeeElement = document.querySelector("#total-shipping-fee");  // 배송비
const selectAllHeaderElement = document.querySelector("#select-all-header");    // 최상위 체크박스
const removeSelectedButton = document.querySelector("#remove-selected-btn").firstElementChild;    // 선택삭제 버튼
const orderSelectedButton = document.querySelector("#order-selected-btn");      // 선택상품주문 버튼
const orderAllButton = document.querySelector("#order-all-btn");                // 전체상품주문 버튼

let totalAmount = 0;            // 총 상품금액
let totalPaymentAmount = 0;     // 총 결제 금액
let fee = 3000;                 // 배송비


// 상품금액 계산
function updateTotalPrice(quantity, price, priceAmount=0) {      // 수량, 가격
    
    if (priceAmount === 0) {                // 장바구니 로드 시, 결제금액 초기화
        totalAmount += quantity * price;     
    } 
        
    // 50000원 이상이면 배송비 무료.
    if (totalAmount >= 50000) {
        fee = 0;
    } else {
        fee = 3000;
        
    }
    
    totalPaymentAmount = totalAmount + fee;    // 총 결제금액
    
    // (총 상품금액, 배송비, 총 결제금액) 업데이트
    totalAmountElement.textContent = totalAmount.toLocaleString() +"원";
    totalShippingFeeElement.textContent = fee.toLocaleString() + "원";
    totalPaymentElement.textContent = totalPaymentAmount.toLocaleString() + "원";
}



// 장바구니 리스트 생성 함수
function cartItemCreate(cartItem) {
    const { _id, name, price, mainImage, quantity, option } = cartItem;

    const localePrice = price.toLocaleString() + "원";
    const localePriceAmount = (quantity * price).toLocaleString() + "원";
    const localFee = fee.toLocaleString() + "원"

    return `<tr>
                <td>
                    <input type="checkbox"  class="product-checkbox-input">
                </td>
                <td>
                    <a href="#">
                        <img class="cart-product-image" src=${ mainImage } alt="브라질 세라도">
                    </a>
                </td>
                <td class=cart-product-info>
                    <a href="#">${ name }</a>
                    <p>[ 옵션: ${ option } ]</p>
                </td>     
                <td>${ localePrice }</td>
                <td>
                    <div class="cart-count">
                        <input type="text" size="1" value="${ quantity }" id="cart-count-input">
                        <span class="cart-count-button">
                            <img src="	https://img.echosting.cafe24.com/design/skin/default/product/btn_count_up.gif" alt="수량증가">
                            <img src="https://img.echosting.cafe24.com/design/skin/default/product/btn_count_down.gif" alt="수량감소">
                        </span>
                    </div>
                </td>
                <td>${ localFee }</td>
                <td id="product-amount">${ localePriceAmount }</td>
            </tr>
            `;
}

// 장바구니 리스트 생성
cartList.forEach(cartItem => {
    const cartContent = cartItemCreate(cartItem);

    tbody.insertAdjacentHTML('beforeend', cartContent);
    updateTotalPrice(cartItem.quantity, cartItem.price);
})

// 장바구니 수량 조절
const productQuantityList = document.querySelectorAll('#cart-count-input');     // 수량 input
productQuantityList.forEach(quantity => {
    let quantityButton = quantity.nextElementSibling;                           // 수량 조절 버튼
    let productNameElement = quantity.parentElement.parentElement.previousElementSibling.previousElementSibling;    // 상품 이름


    // 수량증가 버튼 이벤트
    quantityButton.firstElementChild.addEventListener('click', function() {     
        changeQuantity(findCartIndex(productNameElement), undefined, "plus");       // index, quantity, calc
    });

    // 수량감소 버튼 이벤트
    quantityButton.lastElementChild.addEventListener('click', function() {      
        if (quantity.value > 1) {
            changeQuantity(findCartIndex(productNameElement), undefined, "minus");  // index, quantity, calc
        }
    })

    // 수량 input 값 바뀔 때
    quantity.addEventListener('change', function() {
        // 수량이 0 이하이면 alert
        if (quantity.value < 1) {
            alert('최소 수량은 1개입니다.');
            return;
        }

        changeQuantity(findCartIndex(productNameElement), quantity.value);
    })

});  

// 조건에 맞는 장바구니 인덱스 찾기
function findCartIndex(data) {
    const productName = data.firstElementChild.textContent;     // 인자의 상품명
    const findItemIndex = cartList.findIndex( cartItem => cartItem.name === productName);       // 일치하는 상품명의 인덱스값
    
    if (findItemIndex !== -1) {     // 조건에 맞으면 인덱스값 반환
        return findItemIndex;
    }
}

// 장바구니 수량 변경 (버튼으로 수량 조절시, quantity의 인자로 undefined 줘야함). 
function changeQuantity(index, quantity, calc) {                         // 수정할 객체 index, 변경할 수량, 계산타입 
    const cartList = JSON.parse(localStorage.getItem("baskets"));        // localStorage 배열 불러오기
    const cartItem = cartList[index];                                    // localStorage에서 수량 증가시킬 객체
    
    if (quantity == undefined) {           // 인자로 수량이 안 들어온 경우
        if(calc == "plus") {
            cartItem.quantity++;
        } else if (calc == "minus") {
            cartItem.quantity--;
        }
    } else {
        cartItem.quantity = quantity;
    }

    cartList[index] = cartItem;                                 // 장바구니 배열에 수정한 객체 반영
    localStorage.removeItem("baskets");                         // 장바구니 삭제
    localStorage.setItem("baskets", JSON.stringify(cartList));  // 수정한 장바구니 저장
    location.reload();                                          // 새로고침
}


// 체크박스
const productCheckboxes = document.querySelectorAll(".product-checkbox-input"); 

// 체크박스 - 전체 선택
selectAllHeaderElement.addEventListener("change", function () {
    const isChecked = selectAllHeaderElement.checked;

    productCheckboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
    });
});

// 체크박스 - 일부 선택시 전체 선택 해제
productCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
        const areAllProductsChecked = Array.from(productCheckboxes).every((checkbox) => checkbox.checked);
        selectAllHeaderElement.checked = areAllProductsChecked;
    });
});


// 선택 삭제 버튼
removeSelectedButton.addEventListener("click", function () {
    const productCheckboxes = document.querySelectorAll(".product-checkbox-input");     // 체크박스 배열
    const checkboxStatus = [];                      // 체크박스 상태 배열
    let checkCount = 0;                             // 체크된 수 카운트

    productCheckboxes.forEach(checkbox => {         
        checkboxStatus.push(checkbox.checked);      
        
        if (checkbox.checked) {
            checkCount++;
        }
    })

    // 체크된 체크박스가 없는데 선택삭제 버튼을 누를 경우
    if (checkCount === 0) {
        alert("선택된 상품이 없습니다.");

    } else {    // 선택된 상품 삭제
        const cartList = JSON.parse(localStorage.getItem("baskets"));
        let newCartList = [];

        checkboxStatus.forEach((checkStatus, index) => {
            if (!checkStatus) {
                newCartList.push(cartList[index]);                          // 장바구니 배열에서 삭제하지 않을 객체
            }
            localStorage.removeItem("baskets");                             // 장바구니 삭제
            localStorage.setItem("baskets", JSON.stringify(newCartList));   // 수정한 장바구니 저장
            location.reload();                                              // 새로고침
        })
    
    }
});


// 선택 주문 버튼
orderSelectedButton.addEventListener("click", function () {
    const productCheckboxes = document.querySelectorAll(".product-checkbox-input");     // 체크박스 배열
    const checkboxStatus = [];                      // 체크박스 상태 배열
    let checkCount = 0;                             // 체크된 수 카운트

    productCheckboxes.forEach(checkbox => {         
        checkboxStatus.push(checkbox.checked);      
        
        if (checkbox.checked) {
            checkCount++;
        }
    })

    // 체크된 체크박스가 없는데 선택삭제 버튼을 누를 경우
    if (checkCount === 0) {
        alert("선택된 상품이 없습니다.");

    } else {
    // 결제 페이지로 이동
    }
});

// 전체 주문 버튼
orderAllButton.addEventListener("click", function () {
    const selectedProducts = cartList.filter((product) => product.checked);
    if (selectedProducts.length === 0) {
        return;
    }
    // 주문 처리 로직 작성
});
