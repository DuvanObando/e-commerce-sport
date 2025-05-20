package umb.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import umb.ecommerce.model.Pedido;
import umb.ecommerce.repository.PedidoRepository;
import umb.ecommerce.dto.ApiResponse;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import java.util.List;
import umb.ecommerce.dto.PedidoHistorialDTO;
import umb.ecommerce.dto.DetalleHistorialDTO;
import umb.ecommerce.model.DetallePedido;
import umb.ecommerce.dto.PedidoRespuestaDTO;
import umb.ecommerce.dto.DetallePedidoRespuestaDTO;

@RestController
@RequestMapping("/api/pedidos")
@RequiredArgsConstructor
@Log4j2
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<Pedido>> crearPedido(@RequestBody Pedido pedido) {
        try {
            Pedido pedidoGuardado = pedidoRepository.save(pedido);
            return ResponseEntity.ok(
                new ApiResponse<>(true, "Pedido creado correctamente", pedidoGuardado)
            );
        } catch (Exception e) {
            log.error("Error al crear el pedido: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ApiResponse<>(false, "Error al crear el pedido: " + e.getMessage(), null)
            );
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Pedido>> obtenerPedido(@PathVariable Long id) {
        try {
            Optional<Pedido> pedidoOpt = pedidoRepository.findById(id);
            if (pedidoOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ApiResponse<>(false, "Pedido no encontrado", null)
                );
            }
            return ResponseEntity.ok(
                new ApiResponse<>(true, "Pedido encontrado", pedidoOpt.get())
            );
        } catch (Exception e) {
            log.error("Error al obtener el pedido: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ApiResponse<>(false, "Error al obtener el pedido: " + e.getMessage(), null)
            );
        }
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<ApiResponse<List<PedidoRespuestaDTO>>> obtenerPedidosPorCliente(@PathVariable Long clienteId) {
        try {
            List<Pedido> pedidos = pedidoRepository.findByClienteId(clienteId);
            // Ordenar por fecha_pedido descendente
            pedidos.sort((a, b) -> b.getFechaPedido().compareTo(a.getFechaPedido()));
            List<PedidoRespuestaDTO> historial = pedidos.stream()
                .filter(pedido -> pedido.getDetalles() != null && !pedido.getDetalles().isEmpty())
                .map(pedido -> {
                    PedidoRespuestaDTO dto = new PedidoRespuestaDTO();
                    dto.setPedido_id(pedido.getPedidoId());
                    dto.setClienteId(pedido.getClienteId());
                    dto.setEstado(pedido.getEstado());
                    dto.setFecha_pedido(pedido.getFechaPedido().atStartOfDay());
                    dto.setTotal(pedido.getTotal());
                    List<DetallePedidoRespuestaDTO> detalles = pedido.getDetalles().stream().map(detalle -> {
                        DetallePedidoRespuestaDTO d = new DetallePedidoRespuestaDTO();
                        d.setNombre(detalle.getProducto().getNombre());
                        d.setCantidad(detalle.getCantidad());
                        d.setPrecio(detalle.getProducto().getPrecio());
                        return d;
                    }).toList();
                    dto.setDetalles(detalles);
                    return dto;
                }).toList();
            return ResponseEntity.ok(new ApiResponse<>(true, "Pedidos encontrados", historial));
        } catch (Exception e) {
            log.error("Error al obtener los pedidos del cliente: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ApiResponse<>(false, "Error al obtener los pedidos: " + e.getMessage(), null)
            );
        }
    }
}
