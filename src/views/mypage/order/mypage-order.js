/**
 * 배송 상태에 대한 응답값은 아래와 같다고 가정
 * 결제완료: payComplete
 * 상품준비중: preparing
 * 배송중: shipping
 * 배송완료: deliveryComplete
 */

function validateCancel(status) {
    const isCancelable = !(status === "shipping" || status === "deliveryComplete");
    
    return isCancelable;
}

function cancelOrder() {
    // 데모
    const product = {
        id: 1,
        status: "shipping"
    }

    // shipping, deliveryComplete인 경우 alert
    if (!validateCancel(product.status)) {
        alert("이미 배송이 시작되어 주문 취소가 불가합니다.");
        return;
    }

    // preparing
    if (product.status === "preparing") {
        alert("상품을 준비중이어서 관리자의 승인 여부에 따라 취소가 불가할 수 있습니다.");
        return;
    }

    alert("주문이 취소되었습니다.");
}

// 테스트용
const cancelBtns = document.querySelectorAll('.cancelBtn');
cancelBtns.forEach((btn) => btn.addEventListener('click', cancelOrder));

// 테스트 코드
// console.log(validateCancel("shipping")); // false
// console.log(validateCancel("preparing")); // true