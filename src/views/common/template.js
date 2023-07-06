import { nav } from '../components/nav.js';
import { header } from '../components/header.js';
import { footer } from '../components/footer.js';

/**
 * beforebegin - section의 앞에 삽입
 * afterend - section의 뒤에 삽입
 */
function makeTemplate(contentsArea) {
    contentsArea.insertAdjacentHTML('beforebegin', header);
    contentsArea.insertAdjacentHTML('beforebegin', nav);
    contentsArea.insertAdjacentHTML('afterend', footer);
}

export { makeTemplate };