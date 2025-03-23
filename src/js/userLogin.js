// Función para validar el formulario de inicio de sesión
function validateLogin() {
    // Se obtiene el valor ingresado en el campo de usuario (correo electrónico)
    let email = document.getElementById("username").value;
    // Se obtiene el valor ingresado en el campo de contraseña
    let password = document.getElementById("password").value;
    
    // Se obtienen los elementos donde se mostrarán los mensajes de error
    let emailError = document.getElementById("email-error");
    let passwordError = document.getElementById("password-error");
    
    // Expresión regular para validar el formato de un correo electrónico
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Expresión regular para validar la contraseña:
    // Debe tener al menos 8 caracteres, contener al menos dos números y un carácter especial
    let passwordPattern = /^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    
    // Variable que indicará si los datos son válidos (inicialmente se asume que sí)
    let valid = true;
    
    // Validación del correo electrónico
    if (!emailPattern.test(email)) {
        // Si el correo no cumple con el patrón, se muestra el mensaje de error
        emailError.style.display = "block";
        valid = false;
    } else {
        // Si el correo es válido, se oculta el mensaje de error
        emailError.style.display = "none";
    }
    
    // Validación de la contraseña
    if (!passwordPattern.test(password)) {
        // Si la contraseña no cumple con el patrón, se muestra el mensaje de error
        passwordError.style.display = "block";
        valid = false;
    } else {
        // Si la contraseña es válida, se oculta el mensaje de error
        passwordError.style.display = "none";
    }
    
    // Si ambos campos son válidos, se muestra un mensaje de bienvenida
    if (valid) {
        alert("¡Bienvenido!");
    }
    
    // Se retorna el estado de validación (true si es válido, false en caso contrario)
    return valid;
}
