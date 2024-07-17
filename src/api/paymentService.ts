import { EmailData } from '../interface/mail';
import { OrderInput } from '../interface/order';
import { axiosClient } from './httpClient';

const paymentService = {
    paymentZaloPay: async (data: OrderInput) => {
        const res = await axiosClient.post('/payment/zalopay', data);
        return res.data;
    },
    paymentZalopayStatus: async (appTransId: string) => {
        const res = await axiosClient.post(`/payment/zalopay/status`, {
            appTransId,
        });
        return res.data;
    },

    senmailThanks: async (data: EmailData) => {
        const res = await axiosClient.post('/payment/success', data);
        return res.data;
    },
};

export default paymentService;
