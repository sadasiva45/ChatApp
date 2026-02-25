"use client";

import React from "react";
import { useChat } from "../../context/ChatContext";
import { currentUser } from "../../data/mockData";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { Phone, Video, MoreVertical, ArrowLeft } from "lucide-react";

export function ChatArea() {
    const { conversations, selectedConversationId, setSelectedConversationId } = useChat();

    const activeConversation = conversations.find((c) => c.id === selectedConversationId);
    const otherParticipant = activeConversation?.participants.find((p) => p.id !== currentUser.id);

    if (!activeConversation || !otherParticipant) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 hidden md:flex">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Select a chat to start messaging</h2>
                    <p className="text-gray-500 mt-2">Choose from your existing conversations or start a new one.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-950 h-full w-full relative">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSelectedConversationId(null)}
                        className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="relative">
                        <img src={otherParticipant.avatar} alt={otherParticipant.name} className="w-10 h-10 rounded-full object-cover" />
                        {otherParticipant.isOnline && (
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
                        )}
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900 dark:text-white leading-tight">
                            {otherParticipant.name}
                        </h2>
                        <p className="text-xs text-green-500">
                            {otherParticipant.isOnline ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors hidden sm:block">
                        <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors hidden sm:block">
                        <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Message List */}
            <MessageList conversationId={activeConversation.id} />

            {/* Input Area */}
            <MessageInput conversationId={activeConversation.id} />
        </div>
    );
}
