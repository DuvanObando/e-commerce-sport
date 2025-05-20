package umb.ecommerce.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import umb.ecommerce.model.DetallePedido;

@Data
@NoArgsConstructor
@Entity
@Table(name = "pedido")
public class Pedido {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pedido_id")
	private Long pedidoId;

	@Column(name = "cliente_id")
	private Long clienteId;

	@Column(name = "fecha_pedido")
	private LocalDate fechaPedido;

	@Column(name = "estado")
	private String estado;

	@Column(name = "total")
	private BigDecimal total;

	@OneToMany(mappedBy = "pedido", fetch = FetchType.LAZY)
	private List<DetallePedido> detalles;
}