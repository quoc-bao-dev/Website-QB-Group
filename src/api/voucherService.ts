import { Voucher } from '../interface/voucher';
import { axiosClient } from './httpClient';

const voucherService = {
    getVoucherByCode: async (code: string): Promise<Voucher> => {
        const res = await axiosClient.get(`/voucher/code/${code}`);
        return res.data;
    },
};

export default voucherService;
