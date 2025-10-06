/* Paul-Anthony Sutton
added renderWelcomeView() to add basic functionailty*/
/* Eddited by Ernesto*/
export const appContainer = document.getElementById('app');
import * as ComUtils from './Common_Function.js';
import * as GenUtils from './Order_Generation.js';
import * as AccUtils from './User_Account.js';
import * as Gen2Utils from './Order_Gen_Output.js';

//PS Creation & EQ collaboration
export function renderWelcomeView() {
    ComUtils.clearAppContainer(); // Clear the screen first
    //PS added navwrapper, This is the new implementation of the navbar. Removed html version.
    const navwrapper = document.createElement('div');
    navwrapper.id = 'home'; // This is adding an id for the css clas sto specifically target this attribute
    navwrapper.classList.add('nav-wrapper'); // Class added
    navwrapper.appendChild(ComUtils.HomeLogo); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.navmenu); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.accountmenu); // Grab button from Common_Function.js
    ComUtils.Home.classList.add('home'); // Class added
    ComUtils.GenerateInputOption.classList.remove('inputorder'); // Class removed
    ComUtils.GenerateOutputOption.classList.remove('outputorder'); // Class removed
    ComUtils.AccountOption.classList.remove('account'); // Class removed
    ComUtils.navmenu.appendChild(ComUtils.Home); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.GenerateInputOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.GenerateOutputOption); // Grab button from Common_Function.js
    ComUtils.accountmenu.appendChild(ComUtils.AccountOption); // Grab button from Common_Function.js
    /***************Parent Div Containers***************/
    // PS added Body This div will hold the title & other div elements
    const Body = document.createElement('div');
    Body.classList.add('body');
    // PS added Body2 this will hold a transitional background
    const Body2 = document.createElement('div');
    Body2.classList.add('body');
    // PS added Body3 this will hold some marketing pictures & button
    const Body3 = document.createElement('div');
    Body3.classList.add('body2');
    // PS added Body4 This will hold a transitional background
    const Body4 = document.createElement('div');
    Body4.classList.add('body');
    // PS added Body5 This will hold marketing text
    const Body5 = document.createElement('div');
    Body5.classList.add('body3');
    // PS added Body6 This will hold marketing Title text
    const Body6 = document.createElement('div');
    Body6.classList.add('body2');
    // PS added Body7 This will hold marketing text & photo
    const Body7 = document.createElement('div');
    Body7.classList.add('body2');
    // PS added Body8 This will hold marketing text & photo
    const Body8 = document.createElement('div');
    Body8.classList.add('body3');
    /***************Inner Structure Div Containers***************/
    // PS added Titlediv this div will hold all the div elements for the marketing
    const Titlediv = document.createElement('div');
    Titlediv.classList.add('titlesection');
    // PS added Marketingdiv This will hold the div containers promoting TaijiToy
    const Marketingdiv = document.createElement('div');
    Marketingdiv.classList.add('marketing');
    // PS added MarketingRowdiv for a row structured marketing and button option
    const MarketingRowdiv1 = document.createElement('div');
    MarketingRowdiv1.classList.add('marketingdiv');
    const MarketingRowdiv2 = document.createElement('div');
    MarketingRowdiv2.classList.add('marketingdiv2');
    const MarketingRowdiv3 = document.createElement('div');
    MarketingRowdiv3.classList.add('marketingdiv3');
    // PS added MarketingRevealdiv for a row structure holding text
    const MarketingRevealdiv1 = document.createElement('div');
    MarketingRevealdiv1.classList.add('marketingrevealdiv1')
    const MarketingRevealdiv2 = document.createElement('div');
    MarketingRevealdiv2.classList.add('marketingrevealdiv2')
    const MarketingRevealdiv3 = document.createElement('div');
    MarketingRevealdiv3.classList.add('marketingrevealdiv3');
    // PS added Offersdiv for a large title transition to more marketing
    const Offersdiv = document.createElement('div');
    Offersdiv.classList.add('offersdiv');
    // PS added SOLOSdiv for an image and text marketing segment
    const SOLOSdiv = document.createElement('div');
    SOLOSdiv.classList.add('solosdiv');
    // PS added Curateddiv for curated marketing
    const Curateddiv = document.createElement('div');
    Curateddiv.classList.add('curateddiv');
    /***************Innermost Div containers holding text or images***************/
    // PS added Descriptiondiv This div will hold the marketing text above the Logo
    const Descriptiondiv = document.createElement('div');
    Descriptiondiv.classList.add('titlesection-a');
    // PS added Logodiv this div will hold the TaijiToy text
    const Logodiv = document.createElement('div');
    Logodiv.classList.add('titlesection-b');
    // PS added TradeMarkdiv this div will hold the trademark text
    const TradeMarkdiv = document.createElement('div');
    TradeMarkdiv.classList.add('titlesection-c');
    // PS added Locationdiv This will hold text promoting TaijiToy
    const Locationdiv = document.createElement('div');
    Locationdiv.classList.add('marketing-a');
    // PS added Connectdiv This will hold text promoting TaijiToy
    const Connectdiv = document.createElement('div');
    Connectdiv.classList.add('marketing-b');
    // PS added Combinediv This will hold text promoting TaijiToy
    const Combinediv = document.createElement('div');
    Combinediv.classList.add('marketing-c');
    // PS added Collectdiv This will hold text promoting TaijiToy
    const Collectdiv = document.createElement('div');
    Collectdiv.classList.add('marketing-d');
    // PS added Sharediv This will hold text promoting TaijiToy
    const Sharediv = document.createElement('div');
    Sharediv.classList.add('marketing-e');
    // PS added Agesdiv This will hold text promoting TaijiToy
    const Agesdiv = document.createElement('div');
    Agesdiv.classList.add('marketing-f');
    // PS added MarketingInnerdiv for pictures & text to be structured
    const MarketingInnerdiv = document.createElement('div');
    MarketingInnerdiv.classList.add('marketinner');
    // PS added MarketingInnerdiv for pictures & text to be structured
    const MarketingInnerdiv2 = document.createElement('div');
    MarketingInnerdiv2.classList.add('marketinner');
    // PS added MarketingRevealInnerdiv for text spacing
    const MarketingRevealInnerdiv = document.createElement('div');
    MarketingRevealInnerdiv.classList.add('marketrevealinner');
    // PS added SOLOSinnerdiv for adding text alingside image
    const SOLOSinnerdiv = document.createElement('div');
    SOLOSinnerdiv.classList.add('solosinnerdiv');
    // PS added SOLOSinnerdiv1 for adding subtext
    const SOLOSinnerdiv1 = document.createElement('div');
    SOLOSinnerdiv1.classList.add('solosinnerdiv1');
    // PS added SOLOSinnerdiv2 for adding subtext
    const SOLOSinnerdiv2 = document.createElement('div');
    SOLOSinnerdiv2.classList.add('solosinnerdiv2');
    // PS added Curatedinnerdiv for curated marketing
    const Curatedinnerdiv = document.createElement('div');
    Curatedinnerdiv.classList.add('curatedinnerdiv');
    // PS added Curatedinnerdiv2 for curated marketing
    const Curatedinnerdiv2 = document.createElement('div');
    Curatedinnerdiv2.classList.add('curatedinnerdiv2');
    /***************Text to be Inserted into Div containers***************/
    // PS added Title
    const Title = document.createElement("p");
    Title.classList.add('title');
    Title.textContent = 'TaijiToy';
    // PS added Description
    const Description = document.createElement('p');
    Description.classList.add('pagetexttitle');
    Description.textContent = '3D yin-yang';
    // PS added TradeMark
    const TradeMark = document.createElement('p');
    TradeMark.classList.add('pagetexttitle');
    TradeMark.classList.add('trademarktitle');
    TradeMark.textContent = 'TM';
    // PS added Location of manufacturing
    const Location = document.createElement('p');
    Location.classList.add('pagetextsmallw');
    Location.textContent = 'Made In Boerne, Texas, USA';
    // PS added Connect marketing text
    const Connect = document.createElement('p');
    Connect.classList.add('pagetextlargew');
    Connect.textContent = 'Connect';
    // PS added Combine marketing text
    const Combine = document.createElement('p');
    Combine.classList.add('pagetextlargew');
    Combine.textContent = 'Combine';
    // PS added Combine marketing text
    const Collect = document.createElement('p');
    Collect.classList.add('pagetextlargew');
    Collect.textContent = 'Collect';
    // PS added Share marketing text
    const Share = document.createElement('p');
    Share.classList.add('pagetextlargew');
    Share.textContent = 'Share';
    // PS added Ages marketing text
    const Ages = document.createElement('p');
    Ages.classList.add('pagetextsmallw');
    Ages.textContent = 'Made For Ages 3 + UP';
    // PS added Explore to market Toy
    const Explore = document.createElement('p');
    Explore.classList.add('pagetextmediumb');
    Explore.textContent = 'Explore The Yin-Yang';
    // PS added Explore2 to market Toy
    const Explore2 = document.createElement('p');
    Explore2.classList.add('pagetextmediumb');
    Explore2.textContent = 'Explore Collections';
    // PS added represent1 text for markting
    const Represent1 = document.createElement('p');
    Represent1.classList.add('pagetextsmallw1');
    Represent1.textContent = 'Yin and Yang represent the inherent duality in all things. A Continuous dance of opposing yet interconnected and complementary forces striving for balance and harmony.';
    // PS added represent2 text for markting
    const Represent2 = document.createElement('p');
    Represent2.classList.add('pagetextsmallw1');
    Represent2.textContent = "Taiji (the Supreme Ultimate) represents the universe's initial state of undifferentiated unity, where the opposing forces of yin and yang exist in perfect balance and mutual interaction.";
    // PS added Reveals text for TaijiToy Marketing
    const Reveals = document.createElement('p');
    Reveals.classList.add('pagetextlargew');
    Reveals.textContent = 'TaijiToy Reveals';
    // PS added Halves text for TaijiToy Marketing
    const Halves = document.createElement('p');
    Halves.classList.add('pagetextlargew');
    Halves.textContent = 'How two halves make a whole.';
    // PS added First text for TaijiToy Marketing
    const First = document.createElement('p');
    First.classList.add('pagetextsmallw1');
    First.textContent = 'For the first time. You see the inner-workings of yin-yang';
    // PS added Offer text for TaijiToy Marketing
    const Offer = document.createElement('p');
    Offer.classList.add('pagetexttitleb');
    Offer.textContent = 'What TaijiToy Offers...';
    // PS added SOLOS text for TaijiToy Marketing
    const SOLOS = document.createElement('p');
    SOLOS.classList.add('pagetextlargeb');
    SOLOS.textContent = 'TaijiToy (solos)';
    // PS added SOLOS1 text for TaijiToy Marketing
    const SOLOS1 = document.createElement('p');
    SOLOS1.classList.add('pagetextsmallb');
    SOLOS1.textContent = '- Assorted colors';
    // PS added SOLOS2 text for TaijiToy Marketing
    const SOLOS2 = document.createElement('p');
    SOLOS2.classList.add('pagetextsmallb');
    SOLOS2.textContent = '- Buy in bulk and save';
    //PS added Curated text for TaijiToy Marketing
    const Curated = document.createElement('p');
    Curated.classList.add('pagetextlargew');
    Curated.textContent = 'Curated\nCollections'
    //PS added Curated2 text for TaijiToy Marketing list
    const Curated2 = document.createElement('p');
    Curated2.classList.add('pagetextsmallw');
    Curated2.textContent = '- Spirits of the compass\n- Duality and change management\n- Trigrams of the I ching\n- Chinese Dragons\n- Chinese zondiac signs\n- Western zodiac signs';
    /***************Images to be Inserted into Div containers***************/
    // PS added background image
    const Background = document.createElement('img');
    Background.classList.add('Background');
    Background.src = 'Background/Background1.png';
    // PS added background image
    const Background2 = document.createElement('img');
    Background2.classList.add('Background');
    Background2.src = 'Background/Background2.png';
    // PS added marketing photo for homepage
    const ToyPicture1 = document.createElement('img');
    ToyPicture1.classList.add('marketimage');
    ToyPicture1.src = 'Marketing_Images/TT+product+Image+001.jpg'
    // PS added marketing photo for homepage
    const ToyPicture2 = document.createElement('img');
    ToyPicture2.classList.add('marketimage');
    ToyPicture2.src = 'Marketing_Images/TT+product+Image+002.jpg'
    // PS added marketing photo for homepage
    const ToyPicture3 = document.createElement('img');
    ToyPicture3.classList.add('marketimage');
    ToyPicture3.src = 'Marketing_Images/TT+product+Image+003.jpg'
    // PS added marketing photo for homepage
    const ToyPicture4 = document.createElement('img');
    ToyPicture4.classList.add('marketimage');
    ToyPicture4.src = 'Marketing_Images/TT+product+Image+004.jpg'
    // PS added marketing photo for homepage
    const Marketingphoto1 = document.createElement('img');
    Marketingphoto1.classList.add('marketimage1');
    Marketingphoto1.src = 'Marketing_Images/Taji-Color206.png'
    // PS added marketing2 photo for homepage
    const Marketingphoto2 = document.createElement('img');
    Marketingphoto2.classList.add('marketimage1');
    Marketingphoto2.src = 'Marketing_Images/collections+banner.jpg';

    /*Pop up button for the login*/
    let PopupButton = document.createElement("button");
    PopupButton.textContent = 'Login';
    PopupButton.classList.add('PopupButton');
    PopupButton.addEventListener('click', showPopupModal);
    // These commands just call all the elements to the screen
    /***************Navigation Bar***************/
    appContainer.appendChild(navwrapper);
    /***************Parent Div containers***************/
    appContainer.appendChild(Body);
    appContainer.appendChild(Body2);
    appContainer.appendChild(Body3);
    appContainer.appendChild(Body4);
    appContainer.appendChild(Body5);
    appContainer.appendChild(Body6);
    appContainer.appendChild(Body7);
    appContainer.appendChild(Body8);
    /***************Inner structured Div Containers***************/
    Body.appendChild(Titlediv);+
    Body.appendChild(Marketingdiv);
    Body3.appendChild(MarketingRowdiv1);
    Body3.appendChild(MarketingRowdiv2);
    Body3.appendChild(MarketingRowdiv3);
    Body5.appendChild(MarketingRevealdiv1);
    Body5.appendChild(MarketingRevealdiv2);
    Body5.appendChild(MarketingRevealdiv3);
    Body6.appendChild(Offersdiv);
    Body7.appendChild(SOLOSdiv);
    Body8.appendChild(Curateddiv);
    /***************Inner Div containers to hold content***************/
    Titlediv.appendChild(Descriptiondiv);
    Titlediv.appendChild(TradeMarkdiv);
    Titlediv.appendChild(Logodiv);
    Marketingdiv.appendChild(Locationdiv);
    Marketingdiv.appendChild(Connectdiv);
    Marketingdiv.appendChild(Combinediv);
    Marketingdiv.appendChild(Collectdiv);
    Marketingdiv.appendChild(Sharediv);
    Marketingdiv.appendChild(Agesdiv);
    MarketingRowdiv1.appendChild(MarketingInnerdiv);
    MarketingRowdiv2.appendChild(ComUtils.ShopNowButton);
    MarketingRowdiv3.appendChild(MarketingInnerdiv2);
    SOLOSdiv.appendChild(SOLOSinnerdiv);
    SOLOSinnerdiv.appendChild(SOLOSinnerdiv1);
    SOLOSinnerdiv.appendChild(SOLOSinnerdiv2);
    /***************Text to be inserted in inner div containers structure***************/
    Descriptiondiv.appendChild(Description);
    TradeMarkdiv.appendChild(TradeMark);
    Logodiv.appendChild(Title);
    Locationdiv.appendChild(Location);
    Connectdiv.appendChild(Connect);
    Combinediv.appendChild(Combine);
    Collectdiv.appendChild(Collect);
    Sharediv.appendChild(Share);
    Agesdiv.appendChild(Ages);
    MarketingRowdiv1.appendChild(Explore);
    MarketingRowdiv3.appendChild(Explore2);
    MarketingRevealdiv1.appendChild(Represent1);
    MarketingRevealdiv2.appendChild(Reveals);
    MarketingRevealdiv2.appendChild(Halves);
    MarketingRevealdiv2.appendChild(MarketingRevealInnerdiv);
    MarketingRevealdiv3.appendChild(Represent2);
    MarketingRevealInnerdiv.appendChild(First);
    Offersdiv.appendChild(Offer);
    SOLOSinnerdiv2.appendChild(SOLOS1);
    SOLOSinnerdiv2.appendChild(SOLOS2);
    SOLOSinnerdiv1.appendChild(SOLOS);
    /***************Images to be used by page***************/
    Body2.appendChild(Background);
    MarketingInnerdiv.appendChild(ToyPicture1);
    MarketingInnerdiv.appendChild(ToyPicture2);
    MarketingInnerdiv2.appendChild(ToyPicture3);
    MarketingInnerdiv2.appendChild(ToyPicture4);
    Body4.appendChild(Background2);
    SOLOSdiv.appendChild(Marketingphoto1);
    Curateddiv.appendChild(Marketingphoto2);
    Curateddiv.appendChild(Curatedinnerdiv);
    Curatedinnerdiv.appendChild(Curated);
    Curatedinnerdiv.appendChild(Curatedinnerdiv2);
    Curatedinnerdiv2.appendChild(Curated2);

    appContainer.appendChild(PopupButton);
}
/*Popup function done by Ernesto Q.*/
//Main purpose is to open up a popup window for the login page. 
export function showPopupModal(){
    let modal=document.getElementById('myPopupModal');
    if (!modal) {
        modal=document.createElement('div');
        modal.id='myPopupModal';
        modal.classList.add('modal');

        let modalContent=document.createElement('div');
        modalContent.classList.add('modal-content');

        let closeButton = document.createElement('span');
        closeButton.classList.add('close-button');
        closeButton.innerHTML = '&times;'; // The 'x' character
        closeButton.onclick = () => {
            modal.style.display = "none";
    };
    let popupHeading = document.createElement('h2');
        popupHeading.textContent = 'Login page';

        let emailAccount = document.createElement('input');
        emailAccount.type = 'email';
        emailAccount.placeholder = 'Enter your email';
        emailAccount.required = true;

        let passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.placeholder = 'Enter your password';
        passwordInput.required = true;

        let Signinbutton = document.createElement("button");
        Signinbutton.textContent = 'Sign in';
        Signinbutton.classList.add('LoginButton-2');

        let CreateAccountButton = document.createElement("button");
        CreateAccountButton.textContent = 'Create Account';
        CreateAccountButton.classList.add('LoginButton-2');

        let ForgotPass=document.createElement("button");
        ForgotPass.textContent='Forgot Password?';
        ForgotPass.classList.add('LoginButton-2');

        CreateAccountButton.addEventListener('click', () => {
            modal.style.display = "none"; // Close the login popup first
            showCreateAccountPopup();      // Then open the create account popup
        
        });     

        ForgotPass.addEventListener('click', ()=> {
            modal.style.display="none"; //Close the login popup
            ForgotPassPopup(); //Open "Forgot password popup"
        });

        //Login Button Functions
        /*Nathan D*/
        Signinbutton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default button behavior, though it might not be a form submission

            const email = emailAccount.value;
            const password = passwordInput.value;

            if (!email || !password) {
                alert('Please enter both email and password.');
                return;
            }

            const login_Data = {
                email: email,
                password: password
            };

            // Send data to the new login.php script
            ComUtils.apiCall('api/login.php', login_Data)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // 1. Close the modal
                        document.getElementById('myPopupModal').style.display = "none";

                        // 2. Redirect to the logged-in view
                        // Since you import User_Account.js as AccUtils, you should call it here:
                        AccUtils.renderUserAccount();

                    } else {
                        // Login failed (e.g., Invalid email or password)
                        alert(`Login Failed: ${data.message}`);
                    }
                })
                
        });

        // Append everything together
        modalContent.appendChild(closeButton);
        modalContent.appendChild(popupHeading);
        modalContent.appendChild(emailAccount);
        modalContent.appendChild(passwordInput)
        modalContent.appendChild(Signinbutton);
        modalContent.appendChild(CreateAccountButton);
        modalContent.appendChild(ForgotPass);
        modal.appendChild(modalContent);

        // Add the new modal to the main app container
        appContainer.appendChild(modal);
}
         modal.style.display = "block";

    // Add an event listener to close the modal if the user clicks outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        };
}
}
/* New popup window for the create account popup*/
/*Done by Ernesto Q.*/
export function showCreateAccountPopup(){
    let modal=document.getElementById('myCreateAccountModal');
    if (!modal) {
        modal=document.createElement('div');
        modal.id='myCreateAccountModal';
        modal.classList.add('modal');

        let modalContent=document.createElement('div');
        modalContent.classList.add('modal-content');

        let closeButton = document.createElement('span');
        closeButton.classList.add('close-button');
        closeButton.innerHTML = '&times;'; // The 'x' character
        closeButton.onclick = () => {
            modal.style.display = "none";
    };
    let popupHeading = document.createElement('h2');
        popupHeading.textContent = 'Create Your Account!';

        const registerForm = document.createElement('form');
        registerForm.id = 'register-form-popup';

        let emailAccount = document.createElement('input');
        emailAccount.type = 'email';
        emailAccount.placeholder = 'Enter your email';
        emailAccount.required = true;

        let passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.placeholder = 'Enter your password';
        passwordInput.required = true;

        let emailCheckbox = document.createElement('input');
        emailCheckbox.type = 'checkbox';
        emailCheckbox.id = 'emailCheckboxPopup';

        let CheckboxLabel = document.createElement('label');
        CheckboxLabel.htmlFor = 'emailCheckboxPopup';
        CheckboxLabel.textContent = ' Send me emails?';

        let CreateAccountButton = document.createElement("button");
        CreateAccountButton.textContent = 'Create Account';
        CreateAccountButton.classList.add('LoginButton-2');
        CreateAccountButton.type = "submit";

        let Back2Login = document.createElement("button");
        Back2Login.textContent = 'Already have an account? Log in!';
        Back2Login.classList.add('LoginButton-2');

        Back2Login.addEventListener('click', () => {
            modal.style.display = "none"; // Close the account creation popup first
            showPopupModal();      // Then open the login popup
        });

        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
    
            const email = emailAccount.value;
            const password = passwordInput.value;
            const receives_emails = emailCheckbox.checked; // this returns a true or false value if the checkbox is checked
            //Package all data together in a way like this
            const registrar_Data = {
                email: email,
                password: password,
                receives_emails: receives_emails //passes either true or false
            };
            // Send the data to our register.php script
            // call this function when sending data package as apposed to doing the whole fetch method manually
            ComUtils.apiCall('api/registrar.php', registrar_Data)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        AccUtils.renderUserAccount();
                        modal.style.display = "none";
                    } else {
                        alert(`Registration Failed: ${data.message}`);
                    }
                });
        });
        
        // Append everything together
        modalContent.appendChild(closeButton);
        modalContent.appendChild(popupHeading);
        registerForm.appendChild(emailAccount);
        registerForm.appendChild(passwordInput);
        registerForm.appendChild(emailCheckbox);
        registerForm.appendChild(CheckboxLabel);
        registerForm.appendChild(CreateAccountButton);
        modalContent.appendChild(registerForm); 
        modal.appendChild(modalContent);
        modalContent.appendChild(Back2Login);

        appContainer.appendChild(modal);
    }

    modal.style.display = "block";

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

