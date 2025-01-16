import _ from 'lodash';
import authenService from '../../../api/authenService';
import userService from '../../../api/userService';
import FormContext from '../../../lib/FormContext';
import QBForm from '../../../lib/QBForm';
import userReducer from '../../../store/userReducer';
import toast from '../../../util/toast';

interface FormConfrimCodeProps {
    onClose: () => void;
    isShow: boolean;
}
class FormConfirmCode extends QBForm<FormConfrimCodeProps> {
    constructor(props: FormConfrimCodeProps) {
        super(props);
    }

    protected markup: () => string = () => {
        return /*html*/ `
        <div class="fixed w-full h-full top-0 left-0 bg-gray-900 bg-opacity-50 z-50 grid place-content-center ${
            this.props.isShow ? '' : 'hidden'
        }">
            <div class="bg-white p-6 rounded-lg">
                <div class="flex items-center justify-between">
                    <p class="text-lg font-semibold text-gray-900 whitespace-nowrap">Confirm Code</p>
                    <button class="btn-close">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <form class="flex flex-col gap-5 mt-6">
                    <div class="relative">
                        <label class="text-sm text-gray-500" for="code">
                            Enter code
                        </label>
                        <input
                            class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 text-center text-xl text-gray-900 font-semibold leading-3"
                            id="code" name="code" type="text"
                            placeholder="Enter code">
                    </div>
                    <div class="flex justify-end"></div>
                        <button class="btn-submit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
                            Confrim
                        </button>
                </form>
            </div>
        </div>
        `;
    };

    protected addEventListener(): void {
        super.addEventListener();
        this.signEvent('.btn-close', 'click', () => {
            this.props.onClose();
        });

        this.signEvent('.btn-submit', 'click', this.changePass);
    }

    private changePass = async () => {
        const code = await this.getDataForm();
        const dataChange = await FormContext.getForm('change-pass-form');

        const email = userReducer.getData?.email;
        const data = {
            email,
            password: dataChange.currentPassword,
            newPassword: dataChange.newPassword,
            code,
        };

        const res = await authenService.changePassword(data);
        if (res) {
            toast.success('Change password success');
            localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
            localStorage.setItem('refreshToken', JSON.stringify(res.refreshToken));
            this.props.onClose();
        }
    };
}
interface ChangePassFormState {
    isShowFormCode: boolean;
}
class ChangePassForm extends QBForm<{}, ChangePassFormState> {
    constructor() {
        super();
        this.formContextKey = 'change-pass-form';
        this.cacheKey = 'change-pass-form';
    }
    protected markup: () => string = () => {
        return /*html*/ `
        <form class="content">
        <!-- change pass -->
            <div class="p-6 rounded-xl border border-gray-200">
                Change Password

                <div class="flex flex-col gap-5">
                    <div class="relative">
                        <label class="text-sm text-gray-500" for="currentPassword">
                            Current Password
                        </label>
                        <input class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300"
                            id="currentPassword" name="currentPassword" type="password"
                            placeholder="Enter your current password">
                            ${
                                this.error('currentPassword')
                                    ? `<p class="text-red-500 py-1">${this.error('currentPassword')?.message}</p>`
                                    : ''
                            }
                    </div>

                    <div class="relative">
                        <label class="text-sm text-gray-500" for="newPassword">
                            New Password
                        </label>
                        <input class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300"
                            id="newPassword" name="newPassword" type="password"
                            placeholder="Enter your new password">
                            ${
                                this.error('newPassword')
                                    ? `<p class="text-red-500 py-1">${this.error('newPassword')?.message}</p>`
                                    : ''
                            }
                    </div>

                    <div class="relative">
                        <label class="text-sm text-gray-500" for="confirmPassword">
                            Confirm New Password
                        </label>
                        <input class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300"
                            id="confirmPassword" name="confirmPassword" type="password"
                            placeholder="Confirm your new password">
                            ${
                                this.error('confirmPassword')
                                    ? `<p class="text-red-500 py-1">${this.error('confirmPassword')?.message}</p>`
                                    : ''
                            }
                    </div>

                    <button
                        class="w-full p-3 bg-blue-500 text-white rounded-lg border-none focus:ring-blue-300 hover:bg-blue-600 btn-change-pass disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200"
                        type="submit" ${this.isFillAll ? '' : 'disabled'}>
                        Change Password
                    </button>
                </div>
            </div>
            <!-- change pass -->
        </form> 
        
        <div class="contents" id="form-confirm-code"></div>
    
        `;
    };

    protected renderUI(): void {
        super.renderUI();

        if (this.state.isShowFormCode) {
            this.renderUIChangePass();
        }
    }

    private renderUIChangePass() {
        this.renderComponent(
            '#form-confirm-code',
            new FormConfirmCode({
                isShow: true,
                onClose: () => {
                    this.setState({ isShowFormCode: false });
                },
            })
        );
    }

    protected schema(): void {
        this.register('currentPassword', (value) => {
            if (!value) {
                return 'Please enter your current password';
            }
        });

        this.register('newPassword', (value) => {
            if (!value) {
                return 'Please enter your new password';
            }

            if (value === this.field('currentPassword')!.value) {
                return 'New password cannot be the same as the current password';
            }

            if (value.length < 8) {
                return 'Password must be at least 8 characters';
            }

            if (value.length > 32) {
                return 'Password must be less than 32 characters';
            }
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/.test(value)) {
                return 'Password must be at least one uppercase letter, one lowercase letter, one number, and one special character';
            }
        });

        this.register('confirmPassword', (value) => {
            if (!value) {
                return 'Please confirm your new password';
            }

            if (value !== this.field('newPassword')!.value) {
                return 'Passwords do not match';
            }
        });
    }

    protected addEventListener(): void {
        super.addEventListener();

        this.signEvent('.btn-change-pass', 'click', () => {
            this.changePass();
        });
    }
    private async changePass() {
        const userId = userReducer.getData?.userId as string;
        const user = await userService.getUserById(userId);
        const password = user.password;
        if (password !== this.field('currentPassword')!.value) {
            toast.error('Current password is incorrect');
            return;
        } else {
            const data = await this.getDataForm();
            if (data) {
                /// gui mail xac nhap
                const res = await authenService.verifyChangePassword();
                if (res.status) {
                    this.setState({ isShowFormCode: true });
                }

                /// nhan mat khau tu

                /// show form nhap code
            }
        }
    }
}

export default ChangePassForm;
