package umb.ecommerce.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import umb.ecommerce.model.Cliente;
import umb.ecommerce.model.Empleado;
import umb.ecommerce.repository.ClienteRepository;
import umb.ecommerce.repository.EmpleadoRepository;
import umb.ecommerce.repository.RolesRepository;
import umb.ecommerce.dto.UsuarioAutenticadoDTO;

@RequiredArgsConstructor
@Log4j2
@Service
public class InicioService {

	private final ClienteRepository clienteRepository;
	private final EmpleadoRepository empleadoRepository;
	private final RolesRepository rolesRepository;
	
	// Método para autenticar y determinar tipo de usuario
		public UsuarioAutenticadoDTO autenticarUsuario(String correo, String contrasena) {
			log.info("Intentando autenticar usuario con correo: {}", correo);

			// Primero intentamos buscar en clientes
			Optional<Cliente> clienteOpt = clienteRepository.findByCorreo(correo);

			if (clienteOpt.isPresent()) {
				Cliente cliente = clienteOpt.get();
				if (!cliente.getContrasena().equals(contrasena)) {
					throw new IllegalArgumentException("Contraseña incorrecta para cliente.");
				}
				log.info("Cliente autenticado correctamente: {}", cliente.getCorreo());
				return new UsuarioAutenticadoDTO("CLIENTE", cliente.getCorreo(), cliente.getNombre(), cliente.getIdCliente());
			}

			// Si no es cliente, buscamos en empleados
			Optional<Empleado> empleadoOpt = empleadoRepository.findByCorreo(correo);
		    if (empleadoOpt.isPresent()) {
		        Empleado empleado = empleadoOpt.get();
		        if (!empleado.getContrasena().equals(contrasena)) {
		            throw new IllegalArgumentException("Contraseña incorrecta para empleado.");
		        }

		        // Obtener los nombres de roles asociados a su perfil
		        List<String> roles = rolesRepository.findNombresRolesByPerfilId(empleado.getPerfilId());

		        // Determinar tipo según el rol encontrado
		        String tipo = roles.contains("ADMINISTRADOR") ? "ADMINISTRADOR" : "EMPLEADO";

		        log.info("Empleado autenticado correctamente: {} con rol {}", empleado.getCorreo(), tipo);
		        return new UsuarioAutenticadoDTO(tipo, empleado.getCorreo(), empleado.getNombre(), empleado.getIdEmpleado());
		    }

		    // Si no se encontró en ninguna tabla
			log.warn("Correo no registrado: {}", correo);
			throw new IllegalArgumentException("Correo no registrado en el sistema.");
		}

	}
