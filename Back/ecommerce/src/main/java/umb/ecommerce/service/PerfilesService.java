package umb.ecommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import umb.ecommerce.model.Perfiles;
import umb.ecommerce.repository.PerfilesRepository;

@RequiredArgsConstructor
@Log4j2
@Service
public class PerfilesService {

	private final PerfilesRepository perfilesRepository;

    // Guardar un nuevo perfil
    public Perfiles guardarPerfil(Perfiles perfil) {
        try {
            log.info("Guardando perfil: {}", perfil.getDescripcion());
            return perfilesRepository.save(perfil);
        } catch (Exception e) {
            log.error("Error al guardar el perfil: {}", e.getMessage(), e);
            throw new RuntimeException("Error al guardar el perfil.");
        }
    }

    // Obtener todos los perfiles
    public List<Perfiles> obtenerTodos() {
        log.debug("Listando todos los perfiles...");
        return perfilesRepository.findAll();
    }

    // Buscar perfil por ID
    public Perfiles buscarPorId(Long id) {
        return perfilesRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Perfil no encontrado con ID: " + id));
    }

    // Buscar perfil por descripción
    public Perfiles buscarPorDescripcion(String descripcion) {
        return perfilesRepository.findByDescripcion(descripcion)
                .orElseThrow(() -> new IllegalArgumentException("Perfil no encontrado con descripción: " + descripcion));
    }
}
