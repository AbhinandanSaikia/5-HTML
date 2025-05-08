const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	// TO DO: Add authentication logic here
	// For demonstration purposes, we'll just check if the username and password are not empty
	if (username && password) {
		// Login successful, redirect to dashboard or whatever
		window.location.href = 'dashboard.html';
	} else {
		errorMessage.textContent = 'Invalid username or password';
	}
});