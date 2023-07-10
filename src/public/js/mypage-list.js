import { userData } from '../mock/user.js';
import { makeTemplate } from "./common/template.js";

function template(userData) {
    const { id, name, email, phoneNumber, address, profileSrc } = userData;
    // 
    return `
        <main>
            <section class="page-header">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="content">
                                <h1 class="page-name">MY PAGE</h1>
                                <ol class="breadcrumb">
                                    <li><a href="index.html">Home</a></li>
                                    <li class="active">MY PAGE</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="user-dashboard page-wrapper">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <!-- 기본 정보 -->
                            <h3>기본 정보</h3>
                            <div class="dashboard-wrapper dashboard-user-profile">
                                <div class="media">
                                    <div class="pull-left text-center" href="#!">
                                        ${/** 배포 후 profileSrc로 변경 */''}
                                        <img class="media-object user-img" src="../../../assets/avater.jpg" alt="profile image">
                                    </div>
                                    <div class="media-body">
                                        <ul class="user-profile-list">
                                            <li><span>이름:</span>${name}</li>
                                            <li><span>이메일:</span>${email}</li>
                                            <li><span>휴대전화:</span>${phoneNumber}</li>
                                            <li><span>주소:</span>${address}</li>
                                            <li><span>포인트:</span>0</li>
                                            <li><span>등급:</span>일반</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="btn-wrapper">
                                <div>
                                    <a href="/mypage/order" class="btn btn-main btn-small">주문 내역</a>
                                    <a href="/mypage/edit" class="btn btn-main btn-small">회원 정보</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `;
}

const body = document.querySelector('body');
makeTemplate(body, template(userData));