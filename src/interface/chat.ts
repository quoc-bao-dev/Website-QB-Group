import { IUser } from './user';

export interface Message {
    _id: string; // ID của tin nhắn, thường là ObjectId của MongoDB
    chatId: string; // ID của cuộc trò chuyện
    senderId: IUser; // ID của người gửi
    message: string; // Nội dung tin nhắn
    timestamp: string; // Thời gian gửi tin nhắn (ISO 8601 format)
    status: 'sent' | 'delivered' | 'read'; // Trạng thái của tin nhắn
    attachments: any[]; // Danh sách các tập tin đính kèm, có thể là các đối tượng hoặc dữ liệu liên quan
}

export interface Participant {
    // Thay thế các thuộc tính bên dưới bằng các thuộc tính thực tế của đối tượng participants
    _id: string;
    name: string;
    avatar: string;
    email: string;
    firstName: string;
    fullName: string;
    isActive: boolean;
    lastName: string;
    role: 'admin' | 'user';
    username: string;
}

export interface RoomChat {
    createdAt: string; // ISO date string
    isGroupChat: boolean;
    participants: Participant[] | string[];
    updatedAt: string; // ISO date string
    _id: string;
}
