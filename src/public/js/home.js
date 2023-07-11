import { makeTemplate } from "./common/template.js";
import g from './common/common.js';

let contentHead = `
    <!-- product list -->
    <section class="page-header">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="content">
                        <h1 class="page-name">MD추천상품</h1>
                        <ol class="breadcrumb">
                            <!-- <li><a href="#">Home</a></li> -->
                            <li class="active">커피 상품 목록</li>
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
            <!-- Modal -->
            <div class="modal product-modal fade" id="product-modal">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i class="tf-ion-close"></i>
                </button>
                <div class="modal-dialog " role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-8 col-sm-6 col-xs-12">
                                    <div class="modal-image">
                                        <img class="img-responsive" src="images/shop/products/modal-product.jpg" alt="product-img" />
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-6 col-xs-12">
                                    <div class="product-short-details">
                                        <h2 class="product-title">GM Pendant, Basalt Grey</h2>
                                        <p class="product-price">$200</p>
                                        <p class="product-short-description">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem iusto nihil cum. Illo laborum numquam rem aut officia dicta cumque.
                                        </p>
                                        <a href="cart.html" class="btn btn-main">Add To Cart</a>
                                        <a href="product-single.html" class="btn btn-transparent">View Product Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </div>
    </section>
    `;

// 상품 목록 데이터 받아오기
const API_URL = "http://localhost:3001/api/v1/products";
fetch(API_URL)
    .then( res => res.json())
    .then( data => {
        let result = data.data;

        result.forEach( e => {

            // 데이터 수 만큼 목록 생성
            let contentCenter = `
                <div class="col-md-4">
                    <div class="product-item">
                        <div class="product-thumb">
                            <span class="bage">Best</span>
                            <img class="img-responsive" src="../../../assets/thumbnail/brazil-cerrado.jpg" alt="product-img" />
                            <div class="preview-meta">
                                <ul>
                                    <!-- <li>
                                        <span  data-toggle="modal" data-target="#product-modal">
                                            <i class="tf-ion-ios-search-strong"></i>
                                        </span>
                                    </li> -->
                                    <li>
                                        <a href="#!"><i class="fa-solid fa-heart" style="color: black;"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#!"><i class="fa-solid fa-cart-shopping" style="color: black;"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="product-content">
                            <h4><a href="product-single.html">{name}</a></h4>
                            <p class="taste">
                                {discription}
                            </p>
                            <p class="price">{price}</p>
                        </div>
                    </div>
                </div>
            `;
            contentCenter = contentCenter.replaceAll('{name}', e.name);
            contentCenter = contentCenter.replaceAll('{discription}', e.description);
            contentCenter = contentCenter.replaceAll('{price}', g.setParseStringAmount(e.price));
            contentHead += contentCenter;
            
        });

        contentHead += contentTail;

    const body = document.querySelector('body');
    makeTemplate(body, contentHead);

    });

// const homeHTML = `

// <section class="md-products">
//         <div class="container">
//             <div class="row">
//                 <h2 class="md-best">MD 추천 상품</h2>
//                 <hr>
//                 <br>
//                 <div class="col-md-4">
//                     <div class="product-item">
//                         <div class="product-thumb">
//                             <img class="img-responsive" src="./assets/thumbnail/brazil-cerrado.jpg" alt="product-img" />
//                             <div class="preview-meta">
//                                 <ul>

//                                     <li>
//                                         <a href="#!"><i class="fa-solid fa-heart" style="color: black;"></i>
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a href="#!"><i class="fa-solid fa-cart-shopping" style="color: black;"></i></a>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div class="product-content">
//                             <h4><a href="product-single.html">Brazil Cerrado</a></h4>
//                             <p class="taste">
//                                 #적절한 바디와 너티함<br>
//                                 #고소하고 무난한 맛을 찾으시는 분
//                             </p>
//                             <p class="price">₩3,400</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="col-md-4">
//                     <div class="product-item">
//                         <div class="product-thumb">
//                             <img class="img-responsive" src="./assets/thumbnail/brazil-santos.jpg" alt="product-img" />
//                             <div class="preview-meta">
//                                 <ul>

