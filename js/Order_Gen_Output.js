// JavaScript source code
//collaboration betwwen PS & EQ
import * as ComUtils from './Common_Function.js';
import * as Utils from './Authentication_Page.js';
export const appContainer = document.getElementById('app');
import * as AccUtils from './User_Account.js';

export function renderGenerationOutputView() {
    ComUtils.clearAppContainer();
    //PS added navwrapper, This is the new implementation of the navbar. Removed html version.
    const navwrapper = document.createElement('div');
    navwrapper.id = 'order-output';
    navwrapper.classList.add('nav-wrapper');
    navwrapper.appendChild(ComUtils.HomeLogo);
    navwrapper.appendChild(ComUtils.navmenu);
    navwrapper.appendChild(ComUtils.accountmenu);
    ComUtils.Home.classList.remove('home');
    ComUtils.GenerateInputOption.classList.remove('inputorder');
    ComUtils.GenerateOutputOption.classList.add('outputorder');
    ComUtils.AccountOption.classList.remove('account');
    ComUtils.navmenu.appendChild(ComUtils.Home);
    ComUtils.navmenu.appendChild(ComUtils.GenerateInputOption);
    ComUtils.navmenu.appendChild(ComUtils.GenerateOutputOption);
    ComUtils.accountmenu.appendChild(ComUtils.AccountOption);

    let heading = document.createElement('h1');
    heading.classList.add('header');
    heading.textContent = 'Generation Output Page';

    let paragraph1 = document.createElement("p");
    paragraph1.textContent = Utils.Trait_1;

    let trait1=document.createElement("P");
    trait1.classList.add('traits');
    trait1.textContent="-Trait 1";

    let trait2=document.createElement("P");
    trait2.classList.add('traits');
    trait2.textContent="-Trait 2";

    let trait3=document.createElement("P");
    trait3.classList.add('traits');
    trait3.textContent="-Trait 3";

    let trait4=document.createElement("P");
    trait4.classList.add('traits');
    trait4.textContent="-Trait 4";

    let trait5=document.createElement("P");
    trait5.classList.add('traits');
    trait5.textContent="-Trait 5";

    let trait6=document.createElement("P");
    trait6.classList.add('traits');
    trait6.textContent="-Trait 6";

    let RegenText=document.createElement("button");
    RegenText.textContent='Regenerate Text';
    RegenText.classList.add('RegenText');

    let RegenAll=document.createElement("button");
    RegenAll.textContent='Regenerate All';
    RegenAll.classList.add('RegenText');


    let TaijiToyColor = document.createElement('img');
    TaijiToyColor.classList.add('ImageBox');
    TaijiToyColor.src = 'TaijiToy_Color/testimg.jpg';
    TaijiToyColor.alt = 'Color of Toy';

    let ImageGen = document.createElement('img');
    ImageGen.classList.add('ImageBox');
    ImageGen.src = 'Generated_Images/Trait1.jpg';
    ImageGen.alt = 'Image_Generation';

    let Regenbutton1=document.createElement('button');
    Regenbutton1.textContent='Regenerate the image and the color';
    Regenbutton1.classList.add('Regen-img-color');

    appContainer.appendChild(navwrapper);
    appContainer.appendChild(heading);
    appContainer.appendChild(paragraph1);
    appContainer.appendChild(TaijiToyColor);
    appContainer.appendChild(Regenbutton1);
    appContainer.appendChild(ImageGen);
    appContainer.appendChild(trait1);
    appContainer.appendChild(trait2);
    appContainer.appendChild(trait3);
    appContainer.appendChild(trait4);
    appContainer.appendChild(trait5);
    appContainer.appendChild(trait6);
    appContainer.appendChild(RegenText);
    appContainer.appendChild(RegenAll);
}

