import Sidebar from "../../components/Sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen bg-[#F5F5F5]">
            <div className="w-64 flex-shrink-0">
                <Sidebar />
            </div>

            <main className="flex-1 p-6 overflow-auto">
                {children}
            </main>
        </div>
    );
}
