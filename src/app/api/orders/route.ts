import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";
import { initialOrders } from "@/lib/seedData";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    const conn = await connectDB();
    if (conn) {
      const filter = query
        ? {
            $or: [
              { orderNumber: new RegExp(query, "i") },
              { customerName: new RegExp(query, "i") },
              { customerEmail: new RegExp(query, "i") },
              { trackingNumber: new RegExp(query, "i") },
            ],
          }
        : {};

      const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();
      if (orders.length > 0) return NextResponse.json({ success: true, orders });
    }

    let list = initialOrders;
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q)
      );
    }
    return NextResponse.json({ success: true, orders: list });
  } catch (error: any) {
    return NextResponse.json({ success: true, orders: initialOrders });
  }
}
