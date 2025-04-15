'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Produto {
    id: number;
    nome: string;
    marca: string;
    precoUnitario: number;
    criadoPor: string;
    atualizadoPor: string;
    criadoEm: string;
    atualizadoEm: string;
}

export default function ListaProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [filteredProdutos, setFilteredProdutos] = useState<Produto[]>([]);
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<Produto>>({});

    const token = Cookies.get('token');

    useEffect(() => {
        fetchProdutos();
    }, []);

    const fetchProdutos = async () => {
        const res = await fetch('http://localhost:8080/produtos', {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        setProdutos(data);
        setFilteredProdutos(data);
    };

    const handleFilter = () => {
        const inicio = dataInicio ? new Date(dataInicio) : null;
        const fim = dataFim ? new Date(`${dataFim}T23:59:59`) : null;

        const filtrados = produtos.filter(produto => {
            const criadoEm = new Date(produto.criadoEm);
            if (inicio && criadoEm < inicio) return false;
            if (fim && criadoEm > fim) return false;
            return true;
        });

        setFilteredProdutos(filtrados);
    };


    const startEdit = (produto: Produto) => {
        setEditingId(produto.id);
        setEditForm({ ...produto });

        const escHandler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setEditingId(null);
                setEditForm({});
                window.removeEventListener('keydown', escHandler);
            }
        };

        window.addEventListener('keydown', escHandler);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: name === 'precoUnitario' ? parseFloat(value) : value
        }));
    };

    const saveEdit = async (id: number) => {
        const res = await fetch(`http://localhost:8080/produtos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify(editForm),
        });

        if (res.ok) {
            await fetchProdutos();
            setEditingId(null);
            setEditForm({});
        } else {
            alert("Erro ao atualizar produto");
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Deseja realmente excluir este produto?")) {
            const res = await fetch(`http://localhost:8080/produtos/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
            });

            if (res.ok) {
                await fetchProdutos();
            } else {
                alert("Erro ao excluir produto");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-[#FFAD21]">
                Lista de Produtos
            </h1>

            {/* Filtro por data */}
            <div className="bg-white p-4 rounded shadow mb-6 max-w-5xl mx-auto">
                <div className="flex items-end gap-4 flex-wrap">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Data Início</label>
                        <input
                            type="date"
                            value={dataInicio}
                            onChange={e => setDataInicio(e.target.value)}
                            className="border rounded px-3 py-2 text-gray-800"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Data Fim</label>
                        <input
                            type="date"
                            value={dataFim}
                            onChange={e => setDataFim(e.target.value)}
                            className="border rounded px-3 py-2 text-gray-800"
                        />
                    </div>
                    <button
                        onClick={handleFilter}
                        className="bg-[#F7931E] text-white px-4 py-2 rounded hover:bg-[#d47f1a]"
                    >
                        Filtrar
                    </button>
                </div>
            </div>

            {/* Tabela */}
            <div className="overflow-x-auto max-w-7xl mx-auto">
                <table className="min-w-full bg-white shadow-md rounded border text-sm">
                    <thead>
                        <tr className="bg-[#6C8A9C] text-white">
                            <th className="py-2 px-4">ID</th>
                            <th className="py-2 px-4">Nome</th>
                            <th className="py-2 px-4">Marca</th>
                            <th className="py-2 px-4">Preço</th>
                            <th className="py-2 px-4">Criado Em</th>
                            <th className="py-2 px-4">Atualizado Em</th>
                            <th className="py-2 px-4">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProdutos.map(produto => (
                            <tr key={produto.id} className="border-t text-gray-700">
                                <td className="py-2 px-4">{produto.id}</td>
                                <td className="py-2 px-4">
                                    {editingId === produto.id ? (
                                        <input
                                            name="nome"
                                            value={editForm.nome || ''}
                                            onChange={handleChange}
                                            className="border px-2 py-1 rounded w-full text-gray-800"
                                        />
                                    ) : produto.nome}
                                </td>
                                <td className="py-2 px-4">
                                    {editingId === produto.id ? (
                                        <input
                                            name="marca"
                                            value={editForm.marca || ''}
                                            onChange={handleChange}
                                            className="border px-2 py-1 rounded w-full text-gray-800"
                                        />
                                    ) : produto.marca}
                                </td>
                                <td className="py-2 px-4">
                                    {editingId === produto.id ? (
                                        <input
                                            name="precoUnitario"
                                            value={editForm.precoUnitario?.toString() || ''}
                                            onChange={handleChange}
                                            className="border px-2 py-1 rounded w-full text-gray-800"
                                        />
                                    ) : `R$ ${produto.precoUnitario.toFixed(2)}`}
                                </td>
                                <td className="py-2 px-4">{new Date(produto.criadoEm).toLocaleString()}</td>
                                <td className="py-2 px-4">{new Date(produto.atualizadoEm).toLocaleString()}</td>
                                <td className="py-2 px-4 flex gap-2">
                                    {editingId === produto.id ? (
                                        <button
                                            onClick={() => saveEdit(produto.id)}
                                            className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                                        >
                                            Salvar
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => startEdit(produto)}
                                            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                                        >
                                            Editar
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(produto.id)}
                                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                                    >
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
