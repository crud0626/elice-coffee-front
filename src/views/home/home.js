import { makeTemplate } from '../common/template.js';
const homeHTML = `

<section class="md-products">
        <div class="container">
            <div class="row">
                <h2 class="md-best">MD 추천 상품</h2>
                <hr>
                <br>
                <div class="col-md-4">
                    <div class="product-item">
                        <div class="product-thumb">
                            <img class="img-responsive" src="../../assets/thumbnail/brazil-cerrado.jpg" alt="product-img" />
                            <div class="preview-meta">
                                <ul>

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
                            <h4><a href="product-single.html">Brazil Cerrado</a></h4>
                            <p class="taste">
                                #적절한 바디와 너티함<br>
                                #고소하고 무난한 맛을 찾으시는 분
                            </p>
                            <p class="price">₩3,400</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="product-item">
                        <div class="product-thumb">
                            <img class="img-responsive" src="../../assets/thumbnail/brazil-santos.jpg" alt="product-img" />
                            <div class="preview-meta">
                                <ul>

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
                            <h4><a href="product-single.html">Brazil Santos</a></h4>
                            <p class="taste">
                                #은은한 산미와 너티의 마일드함<br>
                                #부드럽고 마일드한 맛을 찾으시는 분
                            </p>
                            <p class="price">₩3,200</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="product-item">
                        <div class="product-thumb">
                            <img class="img-responsive" src="../../assets/thumbnail/colombia-madellin.jpg" alt="product-img" />
                            <div class="preview-meta">
                                <ul>

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
                            <h4><a href="product-single.html">Colombia Madellin</a></h4>
                            <p class="taste">
                                #호두의 고소함, 코코아의 단맛<br>
                                #기분 좋은 바디감과 단맛을 원하시는 분
                            </p>
                            <p class="price">₩4,200</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="product-item">
                        <div class="product-thumb">
                            <img class="img-responsive" src="../../assets/thumbnail/colombia-supremo.jpg" alt="product-img" />
                            <div class="preview-meta">
                                <ul>

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
                            <h4><a href="product-single.html">Colombia Supremo</a></h4>
                            <p class="taste">
                                #은은한 허브향과 단맛의 조화<br>
                                #어디에나 어울리는 커피를 찾으시는 분
                            </p>
                            <p class="price">₩4,500</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="product-item">
                        <div class="product-thumb">
                            <img class="img-responsive" src="../../assets/thumbnail/costarica-tarrazu.jpg" alt="product-img" />
                            <div class="preview-meta">
                                <ul>

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
                            <h4><a href="product-single.html">Costarica Tarrazu</a></h4>
                            <p class="taste">
                                #<br>
                                #
                            </p>
                            <p class="price">₩</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="product-item">
                        <div class="product-thumb">
                            <img class="img-responsive" src="../../assets/thumbnail/elsalvador-apaneca.jpg" alt="product-img" />
                            <div class="preview-meta">
                                <ul>
                                    <li>
                                        <span data-toggle="modal" data-target="#product-modal">
                                            <i class="tf-ion-ios-search-strong"></i>
                                        </span>
                                    </li>
                                    <li>
                                        <a href="#"><i class="tf-ion-ios-heart"></i></a>
                                    </li>
                                    <li>
                                        <a href="#!"><i class="tf-ion-android-cart"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="product-content">
                            <h4><a href="product-single.html">Rainbow Shoes</a></h4>
                            <p class="price">₩</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

<hr>
<section class="page-write">
	<div class="container">					
				<div class="content">
					<h1 class="page-name">About Coffee</h1>
					<ol class="">
						<!-- <li><a href="#">Home</a></li> -->
						<li class="coffee-write">"커피는 시간과 공간을 초월한 편안함의 청자입니다.<br> 그 향기를 느껴보면 일상에 활력을 불어넣어 새로운 시작으로 당신을 인도합니다."</li>
            <p></p>
            <h4 class="coffee-write">
              지금 이곳에서, 커피를 경험하세요!
            </h4>
					</ol>
				</div>
	</div>
</section>

<section class="another-products">
  <div class="container">
    <div>
    </div>
  </div>
</section>
`;

const body = document.querySelector('body');
makeTemplate(body, homeHTML);