//                                     <li>
//                                         <a href="#!"><i class="fa-solid fa-heart" style="color: black;"></i>
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a href="#!"><i class="fa-solid fa-cart-shopping" style="color: black;"></i></a>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div class="product-content">
//                             <h4><a href="product-single.html">Brazil Santos</a></h4>
//                             <p class="taste">
//                                 #은은한 산미와 너티의 마일드함<br>
//                                 #부드럽고 마일드한 맛을 찾으시는 분
//                             </p>
//                             <p class="price">₩3,200</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="col-md-4">
//                     <div class="product-item">
//                         <div class="product-thumb">
//                             <img class="img-responsive" src="./assets/thumbnail/colombia-madellin.jpg" alt="product-img" />
//                             <div class="preview-meta">
//                                 <ul>

//                                     <li>
//                                         <a href="#!"><i class="fa-solid fa-heart" style="color: black;"></i>
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a href="#!"><i class="fa-solid fa-cart-shopping" style="color: black;"></i></a>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div class="product-content">
//                             <h4><a href="product-single.html">Colombia Madellin</a></h4>
//                             <p class="taste">
//                                 #호두의 고소함, 코코아의 단맛<br>
//                                 #기분 좋은 바디감과 단맛을 원하시는 분
//                             </p>
//                             <p class="price">₩4,200</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="col-md-4">
//                     <div class="product-item">
//                         <div class="product-thumb">
//                             <img class="img-responsive" src="./assets/thumbnail/colombia-supremo.jpg" alt="product-img" />
//                             <div class="preview-meta">
//                                 <ul>

//                                     <li>
//                                         <a href="#!"><i class="fa-solid fa-heart" style="color: black;"></i>
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a href="#!"><i class="fa-solid fa-cart-shopping" style="color: black;"></i></a>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div class="product-content">
//                             <h4><a href="product-single.html">Colombia Supremo</a></h4>
//                             <p class="taste">
//                                 #은은한 허브향과 단맛의 조화<br>
//                                 #어디에나 어울리는 커피를 찾으시는 분
//                             </p>
//                             <p class="price">₩4,500</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="col-md-4">
//                     <div class="product-item">
//                         <div class="product-thumb">
//                             <img class="img-responsive" src="./assets/thumbnail/costarica-tarrazu.jpg" alt="product-img" />
//                             <div class="preview-meta">
//                                 <ul>

//                                     <li>
//                                         <a href="#!"><i class="fa-solid fa-heart" style="color: black;"></i>
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a href="#!"><i class="fa-solid fa-cart-shopping" style="color: black;"></i></a>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div class="product-content">
//                             <h4><a href="product-single.html">Costarica Tarrazu</a></h4>
//                             <p class="taste">
//                                 #<br>
//                                 #
//                             </p>
//                             <p class="price">₩</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="col-md-4">
//                     <div class="product-item">
//                         <div class="product-thumb">
//                             <img class="img-responsive" src="./assets/thumbnail/elsalvador-apaneca.jpg" alt="product-img" />
//                             <div class="preview-meta">
//                                 <ul>
//                                     <li>
//                                         <span data-toggle="modal" data-target="#product-modal">
//                                             <i class="tf-ion-ios-search-strong"></i>
//                                         </span>
//                                     </li>
//                                     <li>
//                                         <a href="#"><i class="tf-ion-ios-heart"></i></a>
//                                     </li>
//                                     <li>
//                                         <a href="#!"><i class="tf-ion-android-cart"></i></a>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div class="product-content">
//                             <h4><a href="product-single.html">Rainbow Shoes</a></h4>
//                             <p class="price">₩</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>

// <hr>
// <section class="page-write">
// 	<div class="container">					
// 				<div class="content">
// 					<h1 class="page-name">About Coffee</h1>
// 					<ol class="">
// 						<li class="coffee-write">"커피는 시간과 공간을 초월한 편안함의 청자입니다.<br> 그 향기를 느껴보면 일상에 활력을 불어넣어 새로운 시작으로 당신을 인도합니다."</li>
//             <p></p>
//             <h4 class="coffee-write">
//               지금 이곳에서, 커피를 경험하세요!
//             </h4>
// 					</ol>
// 				</div>
// 	</div>
// </section>

// <section class="another-products">
//   <div class="container">
//     <div>
//     </div>
//   </div>
// </section>
// `;

// const body = document.querySelector("body");
// makeTemplate(body, homeHTML);
