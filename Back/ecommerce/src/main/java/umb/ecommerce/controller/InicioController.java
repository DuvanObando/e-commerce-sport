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
import umb.ecommerce.dto.UsuarioAutenticadoDTO;
import umb.ecommerce.service.InicioService;

@RestController
@RequestMapping("/inicio")
@RequiredArgsConstructor
@Log4j2

public class InicioController {
	
	private final InicioService inicioService;
	
	//Endpoint para el inicio de sesión
	@PostMapping
	public ResponseEntity<Map<String, Object>> iniciarSesion(
			@RequestBody InicioDTO inicioDTO,
			HttpServletRequest request,
			HttpServletResponse response) {

		log.info("Intento de inicio de sesión. Correo: {}", inicioDTO.getCorreo());

		Map<String, Object> responseMap = new HashMap<>();

		try {
			// Validar campos obligatorios
			if (inicioDTO.getCorreo() == null || inicioDTO.getCorreo().isEmpty()
					|| inicioDTO.getContrasena() == null || inicioDTO.getContrasena().isEmpty()) {
				throw new IllegalArgumentException("Los campos 'correo' y 'contrasena' son obligatorios.");
			}

			// Autenticación
			UsuarioAutenticadoDTO usuario = inicioService.autenticarUsuario(
					inicioDTO.getCorreo(),
					inicioDTO.getContrasena());

			// Guardar sesión si deseas
			request.getSession().setAttribute("correoUsuario", usuario.correo());
			request.getSession().setAttribute("tipoUsuario", usuario.tipo());
			log.info("Usuario autenticado: tipo={}, correo={}", usuario.tipo(), usuario.correo());

			// Estructura de respuesta
			responseMap.put("status", HttpStatus.OK.value());
			responseMap.put("message", "Inicio de sesión exitoso.");
			responseMap.put("token", "tokengenerado");
			responseMap.put("usuario", usuario);
			return ResponseEntity.ok(responseMap);

		} catch (IllegalArgumentException e) {
			log.error("Error de autenticación: {}", e.getMessage());
			responseMap.put("status", HttpStatus.UNAUTHORIZED.value());
			responseMap.put("message", "Error de autenticación.");
			responseMap.put("error", e.getMessage());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMap);

		} catch (Exception e) {
			log.error("Error interno en el servidor: {}", e.getMessage(), e);
			responseMap.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
			responseMap.put("message", "Error interno del servidor.");
			responseMap.put("error", "Por favor contacte al administrador.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMap);
		}
	}
}