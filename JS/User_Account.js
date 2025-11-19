// It does this through having 'common functions' such as the clear HTML code function.
export const appContainer = document.getElementById('app');
import * as AuthUtils from './Authentication_Page.js';
import * as GenUtils from './Order_Generation.js';
import * as ComUtils from './Common_Function.js';


export function renderUserAccount() {
    ComUtils.clearAppContainer();
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
    navwrapper.id = 'account'; // This is adding an id for the css class to specifically target this attribute
    navwrapper.classList.add('nav-wrapper'); // Class added
    navwrapper.appendChild(ComUtils.HomeLogo); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.navmenu); // Grab button from Common_Function.js
    navwrapper.appendChild(ComUtils.accountmenu); // Grab button from Common_Function.js
    ComUtils.Home.classList.remove('home'); // Class removed
    ComUtils.CreateOption.classList.remove('inputorder'); // Class removed
    ComUtils.AccountOption.classList.add('account'); // Class added
    ComUtils.navmenu.appendChild(ComUtils.Home); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.StoreOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.AboutOption); // Grab button from Common_Function.js
    ComUtils.navmenu.appendChild(ComUtils.ContactOption); // Grab button from Common_Function.js
    

    let heading = document.createElement('h1');
    heading.classList.add('header');
    
    const userEmail=localStorage.getItem('userEmail');

    
    heading.textContent='User Account'

    


    /*Done by EQ*/
const scrollableContent = document.createElement('div');
scrollableContent.classList.add('scrollable-content');

scrollableContent.innerHTML = '<p>Loading your order history...</p>';

 function testFetchOrderHistory() {
    console.log("Attempting to fetch order history...");

    ComUtils.apiCall('api/acc_pg.php', {})
        .then(rawResponse => {
            if (!rawResponse.ok) {
                throw new Error(`Network error: ${rawResponse.statusText}`);
            }
            return rawResponse.json(); 
        })
        .then(parsedData => {
            console.log("--- Response Received from Server ---");
            console.log("Full raw data object:", parsedData);

            scrollableContent.innerHTML = '';

            if (parsedData.success) {
                console.log("Status: SUCCESS");

                if (parsedData.data.total_orders > 0 && parsedData.data.orders) {
                    parsedData.data.orders.forEach(order => {
                        // Create a container for each order
                        const orderItem = document.createElement('div');
                        orderItem.classList.add('order-history-item');

                        const orderId = order.order_id || 'N/A';
                        const trait1=order.trait_1|| 'N/A';
                        const trait2=order.trait_2|| 'N/A';

                        orderItem.innerHTML = `
                            <div class="order-id">
                            <button class="button order-id-button" data-order-id="${orderId}">
                            Order Number: ${orderId}<div>
                            <div>Traits: ${trait1}, ${trait2}
                            </button></div><hr>                
                        `;
                        scrollableContent.appendChild(orderItem);
                    });
                }   else{
                    scrollableContent.innerHTML = '<p>Oh no you do not have any orders yet! Create a new order by heading into the Create Order tab!!</p>';
                    console.log("No orders found for this user.");
                }

            } else {
                console.error("Status: FAILED");
                console.error("Error Message:", parsedData.message);
                scrollableContent.innerHTML = `<p>Error loading orders: ${parsedData.message}</p>`;
            }

        })
        .catch(error => {
            console.error("--- A CRITICAL ERROR OCCURRED ---");
            console.error(error.message);
            console.log("-------------------------------------");
            scrollableContent.innerHTML = '<p>A network error occurred. Please try again later.</p>';
        });

    }

    scrollableContent.addEventListener('click', function(event) {

        const clickedButton = event.target.closest('.order-id-button');

        if(clickedButton){

            const clickedOrderId = event.target.dataset.orderId;

            console.log("Storing Order ID:", clickedOrderId);

            localStorage.setItem('selectedOrderId',clickedOrderId);

            window.location.href='#order-output';
        }
    });


    // 3. Create a button to trigger the scroll action
    const scrollButton = document.createElement('button');
    scrollButton.textContent = 'Scroll to Bottom';
    scrollButton.classList.add('button2', 'pagetextlargeb');

    // 4. Define the function to scroll the element
    function scrollToBottom() {
        // We use the 'scrollableContent' variable we just created
        scrollableContent.scrollTop = scrollableContent.scrollHeight;
    }

    // 5. Add event listeners
    scrollButton.addEventListener('click', scrollToBottom);

    scrollableContent.addEventListener('scroll', () => {
        console.log('Scrolled!');
    });


    const logoutButton=document.createElement('button');
    logoutButton.textContent='Logout';
    logoutButton.classList.add('button2', 'pagetextlargeb');

    // **************************************************
    // START: LOGOUT LISTENER ADDED
    // **************************************************
    logoutButton.addEventListener('click', (event) => {
        event.preventDefault();

        // 1. Call the server-side script to destroy the PHP session
        ComUtils.apiCall('api/logout.php', {})
            .then(response => {
                if(response.status === 204 || response.headers.get('content-length') === '0') {
                    return {}
                }
                return response.json();

            })
            .then(data => {
                if (data && data.success) {
                    console.log("Session successfully destroyed on server.");

                    // 2. Cleanup Client-Side (Analytics tracker)
                    // resetSessionClickCount is assumed to be imported via ComUtils
                    ComUtils.resetSessionClickCount();

                    // 3. Redirect to the main homepage/welcome screen
                    window.location.href = '#welcome-page';
                    window.location.reload();
                } else {
                    console.error("Logout failed on server:", data.message);
                    // Even if server failed, force redirect locally for UX
                    window.location.href = '#welcome-page';
                    window.location.reload();
                }
            })
            .catch(error => {
                console.error("Network error during logout:", error);
                // Force redirect locally
                window.location.href = '#welcome-page';
                window.location.reload();
            });
    });
    // **************************************************
    // END: LOGOUT LISTENER ADDED
    // **************************************************



    testFetchOrderHistory();
    

    /***************Navigation Bar***************/
    appContainer.appendChild(navwrapper);
    /***************Parent Div containers***************/
    appContainer.appendChild(heading);
    // 6. Append the new elements to the page
    appContainer.appendChild(scrollableContent);
    appContainer.appendChild(scrollButton);
    appContainer.appendChild(logoutButton);
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

/* Function to test fetching the order history
function testFetchOrderHistory() {
    console.log("Attempting to fetch order history...");

    ComUtils.apiCall('api/acc_pg.php', {})
        .then(rawResponse => {
            if (!rawResponse.ok) {
                throw new Error(`Network error: ${rawResponse.statusText}`);
            }
            return rawResponse.json(); 
        })
        .then(parsedData => {

            console.log("--- Response Received from Server ---");

            if (parsedData.success) {
                console.log("Status: SUCCESS");
                console.log("Total Orders:", parsedData.data.total_orders);
                console.log("Order List:", parsedData.data.order_list);
            } else {
                console.error("Status: FAILED");
                console.error("Error Message:", parsedData.message);
            }

            console.log("-------------------------------------");
            console.log("Full raw data object:", parsedData);
        })
        .catch(error => {
            console.error("--- A CRITICAL ERROR OCCURRED ---");
            console.error(error.message);
            console.log("-------------------------------------");
        });

    }*/
