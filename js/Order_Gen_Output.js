// JavaScript source code
//collaboration betwwen PS & EQ
import * as ComUtils from './Common_Function.js';
import * as Utils from './Authentication_Page.js';
export const appContainer = document.getElementById('app');
import * as AccUtils from './User_Account.js';

export function renderGenerationOutputView() {
    ComUtils.clearAppContainer();
    ComUtils.header();

    let heading = document.createElement('h1');
    heading.classList.add('header');
    heading.textContent = 'Generation Output Page';

    let paragraph1 = document.createElement("p");
    paragraph1.textContent = Utils.Trait_1;

    let traits=document.createElement("P");
    traits.textContent="Trait 1 \n Trait2 \n Trait3 \n Trait4 \n Trait5 \n Trait6 \n"

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

