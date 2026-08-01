import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Ticket } from "@/models/Ticket";
import { initialTickets } from "@/lib/seedData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const conn = await connectDB();
    if (conn) {
      const tickets = await Ticket.find().sort({ createdAt: -1 }).lean();
      if (tickets.length > 0) {
        return NextResponse.json({ success: true, tickets });
      }
    }
    return NextResponse.json({ success: true, tickets: initialTickets });
  } catch (error: any) {
    return NextResponse.json({ success: true, tickets: initialTickets });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ticketCode, responseMessage, newStatus, assignedAgent } = body;

    const conn = await connectDB();
    if (conn && ticketCode) {
      const updateData: any = {};
      if (newStatus) updateData.status = newStatus;
      if (assignedAgent) updateData.assignedAgent = assignedAgent;

      if (responseMessage) {
        updateData.$push = {
          responses: {
            sender: "agent",
            senderName: assignedAgent || "Human Support Executive",
            message: responseMessage,
            timestamp: new Date().toISOString(),
          },
        };
      }

      const updated = await Ticket.findOneAndUpdate({ ticketCode }, updateData, { new: true });
      return NextResponse.json({ success: true, ticket: updated });
    }

    return NextResponse.json({ success: true, message: "Ticket updated in demo mode" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
