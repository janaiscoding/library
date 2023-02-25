
const submitButton = document.getElementById('submit')

function validateEmail(){
    const email = document.getElementById('email')
    const patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.value.match(patternEmail)){
        alert("Valid")
        console.log('Email is correct')
    }
    else{
        console.log('Email is incorrect')
    }
    }
function validatePassword(){
    const password = document.getElementById('password')
    const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,24}$/;
    if(password.value.match(patternPassword)){
        alert("Password is valid")
    } 
    else {
        alert('1 Upper,1 lower, 1 number, 1 symbol, min 8 chars max 24 chars')
    }
}

function validatePasswordConfirm(){
    const password = document.getElementById('password')
    const passwordConfirm = document.getElementById('password-confirm')
    if( password.value !== '' && 
        passwordConfirm !== '' && 
        password.value === passwordConfirm.value) {
            alert('passwords match')
    }
    else {
        alert('passwords must match')

        }
}
function validateZipCode(){
    const country = document.getElementById('country')
    const zipcode = document.getElementById('zip-code')
    
    console.log(country.value)
    console.log(zipcode.value)
    //country & zipcode 
}
const validateForm = () => {
    validateEmail()
    validateZipCode()
    validatePassword()
    validatePasswordConfirm()
}
const submitEvent = function(e){
    e.preventDefault()
    validateForm();
}

submitButton.onclick = submitEvent;
window.onload = () => {
    document.getElementById('email').onchange = validateEmail;
    document.getElementById('password').onchange = validatePassword;
    document.getElementById('country').onchange = console.log(country.value)
    document.getElementById('password-confirm').onchange = validatePasswordConfirm;
}