"use client";

import Image from "next/image";
import { Star, ShoppingBag, CheckCircle } from "lucide-react";

export interface ProductRecItem {
  rank: number;
  name: string;
  priceInINR: number;
  rating: number;
  brand: string;
  image: string;
  whyRecommended: string;
}

export function ProductRecommendationWidget({ items }: { items: ProductRecItem[] }) {
  return (
    <div className="my-3 space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
        <ShoppingBag className="h-4 w-4" />
        Recommended Products
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 rounded-xl border border-slate-700/60 bg-slate-900/80 p-3 hover:border-emerald-500/40 transition-colors"
          >
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-slate-950 border border-slate-800">
              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 truncate">
                <span className="truncate">{item.name}</span>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-emerald-400 text-sm">₹{item.priceInINR.toLocaleString("en-IN")}</span>
                <span className="flex items-center gap-0.5 text-[11px] text-amber-400 font-medium bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                  <Star className="h-3 w-3 fill-amber-400" />
                  {item.rating}
                </span>
                <span className="text-[10px] text-slate-400">{item.brand}</span>
              </div>

              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 italic">
                💡 {item.whyRecommended}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
