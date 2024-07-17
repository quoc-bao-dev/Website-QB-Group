import Listener from '../../../lib/listener';
import QBComponent from '../../../lib/QBComponent';
import QBForm from '../../../lib/QBForm';
import checkoutReducer from '../../../store/checkoutReducer';

class AddressForm extends QBForm {
    constructor() {
        super();
        this.formContextKey = 'checkout-address';

        Listener.on(
            'load-checkout',
            () => {
                this.setLoadForm();
            },
            'checkout-address'
        );
        Listener.on(
            'set-address',
            () => {
                this.setLoadForm();
            },
            'set-address'
        );
    }
    private add = checkoutReducer.getAdderess;
    protected markup: () => string = () => {
        const add = this.add;
        return /*html*/ `
        <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Recipient Information -->
                            <div class="pb-3">
                                <label for="recipientName" class="text-gray-600 font-bold text-lg">Recipient
                                    Name</label>
                                <input type="text" name="recipientName" id="recipientName" placeholder="John Doe"
                                    class="w-full mt-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-600 ${
                                        this.error('recipientName') ? 'border-red-500' : ''
                                    }" ${add?.recipientName ? `value="${add?.recipientName}"` : ''}/>
                                    ${
                                        this.error('recipientName')
                                            ? `<p class="text-red-500 py-1">${this.error('recipientName')?.message}</p>`
                                            : ''
                                    }
                            </div>
                            <div class="pb-3">
                                <label for="phone" class="text-gray-600 font-bold text-lg">Phone Number</label>
                                <input type="text" name="phone" id="phone" placeholder="(123) 456-7890"
                                    class="w-full mt-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-600 ${
                                        this.error('phone') ? 'border-red-500' : ''
                                    }" ${add?.phone ? `value="${add?.phone}"` : ''}/>
                                ${
                                    this.error('phone')
                                        ? `<p class="text-red-500 py-1">${this.error('phone')?.message}</p>`
                                        : ''
                                }
                            </div>
                            <div class="pb-3">
                                <label for="address" class="text-gray-600 font-bold text-lg">Address</label>
                                <input type="text" name="address" id="address" placeholder="123 Main St"
                                    class="w-full mt-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-600 ${
                                        this.error('address') ? 'border-red-500' : ''
                                    }" ${add?.address ? `value="${add?.address}"` : ''}/>
                                ${
                                    this.error('address')
                                        ? `<p class="text-red-500 py-1">${this.error('address')?.message}</p>`
                                        : ''
                                }
                            </div>
                            <div class="pb-3">
                                <label for="city" class="text-gray-600 font-bold text-lg">City</label>
                                <input type="text" name="city" id="city" placeholder="New York"
                                    class="w-full mt-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-600 ${
                                        this.error('city') ? 'border-red-500' : ''
                                    }" ${add?.city ? `value="${add?.city}"` : ''}/>
                                ${
                                    this.error('city')
                                        ? `<p class="text-red-500 py-1">${this.error('city')?.message}</p>`
                                        : ''
                                }
                            </div>
                            <div class="pb-3">
                                <label for="district" class="text-gray-600 font-bold text-lg">District</label>
                                <input type="text" name="district" id="district" placeholder="NY"
                                    class="w-full mt-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-600 ${
                                        this.error('district') ? 'border-red-500' : ''
                                    }" ${add?.district ? `value="${add?.district}"` : ''}/>
                                ${
                                    this.error('district')
                                        ? `<p class="text-red-500 py-1">${this.error('district')?.message}</p>`
                                        : ''
                                }
                            </div>
                            <div class="pb-3">
                                <label for="postalCode" class="text-gray-600 font-bold text-lg">Postal Code</label>
                                <input type="text" name="postalCode" id="postalCode" placeholder="10001"
                                    class="w-full mt-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-600 ${
                                        this.error('postalCode') ? 'border-red-500' : ''
                                    }" ${add?.postalCode ? `value="${add?.postalCode}"` : ''} />
                                ${
                                    this.error('postalCode')
                                        ? `<p class="text-red-500 py-1">${this.error('postalCode')?.message}</p>`
                                        : ''
                                }
                            </div>
                            <div class="pb-3 col-span-1 md:col-span-2">
                                <label for="country" class="text-gray-600 font-bold text-lg">Country</label>
                                <input type="text" name="country" id="country" placeholder="USA"
                                    class="w-full mt-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-600 ${
                                        this.error('country') ? 'border-red-500' : ''
                                    }" ${add?.country ? `value="${add?.country}"` : ''} />
                                ${
                                    this.error('country')
                                        ? `<p class="text-red-500 py-1">${this.error('country')?.message}</p>`
                                        : ''
                                }
                            </div>
                            <div class="pb-3 col-span-1 md:col-span-2">
-                                <label for="deliveryMethod" class="text-gray-600 font-bold text-lg">Delivery
-                                    Method</label>
-                                <select name="deliveryMethod" id="deliveryMethod"
-                                    class="w-full mt-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-600">
-                                    <option value="standard" ${
            add?.deliveryMethod === 'standard' ? 'selected' : ''
        }>Standard Delivery</option>
-                                    <option value="express" ${
            add?.deliveryMethod === 'express' ? 'selected' : ''
        }>Express Delivery</option>
-                                </select>
                             </div>
                        </form>

        `;
    };

