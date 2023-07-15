// API
 const API_END_POINT = "http://kdt-sw-5-team03.elicecoding.com/api/v1"; // 배포 후 이 주소로 적용 예정
//const API_END_POINT = "http://localhost:3001/api/v1";

/**
 * ranks 
*/
const ranks = {
    "bronze": "브론즈",
	"silver": "실버",
    "gold": "골드"
}

const rankImg = {
    "bronze": '/assets/rank/bronze.png',
    "silver": '/assets/rank/silver.png',
    "gold": '/assets/rank/gold.png'
}

/* 배송 상태 */
const deliveryStatus = {
    "paid" : "결제완료",
    "preparing": "배송준비중",
    "shipping": "배송중",
    "delivered" : "배송완료",
    "pending" : "취소대기중",
    "canceled" : "취소완료",
}

/** 정규표현식 
 * ID, PW, 전화번호, 이메일 
 */
const validateRegex = {
    id: /^[a-z0-9]{8,12}$/,
    pw: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    email: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    tel: /^\d{3}-\d{3,4}-\d{4}$/
}

export {
    API_END_POINT,
    ranks,
    rankImg,
    deliveryStatus,
    validateRegex
};
