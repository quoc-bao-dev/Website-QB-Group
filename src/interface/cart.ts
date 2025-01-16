import { Option, Product } from './product';

export interface ICartItem {
    product: Product;
    quantity: number;
    checked: boolean;
    isOnServer?: boolean;
    options?: Option;
}
