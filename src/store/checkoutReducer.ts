import { AddressInfo } from '../interface/order';
import { Voucher } from '../interface/voucher';
import signal from '../lib/listener';

class checkoutReducer {
    constructor() {
        this.load();
    }
    private lsUserAddress: AddressInfo[] = [];
    private address: AddressInfo | null = null;
    private appTransId: string = '';
    private paymentMethod: string = '';
    private voucher: Voucher[] = [];
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

    get getVoucher() {
        return this.voucher;
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

        const lsVoucher = sessionStorage.getItem('voucher');
        if (lsVoucher) {
            this.voucher = JSON.parse(lsVoucher);
        }
        if (this.appTransId || this.address || this.paymentMethod) {
            signal.emit('load-checkout');
        }
    }

    saveAddress(address: AddressInfo) {
        this.address = address;
        sessionStorage.setItem('address', JSON.stringify(address));
    }

    setAddress(address: AddressInfo) {
        this.address = address;
        signal.emit('set-address');
    }

    setListAddress(address: AddressInfo[]) {
        this.lsUserAddress = address;
        signal.emit('set-list-user-add');
    }

    saveAppTransId(appTransId: string) {
        this.appTransId = appTransId;
        sessionStorage.setItem('appTransId', appTransId);
    }

    savePaymentMethod(paymentMethod: string) {
        this.paymentMethod = paymentMethod;
        sessionStorage.setItem('paymentMethod', paymentMethod);
    }

    saveVoucher(voucher: Voucher[]) {
        this.voucher = voucher;
        sessionStorage.setItem('voucher', JSON.stringify(voucher));
    }

    clear() {
        this.address = null;
        this.appTransId = '';
        this.paymentMethod = '';
        this.lsUserAddress = [];
        this.voucher = [];
        sessionStorage.removeItem('address');
        sessionStorage.removeItem('appTransId');
        sessionStorage.removeItem('paymentMethod');
    }
}

export default new checkoutReducer();
