import { axiosClient } from './httpClient';

const authenService = {
    login: async (email: string, password: string) => {
        const res = await axiosClient.post('authen/login', { email, password });
        return res.data;
    },
    register: async (data: any) => {
        const res = await axiosClient.post('authen/register', data);
        return res.data;
    },
    verifyToken: async (token: string) => {
        const res = await axiosClient.post('authen/verify-token', { accessToken: token });
        return res.data;
    },
    refreshToken: async (refreshToken: string) => {
        const res = await axiosClient.post('authen/refresh-token', { refreshToken });
        return res.data;
    },

    verifyChangePassword: async () => {
        const res = await axiosClient.post('authen/verify-change-pass');
        return res.data;
    },

    changePassword: async (data: any) => {
        const res = await axiosClient.post('authen/change-password', data);
        return res.data;
    },
};

export default authenService;
