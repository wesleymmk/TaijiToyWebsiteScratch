// This file contains common functions used in multiple .js files.
// Its primary purpose is to reduce the code base's size and increase organization.
// It does this through having 'common functions' such as the clear HTML code function.
export const appContainer = document.getElementById('app');
import * as AuthUtils from './Authentication_Page.js';
import * as GenUtils from './Order_Generation.js';
import * as AccUtils from './User_Account.js';
import * as Gen2Utils from './Order_Gen_Output.js';
//This is the HTML Page Clear function. 
export function clearAppContainer()  // WM code // from online modified it so that it can be exported and used accross the server
{
    appContainer.innerHTML = '';
}
// PS Added navmenu, accountmenu, Home, GenerateInputOption, GenerateOutputOption, AccountOption, HomeLogo.
/* These are just the buttons for the header that each webapge will call to simplify each file and reduce
repeating code*/
export const navmenu = document.createElement('div');
navmenu.classList.add('nav-menu');

export const accountmenu = document.createElement('div');
accountmenu.classList.add('account-menu');

export const Home = document.createElement('p');
Home.textContent = 'Home';
Home.classList.add('textnavmenu');
Home.addEventListener('click', function () { window.location.href = '#welcome-page'; });

export const GenerateInputOption = document.createElement('p');
GenerateInputOption.textContent = 'Input-Order';
GenerateInputOption.classList.add('textnavmenu');
GenerateInputOption.addEventListener('click', function () { window.location.href = '#order-input'; });

export const GenerateOutputOption = document.createElement('p');
GenerateOutputOption.textContent = 'Output-Order';
GenerateOutputOption.classList.add('textnavmenu');
GenerateOutputOption.addEventListener('click', function () { window.location.href = '#order-output'; });

export const AccountOption = document.createElement('p');
AccountOption.textContent = 'Account';
AccountOption.classList.add('textaccountmenu');
AccountOption.addEventListener('click', function () { window.location.href = '#account' });

export const HomeLogo = document.createElement('img');
HomeLogo.classList.add('LogoBox');
HomeLogo.src = 'Brand_Logos/Taijitoylogolight.png';
HomeLogo.alt = 'HOME';
HomeLogo.addEventListener('click', function () { window.location.href = '#welcome-page' });


// This function acts as an API call taking a JS object and a PHP endpoint
export function apiCall(php_file, js_object) // WM code // 
{
    return fetch(php_file, // Returns the result of fetch
        {
            method: 'POST',
            headers: {
                // tells the PHP script that the incoming data is JS
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(js_object) // this parses the data from a JS Object to a JSON string that can be read by php
        })
    /*
        .then(response =>
        {
            if (!response.ok) // Checks response
            {
                throw new Error(`No network response from ${php_file}`); // displays error that states where the problem is occuring
            }
            return response.json(); // returns response whenever 
        })
        .catch(error =>
        {
            console.error(`Fetch Error at ${php_file}:`, error);
            return { success: false, message: 'Could not connect to the server.' };
        });
        */
}

