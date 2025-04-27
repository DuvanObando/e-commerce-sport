// Esta función recupera el usuario autenticado desde localStorage
export const getUsuarioAutenticado = () => {
    try {
      const usuarioStr = localStorage.getItem("usuario");
      if (!usuarioStr) return null;
  
      const usuario = JSON.parse(usuarioStr);
  
      // Validación básica para asegurar que tiene tipo y correo
      if (!usuario.tipo || !usuario.correo) return null;
  
      return usuario;
    } catch (error) {
      console.error("Error al obtener el usuario autenticado:", error);
      return null;
    }
  };