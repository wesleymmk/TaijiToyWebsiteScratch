document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('form-container');

    
    const heading = document.createElement('h1');
    heading.textContent = 'Create Account';

    // Create the email input element
    const emailInput = document.createElement('input');
    emailInput.type = 'email'; // Changed type to 'email' for better validation
    emailInput.placeholder = 'Email';
    emailInput.className = 'email-bar'; // Use className to set the class

    // Create the password input element
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password'; // Changed type to 'password' to hide characters
    passwordInput.placeholder = 'Password';
    passwordInput.className = 'password-bar';

    // Create the submit button element
    const submitButton = document.createElement('button');
    submitButton.textContent = 'submit';
    submitButton.className = 'submit-button';

    // --- Append the created elements to the container in the correct order ---
    container.appendChild(heading);
    container.appendChild(emailInput);
    container.appendChild(passwordInput);
    container.appendChild(submitButton);

    // --- Add an event listener to the button ---
    submitButton.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        console.log('Form submitted!');
        console.log('Email:', email);
        console.log('Password:', password);
        // In a real application, you would send this data to a server
        // for processing (e.g., using fetch() to make an API call).
    });

});
