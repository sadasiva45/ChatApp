"use client";

import React, { useState, useRef, useEffect } from "react";
import { Smile, Paperclip, Mic, Send, Square } from "lucide-react";
import { useChat } from "../../context/ChatContext";
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useTheme } from "next-themes";
import { cn } from "../../lib/utils";

export function MessageInput({ conversationId }: { conversationId: string }) {
    const { sendMessage } = useChat();
    const [text, setText] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const { resolvedTheme } = useTheme();

    // Voice Recording state
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    // File Upload state
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSendText = () => {
        if (text.trim()) {
            sendMessage(conversationId, { text: text.trim(), type: "text" });
            setText("");
            setShowEmoji(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendText();
        }
    };

    const handleEmojiSelect = (emojiData: { emoji: string }) => {
        setText((prev) => prev + emojiData.emoji);
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
                const url = URL.createObjectURL(audioBlob);

                sendMessage(conversationId, {
                    type: "audio",
                    text: "",
                    fileUrl: url,
                });

                // Stop all tracks
                stream.getTracks().forEach((track) => track.stop());
                setRecordingTime(0);
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);

            timerRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);
        } catch (err) {
            console.error("Microphone access denied:", err);
            alert("Microphone access denied.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const sizeStr = (file.size / 1024 / 1024).toFixed(2) + " MB";
            sendMessage(conversationId, {
                type: "file",
                text: "",
                fileName: file.name,
                fileSize: sizeStr,
                fileUrl: url,
            });
            // Reset input
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    return (
        <div className="p-3 sm:p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="relative flex items-end gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-2xl">

                {/* Attachment */}
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 sm:p-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                    <Paperclip className="w-5 h-5" />
                </button>
                <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                {showEmoji && (
                    <div className="absolute bottom-16 left-0 z-50 shadow-2xl rounded-lg overflow-hidden">
                        <EmojiPicker
                            onEmojiClick={handleEmojiSelect}
                            theme={resolvedTheme === 'dark' ? Theme.DARK : Theme.LIGHT}
                        />
                    </div>
                )}

                {isRecording ? (
                    <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-500 animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="font-medium text-sm">Recording: {formatTime(recordingTime)}</span>
                    </div>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent border-none outline-none py-2 px-1 text-gray-900 dark:text-gray-100 text-sm sm:text-base placeholder-gray-400"
                        />
                        {/* Emoji Trigger */}
                        <button
                            onClick={() => setShowEmoji((prev) => !prev)}
                            className={cn("p-2 sm:p-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition", showEmoji && "text-blue-500")}
                        >
                            <Smile className="w-5 h-5" />
                        </button>
                    </>
                )}

                {text.trim() ? (
                    <button
                        onClick={handleSendText}
                        className="p-2 sm:p-3 bg-blue-600 text-white rounded-xl sm:rounded-full hover:bg-blue-700 transition shadow-sm"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                ) : isRecording ? (
                    <button
                        onClick={stopRecording}
                        className="p-2 sm:p-3 bg-red-500 text-white rounded-xl sm:rounded-full hover:bg-red-600 transition shadow-sm"
                    >
                        <Square className="w-5 h-5 fill-current" />
                    </button>
                ) : (
                    <button
                        onClick={startRecording}
                        className="p-2 sm:p-3 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition"
                    >
                        <Mic className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}
