import { axiosClient } from './httpClient';

const chatService = {
    getChatByUserId: async (userId: string) => {
        const res = await axiosClient.get(`/chat/user/${userId}`);
        return res.data;
    },

    getChatInfoByUserId: async (userId: string) => {
        const res = await axiosClient.get(`/chat/user-room-info/${userId}`);
        return res.data;
    },

    getChatById: async (id: string) => {
        const res = await axiosClient.get(`/chat/${id}`);
        return res.data;
    },
    createRoom: async (listUserId: string[]) => {
        const res = await axiosClient.post(`/chat`, {
            listUserId,
        });
        return res.data;
    },

    getChatByRoomId: async (roomId: string) => {
        const res = await axiosClient.get(`/chat/room/${roomId}`);
        return res.data;
    },

    getRoomInfo: async (roomId: string) => {
        const res = await axiosClient.get(`/chat/room-info/${roomId}`);
        return res.data;
    },
};

export default chatService;
