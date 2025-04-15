package com.br.techsolutioproject.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class EstoqueDTO {
    private Long id;
    private Long produtoId;
    private String produtoNome;
    private Integer quantidade;
    private LocalDateTime criadoEm;
    private LocalDateTime atualizadoEm;
}
