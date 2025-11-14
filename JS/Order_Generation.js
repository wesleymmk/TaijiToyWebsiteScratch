// JavaScript source code
export const appContainer = document.getElementById('app');
import * as ComUtils from './Common_Function.js';
import * as Utils from './Authentication_Page.js';
import * as AccUtils from './User_Account.js';
import * as OrderOut from './Order_Gen_Output.js';

// === ANALYTICS VARIABLES ===
// Done by Nathan D
let orderStartTime = null; // Stores the time when the user enters the view

// Function to handle sending analytics data after order save is successful
const sendAnalyticsData = (order_id) => {
    // 1. Calculate time taken
    const timeEnd = performance.now();
    const time_ms = Math.round(timeEnd - orderStartTime);

    // 2. Get click count
    const clicks_to_order = ComUtils.getSessionClickCount();

    const analyticsPayload = {
        order_id: order_id,
        clicks_to_order: clicks_to_order,
        time_ms: time_ms
    };

    ComUtils.apiCall('api/record_analytics.php', analyticsPayload)
        .then(response => {
            // Check if the response is valid JSON (handling empty/malformed responses)
            if (response.status === 204 || response.headers.get('content-length') === '0') {
                return { success: true, message: "No content response, assumed success." };
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                console.log("Analytics recorded successfully. Clicks:", clicks_to_order, "Time:", time_ms, "ms");
            } else {
                console.error("Failed to record analytics:", data.message);
            }
        })
        .catch(error => {
            console.error("Network or JSON error during analytics submission:", error);
        });
};
// ===========================

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
    ComUtils.CreateOption.classList.add('inputorder'); // Class added
    ComUtils.AccountOption.classList.remove('account'); // Class removed
    ComUtils.navmenu.appendChild(ComUtils.Home); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.StoreOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.AboutOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.ContactOption); // Grab button from Common_Function.js
    /***************Auto Scroll Option***************/
    let keyword = '.inputinnerdiv1';
    const ScrollTimePause = setTimeout(() => {
        ComUtils.manualScrollToElement(keyword, 3000);
    }, 3000);
    window.addEventListener('scroll', function () {
        keyword = 'null';
        clearTimeout(ScrollTimePause);
    });
    /***************Parent Div Containers***************/
    // PS added Loading This div will be used as a loading screen as generation occurs
    const Loading = document.createElement('div');
    Loading.classList.add('loading');
    // PS added Body This div will hold the title & other div elements
    const Body = document.createElement('div');
    Body.classList.add('body');
    // PS added Body2 This div will hold the title & other div elements
    const Body2 = document.createElement('div');
    Body2.classList.add('body2');
    // PS added Body3 This div will hold the title & other div elements
    const Body3 = document.createElement('div');
    Body3.classList.add('body2');
    /***************Inner Structure Div Containers***************/
    // PS added CustomTailoredTitleDiv to be the outermost div element for the title
    const CustomTailoredTitleDiv = document.createElement('div');
    CustomTailoredTitleDiv.classList.add('customtailoredtitlediv');
    // PS added InputOuterDiv to hold the innder divs containing the input functions
    const InputOuterDiv = document.createElement('div');
    InputOuterDiv.classList.add('inputouterdiv');
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
    // PS added InputInnerDiv1 to hold the text
    const InputInnerDiv1 = document.createElement('div');
    InputInnerDiv1.classList.add('inputinnerdiv1');
    // PS added InputInnerDiv2 to hold the textbox
    const InputInnerDiv2 = document.createElement('div');
    InputInnerDiv2.classList.add('inputinnerdiv2');
    // PS added InputInnerDiv3 to hold the button
    const InputInnerDiv3 = document.createElement('div');
    InputInnerDiv3.classList.add('inputinnerdiv3');
    // PS added InputInnerDiv4 to hold the button
    const InputInnerDiv4 = document.createElement('div');
    InputInnerDiv4.classList.add('inputinnerdiv3');
    // PS added InputInnerDiv5 to hold the button
    const InputInnerDiv5 = document.createElement('div');
    InputInnerDiv5.classList.add('inputinnerdiv3');
    // PS added InputInnerDiv6 to hold the button
    const InputInnerDiv6 = document.createElement('div');
    InputInnerDiv6.classList.add('inputinnerdiv3');
    // PS added InputInnerDiv7 to hold the button
    const InputInnerDiv7 = document.createElement('div');
    InputInnerDiv7.classList.add('inputinnerdiv3');
    /***************Text to be Inserted into Div containers***************/
    // PS added CustomTailoredText for the title text
    const CustomTailoredText = document.createElement('p');
    CustomTailoredText.classList.add('pagetexttitle2w', 'animation');
    CustomTailoredText.textContent = 'Custom Tailored Collections';
    // PS added TailoredText for the title text
    const TailoredText = document.createElement('p');
    TailoredText.classList.add('pagetextlargew', 'animation');
    TailoredText.textContent = 'Unique Kit Tailored To Your Core Values, Pastimes, Interests, And Your Aspirations';
    // PS added InspiriationalText to be above text entry box
    const InspiriationalText = document.createElement('p');
    InspiriationalText.classList.add('pagetextmediumb', 'animation');
    InspiriationalText.textContent = 'Take a moment to pause: What inner quality are you most grateful to possess, and how does it make your life richer?';
    // PS added InspiriationalText2 to be above text entry box
    const InspiriationalText2 = document.createElement('p');
    InspiriationalText2.classList.add('pagetextmediumb', 'animation');
    InspiriationalText2.textContent = 'What are your pastimes that enrcihes your life?';
    // PS added InspiriationalText3 to be above text entry box
    const InspiriationalText3 = document.createElement('p');
    InspiriationalText3.classList.add('pagetextmediumb', 'animation');
    InspiriationalText3.textContent = 'What are your interest that soothes your mind?';
    // PS added LoadingText to display to the customer that the order is being generated
    const LoadingText = document.createElement('p');
    LoadingText.classList.add('pagetextmediumw');
    LoadingText.textContent = 'Generating Your Order';
    // PS added LoadingText2 to display to the customer that the order is being generated
    const LoadingText2 = document.createElement('p');
    LoadingText2.classList.add('pagetextsmallw');
    LoadingText2.textContent = 'Sending Details to Gemini';
    /***************Images to be Inserted into Div containers***************/
    // PS added background image
    const Background = document.createElement('img');
    Background.classList.add('Background');
    Background.src = 'Background/Background1.png';
    // PS added Marketingphoto1 for homepage
    const Marketingphoto1 = document.createElement('img');
    Marketingphoto1.classList.add('marketimage1', 'animation');
    Marketingphoto1.src = 'Marketing_Images/Taji-Color206.png'
    // PS added Marketingphoto2 for homepage
    const Marketingphoto2 = document.createElement('img');
    Marketingphoto2.classList.add('marketimage1', 'animation');
    Marketingphoto2.src = 'Marketing_Images/possibilites+banner.jpg';
    // PS added LoadingLogo to notify users of loading
    const LoadingLogo = document.createElement('img');
    LoadingLogo.classList.add('LoadBox', 'animation3');
    LoadingLogo.src = 'Brand_Logos/Taijitoylogolight.png';
    LoadingLogo.alt = 'LOADING...';
    /***************Input elements to be Inserted into Div containers***************/
    // PS added CustomerInput1 for users to enter one of their traits
    const CustomerInput1 = document.createElement('textarea');
    CustomerInput1.placeholder = 'Enter your Values';
    CustomerInput1.classList.add('textarea', 'animation2');
    CustomerInput1.required = true;
    // PS added CustomerInput2 for users to enter one of their traits
    const CustomerInput2 = document.createElement('textarea');
    CustomerInput2.placeholder = 'Enter your Pastimes';
    CustomerInput2.classList.add('textarea', 'animation2');
    CustomerInput2.required = true;
    // PS added CustomerInput3 for users to enter one of their traits
    const CustomerInput3 = document.createElement('textarea');
    CustomerInput3.placeholder = 'Enter your Interests';
    CustomerInput3.classList.add('textarea', 'animation2');
    CustomerInput3.required = true;

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
    appContainer.appendChild(Loading);
    Loading.appendChild(LoadingLogo);
    Loading.appendChild(LoadingText);
    Loading.appendChild(LoadingText2);
    
    //try {
        //  Send input to Node.js backend which will call Gemini
        const response = await fetch('http://localhost:3000/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coreValues })
        });
        
        LoadingText2.textContent = "Your Results are Ready";

        // Parse the response from backend
        const data = await response.json();
        console.log("Backend returned:", data);
    
        if (!data.success) {
            alert(`An error occurred: ${data.message}`);
            LoadingText2.textContent = "Error, Reloading Webpage";
            setTimeout(() => {
                SubmitGeneration.disabled = false;
                SubmitGeneration.textContent = 'Submit';
                appContainer.removeChild(Loading);
            }, 1000);
        }
        
        const traitsArray = data.data.traits;
        const prompt = data.data.prompt;
        const dataForPHP = {
            prompt: prompt,
            traits: traitsArray
            }
        //const saved_ID;

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

                    //ANALYTICS INTEGRATION
                    sendAnalyticsData(saved_ID);
                    ComUtils.resetSessionClickCount();
                    // ===================

                    setTimeout(() => {
                        OrderOut.renderGenerationOutputView(saved_ID);
                    }, 2000);
                    
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
    appContainer.appendChild(Body2);
    appContainer.appendChild(Body3);
    // appContainer.appendChild(GiftOption);
    // appContainer.appendChild(CheckboxLabel);
    // appContainer.appendChild(CustomerInput);
    appContainer.appendChild(ComUtils.FooterBody);
    /***************Inner structured Div Containers***************/
    Body.appendChild(CustomTailoredTitleDiv);
    Body3.appendChild(InputOuterDiv);
    ComUtils.FooterBody.appendChild(ComUtils.Footerdiv);
    /***************Inner Div containers to hold content***************/
    CustomTailoredTitleDiv.appendChild(CustomTailoredDiv1);
    CustomTailoredTitleDiv.appendChild(CustomTailoredDiv2);
    CustomTailoredTitleDiv.appendChild(CustomTailoredDiv3);
    InputOuterDiv.appendChild(InputInnerDiv1);
    InputOuterDiv.appendChild(InputInnerDiv2);
    InputOuterDiv.appendChild(InputInnerDiv3);
    InputOuterDiv.appendChild(InputInnerDiv4);
    InputOuterDiv.appendChild(InputInnerDiv5);
    InputOuterDiv.appendChild(InputInnerDiv6);
    InputOuterDiv.appendChild(InputInnerDiv7);
    ComUtils.Footerdiv.appendChild(ComUtils.Footerinnerdiv);
    ComUtils.Footerdiv.appendChild(ComUtils.Footerinnerdiv2);
    ComUtils.Footerdiv.appendChild(ComUtils.Footerinnerdiv3);
    /***************Text to be inserted in inner div containers structure***************/
    CustomTailoredDiv1.appendChild(CustomTailoredText);
    CustomTailoredDiv3.appendChild(TailoredText);
    InputInnerDiv1.appendChild(InspiriationalText);
    InputInnerDiv3.appendChild(InspiriationalText2);
    InputInnerDiv5.appendChild(InspiriationalText3);
    ComUtils.Footerinnerdiv2.appendChild(ComUtils.Footer);
    /***************Images to be used by page***************/
    Body2.appendChild(Background);
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
    /***************Input Elements to be used by page***************/
    InputInnerDiv2.appendChild(CustomerInput1);
    InputInnerDiv4.appendChild(CustomerInput2);
    InputInnerDiv6.appendChild(CustomerInput3);
    InputInnerDiv7.appendChild(SubmitGeneration);
    /***************Observer Code Searching for Animations***************/
    const allAnimationedElements = document.querySelectorAll('.animation');
    allAnimationedElements.forEach((element) => observer.observe(element));
    const allAnimationedElements2 = document.querySelectorAll('.animation2');
    allAnimationedElements2.forEach((element) => observer.observe(element));
}
