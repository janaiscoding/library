window.onload = () => {
    document.getElementById('email').onchange = validateEmail;
}

const email = document.getElementById('email')
const country = document.getElementById('country')
const zipcode = document.getElementById('zip-code')
const password = document.getElementById('password')
const passwordConfirm = document.getElementById('password-confirm')
const submitButton = document.getElementById('submit')

const validateEmail = function(){
    const email = document.getElementById('email')
    const patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.value.match(pattern)){
        alert("Valid")
        return true;
        
    }
    else {
        alert("Wrong")
        email.classList.add('email:invalid')
        messages.emailError()
        return false
    }
}

const submitEvent = function(e){
    e.preventDefault()
    HTMLInputElement.checkValidity()
}
submitButton.onclick = submitEvent;

let messages = new Messages()

class Messages(){
    constructor(error,success){
        this.error = []
        this.success = []
    }
    emailError(){
        this.error.push('Email is incorrect')
        alert('Email is incorrect')
    }
}