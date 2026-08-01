"use client";

import { Package, Truck, CheckCircle2, Clock, MapPin, ExternalLink, ShieldCheck } from "lucide-react";

export interface TrackingTimelineEvent {
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

export interface OrderWidgetProps {
  orderNumber: string;
  status: string;
  courierName: string;
  trackingNumber: string;
  estimatedDelivery: string;
  shippingAddress: string;
  timeline: TrackingTimelineEvent[];
}

export function OrderTimelineWidget({ data }: { data: OrderWidgetProps }) {
  return (
    <div className="my-3 overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900/90 shadow-lg backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-emerald-400" />
          <span className="font-semibold text-xs text-slate-200">Order #{data.orderNumber}</span>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
          {data.status}
        </span>
      </div>

      {/* Logistics Details */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg bg-slate-950/50 p-2.5 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Courier Partner</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Truck className="h-3.5 w-3.5 text-cyan-400" />
              <span className="font-medium text-slate-200">{data.courierName} ({data.trackingNumber})</span>
            </div>
          </div>
          <div className="rounded-lg bg-slate-950/50 p-2.5 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Expected Delivery</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              <span className="font-medium text-slate-200">{data.estimatedDelivery}</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="pt-2">
          <h5 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Tracking History</h5>
          <div className="relative pl-4 space-y-3 border-l-2 border-slate-800">
            {data.timeline?.map((event, idx) => (
              <div key={idx} className="relative">
                <div className={`absolute -left-[21px] top-0.5 h-2.5 w-2.5 rounded-full ${idx === data.timeline.length - 1 ? 'bg-emerald-400 ring-4 ring-emerald-500/20' : 'bg-slate-700'}`} />
                <div className="flex justify-between items-start text-xs">
                  <span className="font-medium text-slate-200">{event.status}</span>
                  <span className="text-[10px] text-slate-400">{event.timestamp}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{event.description}</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                  <MapPin className="h-3 w-3 text-slate-400" />
                  <span>{event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
