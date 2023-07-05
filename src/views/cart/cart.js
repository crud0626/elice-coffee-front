// 상품 전체 선택 체크박스
document.addEventListener("DOMContentLoaded", function() {

    const selectAllHeaderCheckbox = document.getElementById("select-all-header");
    const productCheckboxes = document.querySelectorAll(".product-checkbox-input");
    
    selectAllHeaderCheckbox.addEventListener("change", function() {
    let isChecked = this.checked;
    
        for (let i = 0; i < productCheckboxes.length; i++) {
            productCheckboxes[i].checked = isChecked;
        }
    });
    
    // 선택 삭제 버튼
    const removeSelectedBtn = document.getElementById("remove-selected-btn");
    
    removeSelectedBtn.addEventListener("click", function() {
    let checkedProductCheckboxes = document.querySelectorAll(".product-checkbox-input:checked");
    
        if (checkedProductCheckboxes.length === 0) {
            alert("선택된 상품이 없습니다.");
        } else {
            checkedProductCheckboxes.forEach(function(checkbox) {
            let productItem = checkbox.closest(".product-item");
            productItem.remove();
            });
        }
    });
    
    // 선택 상품 주문 버튼
    const orderSelectedBtn = document.getElementById("order-selected-btn");
    
    orderSelectedBtn.addEventListener("click", function() {
    let checkedProductCheckboxes = document.querySelectorAll(".product-checkbox-input:checked");
    
        if (checkedProductCheckboxes.length === 0) {
            alert("선택된 상품이 없습니다.");
        } else {
            // 주문 처리 로직 작성
            
        }
    });
    
    // 전체 상품 주문 버튼
    const orderAllBtn = document.getElementById("order-all-btn");
    
    orderAllBtn.addEventListener("click", function() {
    let checkedProductCheckboxes = document.querySelectorAll(".product-checkbox-input:checked");
    
        if (checkedProductCheckboxes.length === 0) {
            alert("선택된 상품이 없습니다.");
        } else {
            // 주문 처리 로직 작성
            
        }
        // 주문 처리 로직 작성
    
    });

    // 수량이 0일 때 알림
    const quantityInput = document.querySelector(".product-option input[type='text']");
    
    quantityInput.addEventListener("change", function() {
    let quantity = parseInt(this.value);
    
        if (quantity === 0) {
            alert("수량은 1개 이상이어야 합니다.");
        }
    });
});

window.addEventListener('load', function () {
    // 상품 수량 변경 시 총 가격 업데이트
    function updateTotalPrice() {
      var productItems = document.querySelectorAll('.product-item');
      var totalAmount = 0;
      for (var i = 0; i < productItems.length; i++) {
        var quantity = parseInt(productItems[i].querySelector('input[type="text"]').value);
        var price = parseInt(productItems[i].querySelector('.price').innerText.replace(/[^0-9]/g, ''));
        var total = quantity * price;
        productItems[i].querySelector('.total-price').innerText = total.toLocaleString() + '원';
        totalAmount += total;
      }
      document.getElementById('total-amount').innerText = totalAmount.toLocaleString() + '원';
      updateShippingFee(totalAmount);
      updateTotalPriceWithShippingFee();
    }

  
    // 상품 수량 변경 
    function handleQuantityChange() {
      var quantityInputs = document.querySelectorAll('.product-item input[type="text"]');
      for (var i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener('input', function () {
          var quantity = parseInt(this.value);
          if (isNaN(quantity) || quantity < 0) {
            this.value = 1;
          }
          updateTotalPrice();
        });
      }
    }
    
  
    // 상품 수량 증가 버튼 클릭 
    function handleQuantityIncrement() {
      var incrementButtons = document.querySelectorAll('.product-item button:nth-child(3)');
      for (var i = 0; i < incrementButtons.length; i++) {
        incrementButtons[i].addEventListener('click', function () {
          var quantityInput = this.parentNode.querySelector('input[type="text"]');
          var quantity = parseInt(quantityInput.value);
          quantityInput.value = quantity + 1;
          updateTotalPrice();
        });
      }
    }
  
    // 상품 수량 감소 버튼 클릭 
    function handleQuantityDecrement() {
      var decrementButtons = document.querySelectorAll('.product-item button:nth-child(1)');
      for (var i = 0; i < decrementButtons.length; i++) {
        decrementButtons[i].addEventListener('click', function () {
          var quantityInput = this.parentNode.querySelector('input[type="text"]');
          var quantity = parseInt(quantityInput.value);
          if (quantity > 1) {
            quantityInput.value = quantity - 1;
            updateTotalPrice();
          }
        });
      }
    }
  
    // 배송비 업데이트
    function updateShippingFee(totalAmount) {
      var shippingFeeElement = document.getElementById('total-shipping-fee');
      var shippingFee = totalAmount >= 50000 ? 0 : 3000;
      shippingFeeElement.innerText = shippingFee.toLocaleString() + '원';
    }
  
    // 총 결제금액 업데이트 (상품금액 + 배송비)
    function updateTotalPriceWithShippingFee() {
      var totalAmountElement = document.getElementById('total-amount');
      var shippingFeeElement = document.getElementById('total-shipping-fee');
      var totalPriceElement = document.getElementById('total-price');
      var totalAmount = parseInt(totalAmountElement.innerText.replace(/[^0-9]/g, ''));
      var shippingFee = parseInt(shippingFeeElement.innerText.replace(/[^0-9]/g, ''));
      var totalPrice = totalAmount + shippingFee;
      totalPriceElement.innerText = totalPrice.toLocaleString() + '원';
    }

    // 페이지 로드 시 초기화
    updateTotalPrice();
    handleQuantityChange();
    handleQuantityIncrement();
    handleQuantityDecrement();
    
  });
  