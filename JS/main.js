

// Find the main container element in the HTML


// --- Function to clear the current view ---


//import { renderWelcomeView, clearAppContainer, appContainer } from "./Authenticaiton_Page.js";
/*import * as ComUtils from './Common_Function.js';
import * as Utils from './Authentication_Page.js';
import * as GenUtils from './Order_Generation.js';*/

/*function LoadContainer() {
    appContainer();
}

function LoadClear() {
    clearAppContainer();
}*/


/* the following code was a mock main.js to test implemtation of backend this was made by Anthony Guzman 
this code wont be used but here to show what was worked on this week
// --- Get reference to HTML container ---
const appContainer = document.getElementById('app');

function clearAppContainer() {
    appContainer.innerHTML = '';
}

/// --- Render AI Generator View ---
function renderAIGeneratorView() {
    clearAppContainer();

    const heading = document.createElement('h1');
    heading.textContent = ' Discover Your Core Values & Traits';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'core-values-input';
    input.placeholder = 'e.g. Creativity, Faith, Resilience';
    input.style.width = '100%';
    input.style.marginBottom = '10px';

    const generateButton = document.createElement('button');
    generateButton.textContent = 'Generate AI Traits';

    const outputText = document.createElement('pre');
    outputText.id = 'ai-output';
    outputText.style.whiteSpace = 'pre-wrap';
    outputText.style.marginTop = '20px';
    outputText.style.border = '1px solid #ccc';
    outputText.style.padding = '10px';
    outputText.style.borderRadius = '8px';

    const image = document.createElement('img');
    image.id = 'ai-image';
    image.style.maxWidth = '400px';
    image.style.marginTop = '20px';
    image.style.display = 'none'; // hide until needed

    generateButton.addEventListener('click', () => {
        const coreValues = input.value.trim();

        if (!coreValues) {
            outputText.textContent = ' Please enter at least one core value.';
            return;
        }

        generateButton.disabled = true;
        outputText.textContent = ' Generating your personalized traits...';

        fetch('api/push_traits.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coreValues })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                outputText.textContent = data.text;
                if (data.imageBase64) {
                    image.src = `data:image/png;base64,${data.imageBase64}`;
                    image.style.display = 'block';
                }
            } else {
                outputText.textContent = '⚠️ Error: ' + data.message;
            }
        })
        .catch(err => {
            outputText.textContent = ' Request failed: ' + err.message;
        })
        .finally(() => {
            generateButton.disabled = false;
        });
    });


    const backBtn = document.createElement('button');
    backBtn.textContent = ' Back to Login';
    backBtn.style.marginTop = '15px';
    backBtn.addEventListener('click', renderLoginView); // or any other landing view

    appContainer.appendChild(heading);
    appContainer.appendChild(input);
    appContainer.appendChild(generateButton);
    appContainer.appendChild(outputText);
    appContainer.appendChild(image);
    appContainer.appendChild(backBtn);
}

// Basic Login View 
function renderLoginView() {
    clearAppContainer();

    const heading = document.createElement('h1');
    heading.textContent = 'Welcome!';

    const info = document.createElement('p');
    info.textContent = 'Click below to explore the Taiji Toy AI Generator.';

    const button = document.createElement('button');
    button.textContent = 'Go to AI Generator';
    button.addEventListener('click', renderAIGeneratorView);

    appContainer.appendChild(heading);
    appContainer.appendChild(info);
    appContainer.appendChild(button);
}


renderLoginView();  
*/









// THIS HAS TO BE THE VERY BOTTOM
// --- Initial Page Load ---
// When the website first loads, show the login view.


// Utils.renderWelcomeView();

// THIS HAS TO BE THE VERY BOTTOM

//*************************************************************************************************************************//
//***********************BRAND NEW IMPLEMENTATION OF WEBSITE TESTING CURRENTLY - PS****************************************//
//*************************************************************************************************************************//

import * as WelcomePage from './Authentication_Page.js';
import * as Account from './User_Account.js';
import * as InputOrder from './Order_Generation.js';
import * as OutputOrder from './Order_Gen_Output.js';
import * as ComUtils from './Common_Function.js';

const contentContainer = document.getElementById('content');

function loadPage() {
    const hash = window.location.hash.substring(1); // Get the hash, e.g., 'home', 'about', 'contact'

    let content = '';
    switch (hash) {
        case 'order-output':
            content = OutputOrder.renderGenerationOutputView();
            break;
        case 'order-input':
            content = InputOrder.renderGenerationInputView();
            break;
        case 'account':
            content = Account.renderUserAccount();
            break;
        case 'welcome-page':
        default:
            content = WelcomePage.renderWelcomeView();
            break;
    }

    contentContainer.innerHTML = content;
}

window.addEventListener('hashchange', loadPage);

loadPage();