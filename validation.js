const country = document.getElementById('country')
const zipcode = document.getElementById('zip-code')
const password = document.getElementById('password')
const passwordConfirm = document.getElementById('password-confirm')
const submitButton = document.getElementById('submit')

const submitEvent = function(e){
    e.preventDefault()
    HTMLInputElement.checkValidity()
}
submitButton.onclick = submitEvent;

class handleForm {
    static emailError(){
        alert("Wrong")
        this.error.push('Email is incorrect')
        alert('Email is incorrect')
        email.classList.add('email:invalid')
    }
    static emailSuccess(){
        alert("Valid")
        email.classList.add('email:valid')
    }

    static validateEmail(){
    const email = document.getElementById('email')
    const patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.value.match(patternEmail)) handleForm.emailSuccess()
    else handleForm.emailError()
    }
}

let validation = new handleForm()
window.onload = () => {
    document.getElementById('email').onchange = validation.validateEmail;
}