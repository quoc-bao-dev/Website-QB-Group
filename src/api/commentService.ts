import { axiosClient } from './httpClient';

const commentService = {
    getCmtByProductId: async (productId: string) => {
        const res = await axiosClient.get(`/review/product/${productId}`);
        return res.data;
    },
    addComment: async (input: any) => {
        const res = await axiosClient.post(`/review`, input);
        return res.data;
    },
};

export default commentService;
