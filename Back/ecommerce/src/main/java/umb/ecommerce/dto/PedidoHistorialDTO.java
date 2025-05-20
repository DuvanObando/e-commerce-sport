package umb.ecommerce.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class PedidoHistorialDTO {
    private Long pedidoId;
    private String estado;
    private LocalDate fechaPedido;
    private BigDecimal total;
    private List<DetalleHistorialDTO> detalles;
} 