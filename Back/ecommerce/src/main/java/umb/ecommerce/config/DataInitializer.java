package umb.ecommerce.config;

import java.util.Arrays;

import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import umb.ecommerce.model.Permisos;
import umb.ecommerce.model.Roles;
import umb.ecommerce.service.PermisosService;
import umb.ecommerce.service.RolesService;

@Log4j2
@Component
@RequiredArgsConstructor
public class DataInitializer {
	
	 private final RolesService rolesService;
	 private final PermisosService permisosService;
	 
	 @PostConstruct
	    public void init() {
	        log.info("Iniciando carga de datos iniciales:roles y permisos");

	        try {
	        	
	        	//Crear permisos base
	            Permisos verCatalogo = permisosService.crearSiNoExiste("VER_CATALOGO", "Permite ver productos en el catálogo");
	            Permisos realizarCompra = permisosService.crearSiNoExiste("REALIZAR_COMPRA", "Permite comprar productos");
	            Permisos gestionarPedidos = permisosService.crearSiNoExiste("GESTIONAR_PEDIDOS", "Permite administrar pedidos de los clientes");
	            Permisos gestionarProductos = permisosService.crearSiNoExiste("GESTIONAR_PRODUCTOS", "Permite añadir o modificar productos");
	            Permisos gestionarUsuarios = permisosService.crearSiNoExiste("GESTIONAR_USUARIOS", "Permite administrar usuarios del sistema");
	            
	            // Insertar roles base si no existen
	            Roles admin = rolesService.crearSiNoExiste("ADMINISTRADOR", "Acceso total al sistema");
	            Roles empleado = rolesService.crearSiNoExiste("EMPLEADO", "Gestión operativa del ecommerce");
	            Roles cliente = rolesService.crearSiNoExiste("CLIENTE", "Acceso a compras y consultas");

	            // Asociar permisos a roles
	            admin.getPermisos().addAll(Arrays.asList(gestionarPedidos, gestionarProductos, gestionarUsuarios));
	            empleado.getPermisos().addAll(Arrays.asList(gestionarPedidos));
	            cliente.getPermisos().addAll(Arrays.asList(verCatalogo, realizarCompra));

	            // Guardar roles con sus permisos asignados
	            rolesService.guardar(admin);
	            rolesService.guardar(empleado);
	            rolesService.guardar(cliente);

	            log.info("Roles y permisos iniciales cargados correctamente.");
	        } catch (Exception e) {
	            log.error("Error durante la inicialización de datos: {}", e.getMessage());
	        }
	    }
	}