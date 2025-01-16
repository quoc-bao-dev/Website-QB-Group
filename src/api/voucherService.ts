import { Voucher } from '../interface/voucher';
import { axiosClient } from './httpClient';

const voucherService = {
    getVoucherByCode: async (code: string): Promise<Voucher> => {
        const res = await axiosClient.get(`/voucher/code/${code}`);
        return res.data;
    },

    getAllVoucher: async (): Promise<Voucher[]> => {
        const res = await axiosClient.get('/voucher');
        return res.data;
    },

    addVoucher: async (data: any): Promise<Voucher> => {
        const res = await axiosClient.post('/voucher', data);
        return res.data;
    },
    updateVoucher: async (id: string, data: any): Promise<Voucher> => {
        const res = await axiosClient.patch(`/voucher/${id}`, data);
        return res.data;
    },
};

export default voucherService;
