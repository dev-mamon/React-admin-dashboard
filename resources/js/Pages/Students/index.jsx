import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";

export default function Students() {
    const students = [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            class: "10-A",
            status: "Active",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            class: "10-B",
            status: "Active",
        },
        {
            id: 3,
            name: "Michael Johnson",
            email: "michael@example.com",
            class: "09-C",
            status: "On Leave",
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Students Management" />
            <div className="max-w-7xl mx-auto">
                <div className=" mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <Sidebar />
                    <div className="lg:col-span-12">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex flex-col sm:row items-center justify-between gap-4">
                                <h2 className="text-xl font-bold text-slate-800">
                                    Students Directory
                                </h2>
                                <div className="relative w-full sm:w-64">
                                    <input
                                        type="text"
                                        placeholder="Search students..."
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-all"
                                    />
                                    <svg
                                        className="w-4 h-4 absolute left-3 top-3 text-slate-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                Student Name
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                Class
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {students.map((student) => (
                                            <tr
                                                key={student.id}
                                                className="hover:bg-slate-50/80 transition-colors group"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                                                            {student.name.charAt(
                                                                0
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-800">
                                                                {student.name}
                                                            </p>
                                                            <p className="text-xs text-slate-500 font-medium">
                                                                {student.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                                                        {student.class}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                            student.status ===
                                                            "Active"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-amber-100 text-amber-700"
                                                        }`}
                                                    >
                                                        {student.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-slate-400 hover:text-indigo-600 font-bold text-sm transition-colors">
                                                        View Profile
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Placeholder */}
                            <div className="p-6 bg-slate-50/30 border-t border-slate-100 flex justify-between items-center">
                                <p className="text-xs font-bold text-slate-400">
                                    Showing 3 of 1,240 students
                                </p>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 disabled:opacity-50">
                                        Prev
                                    </button>
                                    <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
