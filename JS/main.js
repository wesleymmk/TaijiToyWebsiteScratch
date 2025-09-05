
// Find the main container element in the HTML
const appContainer = document.getElementById('app');

// --- Function to clear the current view ---
function clearAppContainer() {
    appContainer.innerHTML = '';
}

function renderWelcomeView() {
    clearAppContainer(); // Clear the screen first

    let heading = document.createElement('h1');
    heading.classList.add('header');
    heading.textContent = 'Welcome to Taiji Toys';
    

    let LoginButton = document.createElement("button");
    LoginButton.textContent = 'Login';
    LoginButton.classList.add('LoginButton');

    let CreateAccountButton = document.createElement("button");
    CreateAccountButton.textContent = 'Create Account';

    appContainer.appendChild(heading);
    appContainer.appendChild(LoginButton);
    appContainer.appendChild(CreateAccountButton);
}

function renderLoginView() {
    clearAppContainer();


}











// THIS HAS TO BE THE VERY BOTTOM
// --- Initial Page Load ---
// When the website first loads, show the login view.




renderWelcomeView();
// THIS HAS TO BE THE VERY BOTTOM