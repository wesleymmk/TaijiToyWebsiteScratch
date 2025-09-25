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
    ComUtils.header();
    
    let heading = document.createElement('h1');
    heading.classList.add('header');
    heading.textContent = 'Welcome to Taiji Toys';

    let emailAccount = document.createElement('input');
    emailAccount.type = 'email';
    emailAccount.placeholder = 'Enter your email';
    emailAccount.required = true;

    let passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Enter your password';
    passwordInput.required = true;  

    let LoginButton = document.createElement("button");
    LoginButton.textContent = 'Login';
    LoginButton.classList.add('LoginButton');

    /*Pop up button temporary*/
    let PopupButton = document.createElement("button");
    PopupButton.textContent = 'popup Login';
    PopupButton.classList.add('PopupButton');
    PopupButton.addEventListener('click', showPopupModal);

    let CreateAccountButton = document.createElement("button");
    CreateAccountButton.textContent = 'Create Account';
    CreateAccountButton.classList.add('LoginButton');
    CreateAccountButton.addEventListener('click', renderCreateAccountView);

    let GenerationButtonOutput = document.createElement("button");
    GenerationButtonOutput.textContent = 'Generation Output (Temp)';
    GenerationButtonOutput.classList.add('LoginButton');
    GenerationButtonOutput.addEventListener('click', Gen2Utils.renderGenerationOutputView);

    let GenerationButtonInput = document.createElement("button");
    GenerationButtonInput.textContent = 'Generation Input (Temp)';
    GenerationButtonInput.classList.add('LoginButton');
    GenerationButtonInput.addEventListener('click', GenUtils.renderGenerationInputView);

    appContainer.appendChild(heading);
    appContainer.appendChild(emailAccount);
    appContainer.appendChild(passwordInput);
    appContainer.appendChild(LoginButton);
    appContainer.appendChild(PopupButton);
    appContainer.appendChild(CreateAccountButton);
    appContainer.appendChild(GenerationButtonOutput);
    appContainer.appendChild(GenerationButtonInput);
}
/*Popup function done by Ernesto Q.*/ 
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
        Signinbutton.classList.add('Signinbutton');

        let CreateAccountButton = document.createElement("button");
        CreateAccountButton.textContent = 'Create Account';
        CreateAccountButton.classList.add('CreateAccountButton');

        CreateAccountButton.addEventListener('click', () => {
            modal.style.display = "none"; // Close the login popup first
            showCreateAccountPopup();      // Then open the create account popup
        });     

        // Append everything together
        modalContent.appendChild(closeButton);
        modalContent.appendChild(popupHeading);
        modalContent.appendChild(emailAccount);
        modalContent.appendChild(passwordInput)
        modalContent.appendChild(Signinbutton);
        modalContent.appendChild(CreateAccountButton);
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
        CreateAccountButton.classList.add('LoginButton');
        CreateAccountButton.type = "submit";

        registerForm.addEventListener('submit', (event) => {
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

        // Send the data to our register.php script
        fetch('api/register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        })
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