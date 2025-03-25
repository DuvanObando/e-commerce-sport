package umb.ecommerce.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import umb.ecommerce.model.Usuario;
import umb.ecommerce.repository.UsuarioRepository;

@RequiredArgsConstructor
@Log4j2
@Service
public class InicioService {

	private final UsuarioRepository usuarioRepository;

	// Método para validar credenciales de inicio de sesión
	public Usuario validarCredenciales(String correo, String contrasena) {
		// Buscar al usuario por correo
		Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreo(correo);

		if (usuarioOpt.isEmpty()) {
			// Si el correo no está registrado, lanzar excepción
			throw new IllegalArgumentException("El correo no esta registrado.");
		}

		Usuario usuario = usuarioOpt.get();

		// Comparar contraseñas directamente
		if (!usuario.getContrasena().equals(contrasena)) {
			// Si la contraseña no coincide, lanzar excepción
			throw new IllegalArgumentException("La contrasena es incorrecta.");
		}

		// Si todo es correcto, retornar el usuario
		return usuario;
	}
}
