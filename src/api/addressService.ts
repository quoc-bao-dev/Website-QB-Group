import { axiosClient } from './httpClient';

const addressService = {
    getAddByUserId: async (userId: string) => {
        const res = await axiosClient.get(`/address/user/${userId}`);
        return res.data;
    },

    create: async (data: any) => {
        const res = await axiosClient.post('/address', data);
        return res.data;
    },

    updateById: async (id: string, data: any) => {
        const res = await axiosClient.patch(`/address/${id}`, data);
        return res.data;
    },

    deleteById: async (id: string) => {
        const res = await axiosClient.delete(`/address/${id}`);
        return res.data;
    },
};

export default addressService;
