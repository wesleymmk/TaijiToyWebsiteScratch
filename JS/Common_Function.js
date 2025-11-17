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
/* These are just the buttons for the header that each webapge will call to simplify each file and reduce
repeating code*/
/***************Auto Scroll Option***************/
/**
 * Manually scrolls the viewport to a specific element with a custom duration.
 * @param {string} selector - The CSS selector (e.g., '#myId') of the element to scroll to.
 * @param {number} duration - The total time in milliseconds the scroll should take (e.g., 500).
 */
export function manualScrollToElement(selector, duration = 500) {
    const targetElement = document.querySelector(selector);

    if (!targetElement) {
        console.error(`Error: Element with selector "${selector}" not found.`);
        return;
    }

    // Get the starting position and the target position
    const startPosition = window.pageYOffset;
    // Calculate the position of the target relative to the top of the document
    const targetPosition = targetElement.getBoundingClientRect().top + startPosition;

    // The distance to scroll
    const distance = targetPosition - startPosition;

    let startTime = null;

    // The animation loop function
    function animationStep(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;

        // Calculate the percentage of time elapsed (0 to 1)
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function: This simple one creates a smooth start/stop
        // You could replace this with a more complex function (e.g., easeInOutQuad)
        const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        // Calculate the new scroll position
        window.scrollTo(0, startPosition + distance * ease);

        // Continue the animation if not finished
        if (timeElapsed < duration) {
            window.requestAnimationFrame(animationStep);
        }
    }

    // Start the animation loop
    window.requestAnimationFrame(animationStep);
}
/***************Parent Div Containers***************/
// PS added FooterBody This will hold the footer
export const FooterBody = document.createElement('div');
FooterBody.classList.add('body2');
/***************Inner Structure Div Containers***************/
// PS added Footerdiv for footer
export const Footerdiv = document.createElement('div');
Footerdiv.classList.add('footerdiv');
/***************Innermost Div containers holding text or images***************/
// PS added navmenu to hold the navigation options
export const navmenu = document.createElement('div');
navmenu.classList.add('nav-menu');
// PS added accountmenu to hold the account option
export const accountmenu = document.createElement('div');
accountmenu.classList.add('account-menu');
// PS added Footerinnerdiv for footer
export const Footerinnerdiv = document.createElement('div');
Footerinnerdiv.classList.add('footerinnerdiv');
// PS added Footerinnerdiv2 for footer
export const Footerinnerdiv2 = document.createElement('div');
Footerinnerdiv2.classList.add('footerinnerdiv2');
// PS added Footerinnerdiv3 for footer
export const Footerinnerdiv3 = document.createElement('div');
Footerinnerdiv3.classList.add('footerinnerdiv3');
/***************Text to be Inserted into Div containers***************/
// PS added the Home field tro navigate to the homepage
export const Home = document.createElement('p');
Home.textContent = 'Home';
Home.classList.add('textnavmenu', 'animation');
Home.addEventListener('click', function () { window.location.href = '#welcome-page'; });
// PS added the LogInOption to direct to the input Generation page
export const LogInOption = document.createElement('p');
LogInOption.textContent = 'Log-In';
LogInOption.classList.add('textnavmenu', 'altanimation');
LogInOption.addEventListener('click', (event) => {
    showPopupModal();
});
// PS added the StoreOption to direct to the input Generation page
export const StoreOption = document.createElement('p');
StoreOption.textContent = 'Store';
StoreOption.classList.add('textnavmenu', 'animation');
StoreOption.addEventListener('click', function () { window.location.href = "https://www.taijitoy.com/store"; });
// PS added the AboutOption to direct to the input Generation page
export const AboutOption = document.createElement('p');
AboutOption.textContent = 'About';
AboutOption.classList.add('textnavmenu', 'animation');
AboutOption.addEventListener('click', function () { window.location.href = "https://www.taijitoy.com/about"; });
// PS added the ContactOption to direct to the input Generation page
export const ContactOption = document.createElement('p');
ContactOption.textContent = 'Contact';
ContactOption.classList.add('textnavmenu', 'animation');
ContactOption.addEventListener('click', function () { window.location.href = "https://www.taijitoy.com/contact"; });
// PS added CreateOption to direct to Create Order Page
export const CreateOption = document.createElement('p');
CreateOption.classList.add('textnavmenu', 'altanimation');
CreateOption.textContent = 'Create Order';
CreateOption.addEventListener('click', function () {
    apiCall('api/login_check.php')

        .then(response => response.json())
        .then(data => {
            if (data.success && data.isLoggedIn) {
                window.location.href = '#order-input';
            } else {
                // Login failed
                alert(`Login Failed: ${data.message}`);
                window.location.href = '#welcome-page';
                window.location.reload();
            }
        })
});
// PS added GenerateInputOption to direct to the input Generation page
export const GenerateInputOption = document.createElement('p');
GenerateInputOption.textContent = 'Generate Input';
GenerateInputOption.classList.add('textnavmenu', 'animation');
GenerateInputOption.addEventListener('click', function () { window.location.href = '#order-input'; });
// PS added GenerateOutputOption to direct to the output Generation page
export const GenerateOutputOption = document.createElement('p');
GenerateOutputOption.textContent = 'Generate Output';
GenerateOutputOption.classList.add('textnavmenu', 'animation');
GenerateOutputOption.addEventListener('click', function () { window.location.href = '#order-output'; });
// PS added AccountOption to direct to the account page
export const AccountOption = document.createElement('p');
AccountOption.textContent = 'Account';
AccountOption.classList.add('textaccountmenu', 'altanimation');
AccountOption.addEventListener('click', (event) => {

    apiCall('api/login_check.php')

        .then(response => response.json())
        .then(data => {
            if (data.success && data.isLoggedIn) {
                                
                window.location.href = '#account';
                
            } else {
                // Login failed
                alert(`Login Failed: ${data.message}`);
                showPopupModal();
            }
        })
});
// PS added LogOutOption to log out of account
export const LogOutOption = document.createElement('p');
LogOutOption.textContent = 'Logout';
LogOutOption.classList.add('textaccountmenu', 'altanimation');
// **************************************************
// START: LOGOUT LISTENER ADDED
// **************************************************
LogOutOption.addEventListener('click', (event) => {
    event.preventDefault();

    // 1. Call the server-side script to destroy the PHP session
    apiCall('api/logout.php', {})
        .then(response => {
            if (response.status === 204 || response.headers.get('content-length') === '0') {
                return {}
            }
            return response.json();

        })
        .then(data => {
            if (data && data.success) {
                console.log("Session successfully destroyed on server.");

                // 2. Cleanup Client-Side (Analytics tracker)
                resetSessionClickCount();

                // 3. Redirect to the main homepage/welcome screen
                window.location.href = '#welcome-page';
                window.location.reload();
            } else {
                console.error("Logout failed on server:", data.message);
                // Even if server failed, force redirect locally for UX
                window.location.href = '#welcome-page';
                window.location.reload();
            }
        })
        .catch(error => {
            console.error("Network error during logout:", error);
            // Force redirect locally
            window.location.href = '#welcome-page';
            window.location.reload();
        });
});
// **************************************************
// END: LOGOUT LISTENER ADDED
// **************************************************
//PS added Footer text for footer
export const Footer = document.createElement('p');
Footer.classList.add('pagetextsmallb', 'animation');
Footer.textContent = '\u00A9 YY Design. LLC 2025. All Rights Reserved. Patent Pending';
/***************Images to be Inserted into Div containers***************/
// PS added HomeLogo to direct to the homepage
export const HomeLogo = document.createElement('img');
HomeLogo.classList.add('LogoBox', 'animation');
HomeLogo.src = 'Brand_Logos/Taijitoylogolight.png';
HomeLogo.alt = 'HOME';
HomeLogo.addEventListener('click', function () { window.location.href = '#welcome-page' });
// PS added Socialmediaicon1 photo for footer and linking to social media
export const Socialmediaicon1 = document.createElement('img');
Socialmediaicon1.classList.add('socialmediaicon', 'animation');
Socialmediaicon1.src = 'Footer_Icons/Instagram_Glyph_Black.png';
Socialmediaicon1.addEventListener('click', function () {
    window.open('https://www.instagram.com/taijitoy/');
});
// PS added Socialmediaicon2 photo for footer and linking to social media
export const Socialmediaicon2 = document.createElement('img');
Socialmediaicon2.classList.add('socialmediaicon', 'animation');
Socialmediaicon2.src = 'Footer_Icons/Facebook_Logo_Primary.png';
Socialmediaicon2.addEventListener('click', function () {
    window.open('https://www.facebook.com/people/TaijiToy/61571429690590/');
});
// PS added Socialmediaicon3 photo for footer and linking to social media
export const Socialmediaicon3 = document.createElement('img');
Socialmediaicon3.classList.add('socialmediaicon', 'animation');
Socialmediaicon3.src = 'Footer_Icons/InBug-Black.png';
Socialmediaicon3.addEventListener('click', function () {
    window.open('https://www.linkedin.com/company/taiji-toy/');
});
// PS added Socialmediaicon4 photo for footer and linking to social media
export const Socialmediaicon4 = document.createElement('img');
Socialmediaicon4.classList.add('socialmediaicon', 'animation');
Socialmediaicon4.src = 'Footer_Icons/PT14361.jpg';
Socialmediaicon4.addEventListener('click', function () {
    window.open('https://www.pinterest.com/taijitoy/');
});
// PS added Socialmediaicon5 photo for footer and linking to social media
export const Socialmediaicon5 = document.createElement('img');
Socialmediaicon5.classList.add('socialmediaicon', 'animation');
Socialmediaicon5.src = 'Footer_Icons/TikTok_Icon_Black_Circle.png';
Socialmediaicon5.addEventListener('click', function () {
    window.open('https://www.tiktok.com/@taijitoy');
});
// PS added Socialmediaicon6 photo for footer and linking to social media
export const Socialmediaicon6 = document.createElement('img');
Socialmediaicon6.classList.add('socialmediaicon', 'animation');
Socialmediaicon6.src = 'Footer_Icons/logo-black.png';
Socialmediaicon6.addEventListener('click', function () {
    window.open('https://www.x.com/taijitoy');
});
// PS added Brand photo for footer
export const Brand = document.createElement('img');
Brand.classList.add('brand', 'animation');
Brand.src = 'Footer_Icons/TT+logo+transparent.png';
// PS added Texan photo for footer
export const Texan = document.createElement('img');
Texan.classList.add('texan', 'animation');
Texan.src = 'Footer_Icons/gotexan-logo_2014_black.png';
/***************Buttons to be Inserted into Div containers***************/
// PS added ShopNowButton to direct to Official TaijiToy shopping page
export const ShopNowButton = document.createElement('button');
ShopNowButton.classList.add('button1', 'pagetextmediumb', 'animation');
ShopNowButton.textContent = 'Shop Now';
ShopNowButton.addEventListener('click', function () {
    window.location.href = "https://www.taijitoy.com/store";
});
/***************Login Check***************/
document.addEventListener('DOMContentLoaded', () => {

    apiCall('api/login_check.php')

        .then(response => response.json())
        .then(data => {
            if (data.success && data.isLoggedIn) {
                accountmenu.appendChild(AccountOption);
                accountmenu.appendChild(CreateOption);
                accountmenu.appendChild(LogOutOption);
            } else {
                // Login failed
                accountmenu.appendChild(LogInOption);
            }
        })
});
/*Popup function done by Ernesto Q.*/
//Main purpose is to open up a popup window for the login page.
export function showPopupModal() {
    let modal = document.getElementById('myPopupModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'myPopupModal';
        modal.classList.add('modal');

        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content', 'altanimation');

        let closeButton = document.createElement('span');
        closeButton.classList.add('close-button');
        closeButton.innerHTML = '&times;'; // The 'x' character
        closeButton.onclick = () => {
            modal.style.display = "none";
        };
        let popupHeading = document.createElement('h2');
        popupHeading.textContent = 'Login page';

        let inputspcaing=document.createElement('div');
        inputspcaing.classList.add('inputspcaing')

        let emailAccount = document.createElement('input');
        emailAccount.type = 'email';
        emailAccount.placeholder = 'Enter your email';
        emailAccount.classList.add('inputbar');
        emailAccount.required = true;

        let inputspcaing_2=document.createElement('div');
        inputspcaing_2.classList.add('inputspcaing')

        let passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.placeholder = 'Enter your password';
        passwordInput.classList.add('inputbar');
        passwordInput.required = true;

        let buttonspcaing= document.createElement('div');
        buttonspcaing.classList.add('buttonspcaing');

        let Signinbutton = document.createElement("button");
        Signinbutton.textContent = 'Sign in';
        Signinbutton.classList.add('LoginButton-3');

        let buttonspcaing_2=document.createElement('div');
        buttonspcaing_2.classList.add('buttonspcaing')

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
                        window.location.reload();

                    } else {
                        // Login failed (e.g., Invalid email or password)
                        alert(`Login Failed: ${data.message}`);
                    }
                })

        });

        // Append everything together
        modalContent.appendChild(closeButton);
        modalContent.appendChild(popupHeading);
        modalContent.appendChild(inputspcaing);
        modalContent.appendChild(inputspcaing_2);
        inputspcaing.appendChild(emailAccount);
        inputspcaing_2.appendChild(passwordInput);
        modalContent.appendChild(buttonspcaing);
        buttonspcaing.appendChild(Signinbutton);
        modalContent.appendChild(buttonspcaing_2);
        buttonspcaing_2.appendChild(CreateAccountButton);
        buttonspcaing_2.appendChild(ForgotPass);
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
        modal.classList.add('modal', 'altanimation');

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

        let inputspcaing=document.createElement('div');
        inputspcaing.classList.add('inputspcaing')


        let emailAccount = document.createElement('input');
        emailAccount.type = 'email';
        emailAccount.placeholder = 'Enter your email';
        emailAccount.classList.add('inputbar');
        emailAccount.required = true;

        let inputspcaing_2=document.createElement('div');
        inputspcaing_2.classList.add('inputspcaing')


        let passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.placeholder = 'Enter your password';
        passwordInput.classList.add('inputbar');
        passwordInput.required = true;

        let buttonspcaing= document.createElement('div');
        buttonspcaing.classList.add('buttonspcaing');

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

        let buttonspcaing_2= document.createElement('div');
        buttonspcaing_2.classList.add('buttonspcaing');

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
        registerForm.appendChild(inputspcaing);
        inputspcaing.appendChild(emailAccount);
        registerForm.appendChild(inputspcaing_2);
        inputspcaing_2.appendChild(passwordInput);
        registerForm.appendChild(buttonspcaing);
        buttonspcaing.appendChild(emailCheckbox);
        buttonspcaing.appendChild(CheckboxLabel);
        buttonspcaing.appendChild(CreateAccountButton);
        modalContent.appendChild(registerForm);
        modal.appendChild(modalContent);
        modalContent.appendChild(buttonspcaing_2)
        buttonspcaing_2.appendChild(Back2Login);

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

        let inputspcaing=document.createElement('div');
        inputspcaing.classList.add('inputspcaing')

        let emailAccount = document.createElement('input');
        emailAccount.type = 'email';
        emailAccount.placeholder = 'Enter your email';
        emailAccount.classList.add('inputbar');
        emailAccount.required = true;

        let buttonspcaing= document.createElement('div');
        buttonspcaing.classList.add('buttonspcaing');

        let LinkRequest = document.createElement("button");
        LinkRequest.textContent = 'Send Reset Link';
        LinkRequest.classList.add('LoginButton-3');
        LinkRequest.type = "submit";

        let buttonspcaing_2= document.createElement('div');
        buttonspcaing_2.classList.add('buttonspcaing');

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
        modalContent.appendChild(inputspcaing);
        inputspcaing.appendChild(emailAccount);
        modalContent.appendChild(buttonspcaing);
        buttonspcaing.appendChild(LinkRequest);
        modalContent.appendChild(registerForm);
        modal.appendChild(modalContent);
        modalContent.appendChild(buttonspcaing_2);
        buttonspcaing_2.appendChild(Back2Login);
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
/*Added by EQ*/
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

// === ANALYTICS FUNCTIONS ===
// Done by Nathan D
// Initializes click tracking by setting up the global listener.
export function initializeClickTracking() {
    // We remove the local clickCount variable here and operate directly on sessionStorage

    // Attach a global listener to increment the count on any click
    document.addEventListener('click', (event) => {
        // Retrieve the current count, increment it, and immediately save it back.
        let currentCount = getSessionClickCount(); // Safely reads from storage
        currentCount++;
        sessionStorage.setItem('sessionClickCount', currentCount); // Safely writes to storage
    });
}

// Retrieves the current click count
export function getSessionClickCount() {
    // This reliably reads the current value from storage, defaulting to 0 if not set.
    return parseInt(sessionStorage.getItem('sessionClickCount')) || 0;
}

// Resets the counter (Called on Login/Logout/Order Submission)
export function resetSessionClickCount() {
    sessionStorage.removeItem('sessionClickCount');
    // We must also set it to 0 immediately so that the next click doesn't result in NaN.
    sessionStorage.setItem('sessionClickCount', 0);
}

// CRITICAL: Call the initialization function immediately to start tracking clicks
initializeClickTracking();

