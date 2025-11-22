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

export function Contact() {
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
    }, { threshold: 0.8 });
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
    navwrapper.id = 'contact-us'; // This is adding an id for the css class to specifically target this attribute
    navwrapper.classList.add('nav-wrapper'); // Class added
    navwrapper.appendChild(ComUtils.HomeLogo); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.menu); // Grab button from Common_Function.js
    ComUtils.menu.appendChild(ComUtils.navmenu); // Grab button from Common_Function.js
    ComUtils.menu.appendChild(ComUtils.accountmenu); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.HamburgerDiv); // Grab button from Common_Function.js
    ComUtils.Home.classList.remove('home'); // Class added
    ComUtils.CreateOption.classList.remove('inputorder'); // Class removed
    ComUtils.AccountOption.classList.remove('account'); // Class removed
    ComUtils.ContactOption.classList.add('contact'); // Class removed
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
    /***************Inner Structure Div Containers***************/
    // PS added Titlediv this div will hold all the div elements for the marketing
    const Titlediv = document.createElement('div');
    Titlediv.classList.add('contacttitle');
    // PS added Inputsdiv this div will hold all the div elements for the marketing
    const Inputsdiv = document.createElement('div');
    Inputsdiv.classList.add('inputsdivtitle');
    /***************Innermost Div containers holding text or images***************/
    // PS added TitleInnerdiv this div will hold all the div elements for Contacting
    const TitleInnerdiv = document.createElement('div');
    TitleInnerdiv.classList.add('contacttitleinner');
    // PS added DescInnerdiv this div will hold all the div elements for Contacting
    const DescInnerdiv = document.createElement('div');
    DescInnerdiv.classList.add('contacttitleinner');
    // PS added InputInnerdiv1 this div will hold all the div elements for Contacting
    const InputInnerdiv1 = document.createElement('div');
    InputInnerdiv1.classList.add('inputinnerdivc');
    // PS added InputInnerdiv2 this div will hold all the div elements for Contacting
    const InputInnerdiv2 = document.createElement('div');
    InputInnerdiv2.classList.add('inputinnerdivc2');
    // PS added InputInnerdiv3 this div will hold all the div elements for Contacting
    const InputInnerdiv3 = document.createElement('div');
    InputInnerdiv3.classList.add('inputinnerdivc');
    // PS added InputInnerdiv4 this div will hold all the div elements for Contacting
    const InputInnerdiv4 = document.createElement('div');
    InputInnerdiv4.classList.add('inputinnerdivc2');
    // PS added InputInnerdiv5 this div will hold all the div elements for Contacting
    const InputInnerdiv5 = document.createElement('div');
    InputInnerdiv5.classList.add('inputinnerdivc');
    // PS added InputInnerdiv6 this div will hold all the div elements for Contacting
    const InputInnerdiv6 = document.createElement('div');
    InputInnerdiv6.classList.add('inputinnerdivc3');
    // PS added InputInnerdiv7 this div will hold all the div elements for Contacting
    const InputInnerdiv7 = document.createElement('div');
    InputInnerdiv7.classList.add('inputinnerdivc');
    // PS added InputInnerdiv8 this div will hold all the div elements for Contacting
    const InputInnerdiv8 = document.createElement('div');
    InputInnerdiv8.classList.add('inputinnerdivc2');
    // PS added InputInnerdiv9 this div will hold all the div elements for Contacting
    const InputInnerdiv9 = document.createElement('div');
    InputInnerdiv9.classList.add('inputinnerdivc2');
    // PS added InquirySelect this div will hold all the selection elements
    const InquirySelect = document.createElement('div')
    InquirySelect.classList.add('dropdown');
    /***************Text to be Inserted into Div containers***************/
    // PS added Title
    const Title = document.createElement("p");
    Title.classList.add('title2', 'animation');
    Title.textContent = 'TaijiToy';
    // PS added Name
    const Name = document.createElement("p");
    Name.classList.add('pagetextlargeb', 'animation');
    Name.textContent = 'Name';
    // PS added Email
    const Email = document.createElement("p");
    Email.classList.add('pagetextlargeb', 'animation');
    Email.textContent = 'Email';
    // PS added Inquiry
    const Inquiry = document.createElement("p");
    Inquiry.classList.add('pagetextlargeb', 'animation');
    Inquiry.textContent = 'Inquiry Type:';
    // PS added Message
    const Message = document.createElement("p");
    Message.classList.add('pagetextlargeb', 'animation');
    Message.textContent = 'Message';
    // PS added Required1
    const Required1 = document.createElement("p");
    Required1.classList.add('pagetextmediumb', 'animation', 'textspecial');
    Required1.textContent = '(Required)';
    // PS added Required2
    const Required2 = document.createElement("p");
    Required2.classList.add('pagetextmediumb', 'animation', 'textspecial');
    Required2.textContent = '(Required)';
    // PS added Required3
    const Required3 = document.createElement("p");
    Required3.classList.add('pagetextmediumb', 'animation', 'textspecial');
    Required3.textContent = '(Required)';
    // PS added Required4
    const Required4 = document.createElement("p");
    Required4.classList.add('pagetextmediumb', 'animation', 'textspecial');
    Required4.textContent = '(Required)';
    // PS added Desc
    const Desc = document.createElement("p");
    Desc.classList.add('pagetextmediumb', 'animation');
    Desc.textContent = "Whether you have a question, want to\
speak with us directly, or are looking to leave some feedback, \
don't hesitate to use the contact form here. We will respond \
as soon as possible.";
    // PS added GeneralInquirySelection
    const GeneralInquirySelection = document.createElement("p");
    GeneralInquirySelection.classList.add('droptext2');
    GeneralInquirySelection.textContent = "General Inquiry";
    // PS added ProvideFeedbackSelection
    const ProvideFeedback = document.createElement("p");
    ProvideFeedback.classList.add('droptext2');
    ProvideFeedback.textContent = "Provide Feedback";
    // PS added ReportIssueSelection
    const ReportIssueSelection = document.createElement("p");
    ReportIssueSelection.classList.add('droptext2');
    ReportIssueSelection.textContent = "Report an Issue";
    // PS added SuggestionSelection
    const SuggestionSelection = document.createElement("p");
    SuggestionSelection.classList.add('droptext2');
    SuggestionSelection.textContent = "Suggest a New Collection";
    /***************Inputs fields into Div containers***************/
    // PS added NameTextArea for users to enter their first name
    const NameTextArea = document.createElement('input');
    NameTextArea.placeholder = 'First Name';
    NameTextArea.classList.add('nametextarea', 'animation');
    NameTextArea.required = true;
    // PS added NameTextArea2 for users to enter contact info
    const NameTextArea2 = document.createElement('input');
    NameTextArea2.placeholder = 'Last Name';
    NameTextArea2.classList.add('nametextarea', 'animation');
    NameTextArea2.required = true;
    // PS added EmailTextArea for users to enter contact info
    const EmailTextArea = document.createElement('input');
    EmailTextArea.placeholder = 'user@domain.com';
    EmailTextArea.classList.add('emailtextarea', 'animation');
    EmailTextArea.required = true;
    // PS added InquiryButton for users to enter contact info
    const InquiryButton = document.createElement('button');
    InquiryButton.id = 'none';
    InquiryButton.textContent = 'Select An Option';
    InquiryButton.classList.add('buttondrop', 'animation', 'droptext');
    InquiryButton.addEventListener('click', () => {
        InquirySelect.classList.toggle('show');
    });
    // PS added Selectordiv1 this div will hold all the div elements for Inquiry
    const Selectordiv1 = document.createElement('button');
    Selectordiv1.classList.add('selector');
    Selectordiv1.onclick = () => {
        InquiryButton.id = 'General';
        InquiryButton.textContent = 'General Inquiry';
        InquiryButton.classList.add('pagetextmediumb');
        InquiryButton.classList.remove('droptext');
        InquirySelect.classList.toggle('show');
    }
    // PS added Selectordiv2 this div will hold all the div elements for Inquiry
    const Selectordiv2 = document.createElement('button');
    Selectordiv2.classList.add('selector');
    Selectordiv2.onclick = () => {
        InquiryButton.id = 'Feedback';
        InquiryButton.textContent = 'Provide Feedback';
        InquiryButton.classList.add('pagetextmediumb');
        InquiryButton.classList.remove('droptext');
        InquirySelect.classList.toggle('show');
    }
    // PS added Selectordiv3 this div will hold all the div elements for Inquiry
    const Selectordiv3 = document.createElement('button');
    Selectordiv3.classList.add('selector');
    Selectordiv3.onclick = () => {
        InquiryButton.id = 'Report';
        InquiryButton.textContent = 'Report an Issue';
        InquiryButton.classList.add('pagetextmediumb');
        InquiryButton.classList.remove('droptext');
        InquirySelect.classList.toggle('show');
    }
    // PS added Selectordiv4 this div will hold all the div elements for Inquiry
    const Selectordiv4 = document.createElement('button');
    Selectordiv4.classList.add('selector');
    Selectordiv4.onclick = () => {
        InquiryButton.id = 'Suggest';
        InquiryButton.textContent = 'Suggest a New Collection';
        InquiryButton.classList.add('pagetextmediumb');
        InquiryButton.classList.remove('droptext');
        InquirySelect.classList.toggle('show');
    }
    // PS added SubmitButton to allow for the users to submit information
    const SubmitButton = document.createElement('button');
    SubmitButton.textContent = 'Submit';
    SubmitButton.classList.add('button1', 'pagetextlargeb');
    // PS added MessageTextArea for users to enter contact info
    const MessageTextArea = document.createElement('textarea');
    MessageTextArea.placeholder = 'Please Type Your Message';
    MessageTextArea.classList.add('messagetextarea', 'animation');
    MessageTextArea.required = true;
    /***************Navigation Bar***************/
    appContainer.appendChild(navwrapper);
    /***************Parent Div containers***************/
    appContainer.appendChild(ComUtils.ExitMenu);
    appContainer.appendChild(Body);
    appContainer.appendChild(ComUtils.FooterBody);
    /***************Inner structured Div Containers***************/
    Body.appendChild(Titlediv);
    Body.appendChild(Inputsdiv);
    ComUtils.FooterBody.appendChild(ComUtils.Footerdiv);
    /***************Inner Div containers to hold content***************/
    Titlediv.appendChild(TitleInnerdiv);
    Titlediv.appendChild(DescInnerdiv);
    Inputsdiv.appendChild(InputInnerdiv1);
    Inputsdiv.appendChild(InputInnerdiv2);
    Inputsdiv.appendChild(InputInnerdiv3);
    Inputsdiv.appendChild(InputInnerdiv4);
    Inputsdiv.appendChild(InputInnerdiv5);
    Inputsdiv.appendChild(InputInnerdiv6);
    Inputsdiv.appendChild(InputInnerdiv7);
    Inputsdiv.appendChild(InputInnerdiv8);
    Inputsdiv.appendChild(InputInnerdiv9);
    ComUtils.Footerdiv.appendChild(ComUtils.Footerinnerdiv);
    ComUtils.Footerdiv.appendChild(ComUtils.Footerinnerdiv2);
    ComUtils.Footerdiv.appendChild(ComUtils.Footerinnerdiv3);
    /***************Text to be inserted in inner div containers structure***************/
    TitleInnerdiv.appendChild(Title);
    DescInnerdiv.appendChild(Desc);
    InputInnerdiv1.appendChild(Name);
    InputInnerdiv1.appendChild(Required1);
    InputInnerdiv3.appendChild(Email);
    InputInnerdiv3.appendChild(Required2);
    InputInnerdiv5.appendChild(Inquiry);
    InputInnerdiv5.appendChild(Required3);
    InputInnerdiv7.appendChild(Message);
    InputInnerdiv7.appendChild(Required4);
    ComUtils.Footerinnerdiv2.appendChild(ComUtils.Footer);
    /***************Input elements to be used by page***************/
    InputInnerdiv2.appendChild(NameTextArea);
    InputInnerdiv2.appendChild(NameTextArea2);
    InputInnerdiv4.appendChild(EmailTextArea);
    InputInnerdiv6.appendChild(InquiryButton);
    InputInnerdiv6.appendChild(InquirySelect);
    InputInnerdiv8.appendChild(MessageTextArea);
    InquirySelect.appendChild(Selectordiv1);
    InquirySelect.appendChild(Selectordiv2);
    InquirySelect.appendChild(Selectordiv3);
    InquirySelect.appendChild(Selectordiv4);
    Selectordiv1.appendChild(GeneralInquirySelection);
    Selectordiv2.appendChild(ProvideFeedback);
    Selectordiv3.appendChild(ReportIssueSelection);
    Selectordiv4.appendChild(SuggestionSelection);
    InputInnerdiv9.appendChild(SubmitButton);
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