// This file contains common functions used in multiple .js files.
// Its primary purpose is to reduce the code base's size and increase organization.
// It does this through having 'common functions' such as the clear HTML code function.
export const appContainer = document.getElementById('app');
import * as AuthUtils from './Authentication_Page.js';
import * as GenUtils from './Order_Generation.js';
import * as AccUtils from './User_Account.js';
import * as Gen2Utils from './Order_Gen_Output.js';
//This is the HTML Page Clear function. 
export function clearAppContainer()  // WM code // from online modified it so that it can be exported and used accross the server
{
    appContainer.innerHTML = '';
}
// PS Added navmenu, accountmenu, Home, GenerateInputOption, GenerateOutputOption, AccountOption, HomeLogo.
/* These are just the buttons for the header that each webapge will call to simplify each file and reduce
repeating code*/
export const navmenu = document.createElement('div');
navmenu.classList.add('nav-menu');

export const accountmenu = document.createElement('div');
accountmenu.classList.add('account-menu');

export const Home = document.createElement('p');
Home.textContent = 'Home';
Home.classList.add('textnavmenu');
Home.addEventListener('click', function () { window.location.href = '#welcome-page'; });

export const GenerateInputOption = document.createElement('p');
GenerateInputOption.textContent = 'Input-Order';
GenerateInputOption.classList.add('textnavmenu');
GenerateInputOption.addEventListener('click', function () { window.location.href = '#order-input'; });

export const GenerateOutputOption = document.createElement('p');
GenerateOutputOption.textContent = 'Output-Order';
GenerateOutputOption.classList.add('textnavmenu');
GenerateOutputOption.addEventListener('click', function () { window.location.href = '#order-output'; });

export const AccountOption = document.createElement('p');
AccountOption.textContent = 'Account';
AccountOption.classList.add('textaccountmenu');
AccountOption.addEventListener('click', showPopupModal);

export const HomeLogo = document.createElement('img');
HomeLogo.classList.add('LogoBox');
HomeLogo.src = 'Brand_Logos/Taijitoylogolight.png';
HomeLogo.alt = 'HOME';
HomeLogo.addEventListener('click', function () { window.location.href = '#welcome-page' });

export const ShopNowButton = document.createElement('button');
ShopNowButton.classList.add('button1');
ShopNowButton.classList.add('pagetextmediumb');
ShopNowButton.textContent = 'Shop Now';

/*Popup function done by Ernesto Q.*/
//Main purpose is to open up a popup window for the login page. 
export function showPopupModal() {
    let modal = document.getElementById('myPopupModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'myPopupModal';
        modal.classList.add('modal');

        let modalContent = document.createElement('div');
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

        let ForgotPass = document.createElement("button");
        ForgotPass.textContent = 'Forgot Password?';
        ForgotPass.classList.add('LoginButton-2');

        CreateAccountButton.addEventListener('click', () => {
            modal.style.display = "none"; // Close the login popup first
            showCreateAccountPopup();      // Then open the create account popup

        });

        ForgotPass.addEventListener('click', () => {
            modal.style.display = "none"; //Close the login popup
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
            apiCall('api/login.php', login_Data)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // 1. Close the modal
                        document.getElementById('myPopupModal').style.display = "none";

                        // 2. Redirect to the logged-in view
                        // Since you import User_Account.js as AccUtils, you should call it here:
                        window.location.href = '#account';

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
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        };
    }
}
/* New popup window for the create account popup*/
/*Done by Ernesto Q.*/
export function showCreateAccountPopup() {
    let modal = document.getElementById('myCreateAccountModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'myCreateAccountModal';
        modal.classList.add('modal');

        let modalContent = document.createElement('div');
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
            apiCall('api/registrar.php', registrar_Data)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        AccUtils.renderUserAccount();
                        window.location.href = '#account';
                        CAsuccess();
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

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

//Popup for the "forgot password" popup EQ
export function ForgotPassPopup() {
    let modal = document.getElementById('ForgotPassModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'ForgotPassModal';
        modal.classList.add('modal');

        let modalContent = document.createElement('div');
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
        LinkRequest.classList.add = ('LoginButton-2');
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

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
/*Last popup page for when the user creates a new account*/
export function CAsuccess() {
    let modal = document.getElementById('CASuccessModal');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'CASuccessModal';
        modal.classList.add('modal');

        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        let closeButton = document.createElement('span');
        closeButton.classList.add('close-button');
        closeButton.innerHTML = '&times;'; // The 'x' character
        closeButton.onclick = () => {
            modal.style.display = "none";
        };

        let popupHeading = document.createElement('h2');
        popupHeading.textContent = 'Account Created Successfully!';

        let ToInputgen = document.createElement("button");
        ToInputgen.textContent = 'Generate your first order!';
        ToInputgen.classList.add('LoginButton-2'); // Corrected syntax

        ToInputgen.addEventListener('click', () => {
            window.location.href = '#order-input';
            modal.style.display = "none";

        });

        // Assemble the modal content
        modalContent.appendChild(closeButton);
        modalContent.appendChild(popupHeading);
        modalContent.appendChild(ToInputgen);

        // Add the content to the modal
        modal.appendChild(modalContent);

        // IMPORTANT: Add the newly created modal to the document body
        document.body.appendChild(modal);
    }
    modal.style.display = 'block';
}

// This function acts as an API call taking a JS object and a PHP endpoint
export function apiCall(php_file, js_object) // WM code // 
{
    return fetch(php_file, // Returns the result of fetch
        {
            method: 'POST',
            headers: {
                // tells the PHP script that the incoming data is JS
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(js_object) // this parses the data from a JS Object to a JSON string that can be read by php
        })
    /*
        .then(response =>
        {
            if (!response.ok) // Checks response
            {
                throw new Error(`No network response from ${php_file}`); // displays error that states where the problem is occuring
            }
            return response.json(); // returns response whenever 
        })
        .catch(error =>
        {
            console.error(`Fetch Error at ${php_file}:`, error);
            return { success: false, message: 'Could not connect to the server.' };
        });
        */
}

