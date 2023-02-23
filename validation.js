const email = document.getElementById('email')
const submitButton = document.getElementById('submit')
submitButton.addEventListener('click',(e)=>{
    e.preventDefault()
    HTMLInputElement.checkValidity()
})


const validateEmail = function(){
    const email = document.getElementById('email')
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.value.match(pattern)){
        alert("Valid")
        return true;
    }
    else {
        alert("Wrong")
        email.classList.add('email:invalid')
        return false
    }
}

window.onload = () => {
    document.getElementById('email').onchange = validateEmail;
}