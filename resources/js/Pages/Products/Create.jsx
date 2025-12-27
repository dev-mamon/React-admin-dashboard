import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import {
    ChevronLeft,
    Settings,
    Save,
    XCircle,
    UploadCloud,
} from "lucide-react";

export default function Create() {
    // Inertia.js form using inertia.js
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            name: "",
            price: "",
            quantity: "",
            description: "",
            image: null,
            status: "active",
            featured: false,
        });

    const handleInputChange = (key, value) => {
        setData(key, value);
        if (errors[key]) {
            clearErrors(key);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("products.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add New Product" />

            <div className="p-6 bg-[#F8F9FB] min-h-screen font-sans">
                {/* Top Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-[20px] font-bold text-[#212B36]">
                            Add Product
                        </h1>
                        <p className="text-[13px] text-gray-500 font-medium">
                            Create new product for your inventory
                        </p>
                    </div>
                    <Link
                        href={route("products.index")}
                        className="flex items-center gap-2 bg-[#1B2838] text-white px-4 py-2 rounded-md hover:bg-[#2c3e50] transition font-bold text-[13px] shadow-sm"
                    >
                        <ChevronLeft size={19} /> Back to List
                    </Link>
                </div>

                {/* Form Section */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 md:p-6 mx-auto"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column: Basic Information */}
                        <div className="space-y-5">
                            <div>
                                <label className="text-[14px] font-bold text-[#212B36] mb-1.5 block">
                                    Product Name
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Enter product name"
                                    value={data.name}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    className={
                                        errors.name
                                            ? "border-red-500"
                                            : "border-gray-200"
                                    }
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm font-medium text-[12px] mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[14px] font-bold text-[#212B36] mb-1.5 block">
                                        Price ($)
                                    </label>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        value={data.price}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "price",
                                                e.target.value
                                            )
                                        }
                                        className={
                                            errors.price
                                                ? "border-red-500"
                                                : "border-gray-200"
                                        }
                                    />
                                    {errors.price && (
                                        <p className="text-red-500 text-sm font-medium text-[12px] mt-1">
                                            {errors.price}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-[14px] font-bold text-[#212B36] mb-1.5 block">
                                        Quantity
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        value={data.quantity}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "quantity",
                                                e.target.value
                                            )
                                        }
                                        className={
                                            errors.quantity
                                                ? "border-red-500"
                                                : "border-gray-200"
                                        }
                                    />
                                    {errors.quantity && (
                                        <p className="text-red-500 text-sm font-medium text-[12px] mt-1">
                                            {errors.quantity}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="text-[14px] font-bold text-[#212B36] mb-1.5 block">
                                    Description
                                </label>
                                <textarea
                                    className={`w-full border rounded-md p-3 text-[14px] focus:border-[#FF9F43] focus:ring-0 outline-none min-h-[150px] transition ${
                                        errors.description
                                            ? "border-red-500"
                                            : "border-gray-200"
                                    }`}
                                    placeholder="Enter product details..."
                                    value={data.description}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "description",
                                            e.target.value
                                        )
                                    }
                                ></textarea>
                                {errors.description && (
                                    <p className="text-red-500 text-sm font-medium text-[12px] mt-1">
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Media & Settings */}
                        <div className="space-y-6">
                            <div>
                                <label className="text-[14px] font-bold text-[#212B36] mb-1.5 block">
                                    Product Image
                                </label>
                                <div
                                    className={`border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer relative group ${
                                        errors.image
                                            ? "border-red-500"
                                            : "border-gray-200"
                                    }`}
                                >
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => {
                                            setData("image", e.target.files[0]);
                                            clearErrors("image");
                                        }}
                                    />
                                    <div className="bg-orange-100 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                        <UploadCloud
                                            size={30}
                                            className="text-[#FF9F43]"
                                        />
                                    </div>
                                    <p className="text-[14px] font-bold text-[#212B36]">
                                        {data.image
                                            ? data.image.name
                                            : "Click to upload or drag and drop"}
                                    </p>
                                    <p className="text-[12px] text-gray-400 mt-1">
                                        PNG, JPG, WebP up to 2MB
                                    </p>
                                </div>
                                {errors.image && (
                                    <p className="text-red-500 text-sm font-medium text-[12px] mt-1">
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-4">
                                <div>
                                    <label className="text-[14px] font-bold text-[#212B36] mb-1.5 block">
                                        Status
                                    </label>
                                    <select
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-[14px] outline-none focus:border-[#FF9F43] bg-white"
                                        value={data.status}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "status",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">
                                            Inactive
                                        </option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-3 p-2">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        className="w-5 h-5 rounded border-gray-300 text-[#FF9F43] focus:ring-[#FF9F43] cursor-pointer"
                                        checked={data.featured}
                                        onChange={(e) =>
                                            setData(
                                                "featured",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <label
                                        htmlFor="featured"
                                        className="text-[14px] font-medium text-gray-700 cursor-pointer"
                                    >
                                        Mark as Featured Product
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 bg-[#FF9F43] text-white px-8 py-2.5 rounded-md hover:bg-[#e68a30] transition font-bold text-[14px] shadow-md disabled:opacity-50"
                        >
                            <Save size={18} strokeWidth={2.5} />
                            {processing ? "Saving..." : "Create Product"}
                        </button>
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="flex items-center gap-2 bg-[#1B2838] text-white px-8 py-2.5 rounded-md hover:bg-[#2c3e50] transition font-bold text-[14px] shadow-md"
                        >
                            <XCircle size={18} /> Cancel
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
