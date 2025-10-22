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
    navwrapper.id = 'order-output'; // This is adding an id for the css class to specifically target this attribute
    navwrapper.classList.add('nav-wrapper'); // Class added
    navwrapper.appendChild(ComUtils.HomeLogo); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.navmenu); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.accountmenu); // Grab button from Common_Function.js
    ComUtils.Home.classList.remove('home'); // Class added
    ComUtils.GenerateInputOption.classList.remove('inputorder'); // Class removed
    ComUtils.GenerateOutputOption.classList.add('outputorder'); // Class removed
    ComUtils.AccountOption.classList.remove('account'); // Class removed
    ComUtils.navmenu.appendChild(ComUtils.Home); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.GenerateInputOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.GenerateOutputOption); // Grab button from Common_Function.js
    ComUtils.accountmenu.appendChild(ComUtils.AccountOption); // Grab button from Common_Function.js
    appContainer.appendChild(navwrapper);

    let heading = document.createElement('h1');
    heading.classList.add('header');
    heading.textContent = 'Generation Output Page';
    appContainer.appendChild(heading);

    const Body2 = document.createElement('div');
    Body2.classList.add('body3');
    // PS added Body3 this will hold some marketing pictures & button
    const Body3 = document.createElement('div');
    Body3.classList.add('body3');
    // PS added Body4 This will hold a transitional background
    const Body4 = document.createElement('div');
    Body4.classList.add('body3');
    // PS added Body5 This will hold marketing text
    const Body5 = document.createElement('div');
    Body5.classList.add('body3');
    appContainer.appendChild(Body2);
    appContainer.appendChild(Body3);
    appContainer.appendChild(Body4);
    appContainer.appendChild(Body5);

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
                const output_attribute_7 = toy4.attribute_1;
                const output_attribute_8 = toy4.attribute_2;
                const output_attribute_9 = toy5.attribute_1;
                const output_attribute_10 = toy5.attribute_2;
                const output_attribute_11 = toy6.attribute_1;
                const output_attribute_12 = toy6.attribute_2;
                const output_color_1 = toy1.color_1
                const output_color_2 = toy1.color_2
                const output_color_3 = toy2.color_1
                const output_color_4 = toy2.color_2
                const output_color_5 = toy3.color_1
                const output_color_6 = toy3.color_2
                const output_color_7 = toy4.color_1
                const output_color_8 = toy4.color_2
                const output_color_9 = toy5.color_1
                const output_color_10 = toy5.color_2
                const output_color_11 = toy6.color_1
                const output_color_12 = toy6.color_2
                const output_desc_short_toy1 = toy1.desc_short;
                const output_desc_long_toy1 = toy1.desc_long;
                const output_desc_short_toy2 = toy2.desc_short;
                const output_desc_long_toy2 = toy2.desc_long;
                const output_desc_short_toy3 = toy3.desc_short;
                const output_desc_long_toy3 = toy3.desc_long;
                const output_desc_short_toy4 = toy4.desc_short;
                const output_desc_long_toy4 = toy4.desc_long;
                const output_desc_short_toy5 = toy5.desc_short;
                const output_desc_long_toy5 = toy5.desc_long;
                const output_desc_short_toy6 = toy6.desc_short;
                const output_desc_long_toy6 = toy6.desc_long;
                // ... all your other variable assignments ...

                // --- DISPLAY LOGIC (Your Original Code) ---
                const Trait1 = output_attribute_1;
                const Trait2 = output_attribute_2;
                const Trait3 = output_attribute_3;
                const Trait4 = output_attribute_4;
                const Trait5 = output_attribute_5;
                const Trait6 = output_attribute_6;
                const Trait7 = output_attribute_7;
                const Trait8 = output_attribute_8;
                const Trait9 = output_attribute_9;
                const Trait10 = output_attribute_10;
                const Trait11 = output_attribute_11;
                const Trait12 = output_attribute_12;
                const Color1 = output_color_1;
                const Color2 = output_color_2;
                const Color3 = output_color_3;
                const Color4 = output_color_4;
                const Color5 = output_color_5;
                const Color6 = output_color_6;
                const Color7 = output_color_7;
                const Color8 = output_color_8;
                const Color9 = output_color_9;
                const Color10 = output_color_10;
                const Color11 = output_color_11;
                const Color12 = output_color_12;
                const DescriptionL_1 = output_desc_long_toy1;
                const DescriptionS_1 = output_desc_short_toy1;
                const DescriptionL_2 = output_desc_long_toy2;
                const DescriptionS_2 = output_desc_short_toy2;
                const DescriptionL_3 = output_desc_long_toy3;
                const DescriptionS_3 = output_desc_short_toy3;
                const DescriptionL_4 = output_desc_long_toy4;
                const DescriptionS_4 = output_desc_short_toy4;
                const DescriptionL_5 = output_desc_long_toy5;
                const DescriptionS_5 = output_desc_short_toy5;
                const DescriptionL_6 = output_desc_long_toy6;
                const DescriptionS_6 = output_desc_short_toy6;

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
                const TraitText7 = document.createElement("p");
                TraitText7.textContent = Trait7;
                const TraitText8 = document.createElement("p");
                TraitText8.textContent = Trait8;
                const TraitText9 = document.createElement("p");
                TraitText9.textContent = Trait9;
                const TraitText10 = document.createElement("p");
                TraitText10.textContent = Trait10;
                const TraitText11 = document.createElement("p");
                TraitText11.textContent = Trait11;
                const TraitText12 = document.createElement("p");
                TraitText12.textContent = Trait12;

                const ColorText1 = document.createElement("p");
                ColorText1.textContent = Color1;
                const ColorText2 = document.createElement("p");
                ColorText2.textContent = Color2;
                const ColorText3 = document.createElement("p");
                ColorText3.textContent = Color3;
                const ColorText4 = document.createElement("p");
                ColorText4.textContent = Color4;
                const ColorText5 = document.createElement("p");
                ColorText5.textContent = Color5;
                const ColorText6 = document.createElement("p");
                ColorText6.textContent = Color6;
                const ColorText7 = document.createElement("p");
                ColorText7.textContent = Color7;
                const ColorText8 = document.createElement("p");
                ColorText8.textContent = Color8;
                const ColorText9 = document.createElement("p");
                ColorText9.textContent = Color9;
                const ColorText10 = document.createElement("p");
                ColorText10.textContent = Color10;
                const ColorText11 = document.createElement("p");
                ColorText11.textContent = Color11;
                const ColorText12 = document.createElement("p");
                ColorText12.textContent = Color12;

                const Des_Long_Text1 = document.createElement("p");
                Des_Long_Text1.textContent = DescriptionL_1;
                const Des_Short_Text1 = document.createElement("p");
                Des_Short_Text1.textContent = DescriptionS_1;
                const Des_Long_Text2 = document.createElement("p");
                Des_Long_Text2.textContent = DescriptionL_2;
                const Des_Short_Text2 = document.createElement("p");
                Des_Short_Text2.textContent = DescriptionS_2;
                const Des_Long_Text3 = document.createElement("p");
                Des_Long_Text3.textContent = DescriptionL_3;
                const Des_Short_Text3 = document.createElement("p");
                Des_Short_Text3.textContent = DescriptionS_3;
                const Des_Long_Text4 = document.createElement("p");
                Des_Long_Text4.textContent = DescriptionL_4;
                const Des_Short_Text4 = document.createElement("p");
                Des_Short_Text4.textContent = DescriptionS_4;
                const Des_Long_Text5 = document.createElement("p");
                Des_Long_Text5.textContent = DescriptionL_5;
                const Des_Short_Text5 = document.createElement("p");
                Des_Short_Text5.textContent = DescriptionS_5;
                const Des_Long_Text6 = document.createElement("p");
                Des_Long_Text6.textContent = DescriptionL_6;
                const Des_Short_Text6 = document.createElement("p");
                Des_Short_Text6.textContent = DescriptionS_6;

                Body2.appendChild(TraitText1);
                Body2.appendChild(TraitText2);
                Body2.appendChild(TraitText3);
                Body2.appendChild(TraitText4);
                Body2.appendChild(TraitText5);
                Body2.appendChild(TraitText6);
                Body2.appendChild(TraitText7);
                Body2.appendChild(TraitText8);
                Body2.appendChild(TraitText9);
                Body2.appendChild(TraitText10);
                Body2.appendChild(TraitText11);
                Body2.appendChild(TraitText12);
                Body3.appendChild(ColorText1);
                Body3.appendChild(ColorText2);
                Body3.appendChild(ColorText3);
                Body3.appendChild(ColorText4);
                Body3.appendChild(ColorText5);
                Body3.appendChild(ColorText6);
                Body3.appendChild(ColorText7);
                Body3.appendChild(ColorText8);
                Body3.appendChild(ColorText9);
                Body3.appendChild(ColorText10);
                Body3.appendChild(ColorText11);
                Body3.appendChild(ColorText12);
                Body4.appendChild(Des_Long_Text1);
                Body5.appendChild(Des_Short_Text1);
                Body4.appendChild(Des_Long_Text2);
                Body5.appendChild(Des_Short_Text2);
                Body4.appendChild(Des_Long_Text3);
                Body5.appendChild(Des_Short_Text3);
                Body4.appendChild(Des_Long_Text4);
                Body5.appendChild(Des_Short_Text4);
                Body4.appendChild(Des_Long_Text5);
                Body5.appendChild(Des_Short_Text5);
                Body4.appendChild(Des_Long_Text6);
                Body5.appendChild(Des_Short_Text6);

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