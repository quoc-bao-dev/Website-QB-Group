import { ICartItem } from './cart';
import { IUser } from './user';

export interface AddressInfo {
    recipientName: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    postalCode: string;
    country: string;
    deliveryMethod: string;
}

export interface OrderInput {
    user: IUser;
    order: ICartItem[];
    addressInfo: AddressInfo;
    paymentMethod: string;
    shippingFee: number;
    totalAmount: number;
    subTotal: number;
    tax?: number;
    discountPercentage: number;
}
