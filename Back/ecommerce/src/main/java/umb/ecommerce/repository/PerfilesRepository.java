package umb.ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import umb.ecommerce.model.Perfiles;

public interface PerfilesRepository extends JpaRepository<Perfiles, Long> {

	// Buscar perfil por descripción
	Optional<Perfiles> findByDescripcion(String descripcion);
}