'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Produto {
    id: number;
    nome: string;
}

export default function CadastroEstoque() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [produtoId, setProdutoId] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const token = Cookies.get('token');

    useEffect(() => {
        fetchProdutos();
    }, []);

    const fetchProdutos = async () => {
        const res = await fetch('http://localhost:8080/produtos', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
        });
        const data = await res.json();
        setProdutos(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const body = {
            produtoId: parseInt(produtoId),
            quantidade: parseInt(quantidade),
        };

        const res = await fetch('http://localhost:8080/estoques', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify(body),
        });

        if (res.ok) {
            alert("✅ Estoque cadastrado com sucesso!");
            setProdutoId('');
            setQuantidade('');
        } else {
            const err = await res.text();
            alert(`❌ Erro: ${err}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] p-6">
            <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#FFAD21]">
                    Cadastrar Estoque
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Produto
                        </label>
                        <select
                            value={produtoId}
                            onChange={(e) => setProdutoId(e.target.value)}
                            required
                            className="w-full border px-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F7931E]"
                        >
                            <option value="" disabled>Selecione um produto</option>
                            {produtos.map(produto => (
                                <option key={produto.id} value={produto.id}>
                                    {produto.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantidade
                        </label>
                        <input
                            type="number"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            required
                            min="1"
                            className="w-full border px-4 py-2 rounded text-gray-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F7931E]"
                            placeholder="Informe a quantidade"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#F7931E] text-white px-4 py-2 rounded hover:bg-[#d47f1a] transition-colors w-full"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}
