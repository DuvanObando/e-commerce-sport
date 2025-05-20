package umb.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import umb.ecommerce.model.Pedido;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    @EntityGraph(attributePaths = {"detalles", "detalles.producto"})
    List<Pedido> findByClienteId(Long clienteId);
}
