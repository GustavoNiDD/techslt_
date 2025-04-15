package com.br.techsolutioproject.repository;

import com.br.techsolutioproject.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
