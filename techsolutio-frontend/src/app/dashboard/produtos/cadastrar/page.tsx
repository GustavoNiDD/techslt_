'use client';

import { useState } from 'react';
import Cookies from 'js-cookie';

export default function CadastroProduto() {
    const [form, setForm] = useState({
        nome: '',
        marca: '',
        precoUnitario: '',
        criadoPor: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = Cookies.get('token');

        // Corrige fuso horário (UTC-3 → local)
        const now = new Date();
        const nowISO = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();

        const body = {
            ...form,
            precoUnitario: parseFloat(form.precoUnitario),
            atualizadoPor: form.criadoPor,
            criadoEm: nowISO,
            atualizadoEm: nowISO,
        };

        const res = await fetch('http://localhost:8080/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify(body),
        });

        if (res.ok) {
            alert("✅ Produto cadastrado com sucesso!");
            setForm({
                nome: '',
                marca: '',
                precoUnitario: '',
                criadoPor: '',
            });
        } else {
            alert("❌ Erro ao cadastrar produto.");
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] p-6">
            <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#FFAD21]">Cadastro de Produto</h1>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        placeholder="Nome do produto"
                        required
                        className="w-full border px-4 py-2 rounded text-gray-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F7931E]"
                    />

                    <input
                        name="marca"
                        value={form.marca}
                        onChange={handleChange}
                        placeholder="Marca"
                        required
                        className="w-full border px-4 py-2 rounded text-gray-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F7931E]"
                    />

                    <input
                        name="precoUnitario"
                        value={form.precoUnitario}
                        onChange={handleChange}
                        placeholder="Preço Unitário (ex: 199.90)"
                        required
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full border px-4 py-2 rounded text-gray-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F7931E]"
                    />

                    <input
                        name="criadoPor"
                        value={form.criadoPor}
                        onChange={handleChange}
                        placeholder="Criado por"
                        required
                        className="w-full border px-4 py-2 rounded text-gray-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F7931E]"
                    />

                    <button
                        type="submit"
                        className="bg-[#F7931E] text-white px-4 py-2 rounded hover:bg-[#d47f1a] transition-colors w-full"
                    >
                        Cadastrar Produto
                    </button>
                </form>
            </div>
        </div>
    );
}
