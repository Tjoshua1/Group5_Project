document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('log_in');
  if (!form) return;

  form.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting normally

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    if (!usernameInput || !passwordInput) {
      console.error('Form inputs not found');
      return;
    }

    const username = usernameInput.value;
    const password = passwordInput.value;

    fetch('/log_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        window.location.href = '/home';
      } else {
        document.getElementById('error-message').textContent = data.error || 'Login failed';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('error-message').textContent = 'An error occurred';
    });
  });
});
