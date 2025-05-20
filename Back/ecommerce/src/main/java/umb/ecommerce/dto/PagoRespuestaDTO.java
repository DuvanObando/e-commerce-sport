package umb.ecommerce.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class PagoRespuestaDTO {
    private Long pagoId;
    private Long pedidoId;
    private LocalDate fechaPago;
    private BigDecimal monto;
    private String metodoPago;
    private String estado;
} 