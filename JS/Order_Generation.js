// JavaScript source code
import * as ComUtils from './Common_Function.js';
import * as Utils from './Authentication_Page.js';
export const appContainer = document.getElementById('app');

export function renderGenerationOutputView() {
    ComUtils.clearAppContainer(); 
    ComUtils.header();

    let heading = document.createElement('h1');
    heading.classList.add('header');
    heading.textContent = 'Generation Output Page';

    let paragraph1 = document.createElement("p");
    paragraph1.textContent = Utils.Trait_1;

    let TaijiToyColor = document.createElement('img');
    TaijiToyColor.classList.add('ImageBox');
    TaijiToyColor.src = 'TaijiToy_Color/testimg.jpg';
    TaijiToyColor.alt = 'Color of Toy';

    let ImageGen = document.createElement('img');
    ImageGen.classList.add('ImageBox');
    ImageGen.src = 'Generated_Images/Trait1.jpg';
    ImageGen.alt = 'Image_Generation';

    appContainer.appendChild(heading);
    appContainer.appendChild(paragraph1);
    appContainer.appendChild(TaijiToyColor);
    appContainer.appendChild(ImageGen);
}

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