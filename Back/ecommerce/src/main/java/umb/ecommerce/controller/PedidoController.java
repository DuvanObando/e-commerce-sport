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
import umb.ecommerce.dto.PedidoConDetallesDTO;
import umb.ecommerce.model.Pedido;
import umb.ecommerce.service.PedidoService;

@RestController
@RequestMapping("/pedidos")
@RequiredArgsConstructor
@Log4j2
public class PedidoController {
	
	 private final PedidoService pedidoService;

	    // Endpoint para registrar un nuevo pedido con sus detalles
	    @PostMapping
	    public ResponseEntity<Map<String, Object>> crearPedido(@RequestBody PedidoConDetallesDTO dto) {
	        Map<String, Object> response = new HashMap<>();

	        try {
	            log.info("Recibida solicitud de creación de pedido para cliente: {}", dto.pedido().getClienteId());

	            Pedido pedidoRegistrado = pedidoService.registrarPedido(dto.pedido(), dto.detalles());

	            response.put("status", HttpStatus.CREATED.value());
	            response.put("message", "Pedido registrado exitosamente");
	            response.put("pedidoId", pedidoRegistrado.getPedidoId());
	            return ResponseEntity.status(HttpStatus.CREATED).body(response);

	        } catch (Exception e) {
	            log.error("Error al crear el pedido: {}", e.getMessage(), e);
	            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
	            response.put("message", "No se pudo registrar el pedido");
	            response.put("error", e.getMessage());
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	        }
	    }

	}
