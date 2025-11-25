// This file contains common functions used in multiple .js files.
// Its primary purpose is to reduce the code base's size and increase organization.
// It does this through having 'common functions' such as the clear HTML code function.
export const appContainer = document.getElementById('app');
import * as ComUtils from './Common_Function.js';

export function renderAdminView() {
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
    navwrapper.id = 'none'; // This is adding an id for the css class to specifically target this attribute
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
    ComUtils.AboutOption.classList.remove('about'); // Class removed
    ComUtils.HamburgerDiv.appendChild(ComUtils.Hamburgerline1); // Lines for Hamburger Menu
    ComUtils.HamburgerDiv.appendChild(ComUtils.Hamburgerline2); // Lines for Hamburger Menu
    ComUtils.HamburgerDiv.appendChild(ComUtils.Hamburgerline3); // Lines for Hamburger Menu
    ComUtils.navmenu.appendChild(ComUtils.Home); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.StoreOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.AboutOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.ContactOption); // Grab button from Common_Function.js
    /***************Parent Div Containers***************/
    // PS added Body This div will hold the title & other div elements
    const Body = document.createElement('div');
    Body.classList.add('body3', 'special');
    const Body2 = document.createElement('div');
    Body2.classList.add('body3', 'special');
    const Body3 = document.createElement('div');
    Body3.classList.add('body3', 'special');
    /***************Inner Structure Div Containers***************/
    const OuterDiv1 = document.createElement('div');
    OuterDiv1.classList.add('outerdiv');
    const OuterDiv2 = document.createElement('div');
    OuterDiv2.classList.add('outerdiv');
    /***************Innermost Div containers holding text or images***************/
    const Histogram1 = document.createElement('div');
    Histogram1.classList.add('histogram');
    const TitleDiv1 = document.createElement('div');
    TitleDiv1.classList.add('titledivad');
    const InnerDiv1 = document.createElement('div');
    InnerDiv1.classList.add('innerdivad');
    const InnerDiv2 = document.createElement('div');
    InnerDiv2.classList.add('innerdivad');
    const CountDiv1 = document.createElement('div');
    CountDiv1.classList.add('count');
    /***************bars to be inserted into Div containers***************/
    const HistogramBar1 = document.createElement('div');
    HistogramBar1.classList.add('histogrambar');
    const HistogramBar2 = document.createElement('div');
    HistogramBar2.classList.add('histogrambar');
    const HistogramBar3 = document.createElement('div');
    HistogramBar3.classList.add('histogrambar');
    const HistogramBar4 = document.createElement('div');
    HistogramBar4.classList.add('histogrambar');
    const HistogramBar5 = document.createElement('div');
    HistogramBar5.classList.add('histogrambar');
    const HistogramBar6 = document.createElement('div');
    HistogramBar6.classList.add('histogrambar');
    const HistogramBar7 = document.createElement('div');
    HistogramBar7.classList.add('histogrambar');
    const HistogramBar8 = document.createElement('div');
    HistogramBar8.classList.add('histogrambar');
    const HistogramBar9 = document.createElement('div');
    HistogramBar9.classList.add('histogrambar');
    const HistogramBar10 = document.createElement('div');
    HistogramBar10.classList.add('histogrambar');
    const HistogramBar11 = document.createElement('div');
    HistogramBar11.classList.add('histogrambar');
    const HistogramBar12 = document.createElement('div');
    HistogramBar12.classList.add('histogrambar');
    /***************Text to be Inserted into Div containers***************/
    const Title1 = document.createElement('div');
    Title1.textContent = 'Total Registered Users';
    Title1.classList.add('pagetextlargeb');
    const Count = document.createElement('div');
    Count.textContent = '1';
    Count.classList.add('pagetextmediumb');
    const label1 = document.createElement('p');
    label1.textContent = 'Active Users:'
    label1.classList.add('pagetextmediumb1n');
    const label2 = document.createElement('p');
    label2.textContent = 'Order Creation:'
    label2.classList.add('pagetextmediumb1n');
    const Value1 = document.createElement('p');
    Value1.textContent = 'X'
    Value1.classList.add('pagetextmediumb1n');
    const Value2 = document.createElement('p');
    Value2.textContent = 'X'
    Value2.classList.add('pagetextmediumb1n');
    /***************Inputs fields into Div containers***************/


    /***************Navigation Bar***************/
    appContainer.appendChild(navwrapper);
    /***************Parent Div containers***************/
    appContainer.appendChild(Body);
    appContainer.appendChild(Body2);
    appContainer.appendChild(Body3);

    appContainer.appendChild(ComUtils.FooterBody);
    /***************Inner structured Div Containers***************/
    Body.appendChild(OuterDiv1);
    Body2.appendChild(OuterDiv2);
    ComUtils.FooterBody.appendChild(ComUtils.Footerdiv);
    /***************Inner Div containers to hold content***************/
    OuterDiv1.appendChild(TitleDiv1);
    OuterDiv1.appendChild(Histogram1);
    OuterDiv2.appendChild(InnerDiv1);
    OuterDiv2.appendChild(InnerDiv2);
    ComUtils.Footerdiv.appendChild(ComUtils.Footerinnerdiv);
    ComUtils.Footerdiv.appendChild(ComUtils.Footerinnerdiv2);
    ComUtils.Footerdiv.appendChild(ComUtils.Footerinnerdiv3);
    /***************Text to be inserted in inner div containers structure***************/
    InnerDiv1.appendChild(label1);
    InnerDiv1.appendChild(Value1);
    InnerDiv2.appendChild(label2);
    InnerDiv2.appendChild(Value2);
    TitleDiv1.appendChild(Title1);
    Histogram1.appendChild(HistogramBar1);
    Histogram1.appendChild(HistogramBar2);
    Histogram1.appendChild(HistogramBar3);
    Histogram1.appendChild(HistogramBar4);
    Histogram1.appendChild(HistogramBar5);
    Histogram1.appendChild(HistogramBar6);
    Histogram1.appendChild(HistogramBar7);
    Histogram1.appendChild(HistogramBar8);
    Histogram1.appendChild(HistogramBar9);
    Histogram1.appendChild(HistogramBar10);
    Histogram1.appendChild(HistogramBar11);
    Histogram1.appendChild(HistogramBar12);
    HistogramBar1.appendChild(CountDiv1);
    CountDiv1.appendChild(Count);
    ComUtils.Footerinnerdiv2.appendChild(ComUtils.Footer);
    /***************Input elements to be used by page***************/
    
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
};