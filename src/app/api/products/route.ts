import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { initialProducts } from "@/lib/seedData";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const query = searchParams.get("query");

    const conn = await connectDB();
    if (conn) {
      const filter: any = {};
      if (category && category !== "All") filter.category = category;
      if (query) filter.name = new RegExp(query, "i");

      const products = await Product.find(filter).lean();
      if (products.length > 0) return NextResponse.json({ success: true, products });
    }

    let list = initialProducts;
    if (category && category !== "All") {
      list = list.filter((p) => p.category === category);
    }
    if (query) {
      list = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    }
    return NextResponse.json({ success: true, products: list });
  } catch (error: any) {
    return NextResponse.json({ success: true, products: initialProducts });
  }
}
