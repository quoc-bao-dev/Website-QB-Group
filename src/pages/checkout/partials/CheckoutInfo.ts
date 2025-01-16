import paymentService from '../../../api/paymentService';
import { ICartItem } from '../../../interface/cart';
import { OrderInput } from '../../../interface/order';
import { Voucher } from '../../../interface/voucher';
import FormContext from '../../../lib/FormContext';
import signal from '../../../lib/listener';
import QBComponent from '../../../lib/QBComponent';
import QBForm from '../../../lib/QBForm';
import cartReducer from '../../../store/cartReducer';
import checkoutReducer from '../../../store/checkoutReducer';
import userReducer from '../../../store/userReducer';
import { prd, usd } from '../../../util/productUtils';
import toast from '../../../util/toast';

class OrderItem extends QBComponent<ICartItem> {
    constructor(props: ICartItem) {
        super(props);
        this.element = document.createElement('tr');
    }
    protected markup: () => string = () => {
        return /*html*/ `
        <td class="p-2 ">${this.props.product.name}</td>
        <td class="p-2 group relative">

       <p class="text-overflow-ellipsis line-clamp-1" >${this.props.product.option?.color.value} ${
            this.props.product.option?.ram.value
        } ${this.props.product.option?.storage.value}    
        </p> 

        <div class="absolute top-0 right-0 hidden group-hover:block p-2 bg-slate-200 rounded" >
        ${this.props.product.option?.color.value} ${this.props.product.option?.ram.value} ${
            this.props.product.option?.storage.value
        }  
        </div>

        </td>
            <td class="p-2">${prd.sl(this.props.product)}</td>
            <td class="p-2 text-center">${this.props.quantity}</td>
        <td class="p-2">${usd(prd.pr(this.props.product) * this.props.quantity)}</td>
        `;
    };
}

class PaymentMothodForm extends QBForm {
    constructor() {
        super();
        this.formContextKey = 'payment-method';
    }
    protected markup: () => string = () => {
        const paymentDefault = checkoutReducer.getPaymentMethod;

        return /*html*/ `
        <form>
         <!-- Payment Method -->
                            <div class="pb-3">
                                <label for="paymentMethod" class="text-gray-600 font-bold text-lg">Payment
                                    method</label>
                                <select name="paymentMethod" id="paymentMethod"
                                    class="w-full mt-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-600">
                                    <option ${paymentDefault === 'cod' ? 'selected' : ''} value="cod">COD</option>
                                    <option ${
                                        paymentDefault === 'vnpay' ? 'selected' : ''
                                    } value="vnpay">VN PAY</option>
                                    <option ${
                                        paymentDefault === 'zalopay' ? 'selected' : ''
                                    } value="zalopay">ZaloPay</option>
                                    <option ${
                                        paymentDefault === 'creditCard' ? 'selected' : ''
                                    } value="creditCard">Credit Card</option>
                                    <option ${
                                        paymentDefault === 'paypal' ? 'selected' : ''
                                    } value="paypal">PayPal</option>
                                </select>
                            </div>

                            <!-- Submit Button -->
                            <div class="col-span-1">
                                <button type="submit" id="btn-checkout"
                                    class="w-full bg-blue-600 text-white py-2 rounded-md font-bold text-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-600">
                                    Checkout
                                </button>
                            </div>
        </form>
        
        `;
    };

    // event
    protected addEventListener(): void {
        this.eventSubmit();
    }
    private eventSubmit() {
        this.signEvent('#btn-checkout', 'click', this.checkout.bind(this));
    }

