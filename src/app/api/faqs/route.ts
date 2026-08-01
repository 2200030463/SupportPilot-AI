import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { FAQ } from "@/models/FAQ";
import { initialFAQs } from "@/lib/seedData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const conn = await connectDB();
    if (conn) {
      const faqs = await FAQ.find().lean();
      if (faqs.length > 0) return NextResponse.json({ success: true, faqs });
    }
    return NextResponse.json({ success: true, faqs: initialFAQs });
  } catch (error: any) {
    return NextResponse.json({ success: true, faqs: initialFAQs });
  }
}
