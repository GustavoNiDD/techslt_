package com.br.techsolutioproject.mappers;

import com.br.techsolutioproject.dto.ProdutoDTO;
import com.br.techsolutioproject.model.Produto;

public class ProdutoMapper {

    public static ProdutoDTO toDTO(Produto produto) {
        if (produto == null) {
            return null;
        }
        ProdutoDTO dto = new ProdutoDTO();
        dto.setId(produto.getId());
        dto.setNome(produto.getNome());
        dto.setMarca(produto.getMarca());
        dto.setPrecoUnitario(produto.getPrecoUnitario());
        dto.setCriadoPor(produto.getCriadoPor());
        dto.setAtualizadoPor(produto.getAtualizadoPor());
        dto.setCriadoEm(produto.getCriadoEm());
        dto.setAtualizadoEm(produto.getAtualizadoEm());
        return dto;
    }

    public static Produto toEntity(ProdutoDTO dto) {
        if (dto == null) {
            return null;
        }
        Produto produto = new Produto();
        produto.setId(dto.getId());
        produto.setNome(dto.getNome());
        produto.setMarca(dto.getMarca());
        produto.setPrecoUnitario(dto.getPrecoUnitario());
        produto.setCriadoPor(dto.getCriadoPor());
        produto.setAtualizadoPor(dto.getAtualizadoPor());
        produto.setCriadoEm(dto.getCriadoEm());
        produto.setAtualizadoEm(dto.getAtualizadoEm());
        return produto;
    }
}
