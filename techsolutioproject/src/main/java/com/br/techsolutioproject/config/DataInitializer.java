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
        user1.setNome("admin");
        user1.setEmail("admin@email.com");
        user1.setSenha("123456");

        UsuarioRequestDTO user2 = new UsuarioRequestDTO();
        user2.setNome("joao");
        user2.setEmail("joao@email.com");
        user2.setSenha("senha123");

        UsuarioRequestDTO user3 = new UsuarioRequestDTO();
        user3.setNome("maria");
        user3.setEmail("maria@email.com");
        user3.setSenha("senha456");

        UsuarioRequestDTO user4 = new UsuarioRequestDTO();
        user4.setNome("carlos");
        user4.setEmail("carlos@email.com");
        user4.setSenha("senha789");

        usuarioService.save(user1);
        usuarioService.save(user2);
        usuarioService.save(user3);
        usuarioService.save(user4);
    }

    private List<ProdutoDTO> createProdutos() {
        LocalDateTime now = LocalDateTime.now();

        ProdutoDTO p1 = new ProdutoDTO();
        p1.setNome("Mouse Gamer RGB");
        p1.setMarca("Redragon");
        p1.setPrecoUnitario(new BigDecimal("159.90"));
        p1.setCriadoPor("admin");
        p1.setAtualizadoPor("admin");
        p1.setCriadoEm(now);
        p1.setAtualizadoEm(now);

        ProdutoDTO p2 = new ProdutoDTO();
        p2.setNome("Teclado Mecânico");
        p2.setMarca("Corsair");
        p2.setPrecoUnitario(new BigDecimal("349.90"));
        p2.setCriadoPor("admin");
        p2.setAtualizadoPor("admin");
        p2.setCriadoEm(now);
        p2.setAtualizadoEm(now);

        ProdutoDTO p3 = new ProdutoDTO();
        p3.setNome("Monitor 144Hz");
        p3.setMarca("AOC");
        p3.setPrecoUnitario(new BigDecimal("899.00"));
        p3.setCriadoPor("admin");
        p3.setAtualizadoPor("admin");
        p3.setCriadoEm(now);
        p3.setAtualizadoEm(now);

        ProdutoDTO p4 = new ProdutoDTO();
        p4.setNome("Notebook i5");
        p4.setMarca("Dell");
        p4.setPrecoUnitario(new BigDecimal("3599.00"));
        p4.setCriadoPor("admin");
        p4.setAtualizadoPor("admin");
        p4.setCriadoEm(now);
        p4.setAtualizadoEm(now);

        ProdutoDTO p5 = new ProdutoDTO();
        p5.setNome("Headset Surround");
        p5.setMarca("HyperX");
        p5.setPrecoUnitario(new BigDecimal("499.90"));
        p5.setCriadoPor("admin");
        p5.setAtualizadoPor("admin");
        p5.setCriadoEm(now);
        p5.setAtualizadoEm(now);

        ProdutoDTO p6 = new ProdutoDTO();
        p6.setNome("Mousepad Grande");
        p6.setMarca("Logitech");
        p6.setPrecoUnitario(new BigDecimal("119.90"));
        p6.setCriadoPor("admin");
        p6.setAtualizadoPor("admin");
        p6.setCriadoEm(now);
        p6.setAtualizadoEm(now);

        ProdutoDTO p7 = new ProdutoDTO();
        p7.setNome("Gabinete RGB");
        p7.setMarca("Cooler Master");
        p7.setPrecoUnitario(new BigDecimal("699.90"));
        p7.setCriadoPor("admin");
        p7.setAtualizadoPor("admin");
        p7.setCriadoEm(now);
        p7.setAtualizadoEm(now);

        return List.of(p1, p2, p3, p4, p5, p6, p7).stream()
                .map(produtoService::save)
                .toList();
    }

    private void createEstoques(List<ProdutoDTO> produtos) {
        for (int i = 0; i < produtos.size(); i++) {
            ProdutoDTO produto = produtos.get(i);

            EstoqueDTO estoque = new EstoqueDTO();
            estoque.setProdutoId(produto.getId());
            estoque.setQuantidade(50 + i * 10); // 50, 60, 70...
            estoque.setCriadoEm(LocalDateTime.now());
            estoque.setAtualizadoEm(LocalDateTime.now());

            estoqueService.save(estoque);
        }
    }
}
