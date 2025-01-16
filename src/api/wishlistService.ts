import { axiosClient } from './httpClient';

const wishlistService = {
    toggleItem: async (data: any) => {
        const res = await axiosClient.post(`/wish-list`, data);
        return res.data;
    },
    getLsIdByUserId: async (userId: string) => {
        try {
            const res = await axiosClient.get(`/wish-list/user/${userId}?show_id=true`);
            return res.data[0].products;
        } catch (error) {
            console.log(error);
            return [];
        }
    },

    getLsByUserId: async (userId: string) => {
        const res = await axiosClient.get(`/wish-list/user/${userId}`);
        return res.data[0].products;
    },
};

export default wishlistService;
