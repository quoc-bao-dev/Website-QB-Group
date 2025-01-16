import { axiosClient } from './httpClient';

const categoryService = {
    getCategory: async (): Promise<Category[]> => {
        const res = await axiosClient.get('/category');
        return res.data;
    },

    getCategoryAdmin: async (): Promise<Category[]> => {
        const res = await axiosClient.get('/category/admin');
        return res.data;
    },
    getCategoryById: async (id: string): Promise<Category> => {
        const res = await axiosClient.get(`/category/${id}`);
        return res.data;
    },

    createCategory: async (data: any): Promise<Category> => {
        const res = await axiosClient.post('/category', data);
        return res.data;
    },

    updateCategory: async (id: string, data: any): Promise<Category> => {
        const res = await axiosClient.patch(`/category/${id}`, data);
        return res.data;
    },
    changeShow: async (id: string, isShow: boolean): Promise<Category> => {
        const res = await axiosClient.patch(`/category/${id}`, { isShow });
        return res.data;
    },

    delteCategory: async (id: string) => {
        const res = await axiosClient.delete(`/category/${id}`);
        return res.data;
    },
};

export default categoryService;
