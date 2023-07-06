const nav = `
    <nav>
        <ul>
            <li class="dropdown">
                <a class="dropdown-toggle" href="#">국가별</a>
                <ul class="dropdown-menu">
                    <li><a href="#">아프리카</a></li>
                    <li><a href="#">중남미</a></li>
                    <li><a href="#">아시아</a></li>
                </ul>
            </li>

            <li class="dropdown">
                <a href="#">블랜드</a>
            </li>

            <li class="dropdown">
                <a href="#">드립</a>
            </li>

            <li class="dropdown">
                <a class="dropdown-toggle" href="#">커피용품</a>
                <ul class="dropdown-menu">
                    <li><a href="#">드리퍼</a></li>
                    <li><a href="#">서버</a></li>
                    <li><a href="#">필터</a></li>
                    <li><a href="#">그라인더</a></li>
                </ul>
            </li>
        </ul>
    </nav>
`;

export { nav };

// 카테고리 클릭시 리스트를 토글합니다.
window.addEventListener('DOMContentLoaded', function () {
    const dropdownToggleList = document.querySelectorAll('.dropdown-toggle');
  
    dropdownToggleList.forEach((toggle) => {
      toggle.addEventListener('click', function (event) {
        event.preventDefault();
        const parentLi = this.parentElement;
        parentLi.classList.toggle('active');
      });
    });
  });
