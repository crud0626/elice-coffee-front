import { makeTemplate } from "./common/template.js";

const content = `
                <div class="container">
                    <div>
                        <img src="/assets/registerComplete.png">
                    </div>
                    <div class="text">
                        <p style="text-align: center;"><strong>회원가입이 완료되었습니다.</strong></p>
                    </div>
                    <div class="button">
                        <span>
                            <div class="btn-group">
                                <a href="/">홈으로</a>
                            </div>
                            <div class="btn-group">                    
                                <a href="/login">로그인</a>    
                            </div>
                        </span>
                    </div>
                </div>
`;

const body = document.querySelector('body');
makeTemplate(body, content);
