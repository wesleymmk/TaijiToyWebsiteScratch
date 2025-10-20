// JavaScript source code
//collaboration betwwen PS & EQ
import * as ComUtils from './Common_Function.js';
import * as Utils from './Authentication_Page.js';
export const appContainer = document.getElementById('app');
import * as AccUtils from './User_Account.js';

export function renderGenerationOutputView() {
    ComUtils.clearAppContainer();

    // TEST DATA
    ///*
    const response = {
        "success": true,
        "message": "Successfully retrieved details for order ID 10",
        "data": [
            { "id": 19, "order_id": 10, "color_1": "Blue", "color_2": "Red", "attribute_1": "Stability", "attribute_2": "Adventure", "desc_short": "Short desc 1...", "desc_long": "Long desc 1...", "image_path": null },
            { "id": 20, "order_id": 10, "color_1": "Grey", "color_2": "Yellow", "attribute_1": "Tradition", "attribute_2": "Innovation", "desc_short": "Short desc 2...", "desc_long": "Long desc 2...", "image_path": null },
            { "id": 21, "order_id": 10, "color_1": "Brown", "color_2": "Pink", "attribute_1": "Groundedness", "attribute_2": "Playfulness", "desc_short": "Short desc 3...", "desc_long": "Long desc 3...", "image_path": null },
            { "id": 22, "order_id": 10, "color_1": "White", "color_2": "Black", "attribute_1": "Innocence", "attribute_2": "Experience", "desc_short": "Short desc 4...", "desc_long": "Long desc 4...", "image_path": null },
            { "id": 23, "order_id": 10, "color_1": "Green", "color_2": "Orange", "attribute_1": "Growth", "attribute_2": "Vitality", "desc_short": "Short desc 5...", "desc_long": "Long desc 5...", "image_path": null },
            { "id": 24, "order_id": 10, "color_1": "Silver", "color_2": "Gold", "attribute_1": "Reflection", "attribute_2": "Action", "desc_short": "Short desc 6...", "desc_long": "Long desc 6...", "image_path": null }
        ]
    };
    //*/
    //WM added parsing for taking toy array appart into seprate elements
    const allToysArray = response.data;
 
    const toy1 = allToysArray[0];
    const toy2 = allToysArray[1];
    const toy3 = allToysArray[2];
    const toy4 = allToysArray[3];
    const toy5 = allToysArray[4];
    const toy6 = allToysArray[5];

    const output_color_1 = toy1.color_1;
    const output_color_2 = toy1.color_2;
    const output_color_3 = toy2.color_1;
    const output_color_4 = toy2.color_2;
    const output_color_5 = toy3.color_1;
    const output_color_6 = toy3.color_2;
    const output_color_7 = toy4.color_1;
    const output_color_8 = toy4.color_2;
    const output_color_9 = toy5.color_1;
    const output_color_10 = toy5.color_2;
    const output_color_11 = toy6.color_1;
    const output_color_12 = toy6.color_2;
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
 

    //PS added navwrapper, This is the new implementation of the navbar. Removed html version.
    const navwrapper = document.createElement('div');
    const Trait1 = output_attribute_1;
    const Trait2 = output_attribute_2;
    const Trait3 = output_attribute_3;
    const Trait4 = output_attribute_4;
    const Trait5 = output_attribute_5;
    const Trait6 = output_attribute_6;

    navwrapper.id = 'order-output';
    navwrapper.classList.add('nav-wrapper');
    navwrapper.appendChild(ComUtils.HomeLogo);
    navwrapper.appendChild(ComUtils.navmenu);
    navwrapper.appendChild(ComUtils.accountmenu);
    ComUtils.Home.classList.remove('home');
    ComUtils.GenerateInputOption.classList.remove('inputorder');
    ComUtils.GenerateOutputOption.classList.add('outputorder');
    ComUtils.AccountOption.classList.remove('account');
    ComUtils.navmenu.appendChild(ComUtils.Home);
    ComUtils.navmenu.appendChild(ComUtils.GenerateInputOption);
    ComUtils.navmenu.appendChild(ComUtils.GenerateOutputOption);
    ComUtils.accountmenu.appendChild(ComUtils.AccountOption);

    let heading = document.createElement('h1');
    heading.classList.add('header');
    heading.textContent = 'Generation Output Page';

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

    let generatedcontent_space=document.createElement('div');
    generatedcontent_space.classList.add('generatedcontent-space');



    let buttonContainer=document.createElement('div');
    buttonContainer.classList.add('button-container');    

    let RegenAll=document.createElement("button");
    RegenAll.textContent='Regenerate All';
    RegenAll.classList.add('RegenText');

    let placeorder=document.createElement("button");
    placeorder.textContent='Place an order';
    placeorder.classList.add('RegenText')


    appContainer.appendChild(navwrapper);
    appContainer.appendChild(heading);
    appContainer.appendChild(TraitText1);
    appContainer.appendChild(TraitText2);
    appContainer.appendChild(TraitText3);
    appContainer.appendChild(TraitText4);
    appContainer.appendChild(TraitText5);
    appContainer.appendChild(TraitText6);
   appContainer.appendChild(generatedcontent_space);
   appContainer.appendChild(buttonContainer);
   buttonContainer.appendChild(RegenAll); 
   buttonContainer.appendChild(placeorder);
}

