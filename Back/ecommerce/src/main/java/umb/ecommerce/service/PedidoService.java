package umb.ecommerce.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import umb.ecommerce.model.DetallePedido;
import umb.ecommerce.model.Pedido;
import umb.ecommerce.repository.DetallePedidoRepository;
import umb.ecommerce.repository.PedidoRepository;

@RequiredArgsConstructor
@Log4j2
@Service
public class PedidoService {

	private final PedidoRepository pedidoRepository;
    private final DetallePedidoRepository detallePedidoRepository;

    //Registra un nuevo pedido con sus detalles en la base de datos.
    @Transactional
    public Pedido registrarPedido(Pedido pedido, List<DetallePedido> detalles) {
        try {
            log.info("Iniciando registro de pedido para cliente: {}", pedido.getClienteId());

            // Asignar fecha actual al pedido
            pedido.setFechaPedido(LocalDate.now());

            // Guardar el pedido principal
            Pedido pedidoGuardado = pedidoRepository.save(pedido);
            log.info("Pedido guardado con ID: {}", pedidoGuardado.getPedidoId());

            // Asociar detalles al pedido
            for (DetallePedido detalle : detalles) {
                detalle.setPedido(pedidoGuardado); // Asignar el pedido al detalle
                detallePedidoRepository.save(detalle);
                log.debug("Detalle guardado: producto={}, cantidad={}", 
                          detalle.getProducto().getProductoId(), detalle.getCantidad());
            }

            return pedidoGuardado;

        } catch (Exception e) {
            log.error("Error al registrar el pedido: {}", e.getMessage(), e);
            throw new RuntimeException("No se pudo registrar el pedido.");
        }
    }
}
