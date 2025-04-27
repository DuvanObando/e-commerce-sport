// Definimos la clase Usuario para estructurar los datos del usuario
class Usuario {
    constructor(nombre, correo, contrasena, direccion, telefono) {
      this.nombre = nombre;
      this.correo = correo;
      this.contrasena = contrasena;
      this.direccion = direccion;
      this.telefono = telefono;
    }
  }
  // Exportamos la clase para poder usarla en otros archivos
  export default Usuario;