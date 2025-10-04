// JavaScript source code
export const appContainer = document.getElementById('app');
import * as ComUtils from './Common_Function.js';
import * as Utils from './Authentication_Page.js';
import * as AccUtils from './User_Account.js';

// PS creation
export function renderGenerationInputView() {
    ComUtils.clearAppContainer();
    //PS added navwrapper, This is the new implementation of the navbar. Removed html version.
    const navwrapper = document.createElement('div');
    navwrapper.id = 'order-input';
    navwrapper.classList.add('nav-wrapper');
    navwrapper.appendChild(ComUtils.HomeLogo);
    navwrapper.appendChild(ComUtils.navmenu);
    navwrapper.appendChild(ComUtils.accountmenu);
    ComUtils.Home.classList.remove('home');
    ComUtils.GenerateInputOption.classList.add('inputorder');
    ComUtils.GenerateOutputOption.classList.remove('outputorder');
    ComUtils.AccountOption.classList.remove('account');
    ComUtils.navmenu.appendChild(ComUtils.Home);
    ComUtils.navmenu.appendChild(ComUtils.GenerateInputOption);
    ComUtils.navmenu.appendChild(ComUtils.GenerateOutputOption);
    ComUtils.accountmenu.appendChild(ComUtils.AccountOption);

    let heading = document.createElement('h1');
    heading.classList.add('header');
    heading.textContent = 'Generation Input Page';

    let GiftOption = document.createElement('input');
    GiftOption.type = 'checkbox';
    GiftOption.name = 'giftOption';

    let CheckboxLabel = document.createElement('label');
    CheckboxLabel.htmlFor = 'GiftOption';
    CheckboxLabel.textContent = 'Is This a Gift?';

    let CustomerInput = document.createElement('input');
    CustomerInput.type = 'text';
    CustomerInput.placeholder = 'Enter your Values';
    CustomerInput.required = true;

    let SubmitGeneration = document.createElement("button");
    SubmitGeneration.textContent = 'Submit';
    SubmitGeneration.classList.add('LoginButton');
    SubmitGeneration.type = "submit";

      // ================= BACKEND INTEGRATION START =================
// AG 
// This section handles the connection between the frontend and the backend Node server.

// Handle "Submit" button
/*SubmitGeneration.addEventListener('click', async () => {
    
    // Get user input
    const coreValues = CustomerInput.value.trim();
    if (!coreValues) {
        alert('Please enter your values.');
        return;
    }

   //Disable button and show loading
    SubmitGeneration.disabled = true;
    SubmitGeneration.textContent = 'Loading...';

    try
    {
        //  Send input to Node.js backend which will call Gemini
        const response = await fetch('http://localhost:3000/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coreValues })
        });

        // Parse the response from backend
        const data = await response.json();
        console.log("Backend returned:", data);

        ComUtils.apiCall('api/save_traits.php', data)
            .then(response => response.json())
            .then(output_data => {
                if (output_data.success)
                {
                    //logic if save_traits.php succeeds




                }
                else
                {
                    //logic if save_traits.php fails



                }
            })

    }
}
);*/

// ================= BACKEND INTEGRATION END =================

    appContainer.appendChild(navwrapper);
    appContainer.appendChild(heading);
    appContainer.appendChild(GiftOption);
    appContainer.appendChild(CheckboxLabel);
    appContainer.appendChild(CustomerInput);
    appContainer.appendChild(SubmitGeneration);

}
