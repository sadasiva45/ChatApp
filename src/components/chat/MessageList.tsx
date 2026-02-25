"use client";

import React, { useEffect, useRef } from "react";
import { useChat } from "../../context/ChatContext";
import { currentUser } from "../../data/mockData";
import { cn } from "../../lib/utils";
import { FileText, Play } from "lucide-react";
import { FormattedDate } from "../FormattedDate";

export function MessageList({ conversationId }: { conversationId: string }) {
    const { messages } = useChat();
    const conversationMessages = messages[conversationId] || [];
    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversationMessages]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50 dark:bg-gray-950">
            {conversationMessages.map((msg, index) => {
                const isMe = msg.senderId === currentUser.id;
                const showTime = index === 0 || new Date(msg.timestamp).getTime() - new Date(conversationMessages[index - 1].timestamp).getTime() > 300000; // 5 min

                return (
                    <div key={msg.id} className={cn("flex flex-col", isMe ? "items-end" : "items-start")}>
                        {showTime && (
                            <div className="text-xs text-gray-400 my-2 text-center w-full">
                                <FormattedDate date={msg.timestamp} formatStr="MMM d, h:mm a" />
                            </div>
                        )}
                        <div className={cn(
                            "max-w-[75%] sm:max-w-[60%] rounded-2xl px-4 py-2 shadow-sm",
                            isMe ? "bg-blue-600 text-white rounded-br-none" : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none border border-gray-100 dark:border-gray-700"
                        )}>
                            {msg.type === "text" && (
                                <p className="text-[15px] leading-relaxed break-words">{msg.text}</p>
                            )}
                            {msg.type === "file" && (
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2 rounded-lg", isMe ? "bg-blue-700" : "bg-gray-100 dark:bg-gray-700")}>
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <a href={msg.fileUrl} download className="font-medium underline-offset-2 hover:underline line-clamp-1">{msg.fileName}</a>
                                        <p className={cn("text-xs mt-0.5", isMe ? "text-blue-200" : "text-gray-500")}>{msg.fileSize}</p>
                                    </div>
                                </div>
                            )}
                            {msg.type === "audio" && (
                                <div className="flex items-center gap-2">
                                    <button className={cn("p-2 rounded-full", isMe ? "bg-blue-700 hover:bg-blue-800" : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600")}>
                                        <Play className="w-4 h-4" />
                                    </button>
                                    <div className="flex-1">
                                        <div className={cn("h-1 w-24 sm:w-32 rounded-full", isMe ? "bg-blue-400" : "bg-gray-300 dark:bg-gray-600")}>
                                            <div className={cn("h-full w-1/3 rounded-full", isMe ? "bg-white" : "bg-blue-500")} />
                                        </div>
                                    </div>
                                    <span className="text-xs">0:12</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                            <span className="text-[10px] text-gray-400">
                                <FormattedDate date={msg.timestamp} formatStr="h:mm a" />
                            </span>
                            {isMe && (
                                <span className={cn("text-[10px]", msg.isRead ? "text-blue-500" : "text-gray-400")}>✓✓</span>
                            )}
                        </div>
                    </div>
                );
            })}
            <div ref={endOfMessagesRef} />
        </div>
    );
}
