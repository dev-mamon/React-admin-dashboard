import React from "react";
import {
    Search,
    Maximize,
    Mail,
    Bell,
    Settings,
    Monitor,
    PlusCircle,
    ChevronDown,
} from "lucide-react";

const Header = () => {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40 shrink-0 shadow-sm">
            <div className="flex items-center gap-4 flex-1">
                {/* Search Bar - Positioned exactly as image */}
                <div className="relative w-72 hidden md:block">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <Search size={16} />
                    </span>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-9 pr-12 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-orange-500/20"
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center">
                        <span className="text-[10px] font-semibold text-gray-400 border px-1.5 py-0.5 rounded bg-white shadow-sm">
                            ⌘ K
                        </span>
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Store Selector */}
                <div className="hidden lg:flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50">
                    <div className="w-5 h-5 bg-[#0D6D32] rounded flex items-center justify-center text-[10px] text-white font-bold">
                        F
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                        Freshmart
                    </span>
                    <ChevronDown size={14} className="text-gray-400" />
                </div>

                {/* Icons Area */}
                <div className="flex items-center gap-1">
                    <IconButton
                        icon={<span className="text-sm font-bold">US</span>}
                    />
                    <IconButton icon={<Maximize size={18} />} />
                    <IconButton icon={<Mail size={18} />} badge="1" />
                    <IconButton icon={<Bell size={18} />} />
                    <IconButton icon={<Settings size={18} />} />
                </div>

                {/* Main Action Buttons */}
                <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 transition-all shadow-sm">
                    <PlusCircle size={18} />
                    <span className="hidden xl:inline">Add New</span>
                </button>
                <button className="flex items-center gap-2 bg-[#1B2838] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-900 ml-1">
                    <Monitor size={18} />
                    <span className="hidden xl:inline">POS</span>
                </button>

                {/* User Avatar */}
                <div className="ml-2 border-l pl-3 border-gray-200">
                    <img
                        src="https://ui-avatars.com/api/?name=Admin&background=random"
                        alt="User"
                        className="w-9 h-9 rounded-lg object-cover cursor-pointer ring-1 ring-gray-100"
                    />
                </div>
            </div>
        </header>
    );
};

const IconButton = ({ icon, badge }) => (
    <button className="relative p-2.5 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors group">
        <span className="group-hover:text-orange-500">{icon}</span>
        {badge && (
            <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {badge}
            </span>
        )}
    </button>
);

export default Header;
