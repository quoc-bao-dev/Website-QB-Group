import addressService from '../../api/addressService';
import orderService from '../../api/orderService';
import paymentService from '../../api/paymentService';
import AppLoading from '../../components/common/AppLoading';
import { EmailData } from '../../interface/mail';
import { OrderInput } from '../../interface/order';
import FormContext from '../../lib/FormContext';
import Listener from '../../lib/listener';
import QBComponent from '../../lib/QBComponent';
import QBRouter from '../../lib/QBRouter';
import cartReducer from '../../store/cartReducer';
import checkoutReducer from '../../store/checkoutReducer';
import userReducer from '../../store/userReducer';
import { delay } from '../../util/delay';
import toast from '../../util/toast';
import CheckoutAddress from './partials/CheckoutAddress';
import CheckoutInfo from './partials/CheckoutInfo';

class CheckOutPage extends QBComponent {
    constructor() {
        super(null);
        this.pathTemplate = '/src/pages/checkout/index.html';
        Listener.on(
            'page-change',
            () => {
                // checkoutReducer.clear();
            },
            'reset-checkout'
        );
        Listener.on(
            'payment-handler',
            () => {
                this.checkout();
            },
            'payment-handler'
        );
    }

    //UI
    protected renderUI(): void {
        super.renderUI();
        this.renderCheckoutAddress();
        this.renderCheckoutInfo();
    }
    private renderCheckoutAddress() {
        this.renderComponent('#checkout-address', new CheckoutAddress());
    }
    private renderCheckoutInfo() {
        this.renderComponent('#checkout-info', new CheckoutInfo());
    }

    private renderAppLoading() {
        this.renderHTML('#app-overlay', new AppLoading().html);
    }
    private renderPaymentSuccess() {
        this.renderHTML(
            '#app-overlay',
            /*html*/ `
            <div id="paymentModal" class="modal flex items-center justify-center">
        <div class="bg-white w-[1000px] p-6 rounded-md shadow-md max-w-sm mx-auto">
            <h3 class="text-2xl font-bold text-gray-700 mb-4">Thank you!</h3>
            <p class="text-gray-600 mb-4">Your payment was successful.</p>
            
            <div class="flex items-center justify-center pt-8">
                <div class="flex items-center justify-center w-24 h-24 bg-green-100 rounded-full animate-bounce">
    <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </div>
            </div>
            
            <button onclick="closeModal()"
                class="w-full bg-blue-600 text-white py-2 rounded-md font-bold text-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-600">Close</button>
        </div>
    </div>
            `
        );
    }
    // event

    // affter render
    protected async affterRender(): Promise<void> {
        /// co hoa don dang thanh toan
        if (checkoutReducer.getAppTransId != '') {
            await this.checkout.bind(this)();
        } else if (userReducer.getData?.userId) {
            const lsAddress = await addressService.getAddByUserId(userReducer.getData.userId);
            checkoutReducer.setListAddress(lsAddress);

            if (checkoutReducer.getLsUserAddress.length > 0) {
                setTimeout(() => {
                    checkoutReducer.setAddress(checkoutReducer.getLsUserAddress[0]);
                }, 100);
            }
        }
    }

    // support
    private async checkout() {
        try {
            this.renderAppLoading();
            /// get data
            const order = cartReducer.getCheckedItems;
            const paymentMthod = checkoutReducer.getPaymentMethod;
            await delay(100);
            const addressInfo = await FormContext.getForm('checkout-address');

            /// order data
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

            /// zalopay
            if (checkoutReducer.getPaymentMethod === 'zalopay') {
                const result = await paymentService.paymentZalopayStatus(checkoutReducer.getAppTransId);
                if (result) {
                    /// payment success
                    if (result.return_code == 1) {
                        await orderService.addOrder(inputOrder);
                        this.renderPaymentSuccess();
                        toast.success('Checkout success');
                        checkoutReducer.clear();
                        this.sendMailThanks();

                        setTimeout(() => {
                            cartReducer.checkout();
                            QBRouter.nav('/');
                        }, 3000);
                    }
                    /// payment failed
                    else {
                        toast.error('Checkout failed Zalopay');
                    }
                }
            }

            /// cod
            if (checkoutReducer.getPaymentMethod === 'cod') {
                const res = await orderService.addOrder(inputOrder);
                if (res) {
                    this.renderPaymentSuccess();
                    toast.success('Checkout success');
                    checkoutReducer.clear();
                    this.sendMailThanks();
                    setTimeout(() => {
                        cartReducer.checkout();
                        QBRouter.nav('/');
                    }, 3000);
                }
            }

            /// payment method not support
        } catch (error) {
            console.log(error);
            toast.error('Checkout failed');
        } finally {
            setTimeout(() => {
                this.renderHTML('#app-overlay', '');
            }, 3000);
        }
    }

    private async sendMailThanks() {
        console.log('-------------------------- send mail --------------------------');

        const data: EmailData = {
            recipient: userReducer.data?.username as string,
            to: userReducer.data?.email as string,
            subject: 'Order successfully placed',
            text: 'Thanks for shopping with us',
        };
        await paymentService.senmailThanks(data);

        console.log('-------------------------- send mail --------------------------');
    }
}

export default CheckOutPage;
