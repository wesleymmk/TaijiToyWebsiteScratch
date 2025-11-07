// JavaScript source code
//collaboration betwwen PS & EQ
import * as ComUtils from './Common_Function.js';
import * as Utils from './Authentication_Page.js';
export const appContainer = document.getElementById('app');
import * as AccUtils from './User_Account.js';

export function renderGenerationOutputView(order_ID_param) {
    
    ComUtils.clearAppContainer();

    const order_ID_from_storage = localStorage.getItem('selectedOrderId');
    
    // 2. Clear it so we don't load it again
    if (order_ID_from_storage) {
        localStorage.removeItem('selectedOrderId');
    }

    // 3. Decide which ID to use. The stored ID (from account page)
    //    takes precedence over any parameter.
    const order_ID = order_ID_from_storage || order_ID_param;



    const dataForPHP = {
        order_id: order_ID
    };
    /***************Animation Function on Scroll***************/
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                return;
            }
        });
    }, { threshold: 0.8 });
    //PS added navwrapper, This is the new implementation of the navbar. Removed html version.
    const navwrapper = document.createElement('div');
    navwrapper.id = 'order-output'; // This is adding an id for the css class to specifically target this attribute
    navwrapper.classList.add('nav-wrapper'); // Class added
    navwrapper.appendChild(ComUtils.HomeLogo); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.navmenu); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.accountmenu); // Grab button from Common_Function.js
    ComUtils.Home.classList.remove('home'); // Class removed
    ComUtils.GenerateInputOption.classList.remove('inputorder'); // Class removed
    ComUtils.GenerateOutputOption.classList.add('outputorder'); // Class added
    ComUtils.AccountOption.classList.remove('account'); // Class removed
    ComUtils.navmenu.appendChild(ComUtils.Home); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.StoreOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.AboutOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.ContactOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.GenerateInputOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.GenerateOutputOption); // Grab button from Common_Function.js
    ComUtils.accountmenu.appendChild(ComUtils.AccountOption); // Grab button from Common_Function.js

    let heading = document.createElement('h1');
    heading.classList.add('header');
    heading.textContent = 'Generation Output Page';

    let generatedcontent_space = document.createElement('div');
    generatedcontent_space.classList.add('generatedcontent-space');
    generatedcontent_space.textContent = 'Loading your generated toys...'; // Show a loading message
    

    let generatedcontent_space_2 = document.createElement('div');
    generatedcontent_space_2.classList.add('generatedcontent-space');
    //generatedcontent_space_2.textContent = 'Loading your generated toys...'; // Show a loading message
    

    let generatedcontent_space_3 = document.createElement('div');
    generatedcontent_space_3.classList.add('generatedcontent-space');
    //generatedcontent_space_2.textContent = 'Loading your generated toys...'; // Show a loading message
    

    let generatedcontent_space_4 = document.createElement('div');
    generatedcontent_space_4.classList.add('generatedcontent-space');
    //generatedcontent_space_2.textContent = 'Loading your generated toys...'; // Show a loading message
    

    let generatedcontent_space_5 = document.createElement('div');
    generatedcontent_space_5.classList.add('generatedcontent-space');
    //generatedcontent_space_2.textContent = 'Loading your generated toys...'; // Show a loading message
    
    let generatedcontent_space_6 = document.createElement('div');
    generatedcontent_space_6.classList.add('generatedcontent-space');
    //generatedcontent_space_2.textContent = 'Loading your generated toys...'; // Show a loading message
    


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


                const ShortText1 = document.createElement("p");
                ShortText1.textContent = output_desc_short_toy1;

                const LongText1 = document.createElement("p");
                LongText1.textContent = output_desc_long_toy1;

                const ShortText2 = document.createElement("p");
                ShortText2.textContent = output_desc_short_toy2;

                const LongText2 = document.createElement("p");
                LongText2.textContent = output_desc_long_toy2;

                const ShortText3 = document.createElement("p");
                ShortText3.textContent = output_desc_short_toy3;

                const LongText3 = document.createElement("p");
                LongText3.textContent = output_desc_long_toy3;

                const ShortText4 = document.createElement("p");
                ShortText4.textContent = output_desc_short_toy4;

                const LongText4 = document.createElement("p");
                LongText4.textContent = output_desc_long_toy4;

                const ShortText5 = document.createElement("p");
                ShortText5.textContent = output_desc_short_toy5;

                const LongText5 = document.createElement("p");
                LongText5.textContent = output_desc_long_toy5;

                const ShortText6 = document.createElement("p");
                ShortText6.textContent = output_desc_short_toy6;

                const LongText6 = document.createElement("p");
                LongText6.textContent = output_desc_long_toy6;




                generatedcontent_space.appendChild(TraitText1);
                generatedcontent_space.appendChild(TraitText2);
                generatedcontent_space.appendChild(TraitText3);
                generatedcontent_space.appendChild(TraitText4);
                generatedcontent_space.appendChild(TraitText5);
                generatedcontent_space.appendChild(TraitText6);
                generatedcontent_space_4.appendChild(TraitText7);
                generatedcontent_space_4.appendChild(TraitText8);
                generatedcontent_space_4.appendChild(TraitText9);
                generatedcontent_space_4.appendChild(TraitText10);
                generatedcontent_space_4.appendChild(TraitText11);
                generatedcontent_space_4.appendChild(TraitText12);
                generatedcontent_space_2.appendChild(ColorText1);
                generatedcontent_space_2.appendChild(ColorText2);
                generatedcontent_space_2.appendChild(ColorText3);
                generatedcontent_space_2.appendChild(ColorText4);
                generatedcontent_space_2.appendChild(ColorText5);
                generatedcontent_space_2.appendChild(ColorText6);
                generatedcontent_space_5.appendChild(ColorText7);
                generatedcontent_space_5.appendChild(ColorText8);
                generatedcontent_space_5.appendChild(ColorText9);
                generatedcontent_space_5.appendChild(ColorText10);
                generatedcontent_space_5.appendChild(ColorText11);
                generatedcontent_space_5.appendChild(ColorText12);
                generatedcontent_space_3.appendChild(ShortText1);
                generatedcontent_space_3.appendChild(LongText1);
                generatedcontent_space_3.appendChild(ShortText2);
                generatedcontent_space_3.appendChild(LongText2);
                generatedcontent_space_3.appendChild(ShortText3);
                generatedcontent_space_3.appendChild(LongText3);
                generatedcontent_space_6.appendChild(ShortText4);
                generatedcontent_space_6.appendChild(LongText4);
                generatedcontent_space_6.appendChild(ShortText5);
                generatedcontent_space_6.appendChild(LongText5);
                generatedcontent_space_6.appendChild(ShortText6);
                generatedcontent_space_6.appendChild(LongText6);

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

    /***************Navigation Bar***************/
    appContainer.appendChild(navwrapper);
    /***************Parent Div containers***************/
    appContainer.appendChild(heading);
    appContainer.appendChild(generatedcontent_space);
    appContainer.appendChild(generatedcontent_space_2);
    appContainer.appendChild(generatedcontent_space_3);
    appContainer.appendChild(generatedcontent_space_4);
    appContainer.appendChild(generatedcontent_space_5);
    appContainer.appendChild(generatedcontent_space_6);
    appContainer.appendChild(buttonContainer);
    buttonContainer.appendChild(RegenAll);
    buttonContainer.appendChild(placeorder);
    appContainer.appendChild(ComUtils.FooterBody);
    /***************Inner structured Div Containers***************/
    ComUtils.FooterBody.appendChild(ComUtils.Footerdiv);
    /***************Inner Div containers to hold content***************/
    ComUtils.Footerdiv.appendChild(ComUtils.Footerinnerdiv);
    ComUtils.Footerdiv.appendChild(ComUtils.Footerinnerdiv2);
    ComUtils.Footerdiv.appendChild(ComUtils.Footerinnerdiv3);
    /***************Text to be inserted in inner div containers structure***************/
    ComUtils.Footerinnerdiv2.appendChild(ComUtils.Footer);
    /***************Images to be used by page***************/
    ComUtils.Footerinnerdiv.appendChild(ComUtils.Socialmediaicon1);
    ComUtils.Footerinnerdiv.appendChild(ComUtils.Socialmediaicon2);
    ComUtils.Footerinnerdiv.appendChild(ComUtils.Socialmediaicon3);
    ComUtils.Footerinnerdiv.appendChild(ComUtils.Socialmediaicon4);
    ComUtils.Footerinnerdiv.appendChild(ComUtils.Socialmediaicon5);
    ComUtils.Footerinnerdiv.appendChild(ComUtils.Socialmediaicon6);
    ComUtils.Footerinnerdiv3.appendChild(ComUtils.Brand);
    ComUtils.Footerinnerdiv3.appendChild(ComUtils.Texan);
    /***************Observer Code Searching for Animations***************/
    const allAnimationedElements = document.querySelectorAll('.animation');
    allAnimationedElements.forEach((element) => observer.observe(element));
}