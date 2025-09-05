document.addEventListener('DOMContentLoaded', () => {
    const container=document.getElementById('form-container');

    const heading=document.createElement('h1');
    heading.textContent = 'Log in';

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Enter your email';
    emailInput.required = true;
    emailInput.className='email-bar';

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Enter your password';
    passwordInput.required = true;
    passwordInput.className='password-bar';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Login';
    submitButton.className='submit-button';


    container.appendChild(heading);
    container.appendChild(emailInput);
    container.appendChild(passwordInput);
    container.appendChild(submitButton);

    submitButton.addEventListener('click', () => {
        const email= emailInput.value;
        const password=passwordInput.value;
        console.log('Logged in!');
        console.log('Email:', email)
        console.log('Password:', password);

    });
});