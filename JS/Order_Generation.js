// JavaScript source code
export const appContainer = document.getElementById('app');
import * as ComUtils from './Common_Function.js';
import * as Utils from './Authentication_Page.js';
import * as AccUtils from './User_Account.js';

// PS creation
export function renderGenerationInputView() {
    ComUtils.clearAppContainer();
    ComUtils.header();

    let heading = document.createElement('h1');
    heading.classList.add('header');
    heading.textContent = 'Generation Input Page';

    let GiftOption = document.createElement('input');
    GiftOption.type = 'checkbox';
    GiftOption.name = 'giftOption';

    let CheckboxLabel = document.createElement('label');
    CheckboxLabel.htmlFor = 'GiftOption';
    CheckboxLabel.textContent = 'Is This a Gift?';

    let CustomerInput = document.createElement('input');
    CustomerInput.type = 'text';
    CustomerInput.placeholder = 'Enter your Values';
    CustomerInput.required = true;

    let SubmitGeneration = document.createElement("button");
    SubmitGeneration.textContent = 'Submit';
    SubmitGeneration.classList.add('LoginButton');
    SubmitGeneration.type = "submit";

    /*registerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const text = CustomerInput.value;

        // Backend code needed.
        
    });*/

    appContainer.appendChild(heading);
    appContainer.appendChild(GiftOption);
    appContainer.appendChild(CheckboxLabel);
    appContainer.appendChild(CustomerInput);
    appContainer.appendChild(SubmitGeneration);

}