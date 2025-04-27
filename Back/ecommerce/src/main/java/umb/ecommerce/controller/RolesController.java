package umb.ecommerce.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import umb.ecommerce.model.Roles;
import umb.ecommerce.service.RolesService;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
@Log4j2
public class RolesController {

	private final RolesService rolesService;

	// Obtener todos los roles registrados.
	 @GetMapping
	    public ResponseEntity<Map<String, Object>> listarRoles() {
	        Map<String, Object> response = new HashMap<>();
	        try {
	            log.info("Solicitud para obtener todos los roles.");
	            List<Roles> roles = rolesService.obtenerTodos();

	            response.put("status", HttpStatus.OK.value());
	            response.put("message", "Lista de roles obtenida correctamente");
	            response.put("data", roles);

	            return ResponseEntity.ok(response);
	        } catch (Exception e) {
	            log.error("Error al listar roles: {}", e.getMessage());

	            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
	            response.put("message", "Error al obtener la lista de roles");
	            response.put("error", e.getMessage());

	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	        }
	    }

	 //Buscar un rol por su nombre 
	    @GetMapping("/buscar")
	    public ResponseEntity<Map<String, Object>> obtenerPorNombre(@RequestParam String nombre) {
	        Map<String, Object> response = new HashMap<>();
	        try {
	            log.info("Buscando rol con nombre '{}'", nombre);
	            Roles rol = rolesService.buscarPorNombre(nombre);

	            if (rol == null) {
	                log.warn("Rol '{}' no encontrado", nombre);

	                response.put("status", HttpStatus.NOT_FOUND.value());
	                response.put("message", "Rol no encontrado");
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	            }

	            response.put("status", HttpStatus.OK.value());
	            response.put("message", "Rol encontrado");
	            response.put("data", rol);
	            return ResponseEntity.ok(response);

	        } catch (Exception e) {
	            log.error("Error al buscar rol '{}': {}", nombre, e.getMessage());

	            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
	            response.put("message", "Error al buscar el rol");
	            response.put("error", e.getMessage());
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	        }
	    }

	    //Crear un nuevo rol desde el cliente (formulario)
	    @PostMapping
	    public ResponseEntity<Map<String, Object>> crearRol(@RequestBody Roles nuevoRol) {
	        Map<String, Object> response = new HashMap<>();
	        try {
	            log.info("Solicitud para crear rol: {}", nuevoRol.getNombre());

	            if (nuevoRol.getNombre() == null || nuevoRol.getNombre().isEmpty()) {
	                throw new IllegalArgumentException("El nombre del rol no puede estar vacío");
	            }

	            Roles creado = rolesService.guardar(nuevoRol);

	            response.put("status", HttpStatus.CREATED.value());
	            response.put("message", "Rol creado exitosamente");
	            response.put("data", creado);
	            return ResponseEntity.status(HttpStatus.CREATED).body(response);

	        } catch (IllegalArgumentException e) {
	            log.warn("Error de validación: {}", e.getMessage());

	            response.put("status", HttpStatus.BAD_REQUEST.value());
	            response.put("message", "Error de validación");
	            response.put("error", e.getMessage());
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

	        } catch (Exception e) {
	            log.error("Error al crear rol '{}': {}", nuevoRol.getNombre(), e.getMessage());

	            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
	            response.put("message", "Error al crear el rol");
	            response.put("error", e.getMessage());
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	        }
	    }
	}