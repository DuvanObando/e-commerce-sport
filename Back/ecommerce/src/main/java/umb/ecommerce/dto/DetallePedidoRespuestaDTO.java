package umb.ecommerce.dto;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class DetallePedidoRespuestaDTO {
    private String nombre;
    private Integer cantidad;
    private BigDecimal precio;
} 