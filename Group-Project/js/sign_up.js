document.addEventListener('DOMContentLoaded', () => { 
    
    const form = document.getElementById('sign_up');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var password = document.forms["sign_up"]["password"].value;
        var vPass = document.forms["sign_up"]["verifyPassword"].value;
        var username = document.forms["sign_up"]["username"].value;
        var email = document.forms["sign_up"]["email"].value;
        if(password !== vPass ){
            alert("Ensure passwords match");
            return false;
        }
        if(!email.includes("towson.edu")){
            alert("Must sign up with towson university email.");
            return false;
        }

        fetch('/sign_up', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
          })
          .then(response => response.json())
          .then(data => {
            if (data.message) {
              alert("Welcome! Please Log In.");
              window.location.href = '/log_in';
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
