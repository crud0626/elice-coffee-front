import { nav } from '../components/nav.js';
import { header } from '../components/header.js';
import { footer } from '../components/footer.js';

/**
 * beforebegin - section의 앞에 삽입
 * afterend - section의 뒤에 삽입
 */
function makeTemplate(body, contentsArea) {
    body.insertAdjacentHTML('beforeend', header);
    body.insertAdjacentHTML('beforeend', nav);
    body.insertAdjacentHTML('beforeend', contentsArea)
    body.insertAdjacentHTML('beforeend', footer);
}

export { makeTemplate };