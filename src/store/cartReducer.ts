import cartService from '../api/cartService';
import { ICartItem } from '../interface/cart';
import { Product } from '../interface/product';
import { Voucher } from '../interface/voucher';
import Listener from '../lib/listener';
import userReducer from './userReducer';

class cartReducer {
    data: ICartItem[] = [];
    voucher: Voucher[] = [];
    constructor() {
        this.loadCartInLocalStorage();
        Listener.on('cart-change', () => {
            this.saveCartInLocalStorage();
        });
    }

    async loadCartOnServerByUser(id: string) {
        const cartOnSv = await cartService.getCartByUserId(id);

        if (cartOnSv) {
            console.log(...cartOnSv.cart);

            this.data.push(...cartOnSv.cart);
            console.log(this.data);

            Listener.emit('cart-change');
        }
    }
    loadCartInLocalStorage() {
        const cart = localStorage.getItem('cart');
        if (cart) {
            this.data = JSON.parse(cart);
            Listener.emit('cart-change');
        }
    }

    saveCartInLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.data));
    }

    synCartOnServer() {
        const userId = userReducer.getData?.userId;
        cartService.synsCartOnServer(this.data, userId!);
    }
    get getData() {
        console.log(this.data);

        return this.data;
    }
    get getTotal() {
        return this.getSubtotal + this.getShipping;
    }

    get getShipping() {
        return this.data.reduce((total, item) => total + item.product.price / 100, 0);
    }

    get getSubtotal() {
        return this.data.reduce(
            (total, item) => total + ((item.product.price * (100 - item.product.discount)) / 100) * item.quantity,
            0
        );
    }

    get getTotalChecked() {
        return (
            this.data
                .filter((item) => item.checked)
                .reduce(
                    (total, item) =>
                        total + ((item.product.price * (100 - item.product.discount)) / 100) * item.quantity,
                    0
                ) + this.getShippingChecked
        );
    }
    get getShippingChecked() {
        return this.data.filter((item) => item.checked).reduce((total, item) => total + item.product.price / 100, 0);
    }

    get getSubtotalChecked() {
        return this.data
            .filter((item) => item.checked)
            .reduce(
                (total, item) => total + ((item.product.price * (100 - item.product.discount)) / 100) * item.quantity,
                0
            );
    }

    get getQuantityChecked() {
        return this.data.filter((item) => item.checked).length;
    }

    get getCheckedItems() {
        return this.data.filter((item) => item.checked);
    }

    get getFinalTotal() {
        return ((100 - this.getDiscountPercent) * this.getSubtotalChecked) / 100 + this.getShippingChecked;
    }

    get getVouchers() {
        return this.voucher;
    }

    get getDiscountPercent() {
        const totalDiscount = this.voucher.reduce((total, item) => total + (item.discountPercentage ?? 0), 0);
        return totalDiscount;
    }

    get getQuantity() {
        return this.data.length;
    }
    addProductToCart(product: Product) {
        const prod = this.data.find((item) => item.product._id == product._id);
        if (prod) {
            prod.quantity += 1;
        } else {
            this.data.push({ product, quantity: 1, checked: true });
        }

        Listener.emit('cart-change');
    }

    removeProductFromCart(product: Product) {
        const index = this.data.findIndex((item) => item.product._id == product._id);
        if (index > -1) {
            this.data.splice(index, 1);
        }
        Listener.emit('cart-change');
    }

    changeQuantity(product: Product, quantity: number) {
        const index = this.data.findIndex((item) => item.product._id == product._id);
        if (index > -1) {
            this.data[index].quantity = quantity;
        }
        Listener.emit('cart-change');
    }

    changeChecked(product: Product, checked: boolean) {
        const index = this.data.findIndex((item) => item.product._id == product._id);
        if (index > -1) {
            this.data[index].checked = checked;
        }
        Listener.emit('cart-change');
    }

    clearCart() {
        this.data = [];
    }

    checkout() {
        this.data = this.data.filter((item) => !item.checked);
        this.voucher = [];
        Listener.emit('cart-change');
    }
    checkAll() {
        this.data = this.data.map((item) => ({ ...item, checked: true }));
        Listener.emit('cart-change');
    }
    addVoucher(voucher: Voucher) {
        try {
            const index = this.voucher.findIndex((item) => item.code == voucher.code);
            if (index > -1) {
                throw new Error('Voucher đã tồn tại');
            }
            this.voucher.push(voucher);
            Listener.emit('cart-change');
        } catch (error) {
            throw error;
        }
    }

    clear() {
        this.data = [];
        this.voucher = [];
        localStorage.removeItem('cart');
        Listener.emit('cart-change');
    }
}

export default new cartReducer();
