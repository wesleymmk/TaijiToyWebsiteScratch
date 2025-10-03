// It does this through having 'common functions' such as the clear HTML code function.
export const appContainer = document.getElementById('app');
import * as AuthUtils from './Authentication_Page.js';
import * as GenUtils from './Order_Generation.js';
import * as ComUtils from './Common_Function.js';


export function renderUserAccount() {
    ComUtils.clearAppContainer();
    //PS added navwrapper
    const navwrapper = document.createElement('div');
    navwrapper.id = 'account';
    navwrapper.classList.add('nav-wrapper');
    navwrapper.appendChild(ComUtils.HomeLogo);
    navwrapper.appendChild(ComUtils.navmenu);
    navwrapper.appendChild(ComUtils.accountmenu);
    ComUtils.Home.classList.remove('home');
    ComUtils.GenerateInputOption.classList.remove('inputorder');
    ComUtils.GenerateOutputOption.classList.remove('outputorder');
    ComUtils.AccountOption.classList.add('account');
    ComUtils.navmenu.appendChild(ComUtils.Home);
    ComUtils.navmenu.appendChild(ComUtils.GenerateInputOption);
    ComUtils.navmenu.appendChild(ComUtils.GenerateOutputOption);
    ComUtils.accountmenu.appendChild(ComUtils.AccountOption);

    let heading = document.createElement('h1');
    heading.classList.add('header');
    heading.textContent = 'User Account';

    appContainer.appendChild(navwrapper);
    appContainer.appendChild(heading);


    /*Done by EQ*/
    /*Currently not done*/
    function scrollingwindow(){
    let scoll=document.getElementById('permanentWindow');
    if (!scoll) {
        scoll=document.createElement('div');
        scoll.id='permanentWindow';
        scoll.classList.add('modal');

        let scollContent=document.createElement('div');
        scollContent.classList.add('modal-content');    

    const header = document.createElement('h2');
    scollContent.textContent = 'Previous Orders';
    scoll.classList.add('modal');
    scollContent.appendChild(header);

    for(let i=1; i<=20; i++){
        const p= document.createElement('p');
        p.textContent='Order number: ';
        scollContent.appendChild(p);
    }
     document.body.appendChild(scollContent);
     
    }

}
//document.addEventListener('DOMContentLoaded', scrollingwindow);
//Do not comment this one out or the order list will be in every screen, EQ.
} 

/*Small window with a scollbar by EQ
export function scrollingwindow(){
    let modal=document.getElementById('permanentWindow');
    if (!modal) {
        modal=document.createElement('div');
        modal.id='permanentWindow';
        modal.classList.add('modal');

        let modalContent=document.createElement('div');
        modalContent.classList.add('modal-content');    

    const header = document.createElement('h2');
    modalContent.textContent = 'Previous Orders';
    modal.classList.add('modal');
    modalContent.appendChild(header);

    for(let i=1; i<=20; i++){
        const p= document.createElement('p');
        p.textContent='Order number: ';
        modalContent.appendChild(p);
    }
     document.body.appendChild(modalContent);
     
    }

}
document.addEventListener('DOMContentLoaded', scrollingwindow);*/
//Currently commented out for safekeeping.