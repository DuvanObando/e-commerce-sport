package umb.ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import umb.ecommerce.model.Empleado;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {

	//Busca un usuario por su correo electrónico.
		Optional<Empleado> findByCorreo(String correo);
		
		// Verifica si existe un usuario con el correo dado.
	    boolean existsByCorreo(String correo);

	}

