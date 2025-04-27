package umb.ecommerce.dto;

import java.util.List;
import umb.ecommerce.model.Pedido;
import umb.ecommerce.model.DetallePedido;

public record PedidoConDetallesDTO
	
	//DTO que encapsula un pedido con su lista de detalles asociados.
	(
	    Pedido pedido,
	    List<DetallePedido> detalles
	) {}

