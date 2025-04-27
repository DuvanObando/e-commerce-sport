package umb.ecommerce.model;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "producto")
public class Producto {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "producto_id")
    private Long productoId;

    @Column(name = "nombre", length = 100)
    private String nombre;

    @Column(name = "descripcion", length = 255)
    private String descripcion;

    @Column(name = "precio", precision = 10, scale = 2)
    private BigDecimal precio; 	 	

    @Column(name = "stock")
    private Integer stock;

    // Relaciones con claves foráneas
    @Column(name = "categoria_id")
    private Long categoriaId;

    @Column(name = "proveedor_id")
    private Long proveedorId;
}
