/**
 * "쓸만한" 공통 함수
 */
const g = {
  /**
   * element의 id에 대하여 해당 요소를 화면 가운데 표시한다.
   * 입력받아야 되는 값이 입력되지 않았을 때,
   * 해당 값을 입력하라는 의미로 함수를 호출한다.
   * @param {String} id element의 id 값 (string)
   */
  centerFocus: (id) => {
    // 01. querySelector를 통하여 해당 id 정보를 가져온다.
    let el = document.querySelector(`#${id}`);
    // 02. 해당 element가 존재한다면, 화면 가운데 해당하는 요소를 위치시키고, 포커싱을 한다.
    if (el) {
      el.scrollIntoView({ block: "center" });
      el.focus();
    }
    // 테스트 전용 코드. 필요 시 사용.
    // else {
    //     console.log(`id가 ${id}에 해당하는 element가 존재하지 않습니다.`);
    // }
  },

  /**
   * 금액 매개변수를 받아 string형으로 변환하고 3자리마다 ','를 추가한다.
   * @param {any} num
   */
  setParseStringAmount: (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  /**
   * 날짜 형태의 매개변수를 받아 string형식으로 변환한다.
   * @param {Date} date 날짜
   * @returns string example) 2023-07-10 15:43
   */
  formatDate(date) {
    const dt = new Date(date);
    return (
      dt.getFullYear() +
      "-" +
      ("00" + (dt.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + dt.getDate()).slice(-2) +
      " " +
      ("00" + dt.getHours()).slice(-2) +
      ":" +
      ("00" + dt.getMinutes()).slice(-2)
    );
  },

  /**
   * 유저의 페이지를 이동시키는 함수, URL에서 host를 제외한 path부분만 입력한다.
   * @param {String} path
   * @example
   * g.redirectUserPage('/mypage/edit');
   */
  redirectUserPage: (path) => {
    const host = window.location.origin;
    window.location.href = `${host}${path}`;
  },

  /**
   * 쿠키 설정. 만료일은 익일 0시를 기준으로 한다.
   * @param {any} name  쿠키 명
   * @param {any} value 쿠키 값
   */
  setCookie: (name, value) => {
    let todayDate = new Date();
    let nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    nextDate.setHours(0, 0, 0, 0);
    // let Dday = nextDate.getTime() - todayDate.getTime();
    document.cookie = name + '=' + value + ';expires=' + nextDate.toUTCString() + ';path=/';
  },
};

export default g;

/* ----------------------------------------------------------------- */

/**
 * JSON 데이터에서 오브젝트 찾기
 * @param {any} obj JSONDATA
 * @param {any} key Search Key
 * @param {any} val Search Value
 */
function getObjects(obj, key, val) {
  let objects = [];
  for (let i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == "object") {
      objects = objects.concat(getObjects(obj[i], key, val));
    } else if (i == key && obj[key] == val) {
      objects.push(obj);
    }
  }
  return objects;
}

/**
 * 날짜 시간 변환 method
 * @param {any} value  날짜 데이터
 */
function convertToJavaScriptDate(value) {
  let pattern = /Date\(([^)]+)\)/;
  let results = pattern.exec(value);
  let dt = new Date(parseFloat(results[1]));
  return (
    dt.getFullYear() +
    "-" +
    ("00" + (dt.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + dt.getDate()).slice(-2) +
    " " +
    ("00" + dt.getHours()).slice(-2) +
    ":" +
    ("00" + dt.getMinutes()).slice(-2) +
    ":" +
    ("00" + dt.getSeconds()).slice(-2)
  );
}

/**
 * 다른 데이터 입력 시 숫자만 입력하도록 처리 (replace)
 * @param {any} obj
 */
function replaceNum(obj) {
  obj.value = obj.value.replace(/[^0-9]/g, "");
}

/**
 * 파일 Size 검증 함수
 * */
function FileSizeValidation() {
  let validation = true;

  return validation;
}

/**
 * 쿠키 값 가져오기. nameofCookie와 같은 값이 있을 경우 해당 cookie의 value 리턴 / 없을 경우 "" 리턴
 * @param {any} name 쿠키 명
 */
function getCookie(name) {
  let nameOfCookie = name + "="; // Main_Notice_PopUp
  let x = 0;
  while (x <= document.cookie.length) {
    let y = x + nameOfCookie.length;
    if (document.cookie.substring(x, y) == nameOfCookie) {
      if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
        endOfCookie = document.cookie.length;
      return unescape(document.cookie.substring(y, endOfCookie));
    }
    x = document.cookie.indexOf(" ", x) + 1;
    if (x == 0) break;
  }
  return "";
}

/**
 * 쿠키 설정. 만료일은 익일 0시를 기준으로 한다.
 * @param {any} name  쿠키 명
 * @param {any} value 쿠키 값
 */
function setCookie(name, value) {
  let todayDate = new Date();
  let nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  nextDate.setHours(0, 0, 0, 0);
  let Dday = nextDate.getTime() - todayDate.getTime();
  document.cookie =
    name +
    "=" +
    escape(value) +
    "; path=/; max-age=" +
    Math.floor(Dday / 1000) +
    ";";
  /*document.cookie = "Main_Notice_PopUp=" + escape("expire") + "; path=/; expires=" + todayDate.toUTCString() + ";"*/
}

/**
 * string형 데이터에 3자리마다 ,를 추가하여 반환한다.
 * @param {any} strNum
 */
function setStringNumberFormat(strNum) {
  return strNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 매개변수에 있는 특정 문자를 모두 제거한다.
 * @param {any} strNum 매개변수
 * @param {any} format 특정 문자
 */
function removeFormat(strNum, format) {
  return strNum.replaceAll(format, "");
}

/**
 * 금액 매개변수를 받아 ',' 를 제거하고 int형으로 변환한다.
 * 데이터가 NaN일 경우 0을 반환한다.
 * @param {any} strNum
 */
function setParseIntAmount(strNum) {
  let number = parseInt(strNum.replaceAll(",", ""));
  return isNaN(number) ? 0 : number;
}

/**
 * 금액 매개변수를 받아 string형으로 변환하고 3자리마다 ','를 추가한다.
 * @param {any} intNum
 */
function setParseStringAmount(intNum) {
  return intNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 날짜 데이터를 받아 원하는 format으로 변경한다.
 * 예) setDateFormat(20221213,'-') = 2022-12-13
 * @param {any} strNum  날짜
 * @param {any} format  형식
 */
function setDateFormat(strNum, format) {
  return (
    strNum.substr(0, 4) +
    format +
    strNum.substr(4, 2) +
    format +
    strNum.substr(6, 2)
  );
}

// export { setParseStringAmount }
