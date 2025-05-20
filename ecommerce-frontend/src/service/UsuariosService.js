const API_URL = "http://localhost:8081/api/usuarios";

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error al obtener usuarios');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Obtener detalles de un usuario específico
export const obtenerDetallesUsuario = async (id, tipo) => {
    try {
        const response = await fetch(`${API_URL}/${id}?tipo=${tipo}`);
        if (!response.ok) {
            throw new Error('Error al obtener detalles del usuario');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Eliminar usuario
export const eliminarUsuario = async (id, tipo) => {
    try {
        const response = await fetch(`${API_URL}/${id}?tipo=${tipo}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar usuario');
        }
        return true;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Cambiar rol de usuario
export const cambiarRolUsuario = async (id, nuevoRol) => {
    try {
        const response = await fetch(`${API_URL}/${id}/rol?nuevoRol=${nuevoRol}`, {
            method: 'PUT'
        });
        if (!response.ok) {
            throw new Error('Error al cambiar rol del usuario');
        }
        return true;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Actualizar estado de usuario
export const actualizarEstadoUsuario = async (id, tipo, nuevoEstado) => {
    try {
        const response = await fetch(
            `${API_URL}/${id}/estado?tipo=${tipo}&nuevoEstado=${nuevoEstado}`,
            {
                method: 'PUT'
            }
        );
        if (!response.ok) {
            throw new Error('Error al actualizar estado del usuario');
        }
        return true;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}; 