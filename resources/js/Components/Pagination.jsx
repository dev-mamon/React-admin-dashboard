import React, { useMemo } from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ data }) {
    // If there's no data or only one page, don't show pagination
    if (!data || !data.links || data.links.length <= 3) return null;

    const processedLinks = useMemo(() => {
        return data.links.map((link) => ({
            ...link,
            label: link.label
                .replace("&laquo; Previous", "Prev")
                .replace("Next &raquo;", "Next"),
        }));
    }, [data.links]);

    return (
        <div className="p-4 border-t border-gray-50 flex items-center justify-between bg-[#FDFDFD]">
            {/* Left Side: Info */}
            <span className="text-[12px] text-gray-400 font-medium">
                Showing {data.from || 0} to {data.to || 0} of {data.total}{" "}
                products
            </span>

            {/* Right Side: Buttons */}
            <div className="flex gap-1">
                {processedLinks.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || "#"}
                        preserveScroll
                        preserveState
                        className={`px-3 py-1.5 rounded text-[13px] font-bold border transition ${
                            link.active
                                ? "bg-[#FF9F43] border-[#FF9F43] text-white"
                                : "bg-white border-gray-200 text-gray-600 hover:border-[#FF9F43]"
                        } ${
                            !link.url
                                ? "opacity-40 pointer-events-none"
                                : "cursor-pointer"
                        }`}
                    >
                        {/* No dangerouslySetInnerHTML needed anymore */}
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}
