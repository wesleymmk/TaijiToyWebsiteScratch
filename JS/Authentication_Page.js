/* Paul-Anthony Sutton
added renderWelcomeView() to add basic functionailty*/
import * as ComUtils from './Common_Function.js';
export const appContainer = document.getElementById('app');
export function renderWelcomeView() {
    ComUtils.clearAppContainer(); // Clear the screen first

    let heading = document.createElement('h1');
    heading.classList.add('header');
    heading.textContent = 'Welcome to Taiji Toys';

    let emailAccount = document.createElement('input');
    emailAccount.type = 'email';
    emailAccount.placeholder = 'Enter your email';
    emailAccount.required = true;

    let passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Enter your password';
    passwordInput.required = true;

    let LoginButton = document.createElement("button");
    LoginButton.textContent = 'Login';
    LoginButton.classList.add('LoginButton');

    let CreateAccountButton = document.createElement("button");
    CreateAccountButton.textContent = 'Create Account';
    CreateAccountButton.classList.add('LoginButton');
    CreateAccountButton.addEventListener('click', renderCreateAccountView);

    appContainer.appendChild(heading);
    appContainer.appendChild(emailAccount);
    appContainer.appendChild(passwordInput);
    appContainer.appendChild(LoginButton);
    appContainer.appendChild(CreateAccountButton);
}

export function renderCreateAccountView() {
    ComUtils.clearAppContainer();

    let heading = document.createElement('h1');
    heading.textContent = 'Create Your Account!';

    let emailAccount = document.createElement('input');
    emailAccount.type = 'email';
    emailAccount.placeholder = 'Enter your email';
    emailAccount.required = true;

    let passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Enter your password';
    passwordInput.required = true;

    let emailCheckbox = document.createElement('input');
    emailCheckbox.type = 'checkbox';
    emailCheckbox.name = 'emailCheckbox';

    let CheckboxLabel = document.createElement('label');
    CheckboxLabel.htmlFor = 'emailCheckbox';
    CheckboxLabel.textContent = 'Send you emails?';

    let CreateAccountButton = document.createElement("button");
    CreateAccountButton.textContent = 'Create Account';
    CreateAccountButton.classList.add('LoginButton');

    let LoginButton = document.createElement("button");
    LoginButton.textContent = 'Already have an account? Login';
    LoginButton.classList.add('LoginButton');
    LoginButton.addEventListener('click', renderWelcomeView);

    appContainer.appendChild(heading);
    appContainer.appendChild(emailAccount);
    appContainer.appendChild(passwordInput);
    appContainer.appendChild(emailCheckbox);
    appContainer.appendChild(CheckboxLabel);
    appContainer.appendChild(CreateAccountButton);
    appContainer.appendChild(LoginButton);

}
function renderLoginView() {
    ComUtils.clearAppContainer();

    let heading = document.createElement('h1');
    heading.classList.add('header');
    heading.textContent = 'Log In To Your Account!';

    appContainer.appendChild(heading);
}

