"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Search,
    CheckCircle,
    XCircle,
    Mail,
} from "lucide-react";
import {
    aplication_status,
    approvedRestaurantList,
} from "../../../../redux-toolkit/slice/restaurantSlice";

function initials(name) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function StatusBadge({ status }) {
    const styles = {
        approved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
        rejected: "bg-rose-50 text-rose-700 ring-rose-600/20",
        pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
    };
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles[status]}`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${status === "approved"
                    ? "bg-emerald-500"
                    : status === "rejected"
                        ? "bg-rose-500"
                        : "bg-amber-500"
                    }`}
            />
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

export default function RestaurantPage() {
    const dispatch = useDispatch();
    const { approvedRestaurantlist: data, loading } = useSelector((state) => state.restaurant);

    const [query, setQuery] = useState("");


    useEffect(() => {
        dispatch(approvedRestaurantList())
    }, [])


    const handleReject = (id) => {
        dispatch(
            aplication_status({
                id,
                status: "rejected",
            })
        );
    };


    const filtered = data.filter(
        (r) =>
            r.restaurantName.toLowerCase().includes(query.toLowerCase()) ||
            r.ownerName.toLowerCase().includes(query.toLowerCase())
    );

    const pendingCount = data.filter((d) => d.status === "pending").length;
    const approvedCount = data.filter((d) => d.status === "approved").length;

    console.log(data, "data")

    return (
        <div className="flex min-h-screen bg-[#F7F7F5] text-[#282C3F]">
            <div className="flex-1 md:ml-64">
                <header className="sticky top-0 z-10 flex items-center justify-between border-b border-black/5 bg-white/90 px-8 py-4 backdrop-blur">
                    <div>
                        <h1 className="text-xl font-semibold">Restaurant applications</h1>
                        <p className="text-sm text-gray-400">Review and manage restaurant partner requests</p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#282C3F] text-xs font-semibold text-white">
                        AD
                    </div>
                </header>

                <main className="px-8 py-6">
                    <div className="mb-6 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border border-black/5 bg-white p-5">
                            <p className="text-sm text-gray-400">Total applications</p>
                            <p className="mt-2 text-3xl font-semibold">{data.length}</p>
                        </div>
                        <div className="rounded-xl border border-black/5 bg-white p-5">
                            <p className="text-sm text-gray-400">Approved</p>
                            <p className="mt-2 text-3xl font-semibold text-emerald-600">{approvedCount}</p>
                        </div>
                        <div className="rounded-xl border border-black/5 bg-white p-5">
                            <p className="text-sm text-gray-400">Pending review</p>
                            <p className="mt-2 text-3xl font-semibold text-[#FC8019]">{pendingCount}</p>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-black/5 bg-white">
                        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
                            <p className="text-sm font-semibold text-gray-700">All applications</p>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search restaurant or owner"
                                    className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#FC8019] focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-black/5 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        <th className="px-5 py-3">Restaurant</th>
                                        <th className="px-5 py-3">Owner</th>
                                        <th className="px-5 py-3">Email</th>
                                        <th className="px-5 py-3">Status</th>
                                        <th className="px-5 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading && (
                                        <tr>
                                            <td colSpan={5} className="px-5 py-10 text-center text-sm text-gray-400">
                                                Loading...
                                            </td>
                                        </tr>
                                    )}

                                    {!loading && filtered.map((restaurant) => (
                                        <tr
                                            key={restaurant._id}
                                            className="border-b border-black/5 last:border-0 hover:bg-gray-50/60"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-xs font-semibold text-[#FC8019]">
                                                        {initials(restaurant.restaurantName)}
                                                    </div>
                                                    <span className="font-medium">{restaurant.restaurantName}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-gray-600">{restaurant.ownerName}</td>
                                            <td className="px-5 py-4 text-gray-500">
                                                <span className="flex items-center gap-1.5">
                                                    <Mail className="h-3.5 w-3.5 text-gray-300" />
                                                    {restaurant.email}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <StatusBadge status={restaurant.status} />
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        disabled={restaurant.status === "approved"}
                                                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                                                    >
                                                        <CheckCircle className="h-3.5 w-3.5" />
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(restaurant._id)}
                                                        disabled={restaurant.status === "rejected"}
                                                        className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
                                                    >
                                                        <XCircle className="h-3.5 w-3.5" />
                                                        Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {!loading && filtered.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-5 py-10 text-center text-sm text-gray-400">
                                                No restaurants match your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}