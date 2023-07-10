import { product, product2, product3 } from "./products.js";

/**
 * {
 *   orderId: string,
 *   items: [{
 *     productId: string,
 *     productName: string,
 *     productQuantity: number,
 *     price: number,
 *     option: {
 *       weight: number
 *     }
 *   }],
 *   userId: string,
 *   orderAddress: string,
 *   status: string,
 *   itemTotal: Number,
 *   orderDate: Date,
 *   receiver: String,
 *   receiverPhone: String
 * }
 */

function changeToItem(product) {
  return {
    productId: product.id,
    productName: product.name,
    productQuantity: 3,
    price: product.price,
    option: {
      weight: 300,
    },
  };
}

export const orderData = {
  orderId: "123456",
  items: [
    changeToItem(product),
    changeToItem(product2),
    changeToItem(product3),
  ],
  userId: "1234567",
  orderAddress: "서울특별시 서초구 사당동 1232",
  status: "shipping",
  itemTotal: 18500, // 공통함수 생성하면 해당 함수 호출하도록 변경 예정
  orderDate: new Date("2023-7-21"),
  receiver: "홍길동",
  receiverPhone: "010-1234-5678"
};
