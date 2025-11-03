// It does this through having 'common functions' such as the clear HTML code function.
export const appContainer = document.getElementById('app');
import * as AuthUtils from './Authentication_Page.js';
import * as GenUtils from './Order_Generation.js';
import * as ComUtils from './Common_Function.js';


export function renderUserAccount() {
    ComUtils.clearAppContainer();
    /***************Animation Function on Scroll***************/
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                return;
            }
        });
    }, { threshold: 0.8 });
    //PS added navwrapper, This is the new implementation of the navbar. Removed html version.
    const navwrapper = document.createElement('div');
    navwrapper.id = 'account'; // This is adding an id for the css class to specifically target this attribute
    navwrapper.classList.add('nav-wrapper'); // Class added
    navwrapper.appendChild(ComUtils.HomeLogo); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.navmenu); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.accountmenu); // Grab button from Common_Function.js
    ComUtils.Home.classList.remove('home'); // Class removed
    ComUtils.GenerateInputOption.classList.remove('inputorder'); // Class removed
    ComUtils.GenerateOutputOption.classList.remove('outputorder'); // Class removed
    ComUtils.AccountOption.classList.add('account'); // Class added
    ComUtils.navmenu.appendChild(ComUtils.Home); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.StoreOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.AboutOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.ContactOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.GenerateInputOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.GenerateOutputOption); // Grab button from Common_Function.js
    ComUtils.accountmenu.appendChild(ComUtils.AccountOption); // Grab button from Common_Function.js

    let heading = document.createElement('h1');
    heading.classList.add('header');
    heading.textContent = 'User Account';

    let logoutButton=document.createElement('button');
    logoutButton.textContent='Logout';
    logoutButton.classList.add('LoginButton')
    


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
    scrollButton.classList.add('LoginButton');

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

    

    /***************Navigation Bar***************/
    appContainer.appendChild(navwrapper);
    /***************Parent Div containers***************/
    appContainer.appendChild(heading);
    // 6. Append the new elements to the page
    appContainer.appendChild(scrollableContent);
    appContainer.appendChild(scrollButton);
    appContainer.appendChild(logoutButton);
    appContainer.appendChild(ComUtils.FooterBody);
    /***************Inner structured Div Containers***************/
    ComUtils.FooterBody.appendChild(ComUtils.Footerdiv);
    /***************Inner Div containers to hold content***************/
    ComUtils.Footerdiv.appendChild(ComUtils.Footerinnerdiv);
    ComUtils.Footerdiv.appendChild(ComUtils.Footerinnerdiv2);
    ComUtils.Footerdiv.appendChild(ComUtils.Footerinnerdiv3);
    /***************Text to be inserted in inner div containers structure***************/
    ComUtils.Footerinnerdiv2.appendChild(ComUtils.Footer);
    /***************Images to be used by page***************/
    ComUtils.Footerinnerdiv.appendChild(ComUtils.Socialmediaicon1);
    ComUtils.Footerinnerdiv.appendChild(ComUtils.Socialmediaicon2);
    ComUtils.Footerinnerdiv.appendChild(ComUtils.Socialmediaicon3);
    ComUtils.Footerinnerdiv.appendChild(ComUtils.Socialmediaicon4);
    ComUtils.Footerinnerdiv.appendChild(ComUtils.Socialmediaicon5);
    ComUtils.Footerinnerdiv.appendChild(ComUtils.Socialmediaicon6);
    ComUtils.Footerinnerdiv3.appendChild(ComUtils.Brand);
    ComUtils.Footerinnerdiv3.appendChild(ComUtils.Texan);
    /***************Observer Code Searching for Animations***************/
    const allAnimationedElements = document.querySelectorAll('.animation');
    allAnimationedElements.forEach((element) => observer.observe(element));
}
