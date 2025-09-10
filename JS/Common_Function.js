// This file contains common functions used in multiple .js files.
// Its primary purpose is to reduce the code base's size and increase organization.
// It does this through having 'common functions' such as the clear HTML code function.
export const appContainer = document.getElementById('app');
//This is the HTML Page Clear function. 
export function clearAppContainer() {  // WM code // from online modified it so that it can be exported and used accross the server
    appContainer.innerHTML = '';
}
