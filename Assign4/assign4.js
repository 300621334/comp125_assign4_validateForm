var error = document.getElementById("err");



function validateTextFields() {
    var fName = document.getElementById("fname");
    var lName = document.getElementById("lname");
    var city = document.getElementById("city");
    var province = document.getElementById("prov");

    try {
        if (fName.value === "")
            throw "Please fill in First Name";
        if (/\d/.test(fName.value) === true)
            throw "First Name cannot contain numbers!";
        if (/[_a-zA-Z\-]/.test(fName.value) === false)
            throw "Names can only contain letters or '_' or '-'";


        if (lName.value === "")
            throw "Last Name missing!";
        if (/\d/.test(lName.value) === true)
            throw "No numbers in Last Name please!";
        if (/[_a-zA-Z\-]+/.test(lName.value) === false)
            throw "Names can only contain letters or '_' or '-'";


        if (city.value === "")
            throw "What city you are in?";
        if (/\d/.test(city.value) === true)
            throw "City name cannot have numbers in it";
        if (/[a-zA-Z]/.test(city.value) === false)
            throw "Cite name can only contain alphabets";


        if(province.selectedIndex == -1)
            throw "Select a province please";
        else
            error.innerHTML = "";
	        validateDOB(); //call next validation if no error thrown

       
        
    }
    catch (msg) {
        error.innerHTML = msg;
    }

}
function validateDOB() {
    document.getElementById("age").value = ""; //putting this first line inside try block causes mis-fu!!!
    try {
        var dob = document.getElementById("dob");
        if (/^\d{8}$/.test(dob.value) == false) //^$ r necessary otherwise it looks for any 8 digits & allows even more than 8
            throw "Date of birth should be in format YYYYMMDD";
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
                throw "Age must be at least 18 years";
            validatePostCode(); //call next validation if no error thrown
        //}
    }
    catch(msg)
    {
        error.innerHTML = msg;
    }

}
function validatePostCode() {
    try {
        var postcode = document.getElementById("pcode").value;
        //if want a dash and/or multiple spaces optional then: /^[A-Za-z]\d[A-Za-z]-? +?\d[A-Za-z]\d$/
        if (/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d *?$/.test(postcode) == false) //escaping hyphen not needed in [ -]? if no values on either side! works e or eout \
            throw "Post Code is invalid, check if there are more than one spaces.";
        validateEmail()
    }
    catch (msg) {
        error.innerHTML = msg;
    }
}

function validateEmail() {
    try {
        var email = document.getElementById("email");
        //[_\w-] eout + would allow ONLY single char which could be any of three options. + aft [_\w-]+ allows more than one chars.
        if (/^[_\w-]+(\.[_\w-]+)*@[_\w-]+(\.[_\w-]+)*(\.[a-zA-Z]{2,6})$/.test(email.value) == false) //hyphen does not need escaping. To define numeric range hyphen must have int on both sides.
            throw "Please provide a valid email";
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
        if (/.{4,}/.test(userName.value) == false)
            throw "Username should be at least 4 characters long";
        if (/\w/.test(userName.value) == false)
            throw "Username can contain only letters and digits";
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
        if (/.{6,}/.test(pass.value) == false) //nothing else BUT all cap = /^[A-Z]+$/
            throw "Password must be at least 6 characters long";
        if (/[A-Z]+/.test(pass.value) == false) //nothing else BUT all cap = /^[A-Z]+$/
            throw "Password must contain at least one capital letter";
        if (/[\d]+/.test(pass.value) == false)
            throw "Password must contain at least one number";
        if (/[\`\~\!\@\#\$\%\^\&\*\(\)\-\_\+\=\;\:\'\"\\\|\/\?\.\>\,\<]+/.test(pass.value) == false) //omitting backslash before hyphen in this case didn't work, so had to use \
            throw "Password must contain at least one special character";
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
    try
    {
        if(pass1.value != pass2.value)
            throw "Passwords don't match!";
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
    submitBtn.addEventListener("click", function (event) { event.preventDefault(); }, false);
    submitBtn.addEventListener("click", validateTextFields, false);
}




































