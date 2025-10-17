// JavaScript source code
export const appContainer = document.getElementById('app');
import * as ComUtils from './Common_Function.js';
import * as Utils from './Authentication_Page.js';
import * as AccUtils from './User_Account.js';
import * as OrderOut from './Order_Gen_Output.js';

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
SubmitGeneration.addEventListener('click', async () => {
    
    // Get user input
    const coreValues = CustomerInput.value.trim();
    if (!coreValues) {
        alert('Please enter your values.');
        return;
    }

   //Disable button and show loading
    SubmitGeneration.disabled = true;
    SubmitGeneration.textContent = 'Loading...';

    //try {
        //  Send input to Node.js backend which will call Gemini
        const response = await fetch('http://localhost:3000/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coreValues })
        });

        // Parse the response from backend
        const data = await response.json();
        console.log("Backend returned:", data);

        
        
        const dataForPHP = {
            order_id: data.sqlData.output_id
        };

        // Call your existing apiCall helper function
        ComUtils.apiCall('api/display_traits.php', dataForPHP)
            // STEP 1: Open the "sealed envelope". This is the missing step.
            // This takes the raw response and parses the JSON body.
            .then(rawResponse => {
                // Also a good idea to check for network errors here
                if (!rawResponse.ok) {
                    throw new Error(`Network error: ${rawResponse.statusText}`);
                }
                return rawResponse.json();
            })
            // STEP 2: Now you have the final, parsed data.
            .then(parsedData => {
                // 'parsedData' is the final JavaScript object from your PHP script.
                console.log("Final Parsed Response from PHP:", parsedData);

                if (parsedData.success) {
                    const allToyDetails = parsedData.data;
                    console.log("Successfully fetched toy details:", allToyDetails);

                    // Now you can render the output view with the data
                    OrderOut.renderGenerationOutputView(allToyDetails);
                } else {
                    // The PHP script returned a handled error
                    console.error("Error from PHP script:", parsedData.message);
                    alert(`Error from PHP: ${parsedData.message}`);
                }
            })
            .catch(error => {
                // This .catch() will now handle network errors or JSON parsing errors.
                console.error("An error occurred during the fetch process:", error);
                alert("An error occurred. Check the console for more details.");
            });
            
        //console.log("The new order ID is:", orderId);
    //}    catch    {

    /*}    finally    {

    }*/
}
// add catch/ finally statements


);

// ================= BACKEND INTEGRATION END =================

    appContainer.appendChild(navwrapper);
    appContainer.appendChild(heading);
    appContainer.appendChild(GiftOption);
    appContainer.appendChild(CheckboxLabel);
    appContainer.appendChild(CustomerInput);
    appContainer.appendChild(SubmitGeneration);

}
