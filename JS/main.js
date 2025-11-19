//*************************************************************************************************************************//
//***********************BRAND NEW IMPLEMENTATION OF WEBSITE TESTING CURRENTLY - PS****************************************//
//*************************************************************************************************************************//

import * as WelcomePage from './Authentication_Page.js';
import * as Account from './User_Account.js';
import * as InputOrder from './Order_Generation.js';
import * as OutputOrder from './Order_Gen_Output.js';
import * as ComUtils from './Common_Function.js';

const contentContainer = document.getElementById('content');

function loadPage() {
    const hash = window.location.hash.substring(1); // Get the hash

    let content = '';
    switch (hash) {
        case 'order-output':
            ComUtils.apiCall('api/login_check.php')

                .then(response => response.json())
                .then(data => {
                    if (data.success && data.isLoggedIn) {
                        content = OutputOrder.renderGenerationOutputView();
                    } else {
                        // Login failed
                        window.location.href = '#welcome-page';
                        alert('Please Login');
                    }
                })
            break;
        case 'order-input':
            ComUtils.apiCall('api/login_check.php')

                .then(response => response.json())
                .then(data => {
                    if (data.success && data.isLoggedIn) {
                        content = InputOrder.renderGenerationInputView();
                    } else {
                        // Login failed
                        window.location.href = '#welcome-page';
                        alert('Please Login');
                    }
                })
            break;
        case 'account':
            ComUtils.apiCall('api/login_check.php')

                .then(response => response.json())
                .then(data => {
                    if (data.success && data.isLoggedIn) {
                        content = Account.renderUserAccount();
                    } else {
                        // Login failed
                        window.location.href = '#welcome-page';
                        alert('Please Login');
                    }
                })
            break;
        case 'welcome-page':
        default:
            content = WelcomePage.renderWelcomeView();
            break;
    }

    //contentContainer.innerHTML = content;
}

window.addEventListener('hashchange', loadPage);

loadPage();