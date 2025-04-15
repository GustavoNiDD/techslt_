package com.br.techsolutioproject.repository;

import com.br.techsolutioproject.model.Estoque;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstoqueRepository extends JpaRepository<Estoque, Long> {
}
