package umb.ecommerce.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

@Data
public class PedidoRespuestaDTO {
    private Long pedido_id;
    private Long clienteId;
    private String estado;
    private LocalDateTime fecha_pedido;
    private BigDecimal total;
    private List<DetallePedidoRespuestaDTO> detalles;
} 