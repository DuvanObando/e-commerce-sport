package umb.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import umb.ecommerce.repository.PagoRepository;
import umb.ecommerce.repository.PedidoRepository;
import umb.ecommerce.repository.DetallePagoRepository;
import umb.ecommerce.model.Pago;
import umb.ecommerce.model.Pedido;
import umb.ecommerce.model.DetallePago;
import umb.ecommerce.dto.PagoDTO;
import umb.ecommerce.dto.ApiResponse;
import umb.ecommerce.dto.PagoRespuestaDTO;
import java.util.Optional;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/pagos")
@RequiredArgsConstructor
@Log4j2
public class PagoController {

    @Autowired
    private PagoRepository pagoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private DetallePagoRepository detallePagoRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<PagoRespuestaDTO>> registrarPago(@RequestBody PagoDTO dto) {
        try {
            // Validar que los IDs no sean nulos
            if (dto.getPedidoId() == null) {
                return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, "El ID del pedido no puede ser nulo", null)
                );
            }

            if (dto.getMetodoPagoId() == null) {
                return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, "El ID del método de pago no puede ser nulo", null)
                );
            }

            // Buscar pedido y método de pago
            Optional<Pedido> pedidoOpt = pedidoRepository.findById(dto.getPedidoId());
            Optional<DetallePago> metodoOpt = detallePagoRepository.findById(dto.getMetodoPagoId());

            if (pedidoOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, "Pedido no encontrado", null)
                );
            }

            if (metodoOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, "Método de pago no encontrado", null)
                );
            }

            // Crear y guardar el pago
            Pago pago = new Pago();
            pago.setPedido(pedidoOpt.get());
            pago.setFechaPago(dto.getFechaPago());
            pago.setMonto(dto.getMonto());
            pago.setMetodoPago(metodoOpt.get());
            pago.setEstado(dto.getEstado());

            Pago pagoGuardado = pagoRepository.save(pago);

            // Mapear a DTO de respuesta
            PagoRespuestaDTO respuesta = new PagoRespuestaDTO();
            respuesta.setPagoId(pagoGuardado.getPagoId());
            respuesta.setPedidoId(pagoGuardado.getPedido().getPedidoId());
            respuesta.setFechaPago(pagoGuardado.getFechaPago());
            respuesta.setMonto(pagoGuardado.getMonto());
            respuesta.setMetodoPago(pagoGuardado.getMetodoPago().getNombre());
            respuesta.setEstado(pagoGuardado.getEstado());

            return ResponseEntity.ok(
                new ApiResponse<>(true, "Pago registrado correctamente", respuesta)
            );
        } catch (Exception e) {
            log.error("Error al registrar el pago: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ApiResponse<>(false, "Error al registrar el pago: " + e.getMessage(), null)
            );
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Pago>> obtenerPago(@PathVariable Long id) {
        try {
            if (id == null) {
                return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, "El ID del pago no puede ser nulo", null)
                );
            }

            Optional<Pago> pagoOpt = pagoRepository.findById(id);
            if (pagoOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ApiResponse<>(false, "Pago no encontrado", null)
                );
            }
            return ResponseEntity.ok(
                new ApiResponse<>(true, "Pago encontrado", pagoOpt.get())
            );
        } catch (Exception e) {
            log.error("Error al obtener el pago: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ApiResponse<>(false, "Error al obtener el pago: " + e.getMessage(), null)
            );
        }
    }
}
