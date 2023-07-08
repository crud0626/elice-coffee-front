let products = [
    {
        id: 1,
        checked: false,
        name: "Brazil Cerrado",
        option: "200g",
        price: 3400,
        imageSrc: "../../assets/thumbnail/brazil-cerrado.jpg",
        fee: 3000,
        quantity: 1,
    },
    {
        id: 2,
        checked: false,
        name: "Brazil Santos",
        option: "200g",
        price: 3200,
        imageSrc: "../../assets/thumbnail/brazil-santos.jpg",
        fee: 3000,
        quantity: 1,
    },
    // 추가 상품 데이터...
];

const cartProductsContainer = document.getElementById("cart-products");
const totalAmountElement = document.getElementById("total-amount");
const totalShippingFeeElement = document.getElementById("total-shipping-fee");
const totalPriceElement = document.getElementById("total-price");
const selectAllHeaderElement = document.getElementById("select-all-header");
const removeSelectedButton = document.getElementById("remove-selected-btn");
const orderSelectedButton = document.getElementById("order-selected-btn");
const orderAllButton = document.getElementById("order-all-btn");

// 상품 생성 함수
function createProductElement(product) {
    const productElement = document.createElement("div");
    productElement.classList.add("cart-product");

    const checkboxElement = document.createElement("span");
    checkboxElement.classList.add("checkbox");

    const inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.classList.add("product-checkbox-input");
    inputElement.checked = product.checked;

    inputElement.addEventListener("change", function () {
        product.checked = inputElement.checked;
        updateTotalPrice();
    });

    const productImageElement = document.createElement("img");
    productImageElement.src = product.imageSrc;
    productImageElement.alt = product.name;
    productImageElement.classList.add("cart-product-image");

    const productNameElement = document.createElement("span");
    productNameElement.textContent = product.name;

    const productOptionElement = document.createElement("div");
    productOptionElement.textContent = product.option;

    const productInfoElement = document.createElement("div");
    productInfoElement.classList.add("cart-product-info");
    productInfoElement.appendChild(productNameElement);
    productInfoElement.appendChild(productOptionElement);

    const productCountElement = document.createElement("div");
    productCountElement.classList.add("cart-product-count");

    const quantityInputElement = document.createElement("input");
    quantityInputElement.type = "number";
    quantityInputElement.min = "1";
    quantityInputElement.value = product.quantity;
    quantityInputElement.addEventListener("input", function () {
        const quantity = parseInt(quantityInputElement.value);
        if (!isNaN(quantity)) {
            product.quantity = quantity;
            updateTotalPrice();
        } else {
            quantityInputElement.value = product.quantity;
        }
    });



    const decreaseQuantityButton = document.createElement("button");
    decreaseQuantityButton.textContent = "-";
    decreaseQuantityButton.addEventListener("click", function () {
        if (product.quantity > 1) {
            product.quantity--;
            quantityInputElement.value = product.quantity;
            updateTotalPrice();
        }
    });

    const increaseQuantityButton = document.createElement("button");
    increaseQuantityButton.textContent = "+";
    increaseQuantityButton.addEventListener("click", function () {
        product.quantity++;
        quantityInputElement.value = product.quantity;
        updateTotalPrice();
    });

    productCountElement.appendChild(decreaseQuantityButton);
    productCountElement.appendChild(quantityInputElement);
    productCountElement.appendChild(increaseQuantityButton);

    const productPriceElement = document.createElement("div");
    productPriceElement.classList.add("cart-product-price");
    productPriceElement.textContent = product.price.toLocaleString() + "원";

    const productFeeElement = document.createElement("div");
    productFeeElement.classList.add("cart-product-fee");
    productFeeElement.textContent = product.fee.toLocaleString() + "원";

    

    checkboxElement.appendChild(inputElement);
    productElement.appendChild(checkboxElement);
    productElement.appendChild(productImageElement);
    productElement.appendChild(productInfoElement);
    productElement.appendChild(productCountElement);
    productElement.appendChild(productPriceElement);
    productElement.appendChild(productFeeElement);

    return productElement;
}

// 상품 예시 추가 함수
products.forEach((product) => {
    const productElement = createProductElement(product);
    cartProductsContainer.appendChild(productElement);
});

// 총 결제금액 업데이트 (상품금액 + 배송비)
function updateTotalPrice() {
    let totalAmount = 0;
    let totalShippingFee = 0;
    let totalPrice = 0;
    let isQuantityZero = false; // 수량이 0인 상품 존재 여부를 확인하는 변수
  
    products.forEach((product) => {
      totalAmount += product.price * product.quantity;
  
      if (product.quantity === 0) {
        isQuantityZero = true;
      }
    });
  
    if (totalAmount >= 50000) {
      totalShippingFee = 0;
      products.forEach((product) => {
        product.fee = 0; 
      });
    } else {
      totalShippingFee = products.reduce((sum, product) => sum + product.fee, 0);
    }
  
    totalPrice = totalAmount + totalShippingFee;
  
    totalAmountElement.textContent = totalAmount.toLocaleString() + "원";
    totalShippingFeeElement.textContent = totalShippingFee.toLocaleString() + "원";
    totalPriceElement.textContent = totalPrice.toLocaleString() + "원";
  
    // 수량이 0인 상품이 존재하면 알림 메시지 출력
    if (isQuantityZero) {
      alert("수량은 1개 이상이어야 합니다.");
    }
}
  


// 전체 선택
selectAllHeaderElement.addEventListener("change", function () {
    const isChecked = selectAllHeaderElement.checked;
    products.forEach((product) => {
        product.checked = isChecked;
    });
    updateTotalPrice();

    const productCheckboxes = document.querySelectorAll(".product-checkbox-input");
    productCheckboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
    });
});

// 일부 선택시 전체 선택 해제
const productCheckboxes = document.querySelectorAll(".product-checkbox-input");
productCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
        const areAllProductsChecked = Array.from(productCheckboxes).every((checkbox) => checkbox.checked);
        selectAllHeaderElement.checked = areAllProductsChecked;
    });
});



// 선택 삭제 버튼
removeSelectedButton.addEventListener("click", function () {
    const selectedProducts = products.filter((product) => product.checked);
    if (selectedProducts.length === 0) {
        alert("선택된 상품이 없습니다.");
    } else {
    // 선택된 상품 삭제
    products = products.filter((product) => !product.checked);
    
    cartProductsContainer.innerHTML = "";
    products.forEach((product) => {
        const productElement = createProductElement(product);
        cartProductsContainer.appendChild(productElement);
    });
    updateTotalPrice();

    selectAllHeaderElement.checked = false;
    }
});

// 선택 주문 버튼
orderSelectedButton.addEventListener("click", function () {
    const selectedProducts = products.filter((product) => product.checked);
    if (selectedProducts.length === 0) {
        alert("선택된 상품이 없습니다.");
    } else {
    // 결제 페이지로 이동
    }
});

// 전체 주문 버튼
orderAllButton.addEventListener("click", function () {
    const selectedProducts = products.filter((product) => product.checked);
    if (selectedProducts.length === 0) {
        return;
    }
    // 주문 처리 로직 작성
});

// 페이지 로드 시 초기화
updateTotalPrice();