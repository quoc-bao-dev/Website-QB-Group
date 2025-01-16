import _ from 'lodash';
import validator from 'validator';
import userService from '../../../api/userService';
import { IUser } from '../../../interface/user';
import QBForm from '../../../lib/QBForm';
import userReducer from '../../../store/userReducer';
import toast from '../../../util/toast';

interface UserAddressFormState {
    isShowEdit: boolean;
    userInfo: Pick<IUser, 'email' | 'firstName' | 'lastName' | 'phoneNumber'>;
}
class UserInfoForm extends QBForm<{}, UserAddressFormState> {
    constructor() {
        super();
        this.state = {
            isShowEdit: false,
            userInfo: {
                email: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
            },
        };
    }

    protected markup: () => string = () => {
        return /*html*/ `
        
        <!-- user info -->
            <form class="contents">
                <div class="p-6 rounded-xl border border-gray-200">
                <div class="flex items-center justify-between">
                    <p>User Info</p>
                    <div class="flex items-center">
                        <button class="font-medium text-gray-500 hover:text-blue-900 hover:underline btn-edit">
                            <i class="fa-regular fa-pen-to-square"></i> Edit
                        </button>
                    </div>
                </div>

                <div class="flex flex-col gap-5">
                    <div class="grid grid-cols-2 gap-5">
                        <div class="relative">
                            <label class="text-sm text-gray-500" for="email">
                                Email
                            </label>
                            <input
                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${
                                    this.error('email') ? 'border-red-500' : ''
                                }"
                                id="email" name="email" type="email" placeholder="example@gmail.com" ${
                                    this.state.userInfo?.email ? `value="${this.state.userInfo?.email}"` : ''
                                }
                                ${!this.state.isShowEdit ? 'readonly' : 'disabled'}
                                
                            />
                            ${
                                this.error('email')
                                    ? `<p class="text-red-500 py-1">${this.error('email')?.message}</p>`
                                    : ''
                            }
                        </div>

                        <div class="relative">
                            <label class="text-sm text-gray-500" for="phone">
                                Phone
                            </label>
                            <input
                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${
                                    this.error('phone') ? 'border-red-500' : ''
                                }"
                                id="phone" name="phone" type="tel" placeholder="(123) 456-7890" ${
                                    this.state.userInfo?.phoneNumber
                                        ? `value="${this.state.userInfo?.phoneNumber}"`
                                        : ''
                                }
                                ${!this.state.isShowEdit ? 'readonly' : ''}
                            />
                            ${
                                this.error('phone')
                                    ? `<p class="text-red-500 py-1">${this.error('phone')?.message}</p>`
                                    : ''
                            }
                        </div>

                        <div class="relative">
                            <label class="text-sm text-gray-500" for="firstName">
                                First Name
                            </label>
                            <input
                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${
                                    this.error('firstName') ? 'border-red-500' : ''
                                }"
                                id="firstName" name="firstName" type="text" placeholder="John" ${
                                    this.state.userInfo?.firstName ? `value="${this.state.userInfo?.firstName}"` : ''
                                }
                                ${!this.state.isShowEdit ? 'readonly' : ''}
                            />
                            ${
                                this.error('firstName')
                                    ? `<p class="text-red-500 py-1">${this.error('firstName')?.message}</p>`
                                    : ''
                            }
                        </div>

                        <div class="relative">
                            <label class="text-sm text-gray-500" for="lastName">
                                Last Name
                            </label>
                            <input
                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${
                                    this.error('lastName') ? 'border-red-500' : ''
                                }"
                                id="lastName" name="lastName" type="text" placeholder="Doe" ${
                                    this.state.userInfo?.lastName ? `value="${this.state.userInfo?.lastName}"` : ''
                                }
                                ${!this.state.isShowEdit ? 'readonly' : ''}
                            />
                            ${
                                this.error('lastName')
                                    ? `<p class="text-red-500 py-1">${this.error('lastName')?.message}</p>`
                                    : ''
                            }
                        </div>

                </div>

                ${
                    this.state.isShowEdit
                        ? /*html*/ `
                        <div class="flex gap-5">
                                        <button
                                            class="py-2 px-6 rounded-lg bg-blue-500 text-white hover:bg-blue-600 btn-save">Save</button>
                                        <button
                                            class="py-2 px-6 rounded-lg bg-red-500 text-white hover:bg-red-600 btn-cancel">Cancel</button>
                                    </div>
                        `
                        : ``
                }
            </div>
            </form>
         <!-- user info -->                   
        `;
    };

    protected schema(): void {
        this.register('phone', (value) => {
            if (!value) {
                return 'Phone is required';
            }

            if (!validator.isMobilePhone(value)) {
                return 'Phone is invalid';
            }
        });

        this.register('firstName', (value) => {
            if (!value) {
                return 'First Name is required';
            }
        });

        this.register('lastName', (value) => {
            if (!value) {
                return 'Last Name is required';
            }
        });
    }

    protected addEventListener(): void {
        super.addEventListener();
        this.signEvent('.btn-edit', 'click', () => {
            this.clearError();
            this.setState({
                isShowEdit: !this.state.isShowEdit,
            });
        });

        this.signEvent('.btn-cancel', 'click', () => {
            this.clearError();
            this.setState({
                isShowEdit: false,
            });
        });

        this.signEvent('.btn-save', 'click', () => {
            this.updateUserInfo();
        });
    }

    protected async afterRender(): Promise<void> {
        super.afterRender();
        const userId = userReducer.getData?.userId;
        if (userId) {
            const user = await userService.getUserById(userId);
            const userInfo = _.pick(user, ['firstName', 'lastName', 'email', 'phoneNumber']);
            this.setState({ userInfo });
        } else {
        }
    }

    //support
    private async updateUserInfo() {
        const data = await this.getDataForm();

        if (data) {
            //? fix type
            // const newData = _.mapKeys(data, (value, key) => keyMap[key] || key);
            const newData = {
                ...data,
                phoneNumber: data.phone,
            };

            const userId = userReducer.getData?.userId;

            const result = await userService.updateUserById(<string>userId, newData);

            if (result) {
                this.setState({ isShowEdit: false, userInfo: result });
                toast.success('Update success');
            } else {
                toast.error('Update failed');
            }
        }
    }
}

export default UserInfoForm;
