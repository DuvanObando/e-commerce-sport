package umb.ecommerce.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "usuarios")
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_usuario")
	private Long idUsuario;

	@Column(name = "nombre", nullable = false, length = 100)
	private String nombre;

	@Column(name = "correo", nullable = false, unique = true, length = 150)
	private String correo;

	@Column(name = "contrasena", nullable = false, length = 255)
	private String contrasena;

	@Column(name = "direccion", length = 255)
	private String direccion;

	@Column(name = "telefono", length = 20)
	private String telefono;
}
