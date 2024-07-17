import { AddressInfo } from '../interface/order';
import Listener from '../lib/listener';

class checkoutReducer {
    constructor() {
        this.load();
    }
    private lsUserAddress: AddressInfo[] = [];
    private address: AddressInfo | null = null;
    private appTransId: string = '';
    private paymentMethod: string = '';
    get getAdderess() {
        return this.address;
    }

    get getAppTransId() {
        return this.appTransId;
    }

    get getPaymentMethod() {
        return this.paymentMethod;
    }

    get getLsUserAddress() {
        return this.lsUserAddress;
    }

    private load() {
        const address = sessionStorage.getItem('address');
        if (address) {
            this.address = JSON.parse(address);
        }

        const appTransId = sessionStorage.getItem('appTransId');
        if (appTransId) {
            this.appTransId = appTransId;
        }
        const paymentMethod = sessionStorage.getItem('paymentMethod');
        if (paymentMethod) {
            this.paymentMethod = paymentMethod;
        }
        if (this.appTransId || this.address || this.paymentMethod) {
            Listener.emit('load-checkout');
        }
    }

    saveAddress(address: AddressInfo) {
        this.address = address;
        sessionStorage.setItem('address', JSON.stringify(address));
    }

    setAddress(address: AddressInfo) {
        this.address = address;
        Listener.emit('set-address');
    }

    setListAddress(address: AddressInfo[]) {
        this.lsUserAddress = address;
        Listener.emit('set-list-user-add');
    }

    saveAppTransId(appTransId: string) {
        this.appTransId = appTransId;
        sessionStorage.setItem('appTransId', appTransId);
    }

    savePaymentMethod(paymentMethod: string) {
        this.paymentMethod = paymentMethod;
        sessionStorage.setItem('paymentMethod', paymentMethod);
    }

    clear() {
        this.address = null;
        this.appTransId = '';
        this.paymentMethod = '';
        this.lsUserAddress = [];
        sessionStorage.removeItem('address');
        sessionStorage.removeItem('appTransId');
        sessionStorage.removeItem('paymentMethod');
    }
}

export default new checkoutReducer();
