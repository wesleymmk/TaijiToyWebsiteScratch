// Find the main container element in the HTML
const appContainer = document.getElementById('app');

// --- Let's build a login form dynamically ---

// Create a heading element
const heading = document.createElement('h1');
heading.textContent = 'Welcome! Please Log In';

// Create the form element
const loginForm = document.createElement('form');
loginForm.id = 'login-form';

// Create the email input
const emailInput = document.createElement('input');
emailInput.type = 'email';
emailInput.placeholder = 'Enter your email';
emailInput.id = 'login-email';

// Create the password input
const passwordInput = document.createElement('input');
passwordInput.type = 'password';
passwordInput.placeholder = 'Enter your password';
passwordInput.id = 'login-password';

// Create the submit button
const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.textContent = 'Login';

// --- Add an event listener to the form ---
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from reloading the page

    const email = emailInput.value;
    const password = passwordInput.value;

    // This part is the SAME as the previous example.
    // We use a relative path to call our PHP backend script.
    fetch('api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data);
            // Here you would handle the login success/failure
        });
});


// --- Now, append all the created elements to the DOM ---
// This makes them appear on the page.
appContainer.appendChild(heading);
loginForm.appendChild(emailInput);
loginForm.appendChild(passwordInput);
loginForm.appendChild(submitButton);
appContainer.appendChild(loginForm);