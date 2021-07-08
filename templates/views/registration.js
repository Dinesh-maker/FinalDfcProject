
function inLogin(){

    var newMail=document.getElementById("emil");
    var emailLoginError=document.getElementById("emailLoginError");
    var passLoginError=document.getElementById("passLoginError");

    emailLoginError.innerHTML="&nbsp;";
    passLoginError.innerHTML="&nbsp;";

    if(document.getElementsByTagName("input")[0].value 
    && document.getElementsByTagName("input")[1].value){
        if(!validEmail(newMail.value)){
            emailLoginError.innerHTML="Wrong email address";
            newMail.value="";
        }
        else{
            //Do everything here after login button is pressed
        }
    }
    else{
        if(!emailLoginError.value)
        emailLoginError.innerHTML="*** Enter the Email"
        if(!passLoginError.value)
        passLoginError.innerHTML="*** Enter the Password"
    }
}
function inRegister(){
    var newMail=document.getElementById("emil");
    var firstError=document.getElementById("firstError");
    var secondError=document.getElementById("secondError");
    var emailError=document.getElementById("emailError");
    var passError=document.getElementById("passError");
    var conpassError=document.getElementById("conpassError");
    firstError.innerHTML="&nbsp;";
    secondError.innerHTML="&nbsp;";
    emailError.innerHTML="&nbsp;";
    passError.innerHTML="&nbsp;";
    conpassError.innerHTML="&nbsp;";
    if(document.getElementsByTagName("input")[0].value 
    && document.getElementsByTagName("input")[1].value
    && document.getElementsByTagName("input")[2].value
    && document.getElementsByTagName("input")[3].value
    && document.getElementsByTagName("input")[4].value)
    {
    //var regFive=/([a-zA-Z]+(@)[^\s]+)/g;

    if(!validEmail(newMail.value)){
            emailError.innerHTML="Wrong email address";
            newMail.value="";
        }
        else if(document.getElementById("pass").value!==document.getElementById("conpass").value)
        {passError.innerHTML="Password and Confirm password does not match"

    }
     
    else{

            //Do everything here after register button is pressed
    }
    }
    else{
        if(!firstError.value)
        firstError.innerHTML="*** Enter the First Name"
        if(!secondError.value)
        secondError.innerHTML="*** Enter the Last Name"
        if(!emailError.value)
        emailError.innerHTML="*** Enter the Email"
        if(!passError.value)
        passError.innerHTML="*** Enter the Password"
        if(!conpassError.value)
        conpassError.innerHTML="*** Enter the Password"
    }
}

 function validEmail(emailID) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(emailID).search (filter) != -1;
}