import { ICartItem } from '../interface/cart';
import { axiosClient } from './httpClient';

const cartService = {
    getCartByUserId: async (userId: string) => {
        const res = await axiosClient.get(`cart/user/${userId}`);
        return res.data;
    },
    synsCartOnServer: async (cart: ICartItem[], userId: string) => {
        const res = await axiosClient.put(`cart/update`, { userId, cart });
        return res.data;
    },
};

export default cartService;
