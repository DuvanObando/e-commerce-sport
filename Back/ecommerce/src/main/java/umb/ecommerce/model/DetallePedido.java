package umb.ecommerce.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "detalles_pedido")
public class DetallePedido {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long detallePedidoId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pedido_id")
	private Pedido pedido;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "producto_id")
	private Producto producto;

	@Column(nullable = false)
	private Integer cantidad;

	@Column(length = 50)
	private String estado;

	@Column(length = 255)
	private String observaciones;

	@Column(name = "precio_unitario", precision = 10, scale = 2)
	private BigDecimal precioUnitario;
}
