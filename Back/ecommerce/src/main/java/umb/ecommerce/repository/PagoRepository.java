package umb.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import umb.ecommerce.model.Pago;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {
}
