function Validate() {
    const form = document.forms["sign_up"];
    const pass = form["password"].value.trim();
    const vPass = form["verifyPassword"].value.trim();
    const username = form["username"].value.trim();
    const email = form["email"].value.trim().toLowerCase();
  
    if (!username || !email || !pass || !vPass) {
      alert("All fields are required.");
      return false;
    }
  
    if (pass !== vPass) {
      alert("Ensure passwords match.");
      return false;
    }
  
    if (!email.endsWith("@students.towson.edu")) {
      alert("Must sign up with Towson University email.");
      return false;
    }
  
    if (pass.length < 8) {
      alert("Password must be at least 8 characters long.");
      return false;
    }
  
    alert("Welcome!");
    return true;
  }
  
  export default Validate;