import React, { useState } from "react";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import { ChevronLeft, Menu, X } from "lucide-react";

export default function AuthenticatedLayout({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false); // মোবাইল মেনুর জন্য

    const showFullSidebar = !isCollapsed || isHovered;

    return (
        <div className="flex h-screen bg-[#F7F7F7] overflow-hidden font-sans">
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-[55] lg:hidden transition-opacity duration-300"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar Section */}
            <aside
                onMouseEnter={() => isCollapsed && setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`fixed inset-y-0 left-0 z-[60] bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col
                    ${
                        isMobileOpen
                            ? "translate-x-0 w-64 shadow-2xl"
                            : "-translate-x-full lg:translate-x-0"
                    }
                    ${showFullSidebar ? "lg:w-64" : "lg:w-20"}`}
            >
                {/* Desktop Toggle Button (শুধু ডেস্কটপে দেখাবে) */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden lg:flex absolute -right-3 top-5 z-[70] w-6 h-6 bg-orange-500 text-white rounded-full items-center justify-center shadow-md hover:bg-orange-600 transition-all"
                >
                    <ChevronLeft
                        size={14}
                        className={`${
                            isCollapsed ? "rotate-180" : ""
                        } transition-transform duration-300`}
                    />
                </button>

                {/* Mobile Close Button (শুধু মোবাইলে দেখাবে) */}
                <button
                    onClick={() => setIsMobileOpen(false)}
                    className="lg:hidden absolute right-4 top-5 p-1 text-gray-500"
                >
                    <X size={20} />
                </button>

                {/* Logo Area */}
                <div className="h-16 flex items-center px-5 border-b border-gray-100 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center shrink-0 shadow-sm">
                            <span className="text-white font-bold text-lg">
                                D
                            </span>
                        </div>
                        {(showFullSidebar || isMobileOpen) && (
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

                {/* Sidebar Navigation Items */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    <Sidebar
                        isCollapsed={isMobileOpen ? false : !showFullSidebar}
                    />
                </div>
            </aside>

            {/* Main Content Area */}
            <div
                className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
                    isCollapsed ? "lg:pl-20" : "lg:pl-64"
                } pl-0`}
            >
                {/* Header Container with Mobile Menu Trigger */}
                <div className="flex items-center bg-white border-b border-gray-100 lg:border-none w-full shrink-0">
                    <button
                        onClick={() => setIsMobileOpen(true)}
                        className="p-4 lg:hidden text-gray-600 hover:text-orange-500 transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="flex-1">
                        <Header />
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#F9FAFB]">
                    <div className="w-full mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}
