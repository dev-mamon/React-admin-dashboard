import React, { useState, useRef } from "react";
import { Link, usePage } from "@inertiajs/react"; // Inertia Link এবং usePage ইম্পোর্ট
import {
    LayoutDashboard,
    Package,
    PlusCircle,
    History,
    MoveDown,
    Tags,
    Layers,
    Award,
    Box,
    ChevronRight,
} from "lucide-react";

const Sidebar = ({ isCollapsed }) => {
    const [isScrollingVisible, setIsScrollingVisible] = useState(false);
    const scrollTimeoutRef = useRef(null);

    // বর্তমান URL চেক করার জন্য Inertia-র usePage হুক
    const { url } = usePage();

    const handleMouseEnter = () => {
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        setIsScrollingVisible(true);
    };

    const handleMouseLeave = () => {
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrollingVisible(false);
        }, 3000);
    };

    return (
        <nav
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-6 custom-sidebar-scrollbar transition-all duration-300
                ${isScrollingVisible ? "scrollbar-show" : "scrollbar-hide"}`}
        >
            {/* Main Section */}
            <section>
                {!isCollapsed && (
                    <p className="text-[11px] font-bold text-[#1B2838] uppercase tracking-wider mb-3 px-3">
                        Main
                    </p>
                )}
                <div className="space-y-1">
                    <SidebarItem
                        icon={<LayoutDashboard size={19} />}
                        label="Dashboard"
                        path="/dashboard"
                        active={url === "/dashboard"}
                        isCollapsed={isCollapsed}
                    />
                </div>
            </section>

            {/* Inventory Section */}
            <section className="border-t border-gray-100 pt-4">
                {!isCollapsed && (
                    <p className="text-[11px] font-bold text-[#1B2838] uppercase tracking-wider mb-3 px-3">
                        Inventory
                    </p>
                )}
                <div className="space-y-1">
                    <SidebarItem
                        icon={<Package size={19} />}
                        label="Products"
                        path="/products"
                        active={url.startsWith("/products")}
                        isCollapsed={isCollapsed}
                    />
                    <SidebarItem
                        icon={<PlusCircle size={19} />}
                        label="Create Product"
                        path="/products/create"
                        active={url === "/products/create"}
                        isCollapsed={isCollapsed}
                    />
                    <SidebarItem
                        icon={<History size={19} />}
                        label="Expired Products"
                        path="/products/expired"
                        active={url === "/products/expired"}
                        isCollapsed={isCollapsed}
                    />
                    <SidebarItem
                        icon={<MoveDown size={19} />}
                        label="Low Stocks"
                        path="/products/low-stock"
                        active={url === "/products/low-stock"}
                        isCollapsed={isCollapsed}
                    />
                    <SidebarItem
                        icon={<Tags size={19} />}
                        label="Category"
                        path="/categories"
                        active={url.startsWith("/categories")}
                        isCollapsed={isCollapsed}
                    />
                    <SidebarItem
                        icon={<Layers size={19} />}
                        label="Sub Category"
                        path="/sub-categories"
                        active={url.startsWith("/sub-categories")}
                        isCollapsed={isCollapsed}
                    />
                    <SidebarItem
                        icon={<Award size={19} />}
                        label="Brands"
                        path="/brands"
                        active={url.startsWith("/brands")}
                        isCollapsed={isCollapsed}
                    />
                    <SidebarItem
                        icon={<Box size={19} />}
                        label="Units"
                        path="/units"
                        active={url.startsWith("/units")}
                        isCollapsed={isCollapsed}
                    />
                </div>
            </section>
        </nav>
    );
};

// SidebarItem Component with Inertia Link
const SidebarItem = ({ icon, label, path, active, isCollapsed, hasChild }) => (
    <Link
        href={path}
        className={`
            flex items-center ${
                isCollapsed ? "justify-center" : "justify-between"
            }
            p-2.5 rounded-lg cursor-pointer transition-all group
            ${
                active
                    ? "bg-[#FFF7ED] text-[#F97316]"
                    : "text-[#55606C] hover:bg-[#F8F9FA] hover:text-[#F97316]"
            }
        `}
    >
        <div className="flex items-center gap-3">
            <span
                className={`shrink-0 ${
                    active
                        ? "text-[#F97316]"
                        : "text-[#55606C] group-hover:text-[#F97316]"
                }`}
            >
                {icon}
            </span>
            {!isCollapsed && (
                <span className="text-[14px] font-medium whitespace-nowrap">
                    {label}
                </span>
            )}
        </div>

        {!isCollapsed && hasChild && (
            <div
                className={`w-5 h-5 flex items-center justify-center rounded-full transition-colors ${
                    active
                        ? "bg-orange-100"
                        : "bg-[#F1F2F4] group-hover:bg-orange-100"
                }`}
            >
                <ChevronRight
                    size={12}
                    className={
                        active
                            ? "text-[#F97316]"
                            : "text-[#55606C] group-hover:text-[#F97316]"
                    }
                />
            </div>
        )}
    </Link>
);

export default Sidebar;
