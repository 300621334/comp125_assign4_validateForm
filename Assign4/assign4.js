var error = document.getElementById("err");
//var fName = document.getElementById("fname");
//var lName = document.getElementById("lname");
//var city = document.getElementById("city");
//var province = document.getElementById("prov");



function validateTextFields() {
    var fName = document.getElementById("fname");
    var lName = document.getElementById("lname");
    var city = document.getElementById("city");
    var province = document.getElementById("prov");
    fName.style.background = "";
    lName.style.background = "";
    city.style.background = "";
    province.style.background = "";

    try {
        if (fName.value === "") {
            fName.style.background = "pink";
            fName.focus();
            throw "Please fill in First Name";
        }
        if (/\d/.test(fName.value) === true)
        { fName.style.background = "pink"; fName.focus(); throw "First Name cannot contain numbers!"; }
        if (/[_a-zA-Z\-]/.test(fName.value) === false)
        { fName.style.background = "pink"; fName.focus(); throw "Names can only contain letters or '_' or '-'"; }


        if (lName.value === "")
        { lName.style.background = "pink"; lName.focus(); throw "Last Name missing!"; }
        if (/\d/.test(lName.value) === true)
        { lName.style.background = "pink"; lName.focus(); throw "No numbers in Last Name please!"; }
        if (/[_a-zA-Z\-]+/.test(lName.value) === false)
        { lName.style.background = "pink"; lName.focus(); throw "Names can only contain letters or '_' or '-'"; }

        if (province.selectedIndex == -1)
        { province.style.background = "pink"; province.focus(); throw "Select a province please"; }

        if (city.value === "")
        { city.style.background = "pink"; city.focus(); throw "What city you are in?"; }
        if (/\d/.test(city.value) === true)
        { city.style.background = "pink"; city.focus(); throw "City name cannot have numbers in it"; }
        if (/[a-zA-Z]/.test(city.value) === false)
        { city.style.background = "pink"; city.focus(); throw "Cite name can only contain alphabets"; }



        else
            error.innerHTML = "&nbsp;";
        validatePostCode(); //call next validation if no error thrown
	        

       
        
    }
    catch (msg) {
        error.innerHTML = msg;
    }

}
function validateDOB() {
    document.getElementById("age").value = ""; //putting this first line inside try block causes mis-fu!!!
    try {
        var dateBirh = document.getElementById("dob");
        dateBirh.style.background = "";
        if (/^\d{8}$/.test(dateBirh.value) == false) //^$ r necessary otherwise it looks for any 8 digits & allows even more than 8
        { dateBirh.style.background = "pink"; dateBirh.focus(); throw "Date of birth should be in format YYYYMMDD"; }
        //}
        //catch (msg) {
        //    error.innerHTML = msg;
        //}

        //Following age-calculator was taken from this site http://stackoverflow.com/questions/4060004/calculate-age-in-javascript
        //http://stackoverflow.com/questions/3505693/difference-between-datedatestring-and-new-datedatestring
        //var tmp = new RegExp(/^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] +?[0-9][A-Z][0-9]$/i) //multiple spaces optional.

        var dob = document.getElementById("dob").value;
        var year = Number(dob.substr(0, 4));
        var month = Number(dob.substr(4, 2)) - 1;
        var day = Number(dob.substr(6, 2));
        var today = new Date();
        var age = today.getFullYear() - year;
        if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) { age--; }
        document.getElementById("age").value = age;
        //try
        //{ if (age != 18 || age < 18)
        if (age < 18)
        { dateBirh.style.background = "pink"; dateBirh.focus(); throw "Age must be at least 18 years"; }
        //call next method
            validateEmail();
        //}
    }
    catch(msg)
    {
        error.innerHTML = msg;
    }

}
function validatePostCode() {
    try {
        var postcode = document.getElementById("pcode");
        postcode.style.background = "";
        //if want a dash and/or multiple spaces optional then: /^[A-Za-z]\d[A-Za-z]-? +?\d[A-Za-z]\d$/
        if (/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d *?$/.test(postcode.value) == false) //escaping hyphen not needed in [ -]? if no values on either side! works e or eout \
        { postcode.style.background = "pink"; postcode.focus(); throw "Type a valid Post Code."; }
        //next method call
        validateDOB(); //call next validation if no error thrown
        
    }
    catch (msg) {
        error.innerHTML = msg;
    }
}

