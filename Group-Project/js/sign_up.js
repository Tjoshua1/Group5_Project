function validate(){
    var pass = document.forms["sign_up"]["password"].value;
    var vPass = document.forms["sign_up"]["verifyPassword"].value;
    var username = document.forms["sign_up"]["username"].value;
    var email = document.forms["sign_up"]["email"].value;
    if(pass !== vPass ){
        alert("Ensure passwords match");
        return false;
    }
    if(!email.includes("towson.edu")){
        alert("Must sign up with towson university email.");
        return false;
    }
    alert("Welcome!");
    return true;
}