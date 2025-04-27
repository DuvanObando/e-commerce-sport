package umb.ecommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import umb.ecommerce.model.Roles;
import umb.ecommerce.repository.RolesRepository;

@RequiredArgsConstructor
@Log4j2
@Service
public class RolesService {

	private final RolesRepository rolesRepository;

	// Crear un rol si no existe por nombre
	public Roles crearSiNoExiste(String nombre, String descripcion) {
		try {
			log.info("Verificando si el rol '{}' ya existe...", nombre);

			return rolesRepository.findByNombre(nombre).orElseGet(() -> {
				log.warn("Rol '{}' no existe. Procediendo a crearlo.", nombre);
				Roles nuevo = new Roles();
				nuevo.setNombre(nombre);
				nuevo.setDescripcion(descripcion);

				Roles guardado = rolesRepository.save(nuevo);
				log.info("Rol '{}' creado correctamente con ID {}", guardado.getNombre(), guardado.getId());
				return guardado;
			});

		} catch (Exception e) {
			log.error("Error al crear/verificar el rol '{}': {}", nombre, e.getMessage());
			throw new RuntimeException("Error al crear/verificar el rol: " + nombre);
		}
	}

	// Obtener todos los roles
	public List<Roles> obtenerTodos() {
		try {
			log.debug("Obteniendo todos los roles registrados en la base de datos...");
			List<Roles> roles = rolesRepository.findAll();
			log.info("Se encontraron {} roles.", roles.size());
			return roles;
		} catch (Exception e) {
			log.error("Error al obtener la lista de roles: {}", e.getMessage());
			throw new RuntimeException("No se pudieron obtener los roles.");
		}
	}

	// Guardar directamente un rol
	public Roles guardar(Roles rol) {
		try {
			log.debug("Guardando rol: {}", rol.getNombre());
			Roles guardado = rolesRepository.save(rol);
			log.info("Rol '{}' guardado con éxito. ID: {}", guardado.getNombre(), guardado.getId());
			return guardado;
		} catch (Exception e) {
			log.error("Error al guardar el rol '{}': {}", rol.getNombre(), e.getMessage());
			throw new RuntimeException("Error al guardar el rol: " + rol.getNombre());
		}
	}

	// Buscar un rol por nombre
	public Roles buscarPorNombre(String nombre) {
		try {
			log.debug("Buscando rol por nombre: '{}'", nombre);
			return rolesRepository.findByNombre(nombre).orElse(null);
		} catch (Exception e) {
			log.error("Error al buscar el rol '{}': {}", nombre, e.getMessage());
			throw new RuntimeException("No se pudo buscar el rol: " + nombre);
		}
	}
}
