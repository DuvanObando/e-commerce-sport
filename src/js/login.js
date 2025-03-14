function validateLogin() {
    let email = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let emailError = document.getElementById("email-error");
    let passwordError = document.getElementById("password-error");
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordPattern = /^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    
    let valid = true;
    
    if (!emailPattern.test(email)) {
        emailError.style.display = "block";
        valid = false;
    } else {
        emailError.style.display = "none";
    }
    
    if (!passwordPattern.test(password)) {
        passwordError.style.display = "block";
        valid = false;
    } else {
        passwordError.style.display = "none";
    }
    
    if (valid) {
        alert("¡Bienvenido!");
    }
    
    return valid;
}