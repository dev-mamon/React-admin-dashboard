import React, { useState, useEffect, useCallback } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import { Skeleton } from "@/Components/ui/skeleton";
import Pagination from "@/Components/Pagination";
import { Search, Plus, Trash2, Eye, ChevronDown, Check } from "lucide-react";
import debounce from "lodash/debounce";

export default function Index({ products, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [perPage, setPerPage] = useState(filters.per_page || 10);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const performSearch = useCallback(
        debounce((query) => {
            router.get(
                route("products.index"),
                { search: query, per_page: perPage },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    onStart: () => setIsLoading(true),
                    onFinish: () => setIsLoading(false),
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
        setIsLoading(true);
        router.get(
            route("products.index"),
            { search, per_page: value },
            {
                preserveState: true,
                preserveScroll: true,
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
    const skeletonRows = Array.from({ length: perPage > 10 ? 10 : perPage });
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
                                className="bg-red-500 text-white px-4 py-2 rounded-md font-bold text-[13px] flex items-center gap-2 transition-all hover:bg-red-600"
                            >
                                <Trash2 size={16} /> Delete{" "}
                                {isAllSelected
                                    ? "Entire DB"
                                    : selectedIds.length}
                            </button>
                        )}
                        <Link
                            href={route("products.create")}
                            className="bg-[#FF9F43] text-white px-4 py-2 rounded-md font-bold text-[13px] flex items-center gap-2 hover:bg-[#e68a2e] transition-colors"
                        >
                            <Plus size={16} /> Add Product
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                    {/* Filter Bar */}
                    <div className="p-4 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="relative w-full md:max-w-[350px]">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={16}
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setIsLoading(true);
                                }}
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-[14px] focus:border-[#FF9F43] outline-none transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500">
                            <span>Show</span>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md bg-white hover:border-[#FF9F43] transition-all min-w-[120px] justify-between text-[#212B36]">
                                        {perPage} Entries{" "}
                                        <ChevronDown
                                            size={14}
                                            className="text-gray-400"
                                        />
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content width="48" align="right">
                                    {[10, 25, 50, 100].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() =>
                                                handlePerPageChange(num)
                                            }
                                            className={`flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-gray-100 ${
                                                perPage === num
                                                    ? "text-[#FF9F43] font-bold bg-orange-50"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            {num} Entries{" "}
                                            {perPage === num && (
                                                <Check size={14} />
                                            )}
                                        </button>
                                    ))}
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#F9FAFB] text-[#212B36] font-bold text-[14px] border-b border-gray-100">
                                    <th className="py-4 px-4 w-10">
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
                                    // স্কেলিটন রো রেন্ডার হচ্ছে
                                    skeletonRows.map((_, index) => (
                                        <tr
                                            key={index}
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
                                                        alt=""
                                                    />
                                                    <div>
                                                        <div className="font-bold text-[#212B36]">
                                                            {product.name}
                                                        </div>
                                                        <div className="text-[11px] text-gray-400 font-bold uppercase">
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
                                            className="py-20 text-center text-gray-400 font-bold italic"
                                        >
                                            No products found matching your
                                            search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <Pagination data={products} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
