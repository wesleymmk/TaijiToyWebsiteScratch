// JavaScript source code
//collaboration betwwen PS & EQ
import * as ComUtils from './Common_Function.js';
import * as Utils from './Authentication_Page.js';
export const appContainer = document.getElementById('app');
import * as AccUtils from './User_Account.js';

export function renderGenerationOutputView(order_ID_param) {

    ComUtils.clearAppContainer();

    /***************Auto Scroll Option***************/
    window.addEventListener('DOMContentLoaded', ComUtils.topFunction());

    const order_ID_from_storage = localStorage.getItem('selectedOrderId');

    // 2. Clear it so we don't load it again
    if (order_ID_from_storage) {
        localStorage.removeItem('selectedOrderId');
    }

    // 3. Decide which ID to use. The stored ID (from account page)
    //    takes precedence over any parameter.
    const order_ID = order_ID_from_storage || order_ID_param;

    // Make the current order ID available globally so action handlers
    // (like the Regenerate button) can use it reliably.
    if (order_ID !== undefined && order_ID !== null) {
        try { window.currentOrderID = Number(order_ID); } catch (e) { window.currentOrderID = order_ID; }
    }



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
    }, { threshold: 0.5 });
    const check = document.querySelectorAll('.show');
    addEventListener('DOMContentLoaded', () => {
        if (check == '.show') {
            ComUtils.menu.classList.toggle('show');
        }
    });

    ComUtils.menu.classList.remove('show')
    ComUtils.ExitMenu.classList.remove('show1');
    //PS added navwrapper, This is the new implementation of the navbar. Removed html version.
    const navwrapper = document.createElement('div');
    navwrapper.id = 'order-output'; // This is adding an id for the css class to specifically target this attribute
    navwrapper.classList.add('nav-wrapper'); // Class added
    navwrapper.appendChild(ComUtils.HomeLogo); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.menu); // Grab button from Common_Function.js
    ComUtils.menu.appendChild(ComUtils.navmenu); // Grab button from Common_Function.js
    ComUtils.menu.appendChild(ComUtils.accountmenu); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.HamburgerDiv); // Grab button from Common_Function.js
    ComUtils.Home.classList.remove('home'); // Class removed
    ComUtils.CreateOption.classList.remove('inputorder'); // Class removed
    ComUtils.AccountOption.classList.remove('account'); // Class removed
    ComUtils.ContactOption.classList.remove('contact-us'); // Class removed
    ComUtils.AboutOption.classList.remove('about'); // Class removed
    ComUtils.HamburgerDiv.appendChild(ComUtils.Hamburgerline1); // Lines for Hamburger Menu
    ComUtils.HamburgerDiv.appendChild(ComUtils.Hamburgerline2); // Lines for Hamburger Menu
    ComUtils.HamburgerDiv.appendChild(ComUtils.Hamburgerline3); // Lines for Hamburger Menu
    ComUtils.navmenu.appendChild(ComUtils.Home); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.StoreOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.AboutOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.ContactOption); // Grab button from Common_Function.js
    // EQ and PS collab
    //Added in the title and other developments.
    const Body = document.createElement('div');
    Body.classList.add('body');
    Body.id = 'noprint';
    const Body2 = document.createElement('div');
    Body2.classList.add('body3', 'bodyspecific2');

    // PS & EQ Collab OuterTraitDiv to hold all the inner div elements
    const OuterTraitDiv = document.createElement('div');
    OuterTraitDiv.classList.add('outertraitdiv');
    const OuterTraitDiv2 = document.createElement('div');
    OuterTraitDiv2.classList.add('outertraitdiv');
    const OuterTraitDiv3 = document.createElement('div');
    OuterTraitDiv3.classList.add('outertraitdiv');
    const OuterTraitDiv4 = document.createElement('div');
    OuterTraitDiv4.classList.add('outertraitdiv');
    const OuterTraitDiv5 = document.createElement('div');
    OuterTraitDiv5.classList.add('outertraitdiv');
    const OuterTraitDiv6 = document.createElement('div');
    OuterTraitDiv6.classList.add('outertraitdiv');
    // PS & EQ Collab TraitsDiv to hold generated traits
    const TraitsDiv = document.createElement('div');
    TraitsDiv.classList.add('traitsdiv');
    const TraitsDiv2 = document.createElement('div');
    TraitsDiv2.classList.add('traitsdiv');
    const TraitsDiv3 = document.createElement('div');
    TraitsDiv3.classList.add('traitsdiv');
    const TraitsDiv4 = document.createElement('div');
    TraitsDiv4.classList.add('traitsdiv');
    const TraitsDiv5 = document.createElement('div');
    TraitsDiv5.classList.add('traitsdiv');
    const TraitsDiv6 = document.createElement('div');
    TraitsDiv6.classList.add('traitsdiv');
    // PS & EQ Collab ImageDiv to hold generated images
    const ImageDiv = document.createElement('div');
    ImageDiv.classList.add('imagediv');
    const ImageDiv2 = document.createElement('div');
    ImageDiv2.classList.add('imagediv');
    const ImageDiv3 = document.createElement('div');
    ImageDiv3.classList.add('imagediv');
    const ImageDiv4 = document.createElement('div');
    ImageDiv4.classList.add('imagediv');
    const ImageDiv5 = document.createElement('div');
    ImageDiv5.classList.add('imagediv');
    const ImageDiv6 = document.createElement('div');
    ImageDiv6.classList.add('imagediv');
    // PS & EQ Collab ShortDesDiv to hold generated short description
    const ShortDesDiv = document.createElement('div');
    ShortDesDiv.classList.add('shortdesdiv');
    const ShortDesDiv2 = document.createElement('div');
    ShortDesDiv2.classList.add('shortdesdiv');
    const ShortDesDiv3 = document.createElement('div');
    ShortDesDiv3.classList.add('shortdesdiv');
    const ShortDesDiv4 = document.createElement('div');
    ShortDesDiv4.classList.add('shortdesdiv');
    const ShortDesDiv5 = document.createElement('div');
    ShortDesDiv5.classList.add('shortdesdiv');
    const ShortDesDiv6 = document.createElement('div');
    ShortDesDiv6.classList.add('shortdesdiv');
    // PS & EQ Collab LongDesDiv to hold genereated long description
    const LongDesDiv = document.createElement('div');
    LongDesDiv.classList.add('longdesdiv');
    const LongDesDiv2 = document.createElement('div');
    LongDesDiv2.classList.add('longdesdiv');
    const LongDesDiv3 = document.createElement('div');
    LongDesDiv3.classList.add('longdesdiv');
    const LongDesDiv4 = document.createElement('div');
    LongDesDiv4.classList.add('longdesdiv');
    const LongDesDiv5 = document.createElement('div');
    LongDesDiv5.classList.add('longdesdiv');
    const LongDesDiv6 = document.createElement('div');
    LongDesDiv6.classList.add('longdesdiv');
    // PS & EQ Collab YinYangDivs to hold Yin & yang icons and keep consistent sizing
    const YinYangDiv = document.createElement('div');
    YinYangDiv.classList.add('yinyangdiv');
    const YinYangDiv2 = document.createElement('div');
    YinYangDiv2.classList.add('yinyangdiv');
    const YinYangDiv3 = document.createElement('div');
    YinYangDiv3.classList.add('yinyangdiv');
    const YinYangDiv4 = document.createElement('div');
    YinYangDiv4.classList.add('yinyangdiv');
    const YinYangDiv5 = document.createElement('div');
    YinYangDiv5.classList.add('yinyangdiv');
    const YinYangDiv6 = document.createElement('div');
    YinYangDiv6.classList.add('yinyangdiv');
    //EQ and PS collab
    //New header for the output page
    const GenerationOutputTitleDiv = document.createElement('div');
    GenerationOutputTitleDiv.classList.add('GenerationOutputTitleDiv')
    /***************Yin & Yang Divs***************/
    // PS & EQ Collab YinYang1
    /***************Yin & Yang 1***************/
    const YinYangOuter = document.createElement('div');
    YinYangOuter.classList.add('yinyangouter');
    const YinYangSide1half = document.createElement('div');
    YinYangSide1half.classList.add('yinyangside1half');
    const YinYangSide2half = document.createElement('div');
    YinYangSide2half.classList.add('yinyangside2half');
    const YinYangSide1outer = document.createElement('div');
    YinYangSide1outer.classList.add('yinyangside1outer');
    const YinYangSide1inner = document.createElement('div');
    YinYangSide1inner.classList.add('yinyangside1inner');
    const YinYangSide2outer = document.createElement('div');
    YinYangSide2outer.classList.add('yinyangside2outer');
    const YinYangSide2inner = document.createElement('div');
    YinYangSide2inner.classList.add('yinyangside2inner');
    /***************Yin & Yang 2***************/
    const YinYangOuter2 = document.createElement('div');
    YinYangOuter2.classList.add('yinyangouter');
    const YinYangSide1half2 = document.createElement('div');
    YinYangSide1half2.classList.add('yinyangside1half');
    const YinYangSide2half2 = document.createElement('div');
    YinYangSide2half2.classList.add('yinyangside2half');
    const YinYangSide1outer2 = document.createElement('div');
    YinYangSide1outer2.classList.add('yinyangside1outer');
    const YinYangSide1inner2 = document.createElement('div');
    YinYangSide1inner2.classList.add('yinyangside1inner');
    const YinYangSide2outer2 = document.createElement('div');
    YinYangSide2outer2.classList.add('yinyangside2outer');
    const YinYangSide2inner2 = document.createElement('div');
    YinYangSide2inner2.classList.add('yinyangside2inner');
    /***************Yin & Yang 3***************/
    const YinYangOuter3 = document.createElement('div');
    YinYangOuter3.classList.add('yinyangouter');
    const YinYangSide1half3 = document.createElement('div');
    YinYangSide1half3.classList.add('yinyangside1half');
    const YinYangSide2half3 = document.createElement('div');
    YinYangSide2half3.classList.add('yinyangside2half');
    const YinYangSide1outer3 = document.createElement('div');
    YinYangSide1outer3.classList.add('yinyangside1outer');
    const YinYangSide1inner3 = document.createElement('div');
    YinYangSide1inner3.classList.add('yinyangside1inner');
    const YinYangSide2outer3 = document.createElement('div');
    YinYangSide2outer3.classList.add('yinyangside2outer');
    const YinYangSide2inner3 = document.createElement('div');
    YinYangSide2inner3.classList.add('yinyangside2inner');
    /***************Yin & Yang 4***************/
    const YinYangOuter4 = document.createElement('div');
    YinYangOuter4.classList.add('yinyangouter');
    const YinYangSide1half4 = document.createElement('div');
    YinYangSide1half4.classList.add('yinyangside1half');
    const YinYangSide2half4 = document.createElement('div');
    YinYangSide2half4.classList.add('yinyangside2half');
    const YinYangSide1outer4 = document.createElement('div');
    YinYangSide1outer4.classList.add('yinyangside1outer');
    const YinYangSide1inner4 = document.createElement('div');
    YinYangSide1inner4.classList.add('yinyangside1inner');
    const YinYangSide2outer4 = document.createElement('div');
    YinYangSide2outer4.classList.add('yinyangside2outer');
    const YinYangSide2inner4 = document.createElement('div');
    YinYangSide2inner4.classList.add('yinyangside2inner');
    /***************Yin & Yang 5***************/
    const YinYangOuter5 = document.createElement('div');
    YinYangOuter5.classList.add('yinyangouter');
    const YinYangSide1half5 = document.createElement('div');
    YinYangSide1half5.classList.add('yinyangside1half');
    const YinYangSide2half5 = document.createElement('div');
    YinYangSide2half5.classList.add('yinyangside2half');
    const YinYangSide1outer5 = document.createElement('div');
    YinYangSide1outer5.classList.add('yinyangside1outer');
    const YinYangSide1inner5 = document.createElement('div');
    YinYangSide1inner5.classList.add('yinyangside1inner');
    const YinYangSide2outer5 = document.createElement('div');
    YinYangSide2outer5.classList.add('yinyangside2outer');
    const YinYangSide2inner5 = document.createElement('div');
    YinYangSide2inner5.classList.add('yinyangside2inner');
    /***************Yin & Yang 6***************/
    const YinYangOuter6 = document.createElement('div');
    YinYangOuter6.classList.add('yinyangouter');
    const YinYangSide1half6 = document.createElement('div');
    YinYangSide1half6.classList.add('yinyangside1half');
    const YinYangSide2half6 = document.createElement('div');
    YinYangSide2half6.classList.add('yinyangside2half');
    const YinYangSide1outer6 = document.createElement('div');
    YinYangSide1outer6.classList.add('yinyangside1outer');
    const YinYangSide1inner6 = document.createElement('div');
    YinYangSide1inner6.classList.add('yinyangside1inner');
    const YinYangSide2outer6 = document.createElement('div');
    YinYangSide2outer6.classList.add('yinyangside2outer');
    const YinYangSide2inner6 = document.createElement('div');
    YinYangSide2inner6.classList.add('yinyangside2inner');

    // PS added Loading This div will be used as a loading screen as generation occurs
    const Loading = document.createElement('div');
    Loading.classList.add('loading');
    // PS added LoadingText to display to the customer that the order is being generated
    const LoadingText = document.createElement('p');
    LoadingText.classList.add('pagetextmediumw');
    LoadingText.textContent = 'Generating Your Order';
    // PS added LoadingText2 to display to the customer that the order is being generated
    const LoadingText2 = document.createElement('p');
    LoadingText2.classList.add('pagetextsmallw');
    LoadingText2.textContent = 'Sending Details to Gemini';
    // PS added LoadingLogo to notify users of loading
    const LoadingLogo = document.createElement('img');
    LoadingLogo.classList.add('LoadBox', 'animation3');
    LoadingLogo.src = 'Brand_Logos/Taijitoylogolight.png';
    LoadingLogo.alt = 'LOADING...';

    //EQ and PS collab
    //The text for the header
    const GenerationOutputText = document.createElement('p');
    GenerationOutputText.classList.add('pagetexttitle2w');
    GenerationOutputText.textContent = 'Your custom collection!!';

    let generatedcontent_space = document.createElement('div');
    generatedcontent_space.classList.add('generatedcontent-space');
    generatedcontent_space.textContent = 'Loading your generated toys...'; // Show a loading message

    const generatedcontent_space_1 = document.createElement('div');
    generatedcontent_space_1.classList.add('body3', 'bodyspecific');
    generatedcontent_space_1.id = 'print'

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
                // Expose the current traits and core values globally so the regenerate handler can reuse them
                try { window.currentTraits = allToysArray; } catch (e) { console.warn('Unable to set window.currentTraits', e); }
                try { window.currentCoreValues = parsedData.coreValues || ''; } catch (e) { console.warn('Unable to set window.currentCoreValues', e); }
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
                TraitText1.classList.add('pagetextmediumb1n');
                const TraitText2 = document.createElement("p");
                TraitText2.textContent = Trait2;
                TraitText2.classList.add('pagetextmediumb1n');
                const TraitText3 = document.createElement("p");
                TraitText3.textContent = Trait3;
                TraitText3.classList.add('pagetextmediumb1n');
                const TraitText4 = document.createElement("p");
                TraitText4.textContent = Trait4;
                TraitText4.classList.add('pagetextmediumb1n');
                const TraitText5 = document.createElement("p");
                TraitText5.textContent = Trait5;
                TraitText5.classList.add('pagetextmediumb1n');
                const TraitText6 = document.createElement("p");
                TraitText6.textContent = Trait6;
                TraitText6.classList.add('pagetextmediumb1n');
                const TraitText7 = document.createElement("p");
                TraitText7.textContent = Trait7;
                TraitText7.classList.add('pagetextmediumb1n');
                const TraitText8 = document.createElement("p");
                TraitText8.textContent = Trait8;
                TraitText8.classList.add('pagetextmediumb1n');
                const TraitText9 = document.createElement("p");
                TraitText9.textContent = Trait9;
                TraitText9.classList.add('pagetextmediumb1n');
                const TraitText10 = document.createElement("p");
                TraitText10.textContent = Trait10;
                TraitText10.classList.add('pagetextmediumb1n');
                const TraitText11 = document.createElement("p");
                TraitText11.textContent = Trait11;
                TraitText11.classList.add('pagetextmediumb1n');
                const TraitText12 = document.createElement("p");
                TraitText12.textContent = Trait12;
                TraitText12.classList.add('pagetextmediumb1n');

                const ColorText1 = document.createElement("p");
                ColorText1.textContent = Color1;
                /***************Yin & Yang 1***************/
                YinYangSide2half.classList.add(Color1);
                YinYangSide1outer.classList.add(Color1);
                YinYangSide2inner.classList.add(Color1);
                YinYangSide1half.classList.add(Color2);
                YinYangSide2outer.classList.add(Color2);
                YinYangSide1inner.classList.add(Color2);
                /***************Yin & Yang 2***************/
                YinYangSide2half2.classList.add(Color3);
                YinYangSide1outer2.classList.add(Color3);
                YinYangSide2inner2.classList.add(Color3);
                YinYangSide1half2.classList.add(Color4);
                YinYangSide2outer2.classList.add(Color4);
                YinYangSide1inner2.classList.add(Color4);
                /***************Yin & Yang 3***************/
                YinYangSide2half3.classList.add(Color5);
                YinYangSide1outer3.classList.add(Color5);
                YinYangSide2inner3.classList.add(Color5);
                YinYangSide1half3.classList.add(Color6);
                YinYangSide2outer3.classList.add(Color6);
                YinYangSide1inner3.classList.add(Color6);
                /***************Yin & Yang 4***************/
                YinYangSide2half4.classList.add(Color7);
                YinYangSide1outer4.classList.add(Color7);
                YinYangSide2inner4.classList.add(Color7);
                YinYangSide1half4.classList.add(Color8);
                YinYangSide2outer4.classList.add(Color8);
                YinYangSide1inner4.classList.add(Color8);
                /***************Yin & Yang 5***************/
                YinYangSide2half5.classList.add(Color9);
                YinYangSide1outer5.classList.add(Color9);
                YinYangSide2inner5.classList.add(Color9);
                YinYangSide1half5.classList.add(Color10);
                YinYangSide2outer5.classList.add(Color10);
                YinYangSide1inner5.classList.add(Color10);
                /***************Yin & Yang 6***************/
                YinYangSide2half6.classList.add(Color11);
                YinYangSide1outer6.classList.add(Color11);
                YinYangSide2inner6.classList.add(Color11);
                YinYangSide1half6.classList.add(Color12);
                YinYangSide2outer6.classList.add(Color12);
                YinYangSide1inner6.classList.add(Color12);

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
                ShortText1.classList.add('pagetextsmallb1n');

                const LongText1 = document.createElement("p");
                LongText1.textContent = output_desc_long_toy1;
                LongText1.classList.add('pagetextsmallb1n');

                const ShortText2 = document.createElement("p");
                ShortText2.textContent = output_desc_short_toy2;
                ShortText2.classList.add('pagetextsmallb1n');

                const LongText2 = document.createElement("p");
                LongText2.textContent = output_desc_long_toy2;
                LongText2.classList.add('pagetextsmallb1n');

                const ShortText3 = document.createElement("p");
                ShortText3.textContent = output_desc_short_toy3;
                ShortText3.classList.add('pagetextsmallb1n');

                const LongText3 = document.createElement("p");
                LongText3.textContent = output_desc_long_toy3;
                LongText3.classList.add('pagetextsmallb1n');

                const ShortText4 = document.createElement("p");
                ShortText4.textContent = output_desc_short_toy4;
                ShortText4.classList.add('pagetextsmallb1n');

                const LongText4 = document.createElement("p");
                LongText4.textContent = output_desc_long_toy4;
                LongText4.classList.add('pagetextsmallb1n');

                const ShortText5 = document.createElement("p");
                ShortText5.textContent = output_desc_short_toy5;
                ShortText5.classList.add('pagetextsmallb1n');

                const LongText5 = document.createElement("p");
                LongText5.textContent = output_desc_long_toy5;
                LongText5.classList.add('pagetextsmallb1n');

                const ShortText6 = document.createElement("p");
                ShortText6.textContent = output_desc_short_toy6;
                ShortText6.classList.add('pagetextsmallb1n');

                const LongText6 = document.createElement("p");
                LongText6.textContent = output_desc_long_toy6;
                LongText6.classList.add('pagetextsmallb1n');


                generatedcontent_space_1.appendChild(OuterTraitDiv);
                generatedcontent_space_1.appendChild(OuterTraitDiv2);
                generatedcontent_space_1.appendChild(OuterTraitDiv3);
                generatedcontent_space_1.appendChild(OuterTraitDiv4);
                generatedcontent_space_1.appendChild(OuterTraitDiv5);
                generatedcontent_space_1.appendChild(OuterTraitDiv6);

                OuterTraitDiv.appendChild(TraitsDiv);
                OuterTraitDiv2.appendChild(TraitsDiv2);
                OuterTraitDiv3.appendChild(TraitsDiv3);
                OuterTraitDiv4.appendChild(TraitsDiv4);
                OuterTraitDiv5.appendChild(TraitsDiv5);
                OuterTraitDiv6.appendChild(TraitsDiv6);

                TraitsDiv.appendChild(TraitText1);
                TraitsDiv.appendChild(TraitText2);
                TraitsDiv2.appendChild(TraitText3);
                TraitsDiv2.appendChild(TraitText4);
                TraitsDiv3.appendChild(TraitText5);
                TraitsDiv3.appendChild(TraitText6);
                TraitsDiv4.appendChild(TraitText7);
                TraitsDiv4.appendChild(TraitText8);
                TraitsDiv5.appendChild(TraitText9);
                TraitsDiv5.appendChild(TraitText10);
                TraitsDiv6.appendChild(TraitText11);
                TraitsDiv6.appendChild(TraitText12);

                /***************Build Yin & Yang elements (synchronous)***************/
                // Build Yin/Yang structures
                YinYangDiv.appendChild(YinYangOuter);
                YinYangOuter.appendChild(YinYangSide1half);
                YinYangOuter.appendChild(YinYangSide2half);
                YinYangOuter.appendChild(YinYangSide1outer);
                YinYangOuter.appendChild(YinYangSide2outer);
                YinYangSide1outer.appendChild(YinYangSide1inner);
                YinYangSide2outer.appendChild(YinYangSide2inner);

                YinYangDiv2.appendChild(YinYangOuter2);
                YinYangOuter2.appendChild(YinYangSide1half2);
                YinYangOuter2.appendChild(YinYangSide2half2);
                YinYangOuter2.appendChild(YinYangSide1outer2);
                YinYangOuter2.appendChild(YinYangSide2outer2);
                YinYangSide1outer2.appendChild(YinYangSide1inner2);
                YinYangSide2outer2.appendChild(YinYangSide2inner2);

                YinYangDiv3.appendChild(YinYangOuter3);
                YinYangOuter3.appendChild(YinYangSide1half3);
                YinYangOuter3.appendChild(YinYangSide2half3);
                YinYangOuter3.appendChild(YinYangSide1outer3);
                YinYangOuter3.appendChild(YinYangSide2outer3);
                YinYangSide1outer3.appendChild(YinYangSide1inner3);
                YinYangSide2outer3.appendChild(YinYangSide2inner3);

                YinYangDiv4.appendChild(YinYangOuter4);
                YinYangOuter4.appendChild(YinYangSide1half4);
                YinYangOuter4.appendChild(YinYangSide2half4);
                YinYangOuter4.appendChild(YinYangSide1outer4);
                YinYangOuter4.appendChild(YinYangSide2outer4);
                YinYangSide1outer4.appendChild(YinYangSide1inner4);
                YinYangSide2outer4.appendChild(YinYangSide2inner4);

                YinYangDiv5.appendChild(YinYangOuter5);
                YinYangOuter5.appendChild(YinYangSide1half5);
                YinYangOuter5.appendChild(YinYangSide2half5);
                YinYangOuter5.appendChild(YinYangSide1outer5);
                YinYangOuter5.appendChild(YinYangSide2outer5);
                YinYangSide1outer5.appendChild(YinYangSide1inner5);
                YinYangSide2outer5.appendChild(YinYangSide2inner5);

                YinYangDiv6.appendChild(YinYangOuter6);
                YinYangOuter6.appendChild(YinYangSide1half6);
                YinYangOuter6.appendChild(YinYangSide2half6);
                YinYangOuter6.appendChild(YinYangSide1outer6);
                YinYangOuter6.appendChild(YinYangSide2outer6);
                YinYangSide1outer6.appendChild(YinYangSide1inner6);
                YinYangSide2outer6.appendChild(YinYangSide2inner6);

                // Put YinYang INSIDE ImageDiv (so absolute positioning works)
                ImageDiv.appendChild(YinYangDiv);
                ImageDiv2.appendChild(YinYangDiv2);
                ImageDiv3.appendChild(YinYangDiv3);
                ImageDiv4.appendChild(YinYangDiv4);
                ImageDiv5.appendChild(YinYangDiv5);
                ImageDiv6.appendChild(YinYangDiv6);

                // Then append ImageDivs to OuterTraitDiv
                OuterTraitDiv.appendChild(ImageDiv);
                OuterTraitDiv2.appendChild(ImageDiv2);
                OuterTraitDiv3.appendChild(ImageDiv3);
                OuterTraitDiv4.appendChild(ImageDiv4);
                OuterTraitDiv5.appendChild(ImageDiv5);
                OuterTraitDiv6.appendChild(ImageDiv6);

                // Fetch and display images for this order (async - images go into ImageDiv alongside YinYang)
                ComUtils.apiCall('api/get_img_path.php', { order_id: order_ID })
                    .then(imgResp => {
                        if (!imgResp.ok) throw new Error('Failed to fetch image paths');
                        return imgResp.json();

                    })
                    .then(imgJson => {
                        if (!(imgJson && imgJson.success && Array.isArray(imgJson.data))) {
                            console.warn("Image fetch returned no data - keeping Yin/Yang placeholders:", imgJson);
                            return;
                        }

                        const imagePaths = imgJson.data;
                        console.log("Fetched image paths:", imagePaths);

                        // Helper: create an img element from a path
                        const createImageElement = (imagePath) => {
                            if (imagePath && imagePath.trim() !== '') {
                                const img = document.createElement('img');
                                // Add cache-busting timestamp to force reload of regenerated images
                                img.src = imagePath + '?t=' + Date.now();
                                img.alt = 'Generated trait image';
                                console.log("Creating img element with src:", imagePath);
                                return img;
                            }
                            return null;
                        };

                        // Insert images into ImageDivs (replace Yin/Yang only if image exists)
                        const imagesToDisplay = [
                            { div: ImageDiv, path: imagePaths[0] },
                            { div: ImageDiv2, path: imagePaths[1] },
                            { div: ImageDiv3, path: imagePaths[2] },
                            { div: ImageDiv4, path: imagePaths[3] },
                            { div: ImageDiv5, path: imagePaths[4] },
                            { div: ImageDiv6, path: imagePaths[5] }
                        ];

                        imagesToDisplay.forEach(item => {
                            const imgElement = createImageElement(item.path);
                            if (imgElement) {
                                // Don't clear - just append the image alongside the Yin/Yang
                                item.div.appendChild(imgElement);
                            }
                        });
                    })
                    .catch(imgErr => {
                        console.warn("Failed to load images - keeping Yin/Yang placeholders:", imgErr);
                    });


                OuterTraitDiv.appendChild(ShortDesDiv);
                OuterTraitDiv2.appendChild(ShortDesDiv2);
                OuterTraitDiv3.appendChild(ShortDesDiv3);
                OuterTraitDiv4.appendChild(ShortDesDiv4);
                OuterTraitDiv5.appendChild(ShortDesDiv5);
                OuterTraitDiv6.appendChild(ShortDesDiv6);

                OuterTraitDiv.appendChild(LongDesDiv);
                OuterTraitDiv2.appendChild(LongDesDiv2);
                OuterTraitDiv3.appendChild(LongDesDiv3);
                OuterTraitDiv4.appendChild(LongDesDiv4);
                OuterTraitDiv5.appendChild(LongDesDiv5);
                OuterTraitDiv6.appendChild(LongDesDiv6);

                ShortDesDiv.appendChild(ShortText1);
                ShortDesDiv2.appendChild(ShortText2);
                ShortDesDiv3.appendChild(ShortText3);
                ShortDesDiv4.appendChild(ShortText4);
                ShortDesDiv5.appendChild(ShortText5);
                ShortDesDiv6.appendChild(ShortText6);

                LongDesDiv.appendChild(LongText1);
                LongDesDiv2.appendChild(LongText2);
                LongDesDiv3.appendChild(LongText3);
                LongDesDiv4.appendChild(LongText4);
                LongDesDiv5.appendChild(LongText5);
                LongDesDiv6.appendChild(LongText6);

            } else {
                // The PHP script returned a handled error (e.g., success: false)
                throw new Error(parsedData.message || "Invalid data structure from server.");
            }
        })
        .catch(error => {
            // This .catch() will now handle ALL errors: network errors, JSON parsing errors,
            // or the specific errors we threw above.
            console.error("A critical error occurred:", error.message);
            generatedcontent_space_1.textContent = `Sorry, an unexpected error occurred: ${error.message}`;
        });

    // --- ACTION BUTTONS ---
    // This part can stay outside because it doesn't depend on the server response.
    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.id = 'noprint';

    let RegenAll = document.createElement("button");
    RegenAll.textContent = 'Regenerate All';
    RegenAll.classList.add('button1', 'pagetextlargeb', 'buttongapout');

    // Attach click handler for "Regenerate All" � uses Node backend to regenerate images
    RegenAll.addEventListener('click', async () => {
        RegenAll.disabled = true;
        const originalText = RegenAll.textContent;
        RegenAll.textContent = 'Regenerating...';
        appContainer.appendChild(Loading);
        Loading.appendChild(LoadingLogo);
        Loading.appendChild(LoadingText);
        Loading.appendChild(LoadingText2);

        try {
            const payload = {
                coreValues: window.currentCoreValues || localStorage.getItem('coreValues') || '',
                traits: window.currentTraits,
                orderID: window.currentOrderID,
                regenerate: true  // Flag to tell backend to generate NEW traits from Gemini
            };
            const resp = await fetch('http://34.69.23.109:3000/generate', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const json = await resp.json();
            if (!(json && json.success)) {
                throw new Error(json.message || resp.statusText || 'Regeneration failed on server');
            }

            // json.data.traits contains the newly generated traits and json.data.prompt the coreValues
            const newTraits = json.data?.traits;
            const newPrompt = json.data?.prompt || payload.coreValues || '';

            if (!Array.isArray(newTraits) || newTraits.length === 0) {
                throw new Error('Regeneration returned no traits');
            }

            // Save regenerated traits back to PHP for the existing order (update path)
            const saveResp = await ComUtils.apiCall('api/save_traits.php', {
                prompt: newPrompt,
                traits: newTraits,
                output_id: window.currentOrderID
            });

            if (!saveResp.ok) {
                const txt = await saveResp.text();
                throw new Error('Failed to save regenerated traits: ' + saveResp.status + ' ' + txt);
            }

            const saveJson = await saveResp.json();
            if (!(saveJson && saveJson.success)) {
                throw new Error('Failed to save regenerated traits: ' + (saveJson.message || 'unknown'));
            }

            try { localStorage.setItem('selectedOrderId', window.currentOrderID); } catch (e) { console.warn('localStorage set failed:', e); }
            alert('Regeneration complete. Showing updated results.');

            // Re-render the output view in-place to show updated traits
            try {
                renderGenerationOutputView(window.currentOrderID);
            } catch (e) {
                console.warn('In-place render failed, falling back to reload:', e);
                window.location.hash = '#order-output';
                window.location.reload();
            }
        } catch (err) {
            console.error('Regeneration error:', err);
            alert('Regeneration failed: ' + (err.message || err));
        } finally {
            RegenAll.disabled = false;
            RegenAll.textContent = originalText;
            appContainer.removeChild(Loading);
        }
    });

    let placeorder = document.createElement("button");
    placeorder.textContent = 'Place an order';
    placeorder.classList.add('button1', 'pagetextlargeb', 'buttongapout')



    /***************Navigation Bar***************/
    appContainer.appendChild(navwrapper);
    /***************Parent Div containers***************/
    //appContainer.appendChild(heading);
    appContainer.appendChild(ComUtils.ExitMenu);
    appContainer.appendChild(Body);
    appContainer.appendChild(Body2);
    Body.appendChild(GenerationOutputTitleDiv);
    GenerationOutputTitleDiv.appendChild(GenerationOutputText);
    Body2.appendChild(generatedcontent_space_1)
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