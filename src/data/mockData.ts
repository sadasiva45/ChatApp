import { User, Conversation, Message } from "../types/chat";

export const currentUser: User = {
    id: "u1",
    name: "Current User",
    avatar: "https://i.pravatar.cc/150?u=u1",
    isOnline: true,
};

export const mockUsers: User[] = [
    { id: "u2", name: "Alice Smith", avatar: "https://i.pravatar.cc/150?u=u2", isOnline: true },
    { id: "u3", name: "Bob Johnson", avatar: "https://i.pravatar.cc/150?u=u3", isOnline: false },
    { id: "u4", name: "Charlie Davis", avatar: "https://i.pravatar.cc/150?u=u4", isOnline: true },
];

export const mockMessages: Record<string, Message[]> = {
    "c1": [
        {
            id: "m1",
            conversationId: "c1",
            senderId: "u2",
            text: "Hey! How are you doing today? 😊",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            type: "text",
            isRead: true,
        },
        {
            id: "m2",
            conversationId: "c1",
            senderId: "u1",
            text: "I'm doing well, just working on the chat application!",
            timestamp: new Date(Date.now() - 3500000).toISOString(),
            type: "text",
            isRead: true,
        }
    ],
    "c2": [
        {
            id: "m3",
            conversationId: "c2",
            senderId: "u3",
            text: "Here is the document we discussed.",
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            type: "file",
            fileName: "requirements.pdf",
            fileSize: "2.4 MB",
            fileUrl: "#",
            isRead: true,
        }
    ]
};

export const mockConversations: Conversation[] = [
    {
        id: "c1",
        participants: [currentUser, mockUsers[0]], // Alice
        lastMessage: mockMessages["c1"][mockMessages["c1"].length - 1],
        unreadCount: 0,
    },
    {
        id: "c2",
        participants: [currentUser, mockUsers[1]], // Bob
        lastMessage: mockMessages["c2"][mockMessages["c2"].length - 1],
        unreadCount: 0,
    },
    {
        id: "c3",
        participants: [currentUser, mockUsers[2]], // Charlie
        unreadCount: 2,
    }
];
