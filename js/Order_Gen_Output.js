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
   // appContainer.appendChild(paragraph1);
   appContainer.appendChild(generatedcontent_space);
   appContainer.appendChild(buttonContainer);
   buttonContainer.appendChild(RegenAll); 
   buttonContainer.appendChild(placeorder);
}

