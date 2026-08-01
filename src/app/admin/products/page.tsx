"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, Search, Star, Filter, CheckCircle2 } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`/api/products?category=${selectedCategory}&query=${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.products);
      });
  }, [selectedCategory, searchQuery]);

  const categories = ["All", "Electronics", "Footwear", "Fashion", "Home & Kitchen", "Beauty & Personal Care", "Fitness"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-100">Products Catalog RAG Base</h1>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
              Showing {products.length} products
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Seeded products with specs and return policies available to SupportPilot AI agent
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-slate-900 pl-10 pr-4 py-2 text-xs text-slate-200 border border-slate-800 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((p) => (
          <div key={p.sku} className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-emerald-500/30 transition-colors">
            <div className="space-y-2">
              <div className="relative h-40 w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                <span className="absolute top-2 right-2 rounded-md bg-slate-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-slate-800 backdrop-blur-md">
                  SKU: {p.sku}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">{p.category}</span>
                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
                  <Star className="h-3 w-3 fill-amber-400" />
                  <span>{p.rating}</span>
                </div>
              </div>

              <h4 className="font-semibold text-xs text-slate-100 line-clamp-2">{p.name}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{p.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="font-extrabold text-emerald-400 text-base">₹{p.priceInINR?.toLocaleString("en-IN")}</span>
                <span className="text-[10px] text-slate-500 line-through ml-1.5">₹{p.originalPriceInINR?.toLocaleString("en-IN")}</span>
              </div>
              <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                {p.returnPolicyDays}d Return Policy
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
