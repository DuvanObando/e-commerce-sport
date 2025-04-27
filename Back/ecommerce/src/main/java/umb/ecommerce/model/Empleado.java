package umb.ecommerce.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "empleado")
public class Empleado {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "empleado_id")
	private Long idEmpleado;

	@Column(name = "nombre", nullable = false, length = 100)
	private String nombre;

	@Column(name = "correo", nullable = false, unique = true, length = 150)
	private String correo;

	@Column(name = "contrasena", nullable = false, length = 255)
	private String contrasena;

	@Column(name = "perfil_id")
	private Long perfilId;
}

