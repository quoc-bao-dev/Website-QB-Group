import { axiosClient } from './httpClient';

const addressService = {
    getAddByUserId: async (userId: string) => {
        const res = await axiosClient.get(`/address/user/${userId}`);
        return res.data;
    },
};

export default addressService;