//Popup for the "forgot password" popup
export function ForgotPassPopup(){
    let modal=document.getElementById('ForgotPassModal');
    if (!modal) {
        modal=document.createElement('div');
        modal.id='ForgotPassModal';
        modal.classList.add('modal');

        let modalContent=document.createElement('div');
        modalContent.classList.add('modal-content');

        let closeButton = document.createElement('span');
        closeButton.classList.add('close-button');
        closeButton.innerHTML = '&times;'; // The 'x' character
        closeButton.onclick = () => {
            modal.style.display = "none";
    };
    let popupHeading = document.createElement('h2');
        popupHeading.textContent = 'Reset Password';

        const registerForm = document.createElement('form');
        registerForm.id = 'register-form-popup';

        let emailAccount = document.createElement('input');
        emailAccount.type = 'email';
        emailAccount.placeholder = 'Enter your email';
        emailAccount.required = true;

        let LinkRequest = document.createElement("button");
        LinkRequest.textContent = 'Send Reset Link';
        LinkRequest.classList.add=('LoginButton-2');
        LinkRequest.type = "submit";

        let Back2Login = document.createElement("button");
        Back2Login.textContent = 'Back to Login';
        Back2Login.classList.add('LoginButton-2');

        Back2Login.addEventListener('click', () => {
            modal.style.display = "none"; // Close the account creation popup first
            showPopupModal();      // Then open the login popup
        });
            
       /* registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = emailAccount.value;
            const password = passwordInput.value;

            fetch('api/register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password })
            })
            .then(response => response.json())
            .then(data => {
                modal.style.display = "none"; 
                renderStatusView(data.success, data.message, email);
            });
        });*/ //Function is commented out as this was copied and pasted from other exisitng code.

        // Append everything together
        modalContent.appendChild(closeButton);
        modalContent.appendChild(popupHeading);
        registerForm.appendChild(emailAccount);
        registerForm.appendChild(LinkRequest);
        modalContent.appendChild(registerForm); 
        modal.appendChild(modalContent);
        modalContent.appendChild(Back2Login);
        appContainer.appendChild(modal);
    }

    modal.style.display = "block";

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


export const Trait_1 = 'This text is within Authentication_Page.js and testing linking dynamic text';
