function creatingPost(){
    var subjectLine = document.forms["postCreation"]["PostTitle"].value;
    var paragraph  = document.forms["postCreation"]["PostContent"].value;
    
    sessionStorage.setItem("PostTitle", subjectLine);
    sessionStorage.setItem("PostContent", paragraph);
    window.location.href = "home.html";
}