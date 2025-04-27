package umb.ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import umb.ecommerce.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

	//Busca un usuario por su correo electrónico.
	Optional<Cliente> findByCorreo(String correo);
	
	// Verifica si existe un usuario con el correo dado.
    boolean existsByCorreo(String correo);

}
