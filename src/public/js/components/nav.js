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

// 카테고리(국가별, 커피용품)이벤트 리스트를 토글합니다.
window.addEventListener('DOMContentLoaded', function () {
    const dropdownToggleList = document.querySelectorAll('.dropdown-toggle');
    const dropdownMenuList = document.querySelectorAll('.dropdown-menu');
  
    dropdownToggleList.forEach((toggle, index) => {
      const parentLi = toggle.parentElement;
  
      parentLi.addEventListener('mouseover', function () {
        showDropdownMenu(index);
      });
  
      parentLi.addEventListener('mouseout', function (event) {
        hideDropdownMenu(event, index);
      });
  
      dropdownMenuList[index].addEventListener('mouseover', function () {
        showDropdownMenu(index);
      });
  
      dropdownMenuList[index].addEventListener('mouseout', function (event) {
        hideDropdownMenu(event, index);
      });
    });
  
    function showDropdownMenu(index) {
      const parentLi = dropdownToggleList[index].parentElement;
      parentLi.classList.add('active');
    }
  
    function hideDropdownMenu(event, index) {
      const relatedTarget = event.relatedTarget || event.toElement;
      const parentLi = dropdownToggleList[index].parentElement;
  
      if (!parentLi.contains(relatedTarget)) {
        parentLi.classList.remove('active');
      }
    }
  });
