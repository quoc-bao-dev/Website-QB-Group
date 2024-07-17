import { OrderInput } from '../interface/order';
import proxy from '../util/proxyObject';
import { axiosClient } from './httpClient';

const orderService = {
    addOrder: async (input: OrderInput) => {
        const transformedInput = proxy.transformOrder(input);
        const res = await axiosClient.post('/order', transformedInput);
        return res.data;
    },
};

export default orderService;
