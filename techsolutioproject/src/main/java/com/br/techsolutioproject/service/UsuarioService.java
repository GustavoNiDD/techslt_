package com.br.techsolutioproject.service;

import com.br.techsolutioproject.dto.UsuarioRequestDTO;
import com.br.techsolutioproject.dto.UsuarioResponseDTO;
import com.br.techsolutioproject.mappers.UsuarioMapper;
import com.br.techsolutioproject.model.Usuario;
import com.br.techsolutioproject.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UsuarioResponseDTO> findAll() {
        return usuarioRepository.findAll()
                .stream()
                .map(UsuarioMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public Optional<UsuarioResponseDTO> findById(Long id) {
        return usuarioRepository.findById(id)
                .map(UsuarioMapper::toResponseDTO);
    }

    public UsuarioResponseDTO save(UsuarioRequestDTO dto) {
        Usuario usuario = UsuarioMapper.toEntity(dto);
        usuario.setSenhaCriptografada(passwordEncoder.encode(dto.getSenha()));
        usuario = usuarioRepository.save(usuario);
        return UsuarioMapper.toResponseDTO(usuario);
    }

    public UsuarioResponseDTO update(Long id, UsuarioRequestDTO dto) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNome(dto.getNome());
            usuario.setEmail(dto.getEmail());
            if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
                usuario.setSenhaCriptografada(passwordEncoder.encode(dto.getSenha()));
            }
            usuario.setAtualizadoEm(LocalDateTime.now());
            return UsuarioMapper.toResponseDTO(usuarioRepository.save(usuario));
        }).orElse(null);
    }

    public UsuarioResponseDTO patch(Long id, UsuarioRequestDTO dto) {
        return usuarioRepository.findById(id).map(usuario -> {
            if (dto.getNome() != null)
                usuario.setNome(dto.getNome());
            if (dto.getEmail() != null)
                usuario.setEmail(dto.getEmail());
            if (dto.getSenha() != null) {
                usuario.setSenhaCriptografada(passwordEncoder.encode(dto.getSenha()));
            }
            usuario.setAtualizadoEm(LocalDateTime.now());
            return UsuarioMapper.toResponseDTO(usuarioRepository.save(usuario));
        }).orElse(null);
    }

    public void deleteById(Long id) {
        usuarioRepository.deleteById(id);
    }
}
