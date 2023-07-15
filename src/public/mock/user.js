/*
 * {
 *   id:string, 
 *   password: string, // 필요 X
 *   name: string, 
 *   email: string, 
 *   phoneNumber: string, 
 *   address: string, 
 *   profile: string
 *   role: String, // user || admin
 *   createDate: Date,
 *   wishList: Array,
 *   point: Number,
 *   rank: String, // bronze, silver, gold
 *   isActivated: Boolean, // 사용자 계정 사용 가능 여부
 * }
 */

export const userData = {
    id: "20231235", 
    name: "데이비드", 
    email: "abcd1234@gmail.com", 
    phoneNumber: "010-1234-5678", 
    address: "서울특별시 서초구 사당동 1213",
    profileSrc: "../assets/avater.jpg",
    role: "user",
    createDate: Date.now(),
    wishList: [],
    point: 300,
    rank: "bronze",
    isActivated: true
};