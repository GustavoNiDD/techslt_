import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:8080/produtos',
                { nome, descricao, preco },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert('Produto cadastrado com sucesso!');
        } catch (error) {
            alert('Erro ao cadastrar produto');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Nome</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="mt-2 p-2 w-full border rounded-md"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Descrição</label>
                <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="mt-2 p-2 w-full border rounded-md"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Preço</label>
                <input
                    type="number"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    className="mt-2 p-2 w-full border rounded-md"
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                >
                    Cadastrar Produto
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
