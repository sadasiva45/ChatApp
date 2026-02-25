"use client";

import React, { createContext, useContext, useState } from "react";
import { Message, Conversation } from "../types/chat";
import { mockConversations, mockMessages, currentUser } from "../data/mockData";

type ChatContextType = {
    conversations: Conversation[];
    selectedConversationId: string | null;
    setSelectedConversationId: (id: string | null) => void;
    messages: Record<string, Message[]>;
    sendMessage: (conversationId: string, message: Omit<Message, "id" | "conversationId" | "senderId" | "timestamp" | "isRead">) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
    const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const sendMessage = (conversationId: string, newMessageParams: Omit<Message, "id" | "conversationId" | "senderId" | "timestamp" | "isRead">) => {
        const newMessage: Message = {
            ...newMessageParams,
            conversationId: conversationId,
            id: Math.random().toString(36).substr(2, 9),
            senderId: currentUser.id,
            timestamp: new Date().toISOString(),
            isRead: true,
        };

        setMessages((prev) => ({
            ...prev,
            [conversationId]: [...(prev[conversationId] || []), newMessage],
        }));

        setConversations((prev) =>
            prev.map((c) => {
                if (c.id === conversationId) {
                    return { ...c, lastMessage: newMessage };
                }
                return c;
            }).sort((a, b) => {
                const timeA = a.lastMessage?.timestamp || "0";
                const timeB = b.lastMessage?.timestamp || "0";
                return new Date(timeB).getTime() - new Date(timeA).getTime();
            })
        );
    };

    return (
        <ChatContext.Provider
            value={{
                conversations,
                selectedConversationId,
                setSelectedConversationId,
                messages,
                sendMessage,
                searchQuery,
                setSearchQuery,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
