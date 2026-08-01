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

    const lastMsg = messages[messages.length - 1];
    const userQuery = typeof lastMsg === "string" ? lastMsg : lastMsg?.content || lastMsg?.text || "Hello";

    // Process messages with Agent Orchestrator
    const agentResult = await processAgentConversation(userQuery, messages);

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
          toolCalls: agentResult.toolResults,
        },
      ];

      await Conversation.findOneAndUpdate(
        { conversationId },
        {
          conversationId,
          customerEmail: customerEmail || "guest@supportpilot.ai",
          messages: updatedMessages,
          lastUpdated: new Date(),
          sentimentScore: agentResult.sentiment === "Frustrated" ? -0.9 : 0.5,
        },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({
      success: true,
      reply: agentResult.reply,
      reasoningSteps: agentResult.reasoningSteps,
      toolResults: agentResult.toolResults,
      language: agentResult.language,
      sentiment: agentResult.sentiment,
    });
  } catch (error: any) {
    console.error("API /api/chat error:", error);
    return NextResponse.json(
      {
        error: "Internal Agent Server Error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
