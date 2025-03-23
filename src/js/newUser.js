function validateRegister() {
    let username = document.getElementById("new-username").value;
    let password = document.getElementById("new-password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordPattern = /^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    let usernameError = document.getElementById("username-error");
    let passwordError = document.getElementById("password-error");
    let confirmPasswordError = document.getElementById("confirm-password-error");
    
    let valid = true;
    
    if (!emailPattern.test(username)) {
        usernameError.style.display = "block";
        valid = false;
    } else {
        usernameError.style.display = "none";
    }
    
    if (!passwordPattern.test(password)) {
        passwordError.style.display = "block";
        valid = false;
    } else {
        passwordError.style.display = "none";
    }
    
    if (password !== confirmPassword) {
        confirmPasswordError.style.display = "block";
        valid = false;
    } else {
        confirmPasswordError.style.display = "none";
    }
    
    if (valid) {
        alert("Nuevo Usuario Registrado");
    }
    
    return valid;
}