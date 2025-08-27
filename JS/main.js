// Find the main container element in the HTML
const appContainer = document.getElementById('app');

// --- Function to clear the current view ---
function clearAppContainer() {
    appContainer.innerHTML = '';
}

// --- Function to display a success or error page ---
function renderStatusView(isSuccess, message, email = '') {
    clearAppContainer();

    const heading = document.createElement('h1');
    heading.textContent = isSuccess ? 'Success!' : 'Error';
    heading.style.color = isSuccess ? 'green' : 'red';

    const messageParagraph = document.createElement('p');

    // Create the custom message based on success or failure
    if (isSuccess) {
        messageParagraph.textContent = `Successful creation of account for '${email}'`;
    } else {
        // For errors, display the specific message from the server
        messageParagraph.textContent = `Account not created: ${message}`;
    }

    const backToLoginButton = document.createElement('button');
    backToLoginButton.type = 'button';
    backToLoginButton.textContent = 'Back to Login';
    backToLoginButton.style.marginTop = '20px';
    backToLoginButton.addEventListener('click', renderLoginView);

    // Append elements to the page
    appContainer.appendChild(heading);
    appContainer.appendChild(messageParagraph);
    appContainer.appendChild(backToLoginButton);
}


// --- Function to build the LOGIN view ---
function renderLoginView() {
    clearAppContainer(); // Clear the screen first

    // Create a heading element
    const heading = document.createElement('h1');
    heading.textContent = 'Welcome! Please Log In';

    // Create the form element
    const loginForm = document.createElement('form');
    loginForm.id = 'login-form';

    // Create inputs and button
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Enter your email';
    emailInput.required = true;

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Enter your password';
    passwordInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Login';

    // Create the "Create New User" button
    const createAccountButton = document.createElement('button');
    createAccountButton.type = 'button';
    createAccountButton.textContent = 'Create New User Account';
    createAccountButton.style.marginTop = '10px';

    // Add an event listener to switch to the registration view
    createAccountButton.addEventListener('click', renderRegisterView);

    // Add event listener for the login form submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // ... your login fetch logic will go here ...
        console.log('Login form submitted');
    });

    // Append all elements to the container
    appContainer.appendChild(heading);
    loginForm.appendChild(emailInput);
    loginForm.appendChild(passwordInput);
    loginForm.appendChild(submitButton);
    appContainer.appendChild(loginForm);
    appContainer.appendChild(createAccountButton);
}


// --- Function to build the REGISTER view ---
function renderRegisterView() {
    clearAppContainer(); // Clear the screen

    const heading = document.createElement('h1');
    heading.textContent = 'Create Your Account';

    const registerForm = document.createElement('form');
    registerForm.id = 'register-form';

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Enter your email';
    emailInput.id = 'register-email';
    emailInput.required = true;

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Choose a password';
    passwordInput.id = 'register-password';
    passwordInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Create Account';

    const backToLoginButton = document.createElement('button');
    backToLoginButton.type = 'button';
    backToLoginButton.textContent = 'Back to Login';
    backToLoginButton.style.marginTop = '10px';
    backToLoginButton.addEventListener('click', renderLoginView);

    // Add event listener for the registration form
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

    // Append elements
    appContainer.appendChild(heading);
    registerForm.appendChild(emailInput);
    registerForm.appendChild(passwordInput);
    registerForm.appendChild(submitButton);
    appContainer.appendChild(registerForm);
    appContainer.appendChild(backToLoginButton);
}


// --- Initial Page Load ---
// When the website first loads, show the login view.
renderLoginView();