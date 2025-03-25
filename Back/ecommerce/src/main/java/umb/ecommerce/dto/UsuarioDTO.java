package umb.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UsuarioDTO {

	private String nombre;
	private String correo;
	private String contrasena;
	private String direccion;
	private String telefono;
}
