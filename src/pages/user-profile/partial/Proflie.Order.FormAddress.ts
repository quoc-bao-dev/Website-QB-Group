import orderService from '../../../api/orderService';
import QBForm from '../../../lib/QBForm';
import toast from '../../../util/toast';

interface AddressInfo {
    address: string;
    city: string;
    country: string;
    district: string;
    phone: string;
    postalCode: string;
    recipientName: string;
}
interface OrderFormAddressProps {
    isShow: boolean;
    data: AddressInfo;
    orderId: string;
    onClose: () => void;
    onSave: () => void;
}
class OrderFormAddress extends QBForm<OrderFormAddressProps> {
    constructor(props: OrderFormAddressProps) {
        super(props);
        this.defaultValue = props.data;
    }
    protected markup: () => string = () => {
        return /*html*/ `
            <div class="fixed inset-0 bg-black/50 z-10 grid place-items-center">
            <div class="bg-white p-5 rounded-lg w-8/12 mx-auto">
                <h2 class="text-center font-bold text-2xl  pb-6">Change your shipping address</h2>

                <form class="flex flex-col gap-5">
                    <div class="grid grid-cols-2 gap-5">

                        <div class="relative">
                            <label class="text-sm text-gray-500" for="city">
                                City
                            </label>
                            <input
                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                id="city" name="city" type="text" placeholder="HCM City">
                                ${
                                    this.error('city')
                                        ? `<p class="text-red-500 text-sm">${this.error('city')?.message}</p>`
                                        : ''
                                }
                        </div>

                        <div class="relative">
                            <label class="text-sm text-gray-500" for="country">
                                Country
                            </label>
                            <input
                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                id="country" name="country" type="text" placeholder="Viet Nam">
                                ${
                                    this.error('country')
                                        ? `<p class="text-red-500 text-sm">${this.error('country')?.message}</p>`
                                        : ''
                                }
                        </div>

                        <div class="relative">
                            <label class="text-sm text-gray-500" for="district">
                                District
                            </label>
                            <input
                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                id="district" name="district" type="text" placeholder="Binh Thanh">
                                ${
                                    this.error('district')
                                        ? `<p class="text-red-500 text-sm">${this.error('district')?.message}</p>`
                                        : ''
                                }
                        </div>

                        <div class="relative">
                            <label class="text-sm text-gray-500" for="postalCode">
                                Postal Code
                            </label>
                            <input
                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                id="postalCode" name="postalCode" type="text" placeholder="70000">
                                ${
                                    this.error('postalCode')
                                        ? `<p class="text-red-500 text-sm">${this.error('postalCode')?.message}</p>`
                                        : ''
                                }
                        </div>


                    </div>
                    <div class="relative">
                        <label class="text-sm text-gray-500" for="address">
                            Address
                        </label>
                        <input
                            class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                            id="address" name="address" type="text" placeholder="123 Main St">
                            ${
                                this.error('address')
                                    ? `<p class="text-red-500 text-sm">${this.error('address')?.message}</p>`
                                    : ''
                            }
                    </div>
                    <div class="pt-5 grid grid-cols-2 gap-5">
                        <div class="relative">
                            <label class="text-sm text-gray-500" for="phone">
                                Phone
                            </label>
                            <input
                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                id="phone" name="phone" type="tel" placeholder="0919616224">
                                ${
                                    this.error('phone')
                                        ? `<p class="text-red-500 text-sm">${this.error('phone')?.message}</p>`
                                        : ''
                                }
                        </div>

                        <div class="relative">
                            <label class="text-sm text-gray-500" for="recipientName">
                                Recipient Name
                            </label>
                            <input
                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                id="recipientName" name="recipientName" type="text" placeholder="Quoc Bao">
                                ${
                                    this.error('recipientName')
                                        ? `<p class="text-red-500 text-sm">${this.error('recipientName')?.message}</p>`
                                        : ''
                                }
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-5 pt-5 ">
                        <button class="py-2 px-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700 btn-save">Save</button>
                        <button
                            class="py-2 px-6 rounded-lg bg-white text-blue-600 border border-blue-600  hover:bg-blue-50 btn-close">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
        `;
    };
    protected schema(): void {
        this.register('address', (value) => {
            if (!value) {
                return 'Address is required';
            }
        });

        this.register('country', (value) => {
            if (!value) {
                return 'Country is required';
            }
        });

        this.register('postalCode', (value) => {
            if (!value) {
                return 'Postal Code is required';
            }
        });

        this.register('city', (value) => {
            if (!value) {
                return 'City is required';
            }
        });

        this.register('district', (value) => {
            if (!value) {
                return 'District is required';
            }
        });

        this.register('phone', (value) => {
            if (!value) {
                return 'Phone is required';
            }
        });

        this.register('recipientName', (value) => {
            if (!value) {
                return 'Recipient Name is required';
            }
        });
    }

    protected addEventListener(): void {
        super.addEventListener();

        this.signEvent('.btn-close', 'click', () => {
            this.props.onClose();
        });
        this.signEvent('.btn-save', 'click', async () => {
            const data = await this.getDataForm();

            if (data) {
                await orderService.updateOrderInfoById(this.props.orderId, data);
                //?
                await this.props.onSave();
                toast.success('Update success!');
            }
        });
    }
}

export default OrderFormAddress;
