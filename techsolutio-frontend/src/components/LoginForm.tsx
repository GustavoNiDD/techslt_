'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha }),
        });

        if (res.ok) {
            const data = await res.json();
            // Salvar token no cookie (1 dia de validade)
            Cookies.set('token', data.token, { expires: 1 });

            // Redirecionar para dashboard
            router.push('/dashboard');
        } else {
            alert('Login falhou');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                className="border p-2 w-full"
            />
            <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha"
                className="border p-2 w-full"
            />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                Entrar
            </button>
        </form>
    );
}
