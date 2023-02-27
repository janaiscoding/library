document.addEventListener("DOMContentLoaded", () => {
    //SELECTORS 
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const passwordConfirm = document.getElementById('password-confirm')
    const country = document.getElementById('country');
    const zipcode = document.getElementById('zip-code')
    const submitButton = document.getElementById('submit')

    //VARIABLES
    let emailIsValid = false;
    let pwIsValid = false;
    let zipcodeIsValid = false;
    let pwcIsValid = false;
    
    //HELPER FUNCTIONS 
    const validateEmail = (value) => {
        const patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(value.match(patternEmail)){
            return true;
        } 
        return false;
    } 
    const validatePassword = (value) => {
        const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,24}$/;
        const passwordInfo = document.querySelector('.info-pw');
        if(value.match(patternPassword)){
            passwordInfo.innerHTML = "Password is valid";
            return true;
        }
        else {
          passwordInfo.innerHTML = "1 Upper, 1 Lower, 1 special symbol, 8 chars";
          passwordInfo.style.display = "block";
          return false;
        }
    }

    const validatePasswordConfirm = (value) => {
        const passwordConfirmInfo = document.querySelector('.info-pwc')
        if(value === password.value){
            passwordConfirmInfo.innerHTML = "Passwords match!"
            return true;
        }
        else {
            passwordConfirmInfo.innerHTML = "Passwords must match."
            passwordConfirmInfo.style.display = "block";
            return false;
        }
    }

    const validateZipcode = (value) => {
        const zipcodeInfo = document.querySelector('.info-zc')
        if (country.value === 'US') {
            const USRegex = /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/;
            if(value.match(USRegex)){
                zipcodeInfo.innerHTML = "Zipcode is correct."
                return true;
            }
            else {
                zipcodeInfo.innerHTML = "Zipcode must match your country."
                zipcodeInfo.style.display = "block";
                return false;
            }
        }
        else if(country.value === "default") {
            zipcodeInfo.style.display = "block";
            zipcodeInfo.innerHTML = "Select your country first.";
        }

    }
    // STYLE FUNCTIONS
    const applyInvalidStyle = (element) => {
        element.classList.remove("input-valid-state")
        element.classList.add("input-invalid-state")
    }
    const applyValidStyle = (element) => {
        element.classList.add("input-valid-state")
        element.classList.remove("input-invalid-state")
    }
    const disableSubmitButton = () => {
        submitButton.disabled = true;
        submitButton.classList.add("submit-disabled-state")
    }
    const enableSubmitButton = () => {
        submitButton.disabled = false;
        submitButton.classList.remove("submit-disabled-state")
    }
    const updateSubmitButton = () => {
        if (emailIsValid&& 
            pwIsValid &&
            pwcIsValid){
            enableSubmitButton();
        }
        else disableSubmitButton();
    }

    // EVENT LISTENERS
    email.addEventListener('input' , (e) => {
        const emailValue = e.target.value;
        if(validateEmail(emailValue)){
            emailIsValid = true;
            applyValidStyle(email);
        }
        else {
            emailIsValid = false;
            applyInvalidStyle(email)
        }
        updateSubmitButton();
    });

    password.addEventListener('input', (e) => {
        const passwordValue = e.target.value;
        if(validatePassword(passwordValue)){
            pwIsValid = true;
            applyValidStyle(password);
        }
        else {
            pwIsValid = false;
            applyInvalidStyle(password);
        }
        updateSubmitButton();
    });

    passwordConfirm.addEventListener('input',(e) => {
        const passwordConfirmValue = e.target.value;
        if(validatePasswordConfirm(passwordConfirmValue)){
            pwcIsValid = true;
            applyValidStyle(passwordConfirm);
        }
        else {
            pwcIsValid = false;
            applyInvalidStyle(passwordConfirm);
        }
        updateSubmitButton();
    });
    zipcode.addEventListener('input', (e) => {
        const zipcodeValue = e.target.value;
        if(validateZipcode(zipcodeValue)){
            zipcodeIsValid = true;
            applyValidStyle(zipcode);
        }
        else {
            zipcodeIsValid = false;
            applyInvalidStyle(zipcode);
        }
        updateSubmitButton()
    })
    //INITIALIZATION
    updateSubmitButton();
})
