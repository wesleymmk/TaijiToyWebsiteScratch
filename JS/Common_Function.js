// This file contains common functions used in multiple .js files.
// Its primary purpose is to reduce the code base's size and increase organization.
// It does this through having 'common functions' such as the clear HTML code function.
export const appContainer = document.getElementById('app');
import * as AuthUtils from './Authentication_Page.js';
import * as GenUtils from './Order_Generation.js';
//This is the HTML Page Clear function. 
export function clearAppContainer()  // WM code // from online modified it so that it can be exported and used accross the server
{
    appContainer.innerHTML = '';
}

export function header() {
    let HomeLogo = document.createElement('img');
    HomeLogo.classList.add('LogoBox');
    HomeLogo.src = 'Brand_Logos/Taijitoylogolight.png';
    HomeLogo.alt = 'Color of Toy';
    HomeLogo.addEventListener('click', AuthUtils.renderWelcomeView);

    let AccountOption = document.createElement('p');
    AccountOption.textContent = 'Account';
    AccountOption.classList.add('headerOptions');
    //AccountOption.addEventListener('click', GenUtils.renderGenerationView);

    let GenerateOuputOption = document.createElement('p');
    GenerateOuputOption.textContent = 'Generate (Output)';
    GenerateOuputOption.classList.add('headerOptions');
    GenerateOuputOption.addEventListener('click', GenUtils.renderGenerationOutputView);

    let GenerateInputOption = document.createElement('p');
    GenerateInputOption.textContent = 'Generate (Input)';
    GenerateInputOption.classList.add('headerOptions');
    GenerateInputOption.addEventListener('click', GenUtils.renderGenerationInputView);

    let topBar = document.createElement('h1');
    topBar.classList.add('topBar');
    topBar.appendChild(HomeLogo);
    topBar.appendChild(AccountOption);
    topBar.appendChild(GenerateOuputOption);
    topBar.appendChild(GenerateInputOption);

    appContainer.appendChild(topBar);
}

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

