package com.br.techsolutioproject.service;

import com.br.techsolutioproject.dto.ProdutoDTO;
import com.br.techsolutioproject.mappers.ProdutoMapper;
import com.br.techsolutioproject.model.Produto;
import com.br.techsolutioproject.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<ProdutoDTO> findAll() {
        return produtoRepository.findAll()
                .stream()
                .map(ProdutoMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<ProdutoDTO> findById(Long id) {
        return produtoRepository.findById(id)
                .map(ProdutoMapper::toDTO);
    }

    public ProdutoDTO save(ProdutoDTO dto) {
        Produto produto = ProdutoMapper.toEntity(dto);
        Produto saved = produtoRepository.save(produto);
        return ProdutoMapper.toDTO(saved);
    }

    public ProdutoDTO update(Long id, ProdutoDTO dto) {
        Optional<Produto> produtoExistente = produtoRepository.findById(id);
        if (produtoExistente.isPresent()) {
            Produto produto = produtoExistente.get();
            produto.setNome(dto.getNome());
            produto.setMarca(dto.getMarca());
            produto.setPrecoUnitario(dto.getPrecoUnitario());
            produto.setAtualizadoPor(dto.getAtualizadoPor());
            produto.setAtualizadoEm(dto.getAtualizadoEm());
            Produto atualizado = produtoRepository.save(produto);
            return ProdutoMapper.toDTO(atualizado);
        }
        return null;
    }

    public ProdutoDTO patch(Long id, ProdutoDTO dto) {
        Optional<Produto> optional = produtoRepository.findById(id);
        if (optional.isEmpty())
            return null;

        Produto produto = optional.get();

        if (dto.getNome() != null)
            produto.setNome(dto.getNome());
        if (dto.getMarca() != null)
            produto.setMarca(dto.getMarca());
        if (dto.getPrecoUnitario() != null)
            produto.setPrecoUnitario(dto.getPrecoUnitario());
        if (dto.getCriadoPor() != null)
            produto.setCriadoPor(dto.getCriadoPor());
        if (dto.getAtualizadoPor() != null)
            produto.setAtualizadoPor(dto.getAtualizadoPor());
        if (dto.getCriadoEm() != null)
            produto.setCriadoEm(dto.getCriadoEm());
        if (dto.getAtualizadoEm() != null)
            produto.setAtualizadoEm(dto.getAtualizadoEm());

        Produto atualizado = produtoRepository.save(produto);
        return ProdutoMapper.toDTO(atualizado);
    }

    public void deleteById(Long id) {
        produtoRepository.deleteById(id);
    }
}
