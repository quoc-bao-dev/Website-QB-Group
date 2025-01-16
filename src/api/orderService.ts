import { Order, OrderInput } from '../interface/order';
import proxy from '../util/proxyObject';
import { axiosClient } from './httpClient';

const orderService = {
    addOrder: async (input: OrderInput) => {
        const transformedInput = proxy.transformOrder(input);
        const res = await axiosClient.post('/order', transformedInput);
        return res.data;
    },

    getAllOrder: async () => {
        const res = await axiosClient.get(`/order`);
        return res.data;
    },

    getOrderByUserId: async (userId: string) => {
        const res = await axiosClient.get(`/order/user/${userId}`);
        return res.data;
    },

    getOrderById: async (orderId: string) => {
        const res = await axiosClient.get(`/order/${orderId}`);
        return res.data;
    },

    getToTalPaymentByUserId: async (userId: string) => {
        const res = await axiosClient.get(`/order/user/${userId}/`);
        const data = res.data as Order[];
        return data
            .filter((item) => item.status === 'completed' || item.paymentStatus === 'success')
            .reduce((total, item) => total + item.totalAmount, 0);
    },

    updateOrderById: async (orderId: string, data: any) => {
        const res = await axiosClient.patch(`/order/${orderId}`, data);
        return res.data;
    },
    updateOrderInfoById: async (orderId: string, payload: any) => {
        const data = {
            deliveryAddress: payload,
        };
        const res = await axiosClient.patch(`/order/${orderId}`, data);
        return res.data;
    },
};

export default orderService;
