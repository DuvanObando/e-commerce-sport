package umb.ecommerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import umb.ecommerce.model.Roles;


public interface RolesRepository extends JpaRepository <Roles, Long>  {

	// Buscar un rol por su nombre
    Optional<Roles> findByNombre(String nombre);

    // Verificar si un rol existe por nombre
    boolean existsByNombre(String nombre);
    
    @Query(value = """
    	    SELECT r.nombre
    	    FROM roles r
    	    JOIN perfil_rol pr ON r.rol_id = pr.rol_id
    	    WHERE pr.perfil_id = :perfilId
    	""", nativeQuery = true)
    	List<String> findNombresRolesByPerfilId(@Param("perfilId") Long perfilId);
}
