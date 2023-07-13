import g from '../common/common.js';

function logout() {
    const token = g.getCookie("loginToken");

    if (token) {
        g.deleteCookie("loginToken");
        window.alert("로그아웃 되었습니다.");
        g.redirectUserPage('/login');
    }
}

function setLoginLogoutButton() {
    const token = g.getCookie("loginToken");

    return `
        <a
            id="login-control-btn"
            href="${token ? "javascript:void(0)" : "/login"}"
        >
            <div>${token ? "로그아웃" : "로그인"}</div>
        </a>
    `;
}

function setLoggedInButtons() {
    const token = g.getCookie("loginToken");

    const btns = `
        <a href="/mypage">
            <div>마이페이지</div>
        </a>
        <a href="/cart">
            <div>장바구니</div>
        </a>
        <a href="/order">
            <div>주문목록</div>
        </a>
    `;

    return token ? btns : "";
}

const header = `
    <header>
        <a href="/">
            <h1>☕️ Elice Coffee</h1>
        </a>
        ${setLoggedInButtons()}
        ${setLoginLogoutButton()}
    </header>
`;

export { header, logout };
