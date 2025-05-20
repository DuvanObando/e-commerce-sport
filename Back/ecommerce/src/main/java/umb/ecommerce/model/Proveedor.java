package umb.ecommerce.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "proveedor")
public class Proveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "proveedor_id")
    private Long proveedorId;

    @Column(name = "nombre", length = 100)
    private String nombre;

    @Column(name = "correo", length = 150)
    private String correo;

    @Column(name = "telefono", length = 20)
    private String telefono;
} 