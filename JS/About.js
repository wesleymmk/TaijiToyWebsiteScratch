// This file contains common functions used in multiple .js files.
// Its primary purpose is to reduce the code base's size and increase organization.
// It does this through having 'common functions' such as the clear HTML code function.
export const appContainer = document.getElementById('app');
import * as ComUtils from './Common_Function.js';
import * as AuthUtils from './Authentication_Page.js';
import * as GenUtils from './Order_Generation.js';
import * as AccUtils from './User_Account.js';
import * as Gen2Utils from './Order_Gen_Output.js';
//This is the HTML Page Clear function. 
export function clearAppContainer()  // WM code // from online modified it so that it can be exported and used accross the server
{
    appContainer.innerHTML = '';
}

export function About() {

    ComUtils.clearAppContainer(); // Clear the screen first

    /***************Auto Scroll Option***************/
    window.addEventListener('DOMContentLoaded', ComUtils.topFunction());

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                return;
            }
        });
    }, { threshold: 0.5 });
    const check = document.querySelectorAll('.show');
    addEventListener('DOMContentLoaded', () => {
        if (check == '.show') {
            ComUtils.menu.classList.toggle('show');
        }
    });
    ComUtils.menu.classList.remove('show');
    ComUtils.ExitMenu.classList.remove('show1');
    //PS added navwrapper, This is the new implementation of the navbar. Removed html version.
    const navwrapper = document.createElement('div');
    navwrapper.id = 'about'; // This is adding an id for the css class to specifically target this attribute
    navwrapper.classList.add('nav-wrapper'); // Class added
    navwrapper.appendChild(ComUtils.HomeLogo); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.menu); // Grab button from Common_Function.js
    ComUtils.menu.appendChild(ComUtils.navmenu); // Grab button from Common_Function.js
    ComUtils.menu.appendChild(ComUtils.accountmenu); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.HamburgerDiv); // Grab button from Common_Function.js
    ComUtils.Home.classList.remove('home'); // Class added
    ComUtils.CreateOption.classList.remove('inputorder'); // Class removed
    ComUtils.AccountOption.classList.remove('account'); // Class removed
    ComUtils.ContactOption.classList.remove('contact'); // Class removed
    ComUtils.AboutOption.classList.add('about'); // Class removed
    ComUtils.HamburgerDiv.appendChild(ComUtils.Hamburgerline1); // Lines for Hamburger Menu
    ComUtils.HamburgerDiv.appendChild(ComUtils.Hamburgerline2); // Lines for Hamburger Menu
    ComUtils.HamburgerDiv.appendChild(ComUtils.Hamburgerline3); // Lines for Hamburger Menu
    ComUtils.navmenu.appendChild(ComUtils.Home); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.StoreOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.AboutOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.ContactOption); // Grab button from Common_Function.js
    /***************Parent Div Containers***************/
    // PS added Body This div will hold the title & other div elements
    const Body = document.createElement('section');
    Body.classList.add('Section');
    /***************Inner Structure Div Containers***************/
    const bodytext=document.createElement('div');
    bodytext.classList.add('bodyabout');

    const AboutText=document.createElement('p');
    AboutText.classList.add('abouttext','animation');
    AboutText.textContent='The Mind Behind Taijitoy';

    const AboutText2=document.createElement('p');
    AboutText2.classList.add('abouttext2','animation');
    AboutText2.textContent='Steve Brown \nInventor, Visionary, and Owner of TaijiToy';

    const AboutText3=document.createElement('p');
    AboutText3.classList.add('abouttext2','animation')
    AboutText3.textContent='Steve Brown is the creator of TaijiToy, the first \nthree-dimensional representation of the centuries-\nold Yin and Yang symbol. Over three decades ago, \nSteve sketched his first vision for TaijiToy in the \nmargins of this college notebook. Breaking the two\n-dimensional form, he revealed whale, penguin, fish, \nand teardrop characters hiding in the contrasting \nhemispheres. Today, his idea has come to life in a \ncollection of trading toys that can be mixed, \nmatched, and joined together with 14 colors, \nyielding over 91 unique combinations.'

    const AboutText4=document.createElement('p');
    AboutText4.classList.add('abouttext2','animation')
    AboutText4.textContent='TaijiToy explores the ideas of duality and the \ncontrasting forces that exist within every person, \nplace, and thing in the world. Steve’s ever-expanding \nTaiji-Verse seeks to explore life’s mysteries while \ncaptivating and growing alongside Taiji-Fans \nworldwide.'

    const toyimg=document.createElement('img');
    toyimg.classList.add('toyimg', 'animation');
    toyimg.src='Marketing_Images/TT+product+Image+001.jpg';

    /***************Navigation Bar***************/
    appContainer.appendChild(navwrapper);
    /***************Parent Div containers***************/
    appContainer.appendChild(ComUtils.ExitMenu);
    appContainer.appendChild(Body);
    Body.appendChild(toyimg);
    Body.appendChild(bodytext);
    bodytext.appendChild(AboutText);
    bodytext.appendChild(AboutText2);
    bodytext.appendChild(AboutText3);
    bodytext.appendChild(AboutText4);
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