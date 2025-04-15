package com.br.techsolutioproject.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProdutoDTO {
    private Long id;
    private String nome;
    private String marca;
    private BigDecimal precoUnitario;
    private String criadoPor;
    private String atualizadoPor;
    private LocalDateTime criadoEm;
    private LocalDateTime atualizadoEm;
}
