import { Voucher } from './voucher';
import { ICartItem } from './cart';
import { IUser } from './user';

export interface AddressInfo {
    _id: string;
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
    orderId?: string;
    discountPercentage: number;
    paymentStatus?: string;
    voucher?: Voucher[];
}

interface DeliveryAddress {
    address: string;
    city: string;
    country: string;
    deliveryMethod: string;
    district: string;
    phone: string;
    postalCode: string;
    recipientName: string;
}

interface Product {
    brand: string;
    category: string;
    description: string;
    discount: number;
    image: string;
    name: string;
    price: number;
    slug: string;
    tags: string[];
}

export interface IOrderItem {
    product: Product;
    quantity: number;
}

export interface Order {
    _id: string;
    userId: string;
    totalAmount: number;
    subTotal: number;
    shippingFee: number;
    discountPercentage: number;
    paymentMethod: string;
    deliveryAddress: DeliveryAddress;
    deliveryDate: Date | string;
    orderDate: Date | string;
    orderItems: IOrderItem[];
    createdAt: string;
    updatedAt: string;
    status: string;
    paymentStatus?: string;
}
