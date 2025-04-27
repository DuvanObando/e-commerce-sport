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
import umb.ecommerce.model.Permisos;
import umb.ecommerce.service.PermisosService;

@RestController
@RequestMapping("/permisos")
@RequiredArgsConstructor
@Log4j2
public class PermisosController {
	
	private final PermisosService permisosService;
	

	//Obtener todos los permisos registrados.
    @GetMapping
    public ResponseEntity<Map<String, Object>> listarPermisos() {
        Map<String, Object> response = new HashMap<>();
        try {
            log.info("Solicitud para obtener todos los permisos.");
            List<Permisos> permisos = permisosService.obtenerTodos();

            response.put("status", HttpStatus.OK.value());
            response.put("message", "Lista de permisos obtenida correctamente");
            response.put("data", permisos);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error al listar permisos: {}", e.getMessage());

            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.put("message", "Error al obtener la lista de permisos");
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    //Buscar un permiso por su nombre (por query string)
    @GetMapping("/buscar")
    public ResponseEntity<Map<String, Object>> obtenerPorNombre(@RequestParam String nombre) {
        Map<String, Object> response = new HashMap<>();
        try {
            log.info("Buscando permiso con nombre '{}'", nombre);
            Permisos permiso = permisosService.buscarPorNombre(nombre);

            if (permiso == null) {
                log.warn("Permiso '{}' no encontrado", nombre);
                response.put("status", HttpStatus.NOT_FOUND.value());
                response.put("message", "Permiso no encontrado");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            response.put("status", HttpStatus.OK.value());
            response.put("message", "Permiso encontrado");
            response.put("data", permiso);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error al buscar permiso '{}': {}", nombre, e.getMessage());

            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.put("message", "Error al buscar el permiso");
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // Crear un nuevo permiso desde el cliente (formulario)
    @PostMapping
    public ResponseEntity<Map<String, Object>> crearPermiso(@RequestBody Permisos nuevoPermiso) {
        Map<String, Object> response = new HashMap<>();
        try {
            log.info("Solicitud para crear permiso: {}", nuevoPermiso.getNombre());

            if (nuevoPermiso.getNombre() == null || nuevoPermiso.getNombre().isEmpty()) {
                throw new IllegalArgumentException("El nombre del permiso no puede estar vacío");
            }

            Permisos creado = permisosService.guardar(nuevoPermiso);

            response.put("status", HttpStatus.CREATED.value());
            response.put("message", "Permiso creado exitosamente");
            response.put("data", creado);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (IllegalArgumentException e) {
            log.warn("Error de validación: {}", e.getMessage());

            response.put("status", HttpStatus.BAD_REQUEST.value());
            response.put("message", "Error de validación");
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

        } catch (Exception e) {
            log.error("Error al crear permiso '{}': {}", nuevoPermiso.getNombre(), e.getMessage());

            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.put("message", "Error al crear el permiso");
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}

