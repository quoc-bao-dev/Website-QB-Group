import { axiosClient } from './httpClient';

const categoryService = {
    getCategory: async (): Promise<Category[]> => {
        const res = await axiosClient.get('/category');
        return res.data;
    },
};

export default categoryService;
