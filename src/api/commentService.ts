import _ from 'lodash';
import { axiosClient } from './httpClient';

const commentService = {
    getCmtByProductId: async (productId: string) => {
        const res = await axiosClient.get(`/review/product/${productId}`);
        return res.data;
    },

    getCmtByUserId: async (userId: string) => {
        const res = await axiosClient.get(`/review/user/${userId}`);
        return res.data;
    },
    addComment: async (input: any) => {
        const lsFileImages = input.lsFileImages;

        const body = _.omit(input, 'lsFileImages');

        const formData = new FormData();
        if (lsFileImages) {
            for (let i = 0; i < lsFileImages.length; i++) {
                const file = lsFileImages[i];
                formData.append('files', file);
            }
        }
        formData.append('json', JSON.stringify(body));

        // gui form len server
        await axiosClient.post(`/review`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return false;
    },

    changeStatus: async (id: string, isShow: boolean) => {
        const res = await axiosClient.patch(`/review/${id}`, { isShow });
        return res.data;
    },
};

export default commentService;
