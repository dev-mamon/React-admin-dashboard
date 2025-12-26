import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Search,
    Plus,
    FileSpreadsheet,
    FileText,
    RotateCcw,
    ChevronUp,
    Eye,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Settings,
    Download,
} from "lucide-react";

export default function Products() {
    // ইমেজের ডেটা অনুযায়ী স্যাম্পল অ্যারে
    const products = [
        {
            id: 1,
            sku: "PT001",
            name: "Lenovo IdeaPad 3",
            category: "Computers",
            brand: "Lenovo",
            price: "$600",
            unit: "Pc",
            qty: 100,
            createdBy: "James Kirwin",
            img: "https://i.pravatar.cc/150?u=1",
            pImg: "https://via.placeholder.com/40",
        },
        {
            id: 2,
            sku: "PT002",
            name: "Beats Pro",
            category: "Electronics",
            brand: "Beats",
            price: "$160",
            unit: "Pc",
            qty: 140,
            createdBy: "Francis Chang",
            img: "https://i.pravatar.cc/150?u=2",
            pImg: "https://via.placeholder.com/40",
        },
        {
            id: 3,
            sku: "PT003",
            name: "Nike Jordan",
            category: "Shoe",
            brand: "Nike",
            price: "$110",
            unit: "Pc",
            qty: 300,
            createdBy: "Antonio Engle",
            img: "https://i.pravatar.cc/150?u=3",
            pImg: "https://via.placeholder.com/40",
        },
        {
            id: 4,
            sku: "PT004",
            name: "Apple Series 5 Watch",
            category: "Electronics",
            brand: "Apple",
            price: "$120",
            unit: "Pc",
            qty: 450,
            createdBy: "Leo Kelly",
            img: "https://i.pravatar.cc/150?u=4",
            pImg: "https://via.placeholder.com/40",
        },
        {
            id: 5,
            sku: "PT005",
            name: "Amazon Echo Dot",
            category: "Electronics",
            brand: "Amazon",
            price: "$80",
            unit: "Pc",
            qty: 320,
            createdBy: "Annette Walker",
            img: "https://i.pravatar.cc/150?u=5",
            pImg: "https://via.placeholder.com/40",
        },
        {
            id: 6,
            sku: "PT006",
            name: "Sanford Chair Sofa",
            category: "Furnitures",
            brand: "Modern Wave",
            price: "$320",
            unit: "Pc",
            qty: 650,
            createdBy: "John Weaver",
            img: "https://i.pravatar.cc/150?u=6",
            pImg: "https://via.placeholder.com/40",
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Product List" />

            <div className="p-6 bg-[#F8F9FB] min-h-screen relative font-sans">
                {/* Floating Orange Settings Button */}
                <div className="fixed right-0 top-60 bg-[#FF9F43] p-2.5 rounded-l-lg shadow-lg cursor-pointer z-50">
                    <Settings
                        className="text-white"
                        size={22}
                        strokeWidth={2.5}
                    />
                </div>

                {/* Top Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-[18px] font-bold text-[#212B36]">
                            Product List
                        </h1>
                        <p className="text-[13px] text-gray-500 font-medium">
                            Manage your products
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex bg-white border border-gray-200 rounded-md shadow-sm">
                            <button className="p-2 border-r border-gray-100 hover:bg-gray-50">
                                <FileText
                                    size={18}
                                    className="text-[#FF4D4F]"
                                />
                            </button>
                            <button className="p-2 border-r border-gray-100 hover:bg-gray-50">
                                <FileSpreadsheet
                                    size={18}
                                    className="text-[#28C76F]"
                                />
                            </button>
                            <button className="p-2 border-r border-gray-100 hover:bg-gray-50">
                                <RotateCcw
                                    size={18}
                                    className="text-gray-500"
                                />
                            </button>
                            <button className="p-2 hover:bg-gray-50">
                                <ChevronUp
                                    size={18}
                                    className="text-gray-500"
                                />
                            </button>
                        </div>
                        <Link
                            href="/products/create"
                            className="flex items-center gap-2 bg-[#FF9F43] text-white px-4 py-2 rounded-md hover:bg-[#e68a30] transition font-bold text-[13px] shadow-sm"
                        >
                            <Plus size={18} strokeWidth={3} /> Add Product
                        </Link>
                        <button className="flex items-center gap-2 bg-[#1B2838] text-white px-4 py-2 rounded-md hover:bg-[#2c3e50] transition font-bold text-[13px] shadow-sm">
                            <Download size={18} strokeWidth={2.5} /> Import
                            Product
                        </button>
                    </div>
                </div>

                {/* Table White Card */}
                <div className="bg-white rounded-lg  overflow-hidden border border-gray-100">
                    {/* Filter & Search Bar */}
                    <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="relative w-full max-w-[250px]">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={16}
                            />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-[14px] focus:border-[#FF9F43] focus:ring-0 outline-none placeholder:text-gray-400"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select className="border border-gray-200 rounded-md px-4 py-2 text-[13px] text-gray-600 bg-white min-w-[120px]">
                                <option>Category</option>
                            </select>
                            <select className="border border-gray-200 rounded-md px-4 py-2 text-[13px] text-gray-600 bg-white min-w-[100px]">
                                <option>Brand</option>
                            </select>
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto px-4 pb-4">
                        <table className="w-full text-left">
                            <thead className="bg-[#FFFFFF] border-b border-gray-100">
                                <tr className="bg-[#F9FAFB] text-[#212B36] text-[14px] font-bold">
                                    <th className="py-4 px-3 w-10">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-[#FF9F43] focus:ring-[#FF9F43]"
                                        />
                                    </th>
                                    <th className="py-4 px-3">SKU</th>
                                    <th className="py-4 px-3">Product Name</th>
                                    <th className="py-4 px-3">Category</th>
                                    <th className="py-4 px-3">Brand</th>
                                    <th className="py-4 px-3">Price</th>
                                    <th className="py-4 px-3">Unit</th>
                                    <th className="py-4 px-3">Qty</th>
                                    <th className="py-4 px-3">Created By</th>
                                    <th className="py-4 px-3 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-[13px] text-gray-600 font-medium">
                                {products.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                                    >
                                        <td className="py-4 px-3">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-[#FF9F43] focus:ring-[#FF9F43]"
                                            />
                                        </td>
                                        <td className="py-4 px-3">
                                            {item.sku}
                                        </td>
                                        <td className="py-4 px-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-50 rounded-md border border-gray-100 flex items-center justify-center overflow-hidden">
                                                    <img
                                                        src={item.pImg}
                                                        alt="product"
                                                        className="object-cover w-full h-full opacity-60"
                                                    />
                                                </div>
                                                <span className="text-[#212B36] font-semibold">
                                                    {item.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-3">
                                            {item.category}
                                        </td>
                                        <td className="py-4 px-3">
                                            {item.brand}
                                        </td>
                                        <td className="py-4 px-3 text-[#212B36] font-bold">
                                            {item.price}
                                        </td>
                                        <td className="py-4 px-3">
                                            {item.unit}
                                        </td>
                                        <td className="py-4 px-3">
                                            {item.qty}
                                        </td>
                                        <td className="py-4 px-3">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={item.img}
                                                    className="w-7 h-7 rounded-full object-cover"
                                                    alt="user"
                                                />
                                                <span className="text-gray-700 whitespace-nowrap">
                                                    {item.createdBy}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-3">
                                            <div className="flex justify-center items-center gap-2">
                                                <button className="p-1.5 text-gray-500 bg-[#F8F9FA] rounded hover:text-blue-500 border border-transparent hover:border-blue-100">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="p-1.5 text-gray-500 bg-[#F8F9FA] rounded hover:text-green-500 border border-transparent hover:border-green-100">
                                                    <Edit size={16} />
                                                </button>
                                                <button className="p-1.5 text-gray-500 bg-[#F8F9FA] rounded hover:text-red-500 border border-transparent hover:border-red-100">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Bottom */}
                    <div className="p-5 flex flex-col md:flex-row justify-between items-center border-t border-gray-100 gap-4">
                        <div className="text-[13px] text-gray-500">
                            Row Per Page
                            <select className="mx-2 border border-gray-200 rounded px-2 py-1 outline-none text-[12px]">
                                <option>10</option>
                            </select>
                            Entries
                        </div>
                        <div className="flex items-center gap-1.5">
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                                <ChevronLeft size={18} />
                            </button>
                            <button className="w-7 h-7 flex items-center justify-center bg-[#FF9F43] text-white rounded-md text-[12px] font-bold">
                                1
                            </button>
                            <button className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-md text-[12px]">
                                2
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
