export async function login(email: string, senha: string) {
    const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    });

    if (!res.ok) {
        throw new Error(`Erro ao fazer login: ${res.status}`);
    }

    return res.json();
}
