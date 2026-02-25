export type User = {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
};

export type MessageType = "text" | "audio" | "file";

export type Message = {
    id: string;
    conversationId: string;
    senderId: string;
    text: string;
    timestamp: string;
    type: MessageType;
    fileUrl?: string;
    fileName?: string;
    fileSize?: string;
    isRead: boolean;
};

export type Conversation = {
    id: string;
    participants: User[];
    lastMessage?: Message;
    unreadCount: number;
};
