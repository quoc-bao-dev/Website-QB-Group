import _ from 'lodash';
import cartService from '../api/cartService';
import { ICartItem } from '../interface/cart';
import { Product } from '../interface/product';
import { Voucher } from '../interface/voucher';
import signal from '../lib/listener';
import userReducer from './userReducer';

class cartReducer {
    data: ICartItem[] = [];
    voucher: Voucher[] = [];
    constructor() {
        this.loadCartInLocalStorage();
        signal.on('cart-change', () => {
            this.saveCartInLocalStorage();
        });
    }

    async loadCartOnServerByUser(id: string) {
        const cartOnSv = await cartService.getCartByUserId(id);

        if (cartOnSv) {
            this.data.push(...cartOnSv.cart);

            signal.emit('cart-change');
        }
    }
    loadCartInLocalStorage() {
        const cart = localStorage.getItem('cart');
        if (cart) {
            this.data = JSON.parse(cart);
            signal.emit('cart-change');
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

    //hien tai product dang duoc xac dinh bang id
    //gio product duoc xac dinh bang id, Option

    addProductToCart(product: Product) {
        const prod = this.findItem(product);
        if (prod) {
            prod.quantity += 1;
        } else {
            this.data.unshift({ product, quantity: 1, checked: true });
        }

        signal.emit('cart-change');
    }

    removeProductFromCart(product: Product) {
        const index = this.findIndexItem(product);
        if (index > -1) {
            this.data.splice(index, 1);
        }
        signal.emit('cart-change');
    }

    changeQuantity(product: Product, quantity: number) {
        const index = this.findIndexItem(product);
        if (index > -1) {
            this.data[index].quantity = quantity;
        }
        signal.emit('cart-change');
    }

    changeChecked(product: Product, checked: boolean) {
        const index = this.findIndexItem(product);
        if (index > -1) {
            this.data[index].checked = checked;
        }
        signal.emit('cart-change');
    }

    clearCart() {
        this.data = [];
    }

    checkout() {
        this.data = this.data.filter((item) => !item.checked);
        this.voucher = [];
        signal.emit('cart-change');
    }
    checkAll() {
        this.data = this.data.map((item) => ({ ...item, checked: true }));
        signal.emit('cart-change');
    }
    addVoucher(voucher: Voucher) {
        try {
            const index = this.voucher.findIndex((item) => item.code == voucher.code);
            if (index > -1) {
                throw new Error('Voucher đã tồn tại');
            }
            this.voucher.push(voucher);
            signal.emit('cart-change');
        } catch (error) {
            throw error;
        }
    }

    clear() {
        this.data = [];
        this.voucher = [];
        localStorage.removeItem('cart');
        signal.emit('cart-change');
    }

    //supoport
    private findItem(prod: Product) {
        return this.data.find((item) => {
            const prodItem = item.product;
            const isTrue = _.isEqual(prodItem, prod);

            return isTrue;
        });
    }

    private findIndexItem(prod: Product) {
        return this.data.findIndex((item) => {
            const prodItem = item.product;
            const isTrue = _.isEqual(prodItem, prod);

            return isTrue;
        });
    }
}

export default new cartReducer();
