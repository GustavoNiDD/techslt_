package com.br.techsolutioproject.config;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.br.techsolutioproject.dto.EstoqueDTO;
import com.br.techsolutioproject.dto.ProdutoDTO;
import com.br.techsolutioproject.dto.UsuarioRequestDTO;
import com.br.techsolutioproject.service.EstoqueService;
import com.br.techsolutioproject.service.ProdutoService;
import com.br.techsolutioproject.service.UsuarioService;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UsuarioService usuarioService;
    private final ProdutoService produtoService;
    private final EstoqueService estoqueService;

    public DataInitializer(
            UsuarioService usuarioService,
            ProdutoService produtoService,
            EstoqueService estoqueService) {
        this.usuarioService = usuarioService;
        this.produtoService = produtoService;
        this.estoqueService = estoqueService;
    }

    @Override
    public void run(String... args) {
        createUsuarios();
        List<ProdutoDTO> produtos = createProdutos();
        createEstoques(produtos);
    }

    private void createUsuarios() {
        UsuarioRequestDTO user1 = new UsuarioRequestDTO();
        user1.setNome("Alice");
        user1.setEmail("alice@email.com");
        user1.setSenha("alice123");

        UsuarioRequestDTO user2 = new UsuarioRequestDTO();
        user2.setNome("Bruno");
        user2.setEmail("bruno@email.com");
        user2.setSenha("bruno123");

        UsuarioRequestDTO user3 = new UsuarioRequestDTO();
        user3.setNome("Clara");
        user3.setEmail("clara@email.com");
        user3.setSenha("clara123");

        usuarioService.save(user1);
        usuarioService.save(user2);
        usuarioService.save(user3);
    }

    private List<ProdutoDTO> createProdutos() {
        LocalDateTime now = LocalDateTime.now();

        ProdutoDTO p1 = new ProdutoDTO();
        p1.setNome("Mouse Gamer");
        p1.setMarca("Logitech");
        p1.setPrecoUnitario(new BigDecimal("150.00"));
        p1.setCriadoPor("admin");
        p1.setAtualizadoPor("admin");
        p1.setCriadoEm(now);
        p1.setAtualizadoEm(now);

        ProdutoDTO p2 = new ProdutoDTO();
        p2.setNome("Teclado RGB");
        p2.setMarca("Razer");
        p2.setPrecoUnitario(new BigDecimal("250.00"));
        p2.setCriadoPor("admin");
        p2.setAtualizadoPor("admin");
        p2.setCriadoEm(now);
        p2.setAtualizadoEm(now);

        ProdutoDTO p3 = new ProdutoDTO();
        p3.setNome("Monitor 24\"");
        p3.setMarca("Samsung");
        p3.setPrecoUnitario(new BigDecimal("799.00"));
        p3.setCriadoPor("admin");
        p3.setAtualizadoPor("admin");
        p3.setCriadoEm(now);
        p3.setAtualizadoEm(now);

        ProdutoDTO p4 = new ProdutoDTO();
        p4.setNome("Notebook Ryzen 5");
        p4.setMarca("Lenovo");
        p4.setPrecoUnitario(new BigDecimal("3200.00"));
        p4.setCriadoPor("admin");
        p4.setAtualizadoPor("admin");
        p4.setCriadoEm(now);
        p4.setAtualizadoEm(now);

        ProdutoDTO p5 = new ProdutoDTO();
        p5.setNome("Headset Gamer");
        p5.setMarca("HyperX");
        p5.setPrecoUnitario(new BigDecimal("399.90"));
        p5.setCriadoPor("admin");
        p5.setAtualizadoPor("admin");
        p5.setCriadoEm(now);
        p5.setAtualizadoEm(now);

        return List.of(p1, p2, p3, p4, p5).stream()
                .map(produtoService::save)
                .toList();
    }

    private void createEstoques(List<ProdutoDTO> produtos) {
        for (int i = 0; i < produtos.size(); i++) {
            ProdutoDTO produto = produtos.get(i);

            EstoqueDTO estoque = new EstoqueDTO();
            estoque.setProdutoId(produto.getId());
            estoque.setQuantidade(20 + i * 10); // 20, 30, 40, 50, 60
            estoque.setCriadoEm(LocalDateTime.now());
            estoque.setAtualizadoEm(LocalDateTime.now());

            estoqueService.save(estoque);
        }
    }
}