    protected schema(): void {
        this.register('recipientName', (value) => {
            if (!value) {
                return `Please enter recipient name`;
            }
            if (value.length < 3) {
                return `Please enter at least 3 characters`;
            }
        });

        this.register('phone', (value) => {
            const phoneRegex = /^[+]?\d{10,13}$/;
            if (!value || !phoneRegex.test(value)) {
                return `Please enter a valid phone number`;
            }
        });

        this.register('address', (value) => {
            if (!value) {
                return `Please enter address`;
            }
        });

        this.register('city', (value) => {
            if (!value) {
                return `Please enter city`;
            }
        });

        this.register('district', (value) => {
            if (!value) {
                return `Please enter district`;
            }
        });

        this.register('postalCode', (value) => {
            const postalCodeRegex = /^\d{5}(-\d{4})?$/;
            if (!value || !postalCodeRegex.test(value)) {
                return `Please enter a valid postal code`;
            }
        });

        this.register('country', (value) => {
            if (!value) {
                return `Please enter country`;
            }
        });

        this.register('deliveryMethod', (value) => {
            if (!value) {
                return `Please select a delivery method`;
            }
        });
    }

    private setLoadForm() {
        const address = checkoutReducer.getAdderess;
        if (address) {
            this.add = address;
            this.setDefaultValue(address);
            this.add = null;
        }
    }
}

class CheckoutAddress extends QBComponent {
    constructor() {
        super(null);
        Listener.on(
            'set-list-user-add',
            () => {
                this.reRender();
            },
            'set-list-user-add'
        );
    }
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
                        <h2 class="text-2xl font-bold text-gray-700 mb-6">Payment Information</h2>
                        <div class="contents" id="address-form"></div>
                        ${
                            checkoutReducer.getLsUserAddress.length > 0
                                ? /*html*/ `
                            <div class ="pt-5">
                            <p class ="font-bold text-gray-700" > Choice your address:</p>
                            <select name="cur-address" id="cur-address" class="w-full mt-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-600" >
                                    ${checkoutReducer.getLsUserAddress.map((address, index) => {
                                        return /*html*/ `<option value="${index}">${address?.address}</option>`;
                                    })}
                            </select>
                        </div>
                            `
                                : ''
                        }
                    </div>
        `;
    };

    protected renderUI(): void {
        super.renderUI();
        this.renderAddressForm();
    }
    private renderAddressForm() {
        this.renderComponent('#address-form', new AddressForm());
    }

    // event
    protected addEventListener(): void {
        this.eventChangeAdd();
    }
    private eventChangeAdd() {
        this.signEvent('#cur-address', 'change', () => {
            const index = this.node('#cur-address') as HTMLSelectElement;
            const address = checkoutReducer.getLsUserAddress[Number(index.value)];
            // checkoutReducer.saveAddress(address);
            checkoutReducer.setAddress(address);
        });
    }
}

export default CheckoutAddress;
