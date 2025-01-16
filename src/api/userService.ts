import { axiosClient } from './httpClient';

const userService = {
    getAllUser: async () => {
        const res = await axiosClient.get('/user');
        return res.data;
    },
    getUserById: async (userId: string) => {
        const res = await axiosClient.get(`/user/${userId}`);
        return res.data;
    },
    updateUserById: async (userId: string, data: any) => {
        const res = await axiosClient.patch(`/user/${userId}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    },

    changeActive: async (userId: string, isActive: boolean) => {
        const res = await axiosClient.patch(`/user/${userId}`, {
            isActive,
        });
        return res.data;
    },
};

export default userService;
