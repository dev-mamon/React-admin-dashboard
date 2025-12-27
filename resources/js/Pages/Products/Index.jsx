import React, { useState, useEffect, useCallback } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import { Skeleton } from "@/Components/ui/skeleton"; // Skeleton ইমপোর্ট করা হয়েছে
import {
    Search,
    Plus,
    Trash2,
    AlertTriangle,
    Loader2,
    Eye,
    ChevronDown,
    Check,
} from "lucide-react";
import debounce from "lodash/debounce";

export default function Index({ products, filters }) {
    // --- States ---
    const [search, setSearch] = useState(filters.search || "");
    const [perPage, setPerPage] = useState(filters.per_page || 10);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [confirmText, setConfirmText] = useState("");
    const [isLoading, setIsLoading] = useState(false); // লোডিং স্টেট ট্র্যাকিং

    // --- Optimized Search Logic ---
    const performSearch = useCallback(
        debounce((query) => {
            setIsLoading(true); // সার্চ শুরু হলে লোডিং অন
            router.get(
                route("products.index"),
                { search: query, per_page: perPage },
                {
                    preserveState: true,
                    replace: true,
                    onFinish: () => setIsLoading(false), // শেষ হলে লোডিং অফ
                }
            );
        }, 500),
        [perPage]
    );

    useEffect(() => {
        performSearch(search);
    }, [search]);

    const handlePerPageChange = (value) => {
        setPerPage(value);
        setIsLoading(true); // পেজ পরিবর্তন শুরু হলে লোডিং অন
        router.get(
            route("products.index"),
            { search, per_page: value },
            {
                preserveState: true,
                onFinish: () => setIsLoading(false),
            }
        );
    };

    const togglePageSelection = () => {
        if (selectedIds.length > 0) {
            setSelectedIds([]);
            setIsAllSelected(false);
        } else {
            setSelectedIds(products.data.map((p) => p.id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Product Management" />

            <div className="p-4 md:p-6 bg-[#F8F9FB] min-h-screen">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-[20px] font-bold text-[#212B36]">
                            Inventory Management
                        </h1>
                        <p className="text-[13px] text-gray-500">
                            Total{" "}
                            <span className="text-[#FF9F43] font-bold">
                                {products.total}
                            </span>{" "}
                            items found
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {selectedIds.length > 0 && (
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md font-bold text-[13px] flex items-center gap-2"
                            >
                                <Trash2 size={16} /> Delete{" "}
                                {isAllSelected
                                    ? "Entire DB"
                                    : selectedIds.length}
                            </button>
                        )}
                        <Link
                            href={route("products.create")}
                            className="bg-[#FF9F43] text-white px-4 py-2 rounded-md font-bold text-[13px] flex items-center gap-2"
                        >
                            <Plus size={16} /> Add Product
                        </Link>
                    </div>
                </div>

                {/* Table Content */}
                <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
                    {/* Filters Bar */}
                    <div className="p-4 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="relative w-full md:max-w-[350px]">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={16}
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name or slug..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-[14px] focus:border-[#FF9F43] outline-none transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500">
                            <span>Show</span>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md bg-white hover:border-[#FF9F43] transition-all outline-none min-w-[100px] justify-between text-[#212B36]">
                                        {/* সরাসরি perPage সংখ্যাটি দেখাবে */}
                                        {`${perPage} Entries`}
                                        <ChevronDown
                                            size={14}
                                            className="text-gray-400"
                                        />
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content width="48" align="right">
                                    {/* 'all' রিমুভ করা হয়েছে */}
                                    {[10, 25, 50, 100, 500].map((value) => (
                                        <button
                                            key={value}
                                            onClick={() =>
                                                handlePerPageChange(value)
                                            }
                                            className={`flex items-center justify-between w-full px-4 py-2 text-start text-sm leading-5 hover:bg-gray-100 transition ${
                                                perPage == value
                                                    ? "bg-orange-50 text-[#FF9F43] font-bold"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            <span>{`${value} Entries`}</span>
                                            {perPage == value && (
                                                <Check size={14} />
                                            )}
                                        </button>
                                    ))}
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    {/* Select All Message */}
                    {selectedIds.length === products.data.length &&
                        products.total > products.data.length && (
                            <div
                                className={`p-2 text-center text-[13px] transition-all ${
                                    isAllSelected
                                        ? "bg-red-600 text-white font-bold"
                                        : "bg-orange-50 text-gray-700 border-b border-orange-100"
                                }`}
                            >
                                {isAllSelected ? (
                                    `⚠️ All ${products.total} products are selected for deletion!`
                                ) : (
                                    <span>
                                        All items on this page are selected.{" "}
                                        <button
                                            onClick={() =>
                                                setIsAllSelected(true)
                                            }
                                            className="text-blue-600 font-bold underline ml-1"
                                        >
                                            Select all {products.total} products
                                            instead
                                        </button>
                                    </span>
                                )}
                                <button
                                    onClick={() => {
                                        setSelectedIds([]);
                                        setIsAllSelected(false);
                                    }}
                                    className="ml-4 underline"
                                >
                                    Clear Selection
                                </button>
                            </div>
                        )}

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#F9FAFB] text-[#212B36] font-bold text-[14px] border-b border-gray-100">
                                    <th className="py-4 px-4">
                                        <input
                                            type="checkbox"
                                            checked={
                                                selectedIds.length ===
                                                    products.data.length &&
                                                products.data.length > 0
                                            }
                                            onChange={togglePageSelection}
                                            className="rounded text-[#FF9F43] border-gray-300 focus:ring-[#FF9F43]"
                                        />
                                    </th>
                                    <th className="py-4 px-3">Product Info</th>
                                    <th className="py-4 px-3">Price</th>
                                    <th className="py-4 px-3">Status</th>
                                    <th className="py-4 px-3 text-right pr-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-[13px]">
                                {isLoading ? (
                                    // Skeleton Rows
                                    Array.from({
                                        length:
                                            perPage === "all" ? 10 : perPage,
                                    }).map((_, i) => (
                                        <tr
                                            key={i}
                                            className="border-b border-gray-50"
                                        >
                                            <td className="py-4 px-4">
                                                <Skeleton className="h-4 w-4" />
                                            </td>
                                            <td className="py-4 px-3">
                                                <div className="flex items-center gap-3">
                                                    <Skeleton className="h-10 w-10 rounded-md" />
                                                    <div className="space-y-2">
                                                        <Skeleton className="h-4 w-32" />
                                                        <Skeleton className="h-3 w-20" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-3">
                                                <Skeleton className="h-4 w-12" />
                                            </td>
                                            <td className="py-4 px-3">
                                                <Skeleton className="h-5 w-16 rounded-full" />
                                            </td>
                                            <td className="py-4 px-3 text-right pr-6">
                                                <div className="flex justify-end gap-2">
                                                    <Skeleton className="h-8 w-8 rounded" />
                                                    <Skeleton className="h-8 w-8 rounded" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : products.data.length > 0 ? (
                                    products.data.map((product) => (
                                        <tr
                                            key={product.id}
                                            className={`border-b border-gray-50 hover:bg-gray-50 transition ${
                                                selectedIds.includes(product.id)
                                                    ? "bg-orange-50/30"
                                                    : ""
                                            }`}
                                        >
                                            <td className="py-4 px-4">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        selectedIds.includes(
                                                            product.id
                                                        ) || isAllSelected
                                                    }
                                                    onChange={() => {
                                                        setIsAllSelected(false);
                                                        setSelectedIds((prev) =>
                                                            prev.includes(
                                                                product.id
                                                            )
                                                                ? prev.filter(
                                                                      (i) =>
                                                                          i !==
                                                                          product.id
                                                                  )
                                                                : [
                                                                      ...prev,
                                                                      product.id,
                                                                  ]
                                                        );
                                                    }}
                                                    className="rounded text-[#FF9F43] border-gray-300 focus:ring-[#FF9F43]"
                                                />
                                            </td>
                                            <td className="py-4 px-3">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={product.image}
                                                        className="w-10 h-10 rounded-md object-cover border border-gray-100"
                                                    />
                                                    <div>
                                                        <div className="font-bold text-[#212B36]">
                                                            {product.name}
                                                        </div>
                                                        <div className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter">
                                                            {product.slug}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-3 font-bold text-slate-700">
                                                ${product.price}
                                            </td>
                                            <td className="py-4 px-3">
                                                <span
                                                    className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                                        product.status ===
                                                        "active"
                                                            ? "bg-green-100 text-green-600"
                                                            : "bg-red-100 text-red-600"
                                                    }`}
                                                >
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-3 text-right pr-6 flex justify-end gap-2">
                                                <button className="p-1.5 text-gray-400 hover:text-blue-500 bg-white border rounded shadow-sm transition">
                                                    <Eye size={15} />
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-red-500 bg-white border rounded shadow-sm transition">
                                                    <Trash2 size={15} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="py-20 text-center text-gray-400 font-bold"
                                        >
                                            No products found matching your
                                            search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Numerical Pagination */}
                    <div className="p-4 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-[12px] text-gray-400 font-medium">
                            Showing {products.from || 0} to {products.to || 0}{" "}
                            of {products.total} products
                        </span>
                        <div className="flex gap-1">
                            {products.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || "#"}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label
                                            .replace("&laquo; Previous", "Prev")
                                            .replace("Next &raquo;", "Next"),
                                    }}
                                    className={`px-3 py-1.5 rounded text-[13px] font-bold border transition ${
                                        link.active
                                            ? "bg-[#FF9F43] border-[#FF9F43] text-white"
                                            : "bg-white border-gray-200 text-gray-600 hover:border-[#FF9F43]"
                                    } ${
                                        !link.url
                                            ? "opacity-40 pointer-events-none"
                                            : ""
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal অংশ ঠিক আগের মতোই রাখা হয়েছে */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
                        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-4 mx-auto">
                            <AlertTriangle size={30} />
                        </div>
                        <h3 className="text-xl font-bold text-center mb-2">
                            Confirm Destruction
                        </h3>
                        <p className="text-gray-500 text-sm text-center mb-6 leading-relaxed">
                            {isAllSelected
                                ? `This will permanently delete ALL ${products.total} products from the entire database. This action is irreversible.`
                                : `Are you sure you want to delete ${selectedIds.length} items?`}
                        </p>

                        {isAllSelected && (
                            <div className="mb-6 text-center">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                                    Type "DELETE" to confirm
                                </label>
                                <input
                                    type="text"
                                    value={confirmText}
                                    onChange={(e) =>
                                        setConfirmText(e.target.value)
                                    }
                                    placeholder="DELETE"
                                    className="w-full bg-gray-50 border-gray-200 rounded-lg py-3 text-center text-red-600 font-bold focus:ring-red-500 outline-none border"
                                />
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setConfirmText("");
                                }}
                                className="flex-1 py-3 bg-gray-100 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={
                                    isDeleting ||
                                    (isAllSelected && confirmText !== "DELETE")
                                }
                                onClick={() => {
                                    setIsDeleting(true);
                                    router.post(
                                        route("products.bulk-delete"),
                                        {
                                            ids: selectedIds,
                                            all: isAllSelected,
                                        },
                                        {
                                            onSuccess: () => {
                                                setShowModal(false);
                                                setSelectedIds([]);
                                                setIsAllSelected(false);
                                                setIsDeleting(false);
                                            },
                                            onFinish: () =>
                                                setIsDeleting(false),
                                        }
                                    );
                                }}
                                className={`flex-1 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition ${
                                    isAllSelected && confirmText !== "DELETE"
                                        ? "bg-red-200 cursor-not-allowed"
                                        : "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-100"
                                }`}
                            >
                                {isDeleting ? (
                                    <Loader2
                                        className="animate-spin"
                                        size={18}
                                    />
                                ) : (
                                    "Confirm Delete"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
