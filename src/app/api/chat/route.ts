import { NextResponse } from "next/server";
import { processAgentConversation } from "@/lib/agent/orchestrator";
import { connectDB } from "@/lib/db";
import { Conversation } from "@/models/Conversation";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { conversationId, messages, customerEmail } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    // Process messages with Agent Orchestrator
    const agentResult = await processAgentConversation(messages);

    // Save or update conversation if database is connected
    const conn = await connectDB();
    if (conn && conversationId) {
      const updatedMessages = [
        ...messages,
        {
          id: `msg-${Date.now()}`,
          sender: "assistant",
          content: agentResult.reply,
          timestamp: new Date().toISOString(),
          toolCalls: agentResult.toolsExecuted,
        },
      ];

      await Conversation.findOneAndUpdate(
        { conversationId },
        {
          customerEmail: customerEmail || "aarav.sharma@gmail.com",
          messages: updatedMessages,
          sentiment: agentResult.sentiment,
          languageDetected: agentResult.languageDetected,
          isEscalated: agentResult.isEscalated,
          ticketCode: agentResult.ticketCode,
          $addToSet: { toolsUsed: { $each: agentResult.toolsExecuted.map((t) => t.toolName) } },
        },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({
      success: true,
      reply: agentResult.reply,
      sentiment: agentResult.sentiment,
      languageDetected: agentResult.languageDetected,
      toolsExecuted: agentResult.toolsExecuted,
      isEscalated: agentResult.isEscalated,
      ticketCode: agentResult.ticketCode,
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Failed to process chat message", details: error.message }, { status: 500 });
  }
}
