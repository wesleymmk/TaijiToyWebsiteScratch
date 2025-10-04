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
    // PS added YinYang div to hold the marketing photo
    const YinYang = document.createElement('div');
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
    // PS added MerjetingInnerdiv for pictures & text to be structured
    const MarketingInnerdiv = document.createElement('div');
    MarketingInnerdiv.classList.add('marketinner');
    // PS added MerjetingInnerdiv for pictures & text to be structured
    const MarketingInnerdiv2 = document.createElement('div');
    MarketingInnerdiv2.classList.add('marketinner');
    /***************Content to be Inserted into Div containers***************/
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
    /***************Inner structured Div Containers***************/
    Body.appendChild(Titlediv);+
    Body.appendChild(Marketingdiv);
    Body3.appendChild(MarketingRowdiv1);
    Body3.appendChild(MarketingRowdiv2);
    Body3.appendChild(MarketingRowdiv3);
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
    /***************Images to be used by page***************/
    Body2.appendChild(Background);
    MarketingInnerdiv.appendChild(ToyPicture1);
    MarketingInnerdiv.appendChild(ToyPicture2);
    MarketingInnerdiv2.appendChild(ToyPicture3);
    MarketingInnerdiv2.appendChild(ToyPicture4);
    Body4.appendChild(Background2);

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


// PS creation, EQ Modifying 
export function renderCreateAccountView() {
    ComUtils.clearAppContainer();
    ComUtils.header();

    let heading = document.createElement('h1');
    heading.textContent = 'Create Your Account!';

    const registerForm = document.createElement('form');
    registerForm.id = 'register-form';

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
    emailCheckbox.name = 'emailCheckbox';

    let CheckboxLabel = document.createElement('label');
    CheckboxLabel.htmlFor = 'emailCheckbox';
    CheckboxLabel.textContent = 'Send you emails?';

    let CreateAccountButton = document.createElement("button");
    CreateAccountButton.textContent = 'Create Account';
    CreateAccountButton.classList.add('LoginButton');
    CreateAccountButton.type="submit";

    let LoginButton = document.createElement("button");
    LoginButton.textContent = 'Already have an account? Login';
    LoginButton.classList.add('LoginButton');
    LoginButton.addEventListener('click', renderWelcomeView);

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
        //

        // call this function when sending data package as apposed to doing the whole fetch method manually
        ComUtils.apiCall('api/registrar.php', registrar_Data)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    AccUtils.renderUserAccount();
                } else {
                    alert(`Registraion Failed: ${data.message}`);
                }
            });
    });


    appContainer.appendChild(heading);
    appContainer.appendChild(emailAccount);
    appContainer.appendChild(passwordInput);
    appContainer.appendChild(emailCheckbox);
    appContainer.appendChild(CheckboxLabel);
    appContainer.appendChild(CreateAccountButton);
    appContainer.appendChild(LoginButton);

}
function renderLoginView() {
    ComUtils.clearAppContainer();

    let heading = document.createElement('h1');
    heading.classList.add('header');
    heading.textContent = 'Log In To Your Account!';

    appContainer.appendChild(heading);
}

export const Trait_1 = 'This text is within Authentication_Page.js and testing linking dynamic text';
