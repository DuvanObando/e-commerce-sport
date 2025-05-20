package umb.ecommerce.dto;

import lombok.Data;

@Data
public class DetallePedidoDTO {
    private Long pedidoId;
    private Long productoId;
    private Integer cantidad;
    private String estado;
    private String observaciones;
} 