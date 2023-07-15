import { API_END_POINT } from "/constants/index.js";
import { makeTemplate } from "/js/common/template.js"
import g from '/js/common/common.js';

const url = new URL(window.location.href);
const urlParams = url.searchParams;
let categoryId = urlParams.get("categoryId");
let category1 = "";
let category2 = "";


if (categoryId === "country") {
    category1 = "원두커피";
    category2 = "국가별";
} else if (categoryId === "blend") {
    category1 = "원두커피";
    category2 = "블렌드";
} else if (categoryId === "drip") {
    category1 = "원두커피";
    category2 = "드립";
} else if (categoryId === "supplies") {
    category1 = "커피용품";
    category2 = "커피용품";
}

// 마크업
let contentHead = `
    <!-- product list -->
    <main>
        <section class="page-header">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="content">
                            <h1 class="page-name">${ category1 }</h1>
                            <ol class="breadcrumb">
                                <li><a href="/">Home</a></li>
                                <li class="active">${ category2 }</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="products section">
            <div class="container">
                <div class="row">         
`;

let contentTail = `
                </div>
            </div>
        </section>
    </main>
`;

// 상품 리스트 생성
function content (data) {
    const { id, name, description, price, mainImage } = data;
    const productUrl = `/product/${ id }`;
    const imgSrc = `/assets/thumbnail/${ categoryId }/${ id }/${ mainImage }`;

    return `
        <div class="col-md-4">
            <div class="product-item">
    
                <a href="${ productUrl }">
                    <div class="product-thumb">
                        <img class="img-responsive" src="${ imgSrc }" />
                    </div>
                </a>
                
                <div class="product-content">
                    <h4><a href="${ productUrl }"><b>${ name }</b></a></h4>
                    <p class="taste">${ description }</p>
                    <p class="price">${ g.setParseStringAmount(price) }원</p>
                </div>
            </div>
        </div>
    `;


}


// 상품 목록 데이터 받아오기
const API_URL = `${API_END_POINT}/products?categoryId=${urlParams.get("categoryId")}`;

fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        let result = data.data;

        result.forEach( data => {
            contentHead += content(data);
        });

        contentHead += contentTail;

        const body = document.querySelector('body');
        makeTemplate(body, contentHead);
        
    })
