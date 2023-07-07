import { makeTemplate } from '../common/template.js';
const homeHTML = `<p>테스트</p>`;

const body = document.querySelector('body');
makeTemplate(body, homeHTML);
