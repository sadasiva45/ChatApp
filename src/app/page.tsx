"use client";

import { Sidebar } from "../components/layout/Sidebar";
import { ChatArea } from "../components/chat/ChatArea";
import { useChat } from "../context/ChatContext";
import { cn } from "../lib/utils";

export default function Home() {
  const { selectedConversationId } = useChat();

  return (
    <main className="h-screen w-full bg-background flex overflow-hidden font-sans relative">
      <div className={cn(
        "w-full md:w-80 flex-shrink-0",
        selectedConversationId ? "hidden md:block" : "block"
      )}>
        <Sidebar />
      </div>

      <div className={cn(
        "flex-1 relative h-full",
        !selectedConversationId ? "hidden md:block" : "block"
      )}>
        <ChatArea />
      </div>
    </main>
  );
}
