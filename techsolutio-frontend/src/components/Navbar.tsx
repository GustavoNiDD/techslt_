import React from 'react';

const Navbar = () => {
    return (
        <div className="w-full bg-gray-700 text-white p-4 flex justify-between items-center">
            <span className="font-semibold text-xl">Dashboard</span>
            <span>Usuário Logado: [Nome do Usuário]</span>
        </div>
    );
};

export default Navbar;
