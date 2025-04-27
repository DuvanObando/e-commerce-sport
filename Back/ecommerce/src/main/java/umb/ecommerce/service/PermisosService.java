package umb.ecommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import umb.ecommerce.model.Permisos;
import umb.ecommerce.repository.PermisosRepository;

@RequiredArgsConstructor
@Log4j2
@Service
public class PermisosService {
	
	private final PermisosRepository permisosRepository;

	//Crea un permiso si no existe previamente.
    public Permisos crearSiNoExiste(String nombre, String descripcion) {
        try {
            log.info("Verificando si el permiso '{}' ya existe...", nombre);
            return permisosRepository.findByNombre(nombre).orElseGet(() -> {
                log.warn("Permiso '{}' no existe. Creando...", nombre);
                Permisos nuevo = new Permisos();
                nuevo.setNombre(nombre);
                nuevo.setDescripcion(descripcion);
                Permisos guardado = permisosRepository.save(nuevo);
                log.info("Permiso '{}' creado con ID: {}", nombre, guardado.getId());
                return guardado;
            });
        } catch (Exception e) {
            log.error("Error al crear/verificar el permiso '{}': {}", nombre, e.getMessage());
            throw new RuntimeException("Error al crear/verificar el permiso: " + nombre);
        }
    }

    public List<Permisos> obtenerTodos() {
        try {
            log.debug("Obteniendo todos los permisos...");
            List<Permisos> lista = permisosRepository.findAll();
            log.info("Se encontraron {} permisos.", lista.size());
            return lista;
        } catch (Exception e) {
            log.error("Error al obtener permisos: {}", e.getMessage());
            throw new RuntimeException("No se pudieron obtener los permisos.");
        }
    }

    public Permisos guardar(Permisos permisos) {
        try {
            log.debug("Guardando permiso: {}", permisos.getNombre());
            Permisos guardado = permisosRepository.save(permisos);
            log.info("Permiso '{}' guardado con ID: {}", permisos.getNombre(), guardado.getId());
            return guardado;
        } catch (Exception e) {
            log.error("Error al guardar permiso '{}': {}", permisos.getNombre(), e.getMessage());
            throw new RuntimeException("No se pudo guardar el permiso: " + permisos.getNombre());
        }
    }

    public Permisos buscarPorNombre(String nombre) {
        try {
            log.debug("Buscando permiso por nombre: '{}'", nombre);
            return permisosRepository.findByNombre(nombre).orElse(null);
        } catch (Exception e) {
            log.error("Error al buscar permiso '{}': {}", nombre, e.getMessage());
            throw new RuntimeException("No se pudo buscar el permiso: " + nombre);
        }
    }
}
