package umb.ecommerce.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import umb.ecommerce.dto.ClienteDTO;
import umb.ecommerce.model.Cliente;
import umb.ecommerce.repository.ClienteRepository;

@RequiredArgsConstructor
@Log4j2
@Service
public class ClienteService {

	 private final ClienteRepository usuarioRepository;

	    //Guarda un usuario en la base de datos.
	    public Cliente guardarUsuario(ClienteDTO usuarioDTO) {
	    	log.info("Iniciando proceso de registro para el usuario con correo: {}"
	    			, usuarioDTO.getCorreo());

	        // Validar si el correo ya existe
	        if (usuarioRepository.existsByCorreo(usuarioDTO.getCorreo())) {
	        	log.error("El correo {} ya está registrado.", usuarioDTO.getCorreo());
	            throw new IllegalArgumentException("El correo ya esta registrado.");
	        }
	        
	        if (usuarioDTO.getContrasena() == null || usuarioDTO.getContrasena().isEmpty()) {
	            throw new IllegalArgumentException("La contraseña no puede estar vacía.");
	        }
	        /*
	        // Validar la seguridad de la contraseña
	        if (!validarContrasena(usuarioDTO.getContrasena())) {
	            throw new IllegalArgumentException("La contraseña debe tener al menos 6 caracteres, "
	                    + "una mayúscula, una minúscula, un número y un carácter especial.");
	        }*/

	        // Crear una nueva entidad Usuario
	        log.debug("Creando entidad Usuario para el registro.");
	        
	        Cliente usuario = new Cliente();
	        usuario.setNombre(usuarioDTO.getNombre());
	        usuario.setCorreo(usuarioDTO.getCorreo());
	        usuario.setContrasena(usuarioDTO.getContrasena());
	        usuario.setDireccion(usuarioDTO.getDireccion());
	        usuario.setTelefono(usuarioDTO.getTelefono());

	        log.info("Guardando usuario en la base de datos.");
	        
	        // Guardar el usuario en la base de datos
	        return usuarioRepository.save(usuario);
	    }
	    /*
	 // Método auxiliar para validar la contraseña con expresiones regulares
	    private boolean validarContrasena(String contrasena) {
	        // Expresión regular: al menos 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial
	        String regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!*]).{6,}$";
	        return Pattern.matches(regex, contrasena);
	    }*/
	    
	    public Cliente buscarPorCorreo(String correo) {
	        return usuarioRepository.findByCorreo(correo)
	                .orElseThrow(() -> new IllegalArgumentException(
	                        "Usuario no encontrado con el correo: " + correo));
	    }

	    public Cliente buscarPorId(Long id) {
	        return usuarioRepository.findById(id)
	                .orElseThrow(() -> new IllegalArgumentException(
	                        "Usuario no encontrado con el id: " + id));
	    }

	}
