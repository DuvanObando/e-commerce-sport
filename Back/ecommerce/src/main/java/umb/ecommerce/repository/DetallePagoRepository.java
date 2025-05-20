package umb.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import umb.ecommerce.model.DetallePago;

@Repository
public interface DetallePagoRepository extends JpaRepository<DetallePago, Long> {
}