    // logic
    private async checkout() {
        const data = await this.getDataForm();
        const paymentMthod = data!.paymentMethod;
        const addressInfo = await FormContext.getForm('checkout-address');
        const order = cartReducer.getCheckedItems;

        const inputOrder: OrderInput = {
            user: userReducer.data!,
            order,
            addressInfo,
            paymentMethod: paymentMthod.toString(),
            shippingFee: cartReducer.getShippingChecked,
            totalAmount: cartReducer.getFinalTotal,
            subTotal: cartReducer.getSubtotalChecked,
            discountPercentage: cartReducer.getDiscountPercent,
        };
        try {
            /// validata success
            if (addressInfo) {
                checkoutReducer.saveVoucher(cartReducer.getVouchers);
                checkoutReducer.saveAddress(addressInfo);

                if (paymentMthod === 'zalopay') {
                    checkoutReducer.savePaymentMethod(paymentMthod);

                    const result = await paymentService.paymentZaloPay(inputOrder);
                    if (result) {
                        checkoutReducer.saveAppTransId(result.app_trans_id);

                        //? set default paymentMethod

                        window.location.href = result.order_url;
                    } else {
                        toast.error('Checkout failed Zalopay');
                    }
                    return;
                } else if (paymentMthod === 'cod') {
                    checkoutReducer.saveAddress(addressInfo);
                    checkoutReducer.saveAppTransId('');
                    checkoutReducer.savePaymentMethod(paymentMthod);
                    signal.emit('payment-handler');
                }
            }
        } catch (error: any) {
            toast.error(error?.message);
        }
    }
}

class CheckoutInfo extends QBComponent {
    protected markup: () => string = () => {
        if (cartReducer.getVouchers.length > 0) checkoutReducer.saveVoucher(cartReducer.getVouchers);
        const voucher =
            cartReducer.getVouchers.length > 0 ? cartReducer.getVouchers : (checkoutReducer.getVoucher as Voucher[]);

        return /*html*/ `
        <div class="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
                        <h2 class="text-2xl font-bold text-gray-700 mb-6">Payment Information</h2>
                        <div class="grid grid-cols-1 gap-6">
                            <!-- Product Information -->
                            <div class="bg-gray-100 p-4 rounded-md">
                                <table class="w-full text-left">
                                    <thead>
                                        <tr>
                                            <th class="border-b-2 p-2">Product name</th>
                                            <th class="border-b-2 p-2">Option</th>
                                            <th class="border-b-2 p-2">Price</th>
                                            <th class="border-b-2 p-2">Quantity</th>
                                            <th class="border-b-2 p-2">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody id="order-items">
                                        
                                    </tbody>
                                </table>
                                <hr class = "mt-4"/>
                                <div class="mt-4">
                                   ${
                                       voucher && voucher?.length > 0
                                           ? /*html*/ `
                                     <div class="flex justify-between">
                                        <span>Discount:</span>
                                        <span>${voucher.reduce((a, b) => a + b.discountPercentage, 0)}%</span>
                                    </div>
                                    `
                                           : ''
                                   }
                                   ${
                                       cartReducer.getSubtotalChecked > 0
                                           ? /*html*/ `
                                    <div class="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span>${usd(cartReducer.getSubtotalChecked)}</span>
                                    </div>
                                    `
                                           : ''
                                   }
                                   ${
                                       cartReducer.getShippingChecked > 0
                                           ? /*html*/ `
                                    <div class="flex justify-between pt-1">
                                        <span>Shipping:</span>
                                        <span>${usd(cartReducer.getShippingChecked)}</span>
                                    </div>
                                    `
                                           : ''
                                   }
                                   
                                    <div class="flex justify-between font-bold pt-2">
                                        <span>Total:</span>
                                        <span>${usd(cartReducer.getFinalTotal)}</span>
                                    </div>
                                </div>
                            </div>

                           <div id="payment-method" class="contents"></div>
                        </div>
                         
                    </div>
        `;
    };

    //UI
    protected renderUI(): void {
        super.renderUI();
        this.renderOrderItems();
        this.renderPaymentMethod();
    }

    private renderOrderItems() {
        this.renderList('#order-items', cartReducer.getCheckedItems, OrderItem);
    }

    private renderPaymentMethod() {
        this.renderComponent('#payment-method', new PaymentMothodForm());
    }
}

export default CheckoutInfo;
