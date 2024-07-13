import voucherService from '../../../api/voucherService';
import { ICartItem } from '../../../interface/cart';
import { Voucher } from '../../../interface/voucher';
import QBComponent from '../../../lib/QBComponent';
import QBRouter from '../../../lib/QBRouter';

import cartReducer from '../../../store/cartReducer';
import { date } from '../../../util/date';
import { prd, usd } from '../../../util/productUtils';
import toast from '../../../util/toast';

class VoucherItem extends QBComponent<Voucher> {
    constructor(props: Voucher) {
        super(props);
    }

    markup = () => {
        return /*html*/ `
         <div class="p-4 rounded border border-2 border-green-600 bg-green-100">
            <p class="text-green-900 text-lg font-bold">${this.props.code}</p>
            <div class="w-full border border-dashed border-green-300 my-2"></div>
            <div class="flex gap-3 items-center">
                <p class="text-green-900 font-medium">${this.props.description}</p>
            </div>
            <div class="flex gap-3 items-center">
                <p class="text-green-900 font-medium">Discount:</p>
                <p class="text-green-900 font-medium">${this.props.discountPercentage}%</p>
            </div>
            <div class="flex gap-3 items-center">
                <p class="text-green-900 font-medium">HSD:</p>
                <p class="text-green-900 font-medium">${date(this.props.expirationDate)}</p>
            </div>
        </div>
        `;
    };
}
class CartInfoItem extends QBComponent<ICartItem> {
    constructor(props: ICartItem) {
        super(props);
    }

    markup = () => {
        if (!this.props.checked) {
            return '';
        }
        return /*html*/ `
        <div class="h-[1px] w-full bg-gray-200 my-4"></div>
        <div class="grid grid-cols-12 py-1">
            <div class="col-span-4">
                <p class="font-bold">${this.props.product.name}</p>
            </div>
            <div class="col-span-3">
                <p class="font-bold text-gray-500 text-right">${prd.sl(this.props.product)}</p>
            </div>
            <div class="col-span-2">
                <p class="font-bold text-gray-500 text-center">${this.props.quantity}</p>
            </div>
            <div class="col-span-3">
                <p class="font-bold text-gray-500 text-right">${usd(
                    prd.pr(this.props.product) * this.props.quantity
                )}</p>
            </div>
        </div>
        `;
    };
}

class CartPageInfo extends QBComponent {
    protected markup: () => string = () => {
        return /*html*/ `
       <div class="col-span-4">
                <div class="p-4 border border-gray-200 rounded">
                    <div class="flex items-center border-2 border-blue-900 rounded">
                        <input
                            class="flex-1 border-none outline-none px-3 focus:ring-0 text-gray-600 py-0 font-semibold text-lg"
                            type="text" placeholder="Enter voucher code" id="input-voucher">
                        <button class="bg-blue-900 text-white font-medium px-3 py-2 h-full" id="btn-voucher">Add Voucher</button>
                    </div>
                    <div class="h-[1px] w-full bg-gray-200 my-4"></div>
                    
                    <div class="grid grid-cols-12 gap-2 py-1">
                        <div class="col-span-4">
                            <p class="font-bold">Prodcut name</p>
                        </div>
                        <div class="col-span-3">
                            <p class="font-bold text-center">Price</p>
                        </div>
                        <div class="col-span-2">
                            <p class="font-bold text-center">Quant</p>
                        </div>
                        <div class="col-span-3">
                            <p class="font-bold text-center">Amount</p>
                        </div>
                    </div>

                    <div class="contents" id ="list-content"></div>
                    
                    <div class="h-[1px] w-full bg-gray-200 my-4"></div>
                   
                    <div class="contents" id ="list-voucher"></div>

                    ${
                        cartReducer.getVouchers.length > 0 && cartReducer.getQuantityChecked > 0
                            ? '<div class="h-[1px] w-full bg-gray-200 my-4"></div>'
                            : ''
                    }

                    <div class="flex justify-between items-center pb-4">
                        <p class="text-gray-700 font-bold">Subtotal</p>
                        <p class="text-gray-700 font-bold">${usd(cartReducer.getSubtotalChecked)}</p>
                    </div>
                   ${
                       cartReducer.getDiscountPercent > 0 && cartReducer.getQuantityChecked > 0
                           ? /*html*/ `
                        <div class="flex justify-between items-center pb-4">
                        <p class="text-gray-700 font-bold">Discount</p>
                        <p class="text-gray-700 font-bold">${cartReducer.getDiscountPercent}%</p>
                    </div>
                       `
                           : ''
                   }
                     <div class="flex justify-between items-center pb-4">
                        <p class="text-gray-700 font-bold">Shipping</p>
                        <p class="text-gray-700 font-bold">${usd(cartReducer.getShippingChecked)}</p>
                    </div>
                    <div class="flex justify-between items-center pb-4">
                        <p class="text-gray-700 font-bold">Todal amount</p>
                        <p class="text-gray-700 font-bold">${usd(cartReducer.getFinalTotal)}</p>
                    </div>
                    <div class="flex gap-3 flex-col">
                        <button
                            class="w-full h-[48px] bg-blue-900 text-white font-medium rounded grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed" id="btn-checkout" ${
                                cartReducer.getData.length === 0 || cartReducer.getSubtotalChecked === 0
                                    ? 'disabled'
                                    : ''
                            }>
                            Check Out
                        </button>
                        <button
                            class="w-full h-[48px] text-blue-900 bg-white border-2 border-blue-900 font-medium rounded grid place-items-center" id="btn-buy-more">
                            Buy more
                        </button>
                    </div>
                </div>
            </div>
        `;
    };

    //UI
    protected renderUI(): void {
        super.renderUI();
        this.renderListVoucher();
        this.renderListContent();
    }
    private renderListContent() {
        this.renderList('#list-content', cartReducer.getData, CartInfoItem);
    }
    private renderListVoucher() {
        if (cartReducer.getQuantityChecked > 0) {
            this.renderList('#list-voucher', cartReducer.getVouchers, VoucherItem);
        }
    }

    // event
    protected addEventListener(): void {
        this.eventVoucher();
        this.eventCheckout();
    }

    private eventVoucher = () => {
        this.signEvent('#btn-voucher', 'click', async () => {
            const input = this.element.querySelector('#input-voucher') as HTMLInputElement;

            if (input.value) {
                const voucher = await voucherService.getVoucherByCode(input.value);
                if (voucher) {
                    try {
                        cartReducer.addVoucher(voucher);
                    } catch (error: any) {
                        toast.error(error.message);
                    }
                } else {
                    toast.error('Voucher không hợp lệ');
                }
            } else {
                toast.error('Vui lòng nhập voucher');
            }
        });
    };

    private eventCheckout = () => {
        this.signEvent('#btn-buy-more', 'click', () => {
            QBRouter.nav('/products');
        });

        this.signEvent('#btn-checkout', 'click', () => {
            QBRouter.nav('/checkout');
        });
    };
}

export default CartPageInfo;
