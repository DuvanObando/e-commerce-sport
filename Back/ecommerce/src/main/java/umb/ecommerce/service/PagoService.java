package umb.ecommerce.service;

import umb.ecommerce.model.Pago;
import umb.ecommerce.repository.PagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
public class PagoService {
    
    @Autowired
    private PagoRepository pagoRepository;
    
    public Pago crearPago(Pago pago) {
        // Establecer la fecha actual si no viene establecida
        if (pago.getFechaPago() == null) {
            pago.setFechaPago(LocalDate.now());
        }
        
        // Validar que el monto no sea nulo o negativo
        if (pago.getMonto() == null || pago.getMonto().signum() <= 0) {
            throw new IllegalArgumentException("El monto del pago debe ser mayor que cero");
        }
        
        // Validar que el pedido exista
        if (pago.getPedido() == null) {
            throw new IllegalArgumentException("El pedido es requerido");
        }
        
        return pagoRepository.save(pago);
    }
    
    public Pago obtenerPagoPorId(Long id) {
        return pagoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado"));
    }
} 