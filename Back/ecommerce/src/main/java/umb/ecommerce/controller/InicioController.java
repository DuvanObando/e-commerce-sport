package umb.ecommerce.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import umb.ecommerce.dto.InicioDTO;
import umb.ecommerce.model.Usuario;
import umb.ecommerce.service.InicioService;
import umb.ecommerce.service.UsuarioService;

@RestController
@RequestMapping("/inicio")
@RequiredArgsConstructor
@Log4j2

public class InicioController {
	
	private final InicioService loginService;
	private final UsuarioService usuarioService;
	
	//Endpoint para el inicio de sesión
    @PostMapping
    public ResponseEntity<Map<String, Object>> iniciarSesion(
    		@RequestBody InicioDTO loginDTO,
    		HttpServletRequest request,
    		HttpServletResponse response) {
    	
    	log.info("Datos recibidos: "
    			+ "correo={}, "
    			+ "contrasena={}", 
    			loginDTO.getCorreo(), 
    			loginDTO.getContrasena());

        String correo = loginDTO.getCorreo();
        String contrasena = loginDTO.getContrasena();

        Map<String, Object> responseMap = new HashMap<>();

        try {
        	// Validación de campos obligatorios
        	if (loginDTO.getCorreo() == null || loginDTO.getCorreo().isEmpty() ||
        			loginDTO.getContrasena() == null || loginDTO.getContrasena().isEmpty()) {
                    throw new IllegalArgumentException("Los campos 'correo' y 'contrasena' son obligatorios.");
                }

         // Validar credenciales
            Usuario usuario = loginService.validarCredenciales(correo, contrasena);
            log.info("Inicio de sesión exitoso para el usuario: {}", usuario.getCorreo());
            
            //guardar el correo en la sesión
            request.getSession().setAttribute("correoUsuario", usuario.getCorreo());
            request.getSession().setAttribute("idUsuario", usuario.getIdUsuario());
            log.info("Correo guardado en la sesión: {}", usuario.getCorreo());
            log.info("ID del usuario guardado en la sesión: {}", usuario.getIdUsuario());

            responseMap.put("status", HttpStatus.OK.value());
            responseMap.put("message", "Inicio de sesión exitoso.");
            responseMap.put("data", usuario);
            return ResponseEntity.ok(responseMap );

        } catch (IllegalArgumentException e) {
            log.error("Error de autenticación: {}", e.getMessage());

            responseMap.put("status", HttpStatus.UNAUTHORIZED.value());
            responseMap.put("message", "Error de autenticación.");
            responseMap.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMap );

        } catch (Exception e) {
            log.error("Error interno del servidor: {}", e.getMessage(), e);

            responseMap.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
            responseMap.put("message", "Error interno del servidor.");
            responseMap.put("error", "Por favor, contacte al administrador.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMap );
        }
    }

}
