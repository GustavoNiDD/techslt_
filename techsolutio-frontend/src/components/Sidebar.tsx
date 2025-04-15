'use client';

import { useState } from "react";
import Link from "next/link";
import LogoutButton from "./Logout";

const Sidebar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="h-full flex flex-col bg-[#2F3B3F] text-white">
            <div className="flex items-center justify-center p-5 text-2xl font-semibold bg-[#1A1A1A]">
                TechSolutio
            </div>

            <nav className="flex flex-col mt-6 space-y-2 px-4">
                {/* Produtos Dropdown */}
                <div>
                    <button
                        onClick={toggleMenu}
                        className="w-full text-left py-2 px-3 rounded bg-[#6C8A9C] hover:bg-[#A2BDC8] transition-colors font-medium"
                    >
                        Produtos {isMenuOpen ? "▲" : "▼"}
                    </button>

                    {isMenuOpen && (
                        <div className="mt-1 bg-[#1A1A1A] rounded px-3 py-2 text-sm">
                            <Link href="/dashboard/produtos/lista">
                                <span className="block py-1 hover:text-[#F7931E] cursor-pointer">Lista de Produtos</span>
                            </Link>
                            <Link href="/dashboard/produtos/cadastrar">
                                <span className="block py-1 hover:text-[#F7931E] cursor-pointer">Cadastrar Produto</span>
                            </Link>
                            <Link href="/dashboard/estoques/lista">
                                <span className="block py-1">Gerenciar Estoques</span>
                            </Link>
                            <Link href="/dashboard/estoques/cadastrar">
                                <span className="block py-1">Cadastrar Estoque</span>
                            </Link>


                        </div>
                    )}
                </div>

                {/* Outros links */}
                <Link href="/dashboard">
                    <span className="py-2 px-3 rounded bg-[#6C8A9C] hover:bg-[#A2BDC8] transition-colors cursor-pointer font-medium">
                        Dashboard
                    </span>
                </Link>
            </nav>
            <div className="p-4">
                <LogoutButton />
            </div>
        </div>


    );
};

export default Sidebar;
