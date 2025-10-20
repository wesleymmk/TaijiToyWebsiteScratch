// JavaScript source code
//collaboration betwwen PS & EQ
import * as ComUtils from './Common_Function.js';
import * as Utils from './Authentication_Page.js';
export const appContainer = document.getElementById('app');
import * as AccUtils from './User_Account.js';

export function renderGenerationOutputView(order_ID) {
    ComUtils.clearAppContainer();

    const dataForPHP = {
        order_id: order_ID
    };

    // --- NAVBAR SETUP (Moved here to show loading state immediately) ---
    const navwrapper = document.createElement('div');
    navwrapper.id = 'order-output';
    navwrapper.classList.add('nav-wrapper');
    // ... (Your navbar append logic can go here) ...
    appContainer.appendChild(navwrapper);

    let heading = document.createElement('h1');
    heading.classList.add('header');
    heading.textContent = 'Generation Output Page';
    appContainer.appendChild(heading);

    let generatedcontent_space = document.createElement('div');
    generatedcontent_space.classList.add('generatedcontent-space');
    generatedcontent_space.textContent = 'Loading your generated toys...'; // Show a loading message
    appContainer.appendChild(generatedcontent_space);

    // --- API CALL AND DATA HANDLING ---
    ComUtils.apiCall('api/display_traits.php', dataForPHP)
        .then(rawResponse => {
            // Check for network errors (e.g., 404 Not Found)
            if (!rawResponse.ok) {
                throw new Error(`Network error: ${rawResponse.statusText}`);
            }
            return rawResponse.json();
        })
        .then(parsedData => {
            // This block only runs AFTER the data has successfully arrived and been parsed.
            console.log("Final Parsed Response from PHP:", parsedData);

            // **THE FIX:** All the logic that uses the parsedData is now moved inside this block.
            if (parsedData && parsedData.success && Array.isArray(parsedData.data)) {

                // Clear the 'Loading...' message
                generatedcontent_space.innerHTML = '';

                // --- DATA UNPACKING (Your Original Code) ---
                const allToysArray = parsedData.data;
                const toy1 = allToysArray[0];
                const toy2 = allToysArray[1];
                const toy3 = allToysArray[2];
                const toy4 = allToysArray[3];
                const toy5 = allToysArray[4];
                const toy6 = allToysArray[5];

                const output_attribute_1 = toy1.attribute_1;
                const output_attribute_2 = toy1.attribute_2;
                const output_attribute_3 = toy2.attribute_1;
                const output_attribute_4 = toy2.attribute_2;
                const output_attribute_5 = toy3.attribute_1;
                const output_attribute_6 = toy3.attribute_2;
                // ... all your other variable assignments ...

                // --- DISPLAY LOGIC (Your Original Code) ---
                const Trait1 = output_attribute_1;
                const Trait2 = output_attribute_2;
                const Trait3 = output_attribute_3;
                const Trait4 = output_attribute_4;
                const Trait5 = output_attribute_5;
                const Trait6 = output_attribute_6;

                const TraitText1 = document.createElement("p");
                TraitText1.textContent = Trait1;
                const TraitText2 = document.createElement("p");
                TraitText2.textContent = Trait2;
                const TraitText3 = document.createElement("p");
                TraitText3.textContent = Trait3;
                const TraitText4 = document.createElement("p");
                TraitText4.textContent = Trait4;
                const TraitText5 = document.createElement("p");
                TraitText5.textContent = Trait5;
                const TraitText6 = document.createElement("p");
                TraitText6.textContent = Trait6;

                generatedcontent_space.appendChild(TraitText1);
                generatedcontent_space.appendChild(TraitText2);
                generatedcontent_space.appendChild(TraitText3);
                generatedcontent_space.appendChild(TraitText4);
                generatedcontent_space.appendChild(TraitText5);
                generatedcontent_space.appendChild(TraitText6);

            } else {
                // The PHP script returned a handled error (e.g., success: false)
                throw new Error(parsedData.message || "Invalid data structure from server.");
            }
        })
        .catch(error => {
            // This .catch() will now handle ALL errors: network errors, JSON parsing errors,
            // or the specific errors we threw above.
            console.error("A critical error occurred:", error.message);
            generatedcontent_space.textContent = `Sorry, an unexpected error occurred: ${error.message}`;
        });

    // --- ACTION BUTTONS ---
    // This part can stay outside because it doesn't depend on the server response.
    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    let RegenAll = document.createElement("button");
    RegenAll.textContent = 'Regenerate All';
    RegenAll.classList.add('RegenText');

    let placeorder = document.createElement("button");
    placeorder.textContent = 'Place an order';
    placeorder.classList.add('RegenText')

    appContainer.appendChild(buttonContainer);
    buttonContainer.appendChild(RegenAll);
    buttonContainer.appendChild(placeorder);
}