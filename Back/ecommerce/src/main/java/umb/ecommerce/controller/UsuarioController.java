package umb.ecommerce.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import umb.ecommerce.dto.UsuarioDTO;
import umb.ecommerce.model.Usuario;
import umb.ecommerce.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
@Log4j2
public class UsuarioController {

	private final UsuarioService usuarioService;

	//Endpoint para registrar un nuevo usuario.
    @PostMapping("/registro")
    public ResponseEntity<Map<String, Object>> 
    registrarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        log.info("Solicitud recibida para registrar usuario con correo: {}", usuarioDTO.getCorreo());

        Map<String, Object> response = new HashMap<>(); // Estructura de respuesta

        try {
            Usuario usuario = usuarioService.guardarUsuario(usuarioDTO);
            log.info("Datos recibidos: {}", usuarioDTO);
            log.info("Usuario registrado con éxito. ID: {}", usuario.getIdUsuario());
            
            if (usuarioDTO.getCorreo() == null || usuarioDTO.getCorreo().isEmpty()) {
                throw new IllegalArgumentException("El correo no puede estar vacío.");
            }

            // Respuesta exitosa
            response.put("status", HttpStatus.CREATED.value());
            response.put("message", "Usuario registrado con éxito");
            response.put("data", usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (IllegalArgumentException e) {
            log.error("Error al registrar usuario: {}", e.getMessage());

            // Respuesta de error
            response.put("status", HttpStatus.BAD_REQUEST.value());
            response.put("message", "Error al registrar usuario");
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    } 
    
}
