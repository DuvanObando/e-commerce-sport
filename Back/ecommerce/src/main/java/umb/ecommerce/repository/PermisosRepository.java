package umb.ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import umb.ecommerce.model.Permisos;

public interface PermisosRepository extends JpaRepository<Permisos, Long> {

	Optional<Permisos> findByNombre(String nombre);

	boolean existsByNombre(String nombre);
}
