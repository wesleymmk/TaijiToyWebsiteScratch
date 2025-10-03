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
    navwrapper.id = 'home';
    navwrapper.classList.add('nav-wrapper');
    navwrapper.appendChild(ComUtils.HomeLogo);
    navwrapper.appendChild(ComUtils.navmenu);
    navwrapper.appendChild(ComUtils.accountmenu);
    ComUtils.Home.classList.add('home');
    ComUtils.GenerateInputOption.classList.remove('inputorder');
    ComUtils.GenerateOutputOption.classList.remove('outputorder');
    ComUtils.AccountOption.classList.remove('account');
    ComUtils.navmenu.appendChild(ComUtils.Home);
    ComUtils.navmenu.appendChild(ComUtils.GenerateInputOption);
    ComUtils.navmenu.appendChild(ComUtils.GenerateOutputOption);
    ComUtils.accountmenu.appendChild(ComUtils.AccountOption);
    // PS added Body This div will hold the title & other div elements
    const Body = document.createElement("div");
    Body.classList.add('Homepage');
    // PS added TradeMarkdiv this div will hold the trademark text
    const TradeMarkdiv = document.createElement('div');
    TradeMarkdiv.classList.add('titlesection-c');
    // PS added Titlediv this div will hold all the div elements for the marketing
    const Titlediv = document.createElement('div');
    Titlediv.classList.add('titlesection');
    // PS added Descriptiondiv This div will hold the marketing text above the Logo
    const Descriptiondiv = document.createElement('div');
    Descriptiondiv.classList.add('titlesection-a');
    // PS added Logodiv this div will hold the TaijiToy text
    const Logodiv = document.createElement('div');
    Logodiv.classList.add('titlesection-b');
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

    /*Pop up button for the login*/
    let PopupButton = document.createElement("button");
    PopupButton.textContent = 'Login';
    PopupButton.classList.add('PopupButton');
    PopupButton.addEventListener('click', showPopupModal);
    // These commands just call all the elements to the screen
    appContainer.appendChild(navwrapper);
    appContainer.appendChild(Body);
    Body.appendChild(Titlediv);
    Titlediv.appendChild(Descriptiondiv);
    Titlediv.appendChild(TradeMarkdiv);
    Titlediv.appendChild(Logodiv);
    Descriptiondiv.appendChild(Description);
    TradeMarkdiv.appendChild(TradeMark);
    Logodiv.appendChild(Title);
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
    
            const email = emailInput.value;
            const password = passwordInput.value;
            const receives_emails = emailCheckbox.checked; // this returns a true or false value if the checkbox is checked
            //Package all data together in a way like this
            const registrar_Data = {
                email: email,
                password: password,
                receives_emails: checkbox.checked //passes either true or false
            };
            // Send the data to our register.php script
            // call this function when sending data package as apposed to doing the whole fetch method manually
            ComUtils.apiCall('api/registrar.php', registrar_Data)
                .then(response => response.json())
                .then(data => {
                    // *** THIS IS THE CHANGED PART ***
                    // Instead of an alert, we call our new function to render a status page
                    renderStatusView(data.success, data.message, email);
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

        const email = emailInput.value;
        const password = passwordInput.value;
        const receives_emails = emailCheckbox.checked; // this returns a true or false value if the checkbox is checked

        //Package all data together in a way like this

        const registrar_Data = {
            email: email,
            password: password,
            receives_emails: checkbox.checked //passes either true or false
        };

        // Send the data to our register.php script
        //

        // call this function when sending data package as apposed to doing the whole fetch method manually
        ComUtils.apiCall('api/registrar.php', registrar_Data)
            .then(response => response.json())
            .then(data => {
                // *** THIS IS THE CHANGED PART ***
                // Instead of an alert, we call our new function to render a status page
                renderStatusView(data.success, data.message, email);
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
