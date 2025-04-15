'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Estoque {
    id: number;
    produtoId: number;
    produtoNome: string;
    quantidade: number;
    criadoEm: string;
    atualizadoEm: string;
}

export default function EstoquesPage() {
    const [estoques, setEstoques] = useState<Estoque[]>([]);
    const [originalEstoques, setOriginalEstoques] = useState<Estoque[]>([]);
    const [editId, setEditId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<Estoque>>({});
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

    const token = Cookies.get('token');

    useEffect(() => {
        fetchEstoques();
    }, []);

    const fetchEstoques = async () => {
        const res = await fetch('http://localhost:8080/estoques', {
            headers: { Authorization: `Bearer ${token}` },
            credentials: 'include'
        });
        const data = await res.json();
        setEstoques(data);
        setOriginalEstoques(data);
    };

    const handleFilter = () => {
        const inicio = dataInicio ? new Date(dataInicio) : null;
        const fim = dataFim ? new Date(`${dataFim}T23:59:59`) : null;

        const filtrados = originalEstoques.filter(estoque => {
            const criado = new Date(estoque.criadoEm);
            if (inicio && criado < inicio) return false;
            if (fim && criado > fim) return false;
            return true;
        });

        setEstoques(filtrados);
    };

    const clearFilter = () => {
        setDataInicio('');
        setDataFim('');
        setEstoques(originalEstoques);
    };

    const startEdit = (estoque: Estoque) => {
        setEditId(estoque.id);
        setEditForm({ ...estoque });

        const escHandler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setEditId(null);
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
            [name]: name === 'quantidade' || name === 'produtoId' ? parseInt(value) : value
        }));
    };

    const saveEdit = async (id: number) => {
        const res = await fetch(`http://localhost:8080/estoques/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify(editForm),
        });

        if (res.ok) {
            await fetchEstoques();
            setEditId(null);
            setEditForm({});
        } else {
            alert("Erro ao atualizar estoque");
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Deseja excluir este estoque?")) {
            const res = await fetch(`http://localhost:8080/estoques/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
                credentials: 'include'
            });

            if (res.ok) {
                await fetchEstoques();
            } else {
                alert("Erro ao excluir estoque");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] p-6">
            <h1 className="text-3xl font-bold text-center text-[#FFAD21] mb-6">
                Estoques
            </h1>

            {/* Filtro por data */}
            <div className="bg-white p-4 rounded shadow mb-6 max-w-5xl mx-auto">
                <div className="flex items-end gap-4 flex-wrap">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Data Início</label>
                        <input
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            className="border rounded px-3 py-2 text-gray-800"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Data Fim</label>
                        <input
                            type="date"
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
                            className="border rounded px-3 py-2 text-gray-800"
                        />
                    </div>
                    <button
                        onClick={handleFilter}
                        className="bg-[#F7931E] text-white px-4 py-2 rounded hover:bg-[#d47f1a]"
                    >
                        Filtrar
                    </button>
                    <button
                        onClick={clearFilter}
                        className="text-sm text-blue-600 underline"
                    >
                        Limpar Filtro
                    </button>
                </div>
            </div>

            {/* Tabela */}
            <div className="overflow-x-auto max-w-7xl mx-auto">
                <table className="min-w-full bg-white shadow-md rounded border text-sm">
                    <thead>
                        <tr className="bg-[#6C8A9C] text-white">
                            <th className="py-2 px-4">ID</th>
                            <th className="py-2 px-4">Produto ID</th>
                            <th className="py-2 px-4">Produto</th>
                            <th className="py-2 px-4">Quantidade</th>
                            <th className="py-2 px-4">Criado Em</th>
                            <th className="py-2 px-4">Atualizado Em</th>
                            <th className="py-2 px-4">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estoques.map(estoque => (
                            <tr key={estoque.id} className="border-t text-gray-700">
                                <td className="py-2 px-4">{estoque.id}</td>

                                <td className="py-2 px-4">
                                    {editId === estoque.id ? (
                                        <input
                                            name="produtoId"
                                            type="number"
                                            value={editForm.produtoId || ''}
                                            onChange={handleChange}
                                            className="border px-2 py-1 rounded w-full text-gray-800"
                                        />
                                    ) : estoque.produtoId}
                                </td>

                                <td className="py-2 px-4">{estoque.produtoNome || '-'}</td>

                                <td className="py-2 px-4">
                                    {editId === estoque.id ? (
                                        <input
                                            name="quantidade"
                                            type="number"
                                            value={editForm.quantidade || ''}
                                            onChange={handleChange}
                                            className="border px-2 py-1 rounded w-full text-gray-800"
                                        />
                                    ) : estoque.quantidade}
                                </td>

                                <td className="py-2 px-4">{new Date(estoque.criadoEm).toLocaleString()}</td>
                                <td className="py-2 px-4">{new Date(estoque.atualizadoEm).toLocaleString()}</td>
                                <td className="py-2 px-4 flex gap-2">
                                    {editId === estoque.id ? (
                                        <button
                                            onClick={() => saveEdit(estoque.id)}
                                            className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                                        >
                                            Salvar
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => startEdit(estoque)}
                                            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                                        >
                                            Editar
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(estoque.id)}
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
