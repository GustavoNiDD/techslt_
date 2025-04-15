package com.br.techsolutioproject.service;

import com.br.techsolutioproject.dto.EstoqueDTO;
import com.br.techsolutioproject.model.Estoque;
import com.br.techsolutioproject.model.Produto;
import com.br.techsolutioproject.repository.EstoqueRepository;
import com.br.techsolutioproject.repository.ProdutoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EstoqueService {

    @Autowired
    private EstoqueRepository estoqueRepository;

    public List<Estoque> findAll() {
        return estoqueRepository.findAll();
    }

    public Optional<Estoque> findById(Long id) {
        return estoqueRepository.findById(id);
    }

    @Autowired
    private ProdutoRepository produtoRepository;

    public Estoque save(EstoqueDTO dto) {
        Produto produto = produtoRepository.findById(dto.getProdutoId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        Estoque estoque = new Estoque();
        estoque.setProduto(produto);
        estoque.setQuantidade(dto.getQuantidade());
        estoque.setCriadoEm(LocalDateTime.now());
        estoque.setAtualizadoEm(LocalDateTime.now());

        return estoqueRepository.save(estoque);
    }

    public Estoque update(Long id, EstoqueDTO dto) {
        Estoque estoque = estoqueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Estoque não encontrado"));

        if (dto.getProdutoId() != null) {
            Produto produto = produtoRepository.findById(dto.getProdutoId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
            estoque.setProduto(produto);
        }

        if (dto.getQuantidade() != null) {
            estoque.setQuantidade(dto.getQuantidade());
        }

        estoque.setAtualizadoEm(LocalDateTime.now());

        return estoqueRepository.save(estoque);
    }

    public Estoque patch(Long id, EstoqueDTO dto) {
        Estoque estoque = estoqueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Estoque não encontrado"));

        if (dto.getQuantidade() != null) {
            estoque.setQuantidade(dto.getQuantidade());
        }

        if (dto.getProdutoId() != null) {
            Produto novoProduto = produtoRepository.findById(dto.getProdutoId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
            estoque.setProduto(novoProduto);
        }

        estoque.setAtualizadoEm(LocalDateTime.now());

        return estoqueRepository.save(estoque);
    }

    public void deleteById(Long id) {
        estoqueRepository.deleteById(id);
    }
}
