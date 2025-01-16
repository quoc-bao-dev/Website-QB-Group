import _ from 'lodash';
import addressService from '../../../api/addressService';
import { AddressInfo } from '../../../interface/order';
import QBForm from '../../../lib/QBForm';
import toast from '../../../util/toast';
import userReducer from '../../../store/userReducer';
import signal from '../../../lib/listener';

interface AddAddressState {
    isAdd: boolean;
}
export class AddAddress extends QBForm<{}, AddAddressState> {
    constructor() {
        super();
        this.state = {
            isAdd: false,
        };
    }
    protected markup: () => string = () => {
        if (!this.state.isAdd) {
            return /*html*/ `
            <div class="btn-add p-16 rounded-xl border border-gray-200 grid place-content-center text-center text-gray-500 border-dashed">
                Add new address
            </div>
            `;
        }

        return /*html*/ `
        <div class="p-6 rounded-xl border border-gray-200">
            <form class="flex flex-col gap-5">
                    <div class="grid grid-cols-2 gap-5">

                        <div class="relative">
                            <label class="text-sm text-gray-500" for="city">
                                City
                            </label>
                            <input
                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${
                                    this.error('city') ? 'border-red-500' : ''
                                }"
                                id="city" name="city" type="text" placeholder="Anytown" 
                                />
                            ${
                                this.error('city')
                                    ? `<p class="text-red-500 py-1">${this.error('city')?.message}</p>`
                                    : ''
                            }
                        </div>

                        <div class="relative">
                            <label class="text-sm text-gray-500" for="district">
                                District
                            </label>
                            <input
                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                id="district" name="district" type="text" placeholder="District 1" 
                            />
                            ${
                                this.error('district')
                                    ? `<p class="text-red-500 py-1">${this.error('district')?.message}</p>`
                                    : ''
                            }
                        </div>

                        <div class="relative">
                            <label class="text-sm text-gray-500" for="country">
                                Country
                            </label>
                            <input
                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${
                                    this.error('country') ? 'border-red-500' : ''
                                }"
                                id="country" name="country" type="text" placeholder="Country" 
                            />
                            ${
                                this.error('country')
                                    ? `<p class="text-red-500 py-1">${this.error('country')?.message}</p>`
                                    : ''
                            }
                        </div>

                        <div class="relative">
                            <label class="text-sm text-gray-500" for="postalCode">
                                Postal Code
                            </label>
                            <input
                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${
                                    this.error('postalCode') ? 'border-red-500' : ''
                                }"
                                id="postalCode" name="postalCode" type="text" placeholder="123456" 
                            />
                            ${
                                this.error('postalCode')
                                    ? `<p class="text-red-500 py-1">${this.error('postalCode')?.message}</p>`
                                    : ''
                            }
                        </div>


                    </div>
                    <div class="relative">
                        <label class="text-sm text-gray-500" for="address">
                            Address
                        </label>
                        <input
                            class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${
                                this.error('address') ? 'border-red-500' : ''
                            }"
                            id="address" name="address" type="text" placeholder="123 Main St"
                        />
                        ${
                            this.error('address')
                                ? `<p class="text-red-500 py-1">${this.error('address')?.message}</p>`
                                : ''
                        }
                    </div>
                       
                     <div class="flex gap-5">
                                        <button
                                            class="py-2 px-6 rounded-lg bg-blue-500 text-white hover:bg-blue-600 btn-save">Save</button>
                                        <button
                                            class="py-2 px-6 rounded-lg bg-red-500 text-white hover:bg-red-600 btn-cancel">Cancel</button>
                                    </div>
                    
                </form>
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
            const regex = /^[0-9]{5,6}$/;
            if (!regex.test(value)) {
                return 'Postal Code is not valid';
            }
        });

        this.register('district', (value) => {
            if (!value) {
                return 'District is required';
            }
        });

        this.register('city', (value) => {
            if (!value) {
                return 'City is required';
            }
        });
    }

    protected addEventListener(): void {
        super.addEventListener();
        this.signEvent('.btn-add', 'click', () => {
            this.setState({ isAdd: true });
        });

        this.signEvent('.btn-cancel', 'click', () => {
            this.setState({ isAdd: false });
        });

        this.signEvent('.btn-save', 'click', () => {
            this.addAddress();
        });
    }

    private addAddress = async () => {
        const data = await this.getDataForm();
        if (data) {
            const newAdd = { ...data, userId: userReducer.getData?.userId };
            const res = await addressService.create(newAdd);
            if (res) {
                toast.success('Add address success');
                signal.emit('address-user-update');
            }
        }
    };
}

interface UserAddressFormProps {
    address: AddressInfo;
}

type AddressState = Pick<AddressInfo, 'address' | 'city' | 'district' | 'postalCode' | 'country'>;
interface UserAddressFormState {
    isEdit: boolean;
    add: AddressState;
}
class UserAdressFrom extends QBForm<UserAddressFormProps, UserAddressFormState> {
    constructor(props: UserAddressFormProps) {
        super(props);
        this.state = {
            isEdit: false,
            add: {
                address: props.address.address,
                city: props.address.city,
                district: props.address.district,
                postalCode: props.address.postalCode,
                country: props.address.country,
            },
        };
    }
    protected markup: () => string = () => {
        return /*html*/ `
        <form class="content">
        <!-- address -->
            <div class="p-6 rounded-xl border border-gray-200">
                <div class="flex items-center justify-between">
                    <p>User Address</p>
                    <div class="flex items-center">
                        <button class="font-medium text-gray-500 hover:text-blue-900 hover:underline btn-edit">
                            <i class="fa-regular fa-pen-to-square"></i> Edit
                        </button>
                    </div>
                </div>

                <div class="flex flex-col gap-5">
                    <div class="grid grid-cols-2 gap-5">

                        <div class="relative">
                            <label class="text-sm text-gray-500" for="city">
                                City
                            </label>
                            <input
                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${
                                    this.error('city') ? 'border-red-500' : ''
                                }"
                                id="city" name="city" type="text" placeholder="Anytown" ${
                                    this.state.add?.city ? `value="${this.state.add?.city}"` : ''
                                }
                                ${!this.state.isEdit ? 'readonly' : ''}
                                />
                            ${
                                this.error('city')
                                    ? `<p class="text-red-500 py-1">${this.error('city')?.message}</p>`
                                    : ''
                            }
                        </div>

                        <div class="relative">
                            <label class="text-sm text-gray-500" for="district">
                                District
                            </label>
                            <input
                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                id="district" name="district" type="text" placeholder="District 1" ${
                                    this.state.add?.district ? `value="${this.state.add?.district}"` : ''
                                }
                                ${!this.state.isEdit ? 'readonly' : ''}
                            />
                            ${
                                this.error('district')
                                    ? `<p class="text-red-500 py-1">${this.error('district')?.message}</p>`
                                    : ''
                            }
                        </div>

                        <div class="relative">
                            <label class="text-sm text-gray-500" for="country">
                                Country
                            </label>
                            <input
                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${
                                    this.error('country') ? 'border-red-500' : ''
                                }"
                                id="country" name="country" type="text" placeholder="Country" ${
                                    this.state.add?.country ? `value="${this.state.add?.country}"` : ''
                                }
                                ${!this.state.isEdit ? 'readonly' : ''}
                            />
                            ${
                                this.error('country')
                                    ? `<p class="text-red-500 py-1">${this.error('country')?.message}</p>`
                                    : ''
                            }
                        </div>

                        <div class="relative">
                            <label class="text-sm text-gray-500" for="postalCode">
                                Postal Code
                            </label>
                            <input
                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${
                                    this.error('postalCode') ? 'border-red-500' : ''
                                }"
                                id="postalCode" name="postalCode" type="text" placeholder="123456" ${
                                    this.state.add?.postalCode ? `value="${this.state.add?.postalCode}"` : ''
                                }
                                ${!this.state.isEdit ? 'readonly' : ''}
                            />
                            ${
                                this.error('postalCode')
                                    ? `<p class="text-red-500 py-1">${this.error('postalCode')?.message}</p>`
                                    : ''
                            }
                        </div>


                    </div>
                    <div class="relative">
                        <label class="text-sm text-gray-500" for="address">
                            Address
                        </label>
                        <input
                            class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${
                                this.error('address') ? 'border-red-500' : ''
                            }"
                            id="address" name="address" type="text" placeholder="123 Main St" ${
                                this.state.add?.address ? `value="${this.state.add?.address}"` : ''
                            }
                            ${!this.state.isEdit ? 'readonly' : ''}
                        />
                        ${
                            this.error('address')
                                ? `<p class="text-red-500 py-1">${this.error('address')?.message}</p>`
                                : ''
                        }
                    </div>
                       
                    ${
                        this.state.isEdit
                            ? /*html*/ `
                            <div class=" flex items-center justify-between">
                         <div class="flex gap-5">
                                        <button
                                            class="py-2 px-6 rounded-lg bg-blue-500 text-white hover:bg-blue-600 btn-save">Save</button>
                                        <button
                                            class="py-2 px-6 rounded-lg bg-red-500 text-white hover:bg-red-600 btn-cancel">Cancel</button>
                                    </div>
                                    <div>
                                        <button
                                            class="py-2 px-6 rounded-lg bg-red-100 text-red-500 hover:bg-red-200 btn-delete">Delete</button>
                                    </div>
                        </div>
                        `
                            : ''
                    }
                    
                </div>
            </div>

            <!-- address -->
        </form>
        `;
    };

    /// difine schema
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
            const regex = /^[0-9]{5,6}$/;
            if (!regex.test(value)) {
                return 'Postal Code is not valid';
            }
        });

        this.register('district', (value) => {
            if (!value) {
                return 'District is required';
            }
        });

        this.register('city', (value) => {
            if (!value) {
                return 'City is required';
            }
        });
    }

    protected addEventListener(): void {
        super.addEventListener();
        this.signEvent('.btn-edit', 'click', () => {
            this.setState({
                isEdit: !this.state.isEdit,
            });
        });

        this.signEvent('.btn-cancel', 'click', () => {
            this.setState({
                isEdit: false,
            });
        });

        this.signEvent('.btn-save', 'click', () => {
            this.updateAddress();
        });

        this.signEvent('.btn-delete', 'click', () => {
            this.deleteAdress();
        });
    }

    // support
    private async updateAddress() {
        const id = this.props.address._id;

        const data = await this.getDataForm();
        const res = await addressService.updateById(id, data);
        if (res) {
            const address = _.pick(res, ['address', 'city', 'district', 'country', 'postalCode']) as AddressState;
            this.setState({
                isEdit: false,
                add: address,
            });

            toast.success('Update address success!');
        } else {
            toast.error('Update address fail!');
        }
    }

    protected async afterRender(): Promise<void> {
        super.afterRender();

        const address = _.pick(this.props.address, [
            'address',
            'city',
            'district',
            'country',
            'postalCode',
        ]) as AddressState;
        this.setState({ add: address });
    }

    private async deleteAdress() {
        const id = this.props.address._id;

        const res = await addressService.deleteById(id);
        if (res) {
            toast.success('Delete address success!');
        } else {
            toast.error('Delete address fail!');
        }
        signal.emit('address-user-update');
    }
}

export default UserAdressFrom;
