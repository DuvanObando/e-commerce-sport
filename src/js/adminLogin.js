// Función para validar los datos del formulario de inicio de sesión para administradores
function validateAdminLogin() {
    // Obtener el valor del campo de correo electrónico (usuario)
    let email = document.getElementById("admin-username").value;
    // Obtener el valor del campo de contraseña
    let password = document.getElementById("admin-password").value;
    
    // Obtener los elementos donde se mostrarán los mensajes de error
    let emailError = document.getElementById("admin-email-error");
    let passwordError = document.getElementById("admin-password-error");
    
    // Expresión regular para validar el formato del correo electrónico
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Expresión regular para validar la contraseña:
    // Mínimo 8 caracteres, al menos dos números y un carácter especial
    let passwordPattern = /^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    
    // Variable que indica si los datos son válidos
    let valid = true;
    
    // Validación del correo electrónico
    if (!emailPattern.test(email)) {
      // Si el correo no cumple el patrón, mostrar el mensaje de error
        emailError.style.display = "block";
        valid = false;
    } else {
      // Si es válido, ocultar el mensaje de error
        emailError.style.display = "none";
    }
    
    // Validación de la contraseña
    if (!passwordPattern.test(password)) {
      // Si la contraseña no cumple el patrón, mostrar el mensaje de error
        passwordError.style.display = "block";
        valid = false;
    } else {
      // Si es válida, ocultar el mensaje de error
        passwordError.style.display = "none";
    }
    
    // Si ambos campos son válidos, se muestra un mensaje de bienvenida
    if (valid) {
        alert("¡Bienvenido Administrador!");
    }
    
    // Retornar el estado de validación (true si es válido, false si no lo es)
    return valid;
}
