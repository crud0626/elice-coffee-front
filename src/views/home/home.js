import { makeTemplate } from '../common/template.js';
const homeHTML = `

// 이미지 슬라이드 영역

<section class="page-header">
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
`;


const body = document.querySelector('body');
makeTemplate(body, homeHTML);
