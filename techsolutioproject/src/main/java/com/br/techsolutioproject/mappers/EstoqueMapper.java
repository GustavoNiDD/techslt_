package com.br.techsolutioproject.mappers;

import com.br.techsolutioproject.dto.EstoqueDTO;
import com.br.techsolutioproject.model.Estoque;
import com.br.techsolutioproject.model.Produto;

public class EstoqueMapper {

    public static EstoqueDTO toDTO(Estoque estoque) {
        if (estoque == null)
            return null;

        EstoqueDTO dto = new EstoqueDTO();
        dto.setId(estoque.getId());

        if (estoque.getProduto() != null) {
            dto.setProdutoId(estoque.getProduto().getId());
            dto.setProdutoNome(estoque.getProduto().getNome()); // novo campo preenchido
        }

        dto.setQuantidade(estoque.getQuantidade());
        dto.setCriadoEm(estoque.getCriadoEm());
        dto.setAtualizadoEm(estoque.getAtualizadoEm());

        return dto;
    }

    public static Estoque toEntity(EstoqueDTO dto) {
        if (dto == null)
            return null;

        Estoque estoque = new Estoque();
        estoque.setId(dto.getId());

        if (dto.getProdutoId() != null) {
            Produto produto = new Produto();
            produto.setId(dto.getProdutoId());
            estoque.setProduto(produto);
        }

        estoque.setQuantidade(dto.getQuantidade());
        estoque.setCriadoEm(dto.getCriadoEm());
        estoque.setAtualizadoEm(dto.getAtualizadoEm());

        return estoque;
    }
}
