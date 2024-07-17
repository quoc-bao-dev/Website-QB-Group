import paymentService from '../../../api/paymentService';
import { OrderInput } from '../../../interface/order';

export const checkoutUtil = async (input: OrderInput) => {
    const res = await paymentService.paymentZaloPay(input);
    if (res) {
        return res;
    }
    return null;
};
