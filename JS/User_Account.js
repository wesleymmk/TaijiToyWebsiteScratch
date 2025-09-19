// It does this through having 'common functions' such as the clear HTML code function.
export const appContainer = document.getElementById('app');
import * as AuthUtils from './Authentication_Page.js';
import * as GenUtils from './Order_Generation.js';
import * as ComUtils from './Common_Function.js';


export function renderUserAccount() {
    ComUtils.clearAppContainer();
    ComUtils.header();

    let heading = document.createElement('h1');
    heading.classList.add('header');
    heading.textContent = 'User Account';

    appContainer.appendChild(heading);
}