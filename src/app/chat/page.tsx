import { ChatWidget } from "@/components/ChatWidget";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-slate-950">
      <main className="flex-1 overflow-hidden">
        <ChatWidget />
      </main>
    </div>
  );
}
