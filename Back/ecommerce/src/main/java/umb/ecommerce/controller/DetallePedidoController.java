package umb.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import umb.ecommerce.repository.DetallePedidoRepository;
import umb.ecommerce.repository.PedidoRepository;
import umb.ecommerce.repository.ProductoRepository;
import umb.ecommerce.model.DetallePedido;
import umb.ecommerce.model.Pedido;
import umb.ecommerce.model.Producto;
import umb.ecommerce.dto.DetallePedidoDTO;
import umb.ecommerce.dto.ApiResponse;
import umb.ecommerce.dto.DetallePedidoRespuestaDTO;
import java.util.Optional;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/detalles-pedido")
@RequiredArgsConstructor
@Log4j2
public class DetallePedidoController {

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<DetallePedidoRespuestaDTO>> crearDetallePedido(@RequestBody DetallePedidoDTO dto) {
        try {
            log.info("Recibiendo solicitud para crear detalle de pedido: {}", dto);

            // Validar que el pedidoId no sea nulo
            if (dto.getPedidoId() == null) {
                log.warn("El ID del pedido es nulo");
                return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, "El ID del pedido no puede ser nulo", null)
                );
            }

            // Validar que el productoId no sea nulo
            if (dto.getProductoId() == null) {
                log.warn("El ID del producto es nulo");
                return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, "El ID del producto no puede ser nulo", null)
                );
            }

            // Validar que la cantidad no sea nula o negativa
            if (dto.getCantidad() == null || dto.getCantidad() <= 0) {
                log.warn("La cantidad es inválida: {}", dto.getCantidad());
                return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, "La cantidad debe ser mayor que cero", null)
                );
            }

            // Buscar el pedido
            log.info("Buscando pedido con ID: {}", dto.getPedidoId());
            Optional<Pedido> pedidoOpt = pedidoRepository.findById(dto.getPedidoId());
            if (pedidoOpt.isEmpty()) {
                log.warn("No se encontró el pedido con ID: {}", dto.getPedidoId());
                return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, "Pedido no encontrado", null)
                );
            }

            // Buscar el producto
            log.info("Buscando producto con ID: {}", dto.getProductoId());
            Optional<Producto> productoOpt = productoRepository.findById(dto.getProductoId());
            if (productoOpt.isEmpty()) {
                log.warn("No se encontró el producto con ID: {}", dto.getProductoId());
                return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, "Producto no encontrado", null)
                );
            }

            // Crear y guardar el detalle
            DetallePedido detalle = new DetallePedido();
            detalle.setPedido(pedidoOpt.get());
            detalle.setProducto(productoOpt.get());
            detalle.setCantidad(dto.getCantidad());
            detalle.setEstado(dto.getEstado() != null ? dto.getEstado() : "PENDIENTE");
            detalle.setObservaciones(dto.getObservaciones());

            log.info("Guardando detalle de pedido: {}", detalle);
            DetallePedido detalleGuardado = detallePedidoRepository.save(detalle);

            // Mapear a DTO de respuesta
            DetallePedidoRespuestaDTO respuesta = new DetallePedidoRespuestaDTO();
            respuesta.setNombre(detalleGuardado.getProducto().getNombre());
            respuesta.setCantidad(detalleGuardado.getCantidad());
            respuesta.setPrecio(detalleGuardado.getProducto().getPrecio());

            return ResponseEntity.ok(
                new ApiResponse<>(true, "Detalle de pedido creado correctamente", respuesta)
            );
        } catch (Exception e) {
            log.error("Error al crear el detalle del pedido: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ApiResponse<>(false, "Error al crear el detalle del pedido: " + e.getMessage(), null)
            );
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DetallePedido>> obtenerDetallePedido(@PathVariable Long id) {
        try {
            if (id == null) {
                return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, "El ID del detalle no puede ser nulo", null)
                );
            }

            Optional<DetallePedido> detalleOpt = detallePedidoRepository.findById(id);
            if (detalleOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ApiResponse<>(false, "Detalle de pedido no encontrado", null)
                );
            }

            return ResponseEntity.ok(
                new ApiResponse<>(true, "Detalle de pedido encontrado", detalleOpt.get())
            );
        } catch (Exception e) {
            log.error("Error al obtener el detalle del pedido: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ApiResponse<>(false, "Error al obtener el detalle del pedido: " + e.getMessage(), null)
            );
        }
    }
} 