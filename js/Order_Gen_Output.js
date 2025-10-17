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
    const Trait1 = 'Placeholder 1';
    const Trait2 = 'Placeholder 2';
    const Trait3 = 'Placeholder 3';
    const Trait4 = 'Placeholder 4';
    const Trait5 = 'Placeholder 5';
    const Trait6 = 'Placeholder 6';
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

    const TraitText1 = document.createElement("p");
    TraitText1.textContent = Trait1;

    const TraitText2 = document.createElement("p");
    TraitText2.textContent = Trait2;

    const TraitText3 = document.createElement("p");
    TraitText3.textContent = Trait3;

    const TraitText4 = document.createElement("p");
    TraitText4.textContent = Trait4;

    const TraitText5 = document.createElement("p");
    TraitText5.textContent = Trait5;

    const TraitText6 = document.createElement("p");
    TraitText6.textContent = Trait6;

    let generatedcontent_space=document.createElement('div');
    generatedcontent_space.classList.add('generatedcontent-space');



    let buttonContainer=document.createElement('div');
    buttonContainer.classList.add('button-container');    

    let RegenAll=document.createElement("button");
    RegenAll.textContent='Regenerate All';
    RegenAll.classList.add('RegenText');

    let placeorder=document.createElement("button");
    placeorder.textContent='Place an order';
    placeorder.classList.add('RegenText')


    appContainer.appendChild(navwrapper);
    appContainer.appendChild(heading);
    appContainer.appendChild(TraitText1);
    appContainer.appendChild(TraitText2);
    appContainer.appendChild(TraitText3);
    appContainer.appendChild(TraitText4);
    appContainer.appendChild(TraitText5);
    appContainer.appendChild(TraitText6);
   appContainer.appendChild(generatedcontent_space);
   appContainer.appendChild(buttonContainer);
   buttonContainer.appendChild(RegenAll); 
   buttonContainer.appendChild(placeorder);
}

