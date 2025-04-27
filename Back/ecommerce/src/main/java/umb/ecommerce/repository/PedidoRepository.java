package umb.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import umb.ecommerce.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long>{

}
