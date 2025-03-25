// Importamos el modelo Usuario
import Usuario from "../model/Usuario"; 

// URL del backend
const API_URL = "http://localhost:8081/usuarios/registro";

// Función para registrar un usuario en el backend
const registrarUsuario = async (nombre, correo, contrasena, direccion, telefono) => {
    // Creamos un objeto Usuario con los datos proporcionados
    const usuario = new Usuario(nombre, correo, contrasena, direccion, telefono);

    try {
        // Realizamos la petición al backend
        const response = await fetch(API_URL, {
            method: "POST", // Usamos el método POST para enviar datos
            headers: {
                "Content-Type": "application/json", // Indicamos que enviamos JSON
            },
            body: JSON.stringify(usuario), // Convertimos el objeto Usuario a JSON
        });

        // Obtenemos la respuesta del backend
        const data = await response.text();

        // Retornamos el resultado de la petición
        return { success: response.ok, message: data };
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return { success: false, message: "Error en la conexión con el servidor." };
    }
};

// Exportamos la función para que pueda ser usada en otros archivos
export { registrarUsuario };