function validateEmail() {
    try {
        var email = document.getElementById("email");
        email.style.background = "";
        //[_\w-] eout + would allow ONLY single char which could be any of three options. + aft [_\w-]+ allows more than one chars.
        if (/^[_\w-]+(\.[_\w-]+)*@[_\w-]+(\.[_\w-]+)*(\.[a-zA-Z]{2,6})$/.test(email.value) == false) //hyphen does not need escaping. To define numeric range hyphen must have int on both sides.
        { email.style.background = "pink"; email.focus(); throw "Please provide a valid email"; }
        validateUserName();
    }
    catch (msg)
    {
        error.innerHTML = msg;
    }
}
function validateUserName()
{
    try {
        var userName = document.getElementById("uname");
        userName.style.background = "";
        if (/.{4,}/.test(userName.value) == false)
        { userName.style.background = "pink"; userName.focus(); throw "Username should be at least 4 characters long"; }
        if (/\w/.test(userName.value) == false)
        { userName.style.background = "pink"; userName.focus(); throw "Username can contain only letters and digits"; }
        validatePass();
    }
    catch (msg) {
        error.innerHTML = msg;
    }
}
function validatePass()
{
    try
    {
        var pass = document.getElementById("pass1");
        pass.style.background = "";
        if (/.{6,}/.test(pass.value) == false) //nothing else BUT all cap = /^[A-Z]+$/
        { pass.style.background = "pink"; pass.focus(); throw "Password must be at least 6 characters long"; }
        if (/[A-Z]+/.test(pass.value) == false) //nothing else BUT all cap = /^[A-Z]+$/
        { pass.style.background = "pink"; pass.focus(); throw "Password must contain at least one capital letter"; }
        if (/[\d]+/.test(pass.value) == false)
        { pass.style.background = "pink"; pass.focus(); throw "Password must contain at least one number"; }
        if (/[\`\~\!\@\#\$\%\^\&\*\(\)\-\_\+\=\;\:\'\"\\\|\/\?\.\>\,\<]+/.test(pass.value) == false) //omitting backslash before hyphen in this case didn't work, so had to use \
        { pass.style.background = "pink"; pass.focus(); throw "Password must contain at least one special character"; }
        matchPass();
    }
    catch(msg)
    {
        error.innerHTML = msg;
    }
}

function matchPass()
{
    var pass1 = document.getElementById("pass1");
    var pass2 = document.getElementById("pass2");
    pass1.style.background = "";
    pass2.style.background = "";

    try
    {
        if(pass1.value != pass2.value)
        { pass1.style.background = "pink"; pass1.focus(); pass2.style.background = "pink"; pass2.focus(); throw "Passwords don't match!";}
        window.alert("Thanks for registering with our website, your customer record was created successfully.");
    }
    catch(msg)
    {
        error.innerHTML = msg;
    }
}



//function validate() {
//    validateTextFields();
//    validatePostCode();
//    validateDOB();
//}

window.addEventListener("load", setEventListeners, false);

function setEventListeners() {
    document.getElementById("prov").selectedIndex = -1;
    var submitBtn = document.getElementById("submit");
    var resetBtn = document.getElementById("reset");
    submitBtn.addEventListener("click", function (event) { event.preventDefault(); }, false); //stop default action of type="submit" btn
    resetBtn.addEventListener("click", function (event) { event.preventDefault(); }, false);
    resetBtn.addEventListener("click", reloadLocation, false);
    submitBtn.addEventListener("click", validateTextFields, false);;
}
function reloadLocation()
{
    location.reload(true); //true is optional. Diff b/w f5 & ^f5 
}




































