package umb.ecommerce.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "pedido")
public class Pedido {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pedido_id")
	private Long PedidoId;

	@Column(name = "cliente_id", nullable = false)
	private Long clienteId;

	@Column(name = "fecha_pedido")
	private LocalDate fechaPedido;

	@Column(name = "estado", length = 100)
	private String estado;

	@Column(name = "total", nullable = false, precision = 10, scale = 2)
	private BigDecimal total;
}