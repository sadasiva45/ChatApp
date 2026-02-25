"use client";

import React from "react";
import { useChat } from "../../context/ChatContext";
import { currentUser } from "../../data/mockData";
import { Search, Sun, Moon } from "lucide-react";
import { cn } from "../../lib/utils";
import { FormattedDate } from "../FormattedDate";
import { useTheme } from "next-themes";

export function Sidebar() {
    const { conversations, selectedConversationId, setSelectedConversationId, searchQuery, setSearchQuery } = useChat();
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const filteredConversations = conversations.filter((conv) => {
        const otherParticipant = conv.participants.find((p) => p.id !== currentUser.id);
        return otherParticipant?.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <aside className="w-full md:w-80 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Chats</h2>
                    <button
                        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title="Toggle Theme"
                    >
                        {mounted ? (
                            resolvedTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-gray-600" />
                        ) : (
                            <div className="w-5 h-5" /> // Placeholder to avoid mismatch
                        )}
                    </button>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conv) => {
                    const otherParticipant = conv.participants.find((p) => p.id !== currentUser.id);
                    if (!otherParticipant) return null;

                    const isSelected = selectedConversationId === conv.id;

                    return (
                        <button
                            key={conv.id}
                            onClick={() => setSelectedConversationId(conv.id)}
                            className={cn(
                                "w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800/50",
                                isSelected && "bg-blue-50 dark:bg-gray-800"
                            )}
                        >
                            <div className="relative flex-shrink-0">
                                <img
                                    src={otherParticipant.avatar}
                                    alt={otherParticipant.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                {otherParticipant.isOnline && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                        {otherParticipant.name}
                                    </h3>
                                    {conv.lastMessage && (
                                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                            <FormattedDate date={conv.lastMessage.timestamp} formatStr="HH:mm" />
                                        </span>
                                    )}
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate pr-2">
                                        {conv.lastMessage?.type === "audio"
                                            ? "🎤 Voice message"
                                            : conv.lastMessage?.type === "file"
                                                ? "📎 Attachment"
                                                : conv.lastMessage?.text || "Started a conversation"}
                                    </p>
                                    {conv.unreadCount > 0 && (
                                        <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                            {conv.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}
