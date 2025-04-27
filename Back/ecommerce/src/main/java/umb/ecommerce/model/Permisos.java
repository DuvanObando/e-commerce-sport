package umb.ecommerce.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "permisos")
public class Permisos {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "permiso_id")
	private Long id;

	@Column(name = "nombre", nullable = false, unique = true)
	private String nombre;

	@Column(name = "descripcion")
	private String descripcion;

	@ManyToMany(mappedBy = "permisos")
	private Set<Roles> roles = new HashSet<>();
}