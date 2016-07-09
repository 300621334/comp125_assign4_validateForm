var error = document.getElementById("err");



function validateTextFields() {
    var fName = document.getElementById("fname");
    var lName = document.getElementById("lname");
    var city = document.getElementById("city");

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

        else
            error.innerHTML = "";
        validateDOB(); //call next validation if no error thrown
    }
    catch (msg) {
        error.innerHTML = msg;
    }

}
function validateDOB() {
    try {
        var dob = document.getElementById("dob");
        if (/^\d{8}$/.test(dob.value) == false) //^$ r necessary otherwise it looks for any 8 digits & allows even more than 8
            throw "Date of birth should be in format YYYYMMDD";
        validatePostCode(); //call next validation if no error thrown
    }
    catch (msg) {
        error.innerHTML = msg;
    }

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

}
function validatePostCode() {
    try {
        var postcode = document.getElementById("pcode").value;
        //if want a dash and/or multiple spaces optional then: /^[A-Za-z]\d[A-Za-z]-? +?\d[A-Za-z]\d$/
        if (/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d *?$/.test(postcode) == false) //escaping hyphen not needed in [ -]? if no values on either side! works e or eout \
            throw "Post Code is invalid, check if there are more than one spaces.";
    }
    catch (msg) {
        error.innerHTML = msg;
    }
}

function validateEmail() {
    try {
        var email = document.getElementById("email");
        if (/^[_-\w](\.[_-\w])*@[_-\w](\.[_-\w])*(\.[a-zA_Z]{2,6})$/.test(email) === false)
            throw "Please provide a valid email";
    }
    catch (msg) {

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




































