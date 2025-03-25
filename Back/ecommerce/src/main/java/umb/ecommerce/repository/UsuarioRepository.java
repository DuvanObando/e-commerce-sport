package umb.ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import umb.ecommerce.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	//Busca un usuario por su correo electrónico.
	Optional<Usuario> findByCorreo(String correo);
	
	// Verifica si existe un usuario con el correo dado.
    boolean existsByCorreo(String correo);

}
