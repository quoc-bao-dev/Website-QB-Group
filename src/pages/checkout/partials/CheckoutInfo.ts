import FormContext from '../../../lib/FormContext';
import QBComponent from '../../../lib/QBComponent';

class CheckoutInfo extends QBComponent {
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
                        <h2 class="text-2xl font-bold text-gray-700 mb-6">Payment Information</h2>
                        <form class="grid grid-cols-1 gap-6">
                            <!-- Product Information -->
                            <div class="bg-gray-100 p-4 rounded-md">
                                <table class="w-full text-left">
                                    <thead>
                                        <tr>
                                            <th class="border-b-2 p-2">Product name</th>
                                            <th class="border-b-2 p-2">Price</th>
                                            <th class="border-b-2 p-2">Quantity</th>
                                            <th class="border-b-2 p-2">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="p-2">Example Product</td>
                                            <td class="p-2">$10.00</td>
                                            <td class="p-2">1</td>
                                            <td class="p-2">$10.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="mt-4">
                                    <div class="flex justify-between">
                                        <span>Discount:</span>
                                        <span>0%</span>
                                    </div>
                                    <div class="flex justify-between font-bold">
                                        <span>Total:</span>
                                        <span>$0.00</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Payment Method -->
                            <div class="pb-3">
                                <label for="paymentMethod" class="text-gray-600 font-bold text-lg">Payment
                                    method</label>
                                <select name="paymentMethod" id="paymentMethod"
                                    class="w-full mt-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-600">
                                    <option value="vnpay">VN PAY</option>
                                    <option value="creditCard">Credit Card</option>
                                    <option value="paypal">PayPal</option>
                                </select>
                            </div>

                            <!-- Submit Button -->
                            <div class="col-span-1">
                                <button type="submit"
                                    class="w-full bg-blue-600 text-white py-2 rounded-md font-bold text-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-600">
                                    Checkout
                                </button>
                            </div>
                        </form>
                         <button id="btn-test"
                                    class="w-full bg-blue-600 text-white py-2 rounded-md font-bold text-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-600">
                                    Checkout
                                </button>
                    </div>
        `;
    };

    // event
    protected addEventListener(): void {
        this.signEvent('#btn-test', 'click', async () => {
            const data = await FormContext.getForm('checkout-address');
            console.log(data);
        });
    }
}

export default CheckoutInfo;
