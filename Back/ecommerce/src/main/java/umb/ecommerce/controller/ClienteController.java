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
import umb.ecommerce.dto.ClienteDTO;
import umb.ecommerce.model.Cliente;
import umb.ecommerce.service.ClienteService;
import umb.ecommerce.response.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
@Log4j2
public class ClienteController {

	private final ClienteService usuarioService;

	//Endpoint para registrar un nuevo usuario.
    @PostMapping("/registro")
    public ResponseEntity<Map<String, Object>> 
    registrarUsuario(@RequestBody ClienteDTO usuarioDTO) {
        log.info("Solicitud recibida para registrar usuario con correo: {}", usuarioDTO.getCorreo());

        Map<String, Object> response = new HashMap<>(); // Estructura de respuesta

        try {
            Cliente usuario = usuarioService.guardarUsuario(usuarioDTO);
            log.info("Datos recibidos: {}", usuarioDTO);
            log.info("Usuario registrado con éxito. ID: {}", usuario.getIdCliente());
            
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

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Cliente>> obtenerClientePorId(@PathVariable Long id) {
        try {
            Cliente cliente = usuarioService.buscarPorId(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Cliente encontrado", cliente));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, "Error al obtener el cliente: " + e.getMessage(), null));
        }
    }
}
