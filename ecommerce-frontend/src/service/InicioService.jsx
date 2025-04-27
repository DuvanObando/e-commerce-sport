const API_URL = "http://localhost:8081/inicio"; // URL del backend

// Función para iniciar sesión
const iniciarSesion = async (correo, contrasena) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ correo, contrasena }),
        });

        // Obtenemos la respuesta en JSON
        const data = await response.json();

        // Si la autenticación es exitosa, almacenamos el token en localStorage
        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("usuario", JSON.stringify(data.usuario));
            return { success: true, message: "Inicio de sesión exitoso" };
        } else {
            return { success: false, message: data.message || "Credenciales incorrectas" };
        }
    } catch (error) {
        console.error("Error en la autenticación:", error);
        return { success: false, message: "Error en la conexión con el servidor" };
    }
};

// Función para cerrar sesión
const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
};

// Exportamos las funciones
export { iniciarSesion, cerrarSesion };