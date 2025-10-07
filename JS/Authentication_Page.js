/* Paul-Anthony Sutton
added renderWelcomeView() to add basic functionailty*/
/* Eddited by Ernesto*/
export const appContainer = document.getElementById('app');
import * as ComUtils from './Common_Function.js';
import * as GenUtils from './Order_Generation.js';
import * as AccUtils from './User_Account.js';
import * as Gen2Utils from './Order_Gen_Output.js';

//PS Creation & EQ collaboration
export function renderWelcomeView() {
    ComUtils.clearAppContainer(); // Clear the screen first
    //PS added navwrapper, This is the new implementation of the navbar. Removed html version.
    const navwrapper = document.createElement('div');
    navwrapper.id = 'home'; // This is adding an id for the css clas sto specifically target this attribute
    navwrapper.classList.add('nav-wrapper'); // Class added
    navwrapper.appendChild(ComUtils.HomeLogo); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.navmenu); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.accountmenu); // Grab button from Common_Function.js
    ComUtils.Home.classList.add('home'); // Class added
    ComUtils.GenerateInputOption.classList.remove('inputorder'); // Class removed
    ComUtils.GenerateOutputOption.classList.remove('outputorder'); // Class removed
    ComUtils.AccountOption.classList.remove('account'); // Class removed
    ComUtils.navmenu.appendChild(ComUtils.Home); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.GenerateInputOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.GenerateOutputOption); // Grab button from Common_Function.js
    ComUtils.accountmenu.appendChild(ComUtils.AccountOption); // Grab button from Common_Function.js
    /***************Parent Div Containers***************/
    // PS added Body This div will hold the title & other div elements
    const Body = document.createElement('div');
    Body.classList.add('body');
    // PS added Body2 this will hold a transitional background
    const Body2 = document.createElement('div');
    Body2.classList.add('body');
    // PS added Body3 this will hold some marketing pictures & button
    const Body3 = document.createElement('div');
    Body3.classList.add('body2');
    // PS added Body4 This will hold a transitional background
    const Body4 = document.createElement('div');
    Body4.classList.add('body');
    // PS added Body5 This will hold marketing text
    const Body5 = document.createElement('div');
    Body5.classList.add('body3');
    // PS added Body6 This will hold marketing Title text
    const Body6 = document.createElement('div');
    Body6.classList.add('body2');
    // PS added Body7 This will hold marketing text & photo
    const Body7 = document.createElement('div');
    Body7.classList.add('body2');
    // PS added Body8 This will hold marketing text & photo
    const Body8 = document.createElement('div');
    Body8.classList.add('body3');
    // PS added Body9 This will hold marketing text & photo
    const Body9 = document.createElement('div');
    Body9.classList.add('body2');
    // PS added Body10 This will hold marketing text & photo
    const Body10 = document.createElement('div');
    Body10.classList.add('body3');
    /***************Inner Structure Div Containers***************/
    // PS added Titlediv this div will hold all the div elements for the marketing
    const Titlediv = document.createElement('div');
    Titlediv.classList.add('titlesection');
    // PS added Marketingdiv This will hold the div containers promoting TaijiToy
    const Marketingdiv = document.createElement('div');
    Marketingdiv.classList.add('marketing');
    // PS added MarketingRowdiv for a row structured marketing and button option
    const MarketingRowdiv1 = document.createElement('div');
    MarketingRowdiv1.classList.add('marketingdiv');
    const MarketingRowdiv2 = document.createElement('div');
    MarketingRowdiv2.classList.add('marketingdiv2');
    const MarketingRowdiv3 = document.createElement('div');
    MarketingRowdiv3.classList.add('marketingdiv3');
    // PS added MarketingRevealdiv for a row structure holding text
    const MarketingRevealdiv1 = document.createElement('div');
    MarketingRevealdiv1.classList.add('marketingrevealdiv1')
    const MarketingRevealdiv2 = document.createElement('div');
    MarketingRevealdiv2.classList.add('marketingrevealdiv2')
    const MarketingRevealdiv3 = document.createElement('div');
    MarketingRevealdiv3.classList.add('marketingrevealdiv3');
    // PS added Offersdiv for a large title transition to more marketing
    const Offersdiv = document.createElement('div');
    Offersdiv.classList.add('offersdiv');
    // PS added SOLOSdiv for an image and text marketing segment
    const SOLOSdiv = document.createElement('div');
    SOLOSdiv.classList.add('solosdiv');
    // PS added Curateddiv for curated marketing
    const Curateddiv = document.createElement('div');
    Curateddiv.classList.add('curateddiv');
    // PS added Tailoreddiv for curated marketing
    const Tailoreddiv = document.createElement('div');
    Tailoreddiv.classList.add('tailoreddiv');
    // PS added Itemsdiv for curated marketing
    const Itemsdiv = document.createElement('div');
    Itemsdiv.classList.add('itemsdiv');
    /***************Innermost Div containers holding text or images***************/
    // PS added Descriptiondiv This div will hold the marketing text above the Logo
    const Descriptiondiv = document.createElement('div');
    Descriptiondiv.classList.add('titlesection-a');
    // PS added Logodiv this div will hold the TaijiToy text
    const Logodiv = document.createElement('div');
    Logodiv.classList.add('titlesection-b');
    // PS added TradeMarkdiv this div will hold the trademark text
    const TradeMarkdiv = document.createElement('div');
    TradeMarkdiv.classList.add('titlesection-c');
    // PS added Locationdiv This will hold text promoting TaijiToy
    const Locationdiv = document.createElement('div');
    Locationdiv.classList.add('marketing-a');
    // PS added Connectdiv This will hold text promoting TaijiToy
    const Connectdiv = document.createElement('div');
    Connectdiv.classList.add('marketing-b');
    // PS added Combinediv This will hold text promoting TaijiToy
    const Combinediv = document.createElement('div');
    Combinediv.classList.add('marketing-c');
    // PS added Collectdiv This will hold text promoting TaijiToy
    const Collectdiv = document.createElement('div');
    Collectdiv.classList.add('marketing-d');
    // PS added Sharediv This will hold text promoting TaijiToy
    const Sharediv = document.createElement('div');
    Sharediv.classList.add('marketing-e');
    // PS added Agesdiv This will hold text promoting TaijiToy
    const Agesdiv = document.createElement('div');
    Agesdiv.classList.add('marketing-f');
    // PS added MarketingInnerdiv for pictures & text to be structured
    const MarketingInnerdiv = document.createElement('div');
    MarketingInnerdiv.classList.add('marketinner');
    // PS added MarketingInnerdiv for pictures & text to be structured
    const MarketingInnerdiv2 = document.createElement('div');
    MarketingInnerdiv2.classList.add('marketinner');
    // PS added MarketingRevealInnerdiv for text spacing
    const MarketingRevealInnerdiv = document.createElement('div');
    MarketingRevealInnerdiv.classList.add('marketrevealinner');
    // PS added SOLOSinnerdiv for adding text alingside image
    const SOLOSinnerdiv = document.createElement('div');
    SOLOSinnerdiv.classList.add('solosinnerdiv');
    // PS added SOLOSinnerdiv1 for adding subtext
    const SOLOSinnerdiv1 = document.createElement('div');
    SOLOSinnerdiv1.classList.add('solosinnerdiv1');
    // PS added SOLOSinnerdiv2 for adding subtext
    const SOLOSinnerdiv2 = document.createElement('div');
    SOLOSinnerdiv2.classList.add('solosinnerdiv2');
    // PS added Curatedinnerdiv for curated marketing
    const Curatedinnerdiv = document.createElement('div');
    Curatedinnerdiv.classList.add('curatedinnerdiv');
    // PS added Curatedinnerdiv2 for curated marketing
    const Curatedinnerdiv2 = document.createElement('div');
    Curatedinnerdiv2.classList.add('curatedinnerdiv2');
    // PS added Tailoredinnerdiv for curated marketing
    const Tailoredinnerdiv = document.createElement('div');
    Tailoredinnerdiv.classList.add('tailoredinnerdiv');
    // PS added Tailoredinnerdiv2 for curated marketing
    const Tailoredinnerdiv2 = document.createElement('div');
    Tailoredinnerdiv2.classList.add('tailoredinnerdiv2');
    // PS added Itemsinnerdiv for curated marketing
    const Itemsinnerdiv = document.createElement('div');
    Itemsinnerdiv.classList.add('itemsinnerdiv');
    // PS added Itemsinnerdiv2 for curated marketing
    const Itemsinnerdiv2 = document.createElement('div');
    Itemsinnerdiv2.classList.add('itemsinnerdiv2');
    /***************Text to be Inserted into Div containers***************/
    // PS added Title
    const Title = document.createElement("p");
    Title.classList.add('title');
    Title.textContent = 'TaijiToy';
    // PS added Description
    const Description = document.createElement('p');
    Description.classList.add('pagetexttitle');
    Description.textContent = '3D yin-yang';
    // PS added TradeMark
    const TradeMark = document.createElement('p');
    TradeMark.classList.add('pagetexttitle');
    TradeMark.classList.add('trademarktitle');
    TradeMark.textContent = 'TM';
    // PS added Location of manufacturing
    const Location = document.createElement('p');
    Location.classList.add('pagetextsmallw');
    Location.textContent = 'Made In Boerne, Texas, USA';
    // PS added Connect marketing text
    const Connect = document.createElement('p');
    Connect.classList.add('pagetextlargew');
    Connect.textContent = 'Connect';
    // PS added Combine marketing text
    const Combine = document.createElement('p');
    Combine.classList.add('pagetextlargew');
    Combine.textContent = 'Combine';
    // PS added Combine marketing text
    const Collect = document.createElement('p');
    Collect.classList.add('pagetextlargew');
    Collect.textContent = 'Collect';
    // PS added Share marketing text
    const Share = document.createElement('p');
    Share.classList.add('pagetextlargew');
    Share.textContent = 'Share';
    // PS added Ages marketing text
    const Ages = document.createElement('p');
    Ages.classList.add('pagetextsmallw');
    Ages.textContent = 'Made For Ages 3 + UP';
    // PS added Explore to market Toy
    const Explore = document.createElement('p');
    Explore.classList.add('pagetextmediumb');
    Explore.textContent = 'Explore The Yin-Yang';
    // PS added Explore2 to market Toy
    const Explore2 = document.createElement('p');
    Explore2.classList.add('pagetextmediumb');
    Explore2.textContent = 'Explore Collections';
    // PS added represent1 text for markting
    const Represent1 = document.createElement('p');
    Represent1.classList.add('pagetextsmallw1');
    Represent1.textContent = 'Yin and Yang represent the inherent duality in all things. A Continuous dance of opposing yet interconnected and complementary forces striving for balance and harmony.';
    // PS added represent2 text for markting
    const Represent2 = document.createElement('p');
    Represent2.classList.add('pagetextsmallw1');
    Represent2.textContent = "Taiji (the Supreme Ultimate) represents the universe's initial state of undifferentiated unity, where the opposing forces of yin and yang exist in perfect balance and mutual interaction.";
    // PS added Reveals text for TaijiToy Marketing
    const Reveals = document.createElement('p');
    Reveals.classList.add('pagetextlargew');
    Reveals.textContent = 'TaijiToy Reveals';
    // PS added Halves text for TaijiToy Marketing
    const Halves = document.createElement('p');
    Halves.classList.add('pagetextlargew');
    Halves.textContent = 'How two halves make a whole.';
    // PS added First text for TaijiToy Marketing
    const First = document.createElement('p');
    First.classList.add('pagetextsmallw1');
    First.textContent = 'For the first time. You see the inner-workings of yin-yang';
    // PS added Offer text for TaijiToy Marketing
    const Offer = document.createElement('p');
    Offer.classList.add('pagetexttitleb');
    Offer.textContent = 'What TaijiToy Offers...';
    // PS added SOLOS text for TaijiToy Marketing
    const SOLOS = document.createElement('p');
    SOLOS.classList.add('pagetextlargeb');
    SOLOS.textContent = 'TaijiToy (solos)';
    // PS added SOLOS1 text for TaijiToy Marketing
    const SOLOS1 = document.createElement('p');
    SOLOS1.classList.add('pagetextsmallb1');
    SOLOS1.textContent = '- Assorted colors';
    // PS added SOLOS2 text for TaijiToy Marketing
    const SOLOS2 = document.createElement('p');
    SOLOS2.classList.add('pagetextsmallb1');
    SOLOS2.textContent = '- Buy in bulk and save';
    //PS added Curated text for TaijiToy Marketing
    const Curated = document.createElement('p');
    Curated.classList.add('pagetextlargew');
    Curated.textContent = 'Curated\nCollections'
    //PS added Curated2 text for TaijiToy Marketing list
    const Curated2 = document.createElement('p');
    Curated2.classList.add('pagetextsmallw1');
    Curated2.textContent = '- Spirits of the compass\n- Duality and change management\n- Trigrams of the I ching\n- Chinese Dragons\n- Chinese zondiac signs\n- Western zodiac signs';
    //PS added Tailored text for TaijiToy Marketing
    const Tailored = document.createElement('p');
    Tailored.classList.add('pagetextlargeb');
    Tailored.textContent = 'Custom Tailored\nCollections'
    //PS added Tailored2 text for TaijiToy Marketing list
    const Tailored2 = document.createElement('p');
    Tailored2.classList.add('pagetextmediumb');
    Tailored2.textContent = '- \u221E Infinite Possibilities \u221E :\n- Present 2+ themes: receive a kit\nuniquely tailored to your core values.\nYour pastimes/interest. Your\nAspirations';
    //PS added Items text for TaijiToy Marketing
    const Items = document.createElement('p');
    Items.classList.add('pagetextlargew');
    Items.textContent = 'Other items'
    //PS added Items2 text for TaijiToy Marketing list
    const Items2 = document.createElement('p');
    Items2.classList.add('pagetextmediumw');
    Items2.textContent = '-TaijiToy keychains\n-TaijiToy earrings\n-TaijiToy pendants\n-TaijiToy + other party games';
    /***************Images to be Inserted into Div containers***************/
    // PS added background image
    const Background = document.createElement('img');
    Background.classList.add('Background');
    Background.src = 'Background/Background1.png';
    // PS added background image
    const Background2 = document.createElement('img');
    Background2.classList.add('Background');
    Background2.src = 'Background/Background2.png';
    // PS added marketing photo for homepage
    const ToyPicture1 = document.createElement('img');
    ToyPicture1.classList.add('marketimage');
    ToyPicture1.src = 'Marketing_Images/TT+product+Image+001.jpg'
    // PS added marketing photo for homepage
    const ToyPicture2 = document.createElement('img');
    ToyPicture2.classList.add('marketimage');
    ToyPicture2.src = 'Marketing_Images/TT+product+Image+002.jpg'
    // PS added marketing photo for homepage
    const ToyPicture3 = document.createElement('img');
    ToyPicture3.classList.add('marketimage');
    ToyPicture3.src = 'Marketing_Images/TT+product+Image+003.jpg'
    // PS added marketing photo for homepage
    const ToyPicture4 = document.createElement('img');
    ToyPicture4.classList.add('marketimage');
    ToyPicture4.src = 'Marketing_Images/TT+product+Image+004.jpg'
    // PS added marketing photo for homepage
    const Marketingphoto1 = document.createElement('img');
    Marketingphoto1.classList.add('marketimage1');
    Marketingphoto1.src = 'Marketing_Images/Taji-Color206.png'
    // PS added marketing2 photo for homepage
    const Marketingphoto2 = document.createElement('img');
    Marketingphoto2.classList.add('marketimage1');
    Marketingphoto2.src = 'Marketing_Images/collections+banner.jpg';
    // PS added marketing3 photo for homepage
    const Marketingphoto3 = document.createElement('img');
    Marketingphoto3.classList.add('marketimage1');
    Marketingphoto3.src = 'Marketing_Images/possibilites+banner.jpg';
    // PS added marketing3 photo for homepage
    const Marketingphoto4 = document.createElement('img');
    Marketingphoto4.classList.add('marketimage1');
    Marketingphoto4.src = 'Marketing_Images/other+tiems+banner.jpg';
    // These commands just call all the elements to the screen
    /***************Navigation Bar***************/
    appContainer.appendChild(navwrapper);
    /***************Parent Div containers***************/
    appContainer.appendChild(Body);
    appContainer.appendChild(Body2);
    appContainer.appendChild(Body3);
    appContainer.appendChild(Body4);
    appContainer.appendChild(Body5);
    appContainer.appendChild(Body6);
    appContainer.appendChild(Body7);
    appContainer.appendChild(Body8);
    appContainer.appendChild(Body9);
    appContainer.appendChild(Body10);
    /***************Inner structured Div Containers***************/
    Body.appendChild(Titlediv);
    Body.appendChild(Marketingdiv);
    Body3.appendChild(MarketingRowdiv1);
    Body3.appendChild(MarketingRowdiv2);
    Body3.appendChild(MarketingRowdiv3);
    Body5.appendChild(MarketingRevealdiv1);
    Body5.appendChild(MarketingRevealdiv2);
    Body5.appendChild(MarketingRevealdiv3);
    Body6.appendChild(Offersdiv);
    Body7.appendChild(SOLOSdiv);
    Body8.appendChild(Curateddiv);
    Body9.appendChild(Tailoreddiv);
    Body10.appendChild(Itemsdiv);
    /***************Inner Div containers to hold content***************/
    Titlediv.appendChild(Descriptiondiv);
    Titlediv.appendChild(TradeMarkdiv);
    Titlediv.appendChild(Logodiv);
    Marketingdiv.appendChild(Locationdiv);
    Marketingdiv.appendChild(Connectdiv);
    Marketingdiv.appendChild(Combinediv);
    Marketingdiv.appendChild(Collectdiv);
    Marketingdiv.appendChild(Sharediv);
    Marketingdiv.appendChild(Agesdiv);
    MarketingRowdiv1.appendChild(MarketingInnerdiv);
    MarketingRowdiv2.appendChild(ComUtils.ShopNowButton);
    MarketingRowdiv3.appendChild(MarketingInnerdiv2);
    SOLOSdiv.appendChild(SOLOSinnerdiv);
    SOLOSinnerdiv.appendChild(SOLOSinnerdiv1);
    SOLOSinnerdiv.appendChild(SOLOSinnerdiv2);
    Tailoreddiv.appendChild(Tailoredinnerdiv);
    Tailoredinnerdiv.appendChild(Tailoredinnerdiv2);
    /***************Text to be inserted in inner div containers structure***************/
    Descriptiondiv.appendChild(Description);
    TradeMarkdiv.appendChild(TradeMark);
    Logodiv.appendChild(Title);
    Locationdiv.appendChild(Location);
    Connectdiv.appendChild(Connect);
    Combinediv.appendChild(Combine);
    Collectdiv.appendChild(Collect);
    Sharediv.appendChild(Share);
    Agesdiv.appendChild(Ages);
    MarketingRowdiv1.appendChild(Explore);
    MarketingRowdiv3.appendChild(Explore2);
    MarketingRevealdiv1.appendChild(Represent1);
    MarketingRevealdiv2.appendChild(Reveals);
    MarketingRevealdiv2.appendChild(Halves);
    MarketingRevealdiv2.appendChild(MarketingRevealInnerdiv);
    MarketingRevealdiv3.appendChild(Represent2);
    MarketingRevealInnerdiv.appendChild(First);
    Offersdiv.appendChild(Offer);
    SOLOSinnerdiv2.appendChild(SOLOS1);
    SOLOSinnerdiv2.appendChild(SOLOS2);
    SOLOSinnerdiv1.appendChild(SOLOS);
    Tailoredinnerdiv2.appendChild(Tailored);
    Tailoredinnerdiv.appendChild(Tailored2);
    /***************Images to be used by page***************/
    Body2.appendChild(Background);
    MarketingInnerdiv.appendChild(ToyPicture1);
    MarketingInnerdiv.appendChild(ToyPicture2);
    MarketingInnerdiv2.appendChild(ToyPicture3);
    MarketingInnerdiv2.appendChild(ToyPicture4);
    Body4.appendChild(Background2);
    SOLOSdiv.appendChild(Marketingphoto1);
    Curateddiv.appendChild(Marketingphoto2);
    Curateddiv.appendChild(Curatedinnerdiv);
    Curatedinnerdiv.appendChild(Curated);
    Curatedinnerdiv.appendChild(Curatedinnerdiv2);
    Curatedinnerdiv2.appendChild(Curated2);
    Tailoreddiv.appendChild(Marketingphoto3);
    Itemsdiv.appendChild(Marketingphoto4);
    Itemsdiv.appendChild(Itemsinnerdiv);
    Itemsinnerdiv.appendChild(Items);
    Itemsinnerdiv.appendChild(Itemsinnerdiv2);
    Itemsinnerdiv2.appendChild(Items2);
}


export const Trait_1 = 'This text is within Authentication_Page.js and testing linking dynamic text';
