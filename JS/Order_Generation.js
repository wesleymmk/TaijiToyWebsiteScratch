// JavaScript source code
export const appContainer = document.getElementById('app');
import * as ComUtils from './Common_Function.js';
import * as Utils from './Authentication_Page.js';
import * as AccUtils from './User_Account.js';
import * as OrderOut from './Order_Gen_Output.js';

// PS creation
export function renderGenerationInputView() {
    ComUtils.clearAppContainer(); // Clear the screen first
    /***************Loading Function on Scroll***************/
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
    navwrapper.id = 'order-input'; // This is adding an id for the css class to specifically target this attribute
    navwrapper.classList.add('nav-wrapper'); // Class added
    navwrapper.appendChild(ComUtils.HomeLogo); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.navmenu); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.accountmenu); // Grab button from Common_Function.js
    ComUtils.Home.classList.remove('home'); // Class removed
    ComUtils.GenerateInputOption.classList.add('inputorder'); // Class added
    ComUtils.GenerateOutputOption.classList.remove('outputorder'); // Class removed
    ComUtils.AccountOption.classList.remove('account'); // Class removed
    ComUtils.navmenu.appendChild(ComUtils.Home); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.StoreOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.AboutOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.ContactOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.GenerateInputOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.GenerateOutputOption); // Grab button from Common_Function.js
    ComUtils.accountmenu.appendChild(ComUtils.AccountOption); // Grab button from Common_Function.js
    /***************Parent Div Containers***************/
    // PS added Body This div will hold the title & other div elements
    const Body = document.createElement('div');
    Body.classList.add('body');
    /***************Inner Structure Div Containers***************/
    // PS added CustomTailoredTitleDiv to be the outermost div element for the title
    const CustomTailoredTitleDiv = document.createElement('div');
    CustomTailoredTitleDiv.classList.add('customtailoredtitlediv');
    /***************Innermost Div containers holding text or images***************/
    // PS added CustomTailoredDiv1 to hold the text containing marketing
    const CustomTailoredDiv1 = document.createElement('div');
    CustomTailoredDiv1.classList.add('customtailoreddiv1');
    // PS added CustomTailoredDiv2 to hold the text containing marketing
    const CustomTailoredDiv2 = document.createElement('div');
    CustomTailoredDiv2.classList.add('customtailoreddiv2');
    // PS added CustomTailoredDiv3 to hold the text containing marketing
    const CustomTailoredDiv3 = document.createElement('div');
    CustomTailoredDiv3.classList.add('customtailoreddiv3');
    /***************Text to be Inserted into Div containers***************/
    // PS added CustomTailoredText for the title text
    const CustomTailoredText = document.createElement('p');
    CustomTailoredText.classList.add('pagetexttitle2w', 'animation');
    CustomTailoredText.textContent = 'Custom Tailored Collections';
    // PS added TailoredText for the title text
    const TailoredText = document.createElement('p');
    TailoredText.classList.add('pagetextlargew', 'animation');
    TailoredText.textContent = 'Unique Kit Tailored To Your Core Values, Pastimes, Interests, And Your Aspirations';

    let GiftOption = document.createElement('input');
    GiftOption.type = 'checkbox';
    GiftOption.name = 'giftOption';
    /***************Images to be Inserted into Div containers***************/
    // PS added Marketingphoto1 for homepage
    const Marketingphoto1 = document.createElement('img');
    Marketingphoto1.classList.add('marketimage1', 'animation');
    Marketingphoto1.src = 'Marketing_Images/Taji-Color206.png'
    // PS added Marketingphoto2 for homepage
    const Marketingphoto2 = document.createElement('img');
    Marketingphoto2.classList.add('marketimage1', 'animation');
    Marketingphoto2.src = 'Marketing_Images/possibilites+banner.jpg';

    let CheckboxLabel = document.createElement('label');
    CheckboxLabel.htmlFor = 'GiftOption';
    CheckboxLabel.textContent = 'Is This a Gift?';

    let CustomerInput = document.createElement('input');
    CustomerInput.type = 'text';
    CustomerInput.placeholder = 'Enter your Values';
    CustomerInput.required = true;

    let SubmitGeneration = document.createElement("button");
    SubmitGeneration.textContent = 'Submit';
    SubmitGeneration.classList.add('button1', 'pagetextmediumb', 'animation');
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

        if (!data.success) {
            alert(`An error occurred: ${data.message}`);
    }
        
        const traitsArray = data.data.traits;
        const prompt = data.data.prompt;
        const dataForPHP = {
        prompt: prompt,
        traits: traitsArray
        }


        ComUtils.apiCall('api/save_traits.php', dataForPHP)
            .then(rawResponse => {
                if (!rawResponse.ok) {
                    throw new Error(`Network error: ${rawResponse.statusText}`);
                }
                return rawResponse.json();
            })
            .then(parsedData => {

                console.log("Final Parsed Response from PHP:", parsedData);

                if (parsedData.success) {
                    const saved_ID = parsedData.output_id;
                    console.log("Successfully saved order ID:", saved_ID);

                    OrderOut.renderGenerationOutputView(saved_ID);
                    //window.location.href = '#order-output';
                } else {
                    console.error("Error from PHP script:", parsedData.message);
                    alert(`Error from PHP: ${parsedData.message}`);
                }
            })
            .catch(error => {
                // This .catch() will now handle network errors or JSON parsing errors.
                console.error("An error occurred during the saving process:", error);
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
    // These commands just call all the elements to the screen
    /***************Navigation Bar***************/
    appContainer.appendChild(navwrapper);
    /***************Parent Div containers***************/
    appContainer.appendChild(Body);
    appContainer.appendChild(GiftOption);
    appContainer.appendChild(CheckboxLabel);
    appContainer.appendChild(CustomerInput);
    appContainer.appendChild(SubmitGeneration);
    appContainer.appendChild(ComUtils.FooterBody);
    /***************Inner structured Div Containers***************/
    Body.appendChild(CustomTailoredTitleDiv);
    ComUtils.FooterBody.appendChild(ComUtils.Footerdiv);
    /***************Inner Div containers to hold content***************/
    CustomTailoredTitleDiv.appendChild(CustomTailoredDiv1);
    CustomTailoredTitleDiv.appendChild(CustomTailoredDiv2);
    CustomTailoredTitleDiv.appendChild(CustomTailoredDiv3);
    ComUtils.Footerdiv.appendChild(ComUtils.Footerinnerdiv);
    ComUtils.Footerdiv.appendChild(ComUtils.Footerinnerdiv2);
    ComUtils.Footerdiv.appendChild(ComUtils.Footerinnerdiv3);
    /***************Text to be inserted in inner div containers structure***************/
    CustomTailoredDiv1.appendChild(CustomTailoredText);
    CustomTailoredDiv3.appendChild(TailoredText);
    ComUtils.Footerinnerdiv2.appendChild(ComUtils.Footer);
    /***************Images to be used by page***************/
    CustomTailoredDiv2.appendChild(Marketingphoto1);
    CustomTailoredDiv2.appendChild(Marketingphoto2);
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
