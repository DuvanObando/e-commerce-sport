package umb.ecommerce.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class DetalleHistorialDTO {
    private String nombre;
    private Integer cantidad;
    private BigDecimal precio;
} 