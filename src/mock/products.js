/**
 * product: [{
 *   id: number, 
 *   name: string, 
 *   category: string, 
 *   price: number, 
 *   imageSrc: [String], - 상세페이지의 이미지
 *   keyWord: [String],
 *   discription: [String], -> description
 *   titleSrc: string - 썸네일
 * }]"
 */

const product = {
    id: 1234,
    name: "커피 원두",
    category: "country",
    price: 1000,
    imageSrc: ["../assets/thumbnail/brazil-cerrado.jpg", "../assets/thumbnail/brazil-cerrado.jpg"],
    keyWord: ["적절한 바디와 너티함", "고소하고 무난한 맛을 찾으시는 분"],
    description: ["본문입니다. 1", "본문입니다. 2"],
    titleSrc: "../assets/thumbnail/brazil-cerrado.jpg"
};

const product2 = { ...product };
product2.name = "맛있는 원두";
product2.titleSrc = "../assets/thumbnail/colombia-madellin.jpg";

const product3 = { ...product };
product3.name = "신맛나는 원두";
product3.titleSrc = "../assets/thumbnail/colombia-supremo.jpg";

const products = [product, product2, product3];

export {
    product,
    product2,
    product3,
    products
}