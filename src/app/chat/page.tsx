import { Navbar } from "@/components/Navbar";
import { ChatWidget } from "@/components/ChatWidget";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950">
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <ChatWidget />
      </main>
    </div>
  );
}
