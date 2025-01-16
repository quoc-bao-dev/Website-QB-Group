import { io, Socket } from 'socket.io-client';
import { BASE_URL_SOCKET } from '../config/config';
import chatService from '../api/chatService';
import userReducer from './userReducer';
import signal from '../lib/listener';

interface Room {
    _id: string;
    participants: string[];
}
class chatReducer {
    listChat: Room[] = [];
    socket: Socket | null = null;

    get getListChat() {
        return this.listChat;
    }

    async setListChat() {
        const userId = userReducer.getData?.userId;
        const ls = await chatService.getChatByUserId(userId!);
        this.listChat = ls;
        signal.emit('list-chat-change');
    }
    async start() {
        /// get all ground chat of user
        /// define interface get all group chat
        await this.setListChat();

        this.socket = io(BASE_URL_SOCKET);

        this.socket.on('connect', () => {});

        // this.socket.on('roomJoined', (data) => {});
        this.socket.on('roomCreated', async (data) => {
            await this.setListChat();
            signal.emit('list-chat-change');
            signal.emit(`show-chat-${data._id}`);
        });
    }
    stop() {
        if (this.socket) {
            this.socket.close();
        }
    }

    private event: { [event: string]: Function } = {};
    registerEvent(event: string, fn: (...args: any[]) => void) {
        if (!this.event[event]) {
            this.socket?.on(event, fn);
        }
        this.event[event] = fn;
    }

    async getIdRoomChatWithUserId(userId: string) {
        const room = this.listChat.find((item) => {
            return (
                item.participants.includes(userId) &&
                item.participants.includes(userReducer.getData?.userId!) &&
                item.participants.length === 2
            );
        });
        if (room) return room._id;

        if (!room) {
            const lsUserId = [userId, userReducer.getData?.userId!];
            this.socket?.emit('createRoom', lsUserId);
        }
    }
}

export default new chatReducer();
