import React, { useState } from "react";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import { ChevronLeft } from "lucide-react";

export default function AuthenticatedLayout({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const showFullSidebar = !isCollapsed || isHovered;

    return (
        <div className="flex h-screen bg-[#F7F7F7] overflow-hidden font-sans">
            {/* Sidebar Section */}
            <aside
                onMouseEnter={() => isCollapsed && setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col
                    ${showFullSidebar ? "w-64" : "w-20"}`}
            >
                {/* Junction Toggle Button - Exact Position from Image */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-5 z-[60] w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-orange-600 transition-all"
                >
                    <ChevronLeft
                        size={14}
                        className={`${
                            isCollapsed ? "rotate-180" : ""
                        } transition-transform duration-300`}
                    />
                </button>

                {/* Logo Area */}
                <div className="h-16 flex items-center px-5 border-b border-gray-100 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center shrink-0 shadow-sm">
                            <span className="text-white font-bold text-lg mamon">
                                D
                            </span>
                        </div>
                        {showFullSidebar && (
                            <div className="leading-tight animate-in fade-in duration-300">
                                <span className="text-xl font-bold text-slate-800 block">
                                    Dreams
                                </span>
                                <span className="text-orange-500 text-[10px] font-bold uppercase tracking-tighter -mt-1 block text-right">
                                    pos
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    <Sidebar isCollapsed={!showFullSidebar} />
                </div>
            </aside>

            {/* Main Content Area */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300 ${
                    isCollapsed ? "ml-20" : "ml-64"
                }`}
            >
                <Header />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#F9FAFB]">
                    <div className="max-w-[1600px] mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}
