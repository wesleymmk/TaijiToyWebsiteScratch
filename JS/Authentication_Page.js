import * as Utils from './Authentication_Page.js';

export const appContainer = document.getElementById('app');
export function clearAppContainer() {
    appContainer.innerHTML = '';
}

/* Paul-Anthony Sutton
added renderWelcomeView() to add basic functionailty*/

export function renderWelcomeView() {
    clearAppContainer(); // Clear the screen first

    let heading = document.createElement('h1');
    heading.classList.add('header');
    heading.textContent = 'Welcome to Taiji Toys';


    let LoginButton = document.createElement("button");
    LoginButton.textContent = 'Login';
    LoginButton.classList.add('LoginButton');

    let CreateAccountButton = document.createElement("button");
    CreateAccountButton.textContent = 'Create Account';

    appContainer.appendChild(heading);
    appContainer.appendChild(LoginButton);
    appContainer.appendChild(CreateAccountButton);
}

function renderLoginView() {
    clearAppContainer();


}

