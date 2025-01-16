import { axiosClient } from './httpClient';

const brandService = {
    getAllBrand: async () => {
        const res = await axiosClient.get('/brand');
        return res.data;
    },
};
export default brandService;
