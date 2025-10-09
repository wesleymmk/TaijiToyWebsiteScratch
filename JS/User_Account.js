// It does this through having 'common functions' such as the clear HTML code function.
export const appContainer = document.getElementById('app');
import * as AuthUtils from './Authentication_Page.js';
import * as GenUtils from './Order_Generation.js';
import * as ComUtils from './Common_Function.js';


export function renderUserAccount() {
    ComUtils.clearAppContainer();
    //PS added navwrapper, This is the new implementation of the navbar. Removed html version.
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

const scrollableContent = document.createElement('div');
scrollableContent.classList.add('scrollable-content');

    // 2. Add some content so there is something to scroll!
    for (let i = 1; i <= 20; i++) {
        const p = document.createElement('p');
        p.textContent = `Order number: ${i}...`;
        scrollableContent.appendChild(p);
    }

    // 3. Create a button to trigger the scroll action
    const scrollButton = document.createElement('button');
    scrollButton.textContent = 'Scroll to Bottom';

    // 4. Define the function to scroll the element
    function scrollToBottom() {
        // We use the 'scrollableContent' variable we just created
        scrollableContent.scrollTop = scrollableContent.scrollHeight;
    }

    // 5. Add event listeners
    scrollButton.addEventListener('click', scrollToBottom);

    scrollableContent.addEventListener('scroll', () => {
        console.log('Scrolled!');
    });

    // 6. Append the new elements to the page
    appContainer.appendChild(scrollableContent);
    appContainer.appendChild(scrollButton);
}
