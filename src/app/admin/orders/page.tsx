"use client";

import { useState, useEffect } from "react";
import { Package, Search, Truck, MapPin, CheckCircle2, Clock, ExternalLink } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/orders${searchQuery ? `?query=${encodeURIComponent(searchQuery)}` : ""}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrders(data.orders);
      })
      .finally(() => setLoading(false));
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">Orders & Logistics Manager</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time fulfillment tracking across Delhivery, BlueDart, Xpressbees, and Ecom Express
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search Order # (ORD-8921), email, customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-slate-900 pl-10 pr-4 py-2 text-xs text-slate-200 border border-slate-800 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Order Details</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Logistics Courier</th>
                <th className="py-3.5 px-4">Total (₹)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Est. Delivery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {orders.map((order) => (
                <tr key={order.orderNumber} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-emerald-400 block">{order.orderNumber}</span>
                    <span className="text-[10px] text-slate-400">{order.items?.[0]?.productName}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-200 block">{order.customerName}</span>
                    <span className="text-[10px] text-slate-400">{order.customerEmail}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-medium text-slate-200">
                      <Truck className="h-3.5 w-3.5 text-cyan-400" />
                      <span>{order.courierName}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">AWB: {order.trackingNumber}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-100 block">₹{order.totalAmountInINR?.toLocaleString("en-IN")}</span>
                    <span className="text-[10px] text-emerald-400">{order.paymentMethod}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold inline-block ${
                        order.status === "Delivered"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : order.status === "In Transit"
                          ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                          : order.status === "Returned"
                          ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300 font-medium">
                    {order.estimatedDelivery}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
