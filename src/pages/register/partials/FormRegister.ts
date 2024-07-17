import authenService from '../../../api/authenService';
import QBForm from '../../../lib/QBForm';
import QBRouter from '../../../lib/QBRouter';
import userReducer from '../../../store/userReducer';
import toast from '../../../util/toast';

class FormRegister extends QBForm {
    protected markup: () => string = () => {
        return /*html*/ `
        <form class = "">
                    <!-- Username Field -->
                    <div class="pb-3">
                        <label for="username" class="text-gray-600 font-bold text-lg">Username</label>
                        <input type="text" name="username" id="username" placeholder="john_doe"
                            class="w-full mt-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-600 ${
                                this.error('username') ? 'border-red-500' : ''
                            }" 
                            value="Quocbao_photo"
                            />
                        ${
                            this.error('username')
                                ? `<p class="text-red-500 py-1">${this.error('username')?.message}</p>`
                                : ''
                        }
                    </div>

                    <!-- Email Field -->
                    <div class="pb-3">
                        <label for="email" class="text-gray-600 font-bold text-lg">Email</label>
                        <input type="email" name="email" id="email" placeholder="john_doe@gmail.com"
                            class="w-full mt-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-600 ${
                                this.error('email') ? 'border-red-500' : ''
                            }" 
                            value="pythagore1102@gmail.com"
                            />
                        ${this.error('email') ? `<p class="text-red-500 py-1">${this.error('email')?.message}</p>` : ''}
                    </div>

                    <!-- First Name Field -->
                    <div class="pb-3">
                        <label for="firstName" class="text-gray-600 font-bold text-lg">First Name</label>
                        <input type="text" name="firstName" id="firstName" placeholder="John"
                            class="w-full mt-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-600 ${
                                this.error('firstName') ? 'border-red-500' : ''
                            }" 
                            value="Quoc Bao"
                            />
                        ${
                            this.error('firstName')
                                ? `<p class="text-red-500 py-1">${this.error('firstName')?.message}</p>`
                                : ''
                        }
                    </div>

                    <!-- Last Name Field -->
                    <div class="pb-3">
                        <label for="lastName" class="text-gray-600 font-bold text-lg">Last Name</label>
                        <input type="text" name="lastName" id="lastName" placeholder="Doe"
                            class="w-full mt-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-600 ${
                                this.error('lastName') ? 'border-red-500' : ''
                            }" 
                            value="Truong"
                            />
                        ${
                            this.error('lastName')
                                ? `<p class="text-red-500 py-1">${this.error('lastName')?.message}</p>`
                                : ''
                        }
                    </div>

                    <!-- Password Field -->
                    <div class="pb-3">
                        <label for="password" class="text-gray-600 font-bold text-lg">Password</label>
                        <input type="password" name="password" id="password" placeholder="********"
                            class="w-full mt-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-600 ${
                                this.error('password') ? 'border-red-500' : ''
                            }" 
                            value="111111"
                            />
                        ${
                            this.error('password')
                                ? `<p class="text-red-500 py-1">${this.error('password')?.message}</p>`
                                : ''
                        }

                    </div>

                    <!-- Confirm Password Field -->
                    <div class="pb-3">
                        <label for="confirmPassword" class="text-gray-600 font-bold text-lg">Confirm
                            Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="********"
                            class="w-full mt-1 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-600 ${
                                this.error('confirmPassword') ? 'border-red-500' : ''
                            }" 
                            value="111111"
                            />
                        ${
                            this.error('confirmPassword')
                                ? `<p class="text-red-500 py-1">${this.error('confirmPassword')?.message}</p>`
                                : ''
                        }

                    <!-- Register Button -->
                    <button type="submit" id="btn-submit"
                        class="w-full bg-blue-600 text-white py-3 mt-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Register</button>

                    <!-- Register with Google Button -->
                    <button type="button"
                        class="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-4">
                        <svg class="w-6 h-6 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                d="M23.766 12.26c0-.842-.076-1.647-.217-2.417H12v4.58h6.65c-.285 1.516-1.118 2.8-2.388 3.661v3.017h3.864c2.261-2.082 3.56-5.148 3.56-8.84z" />
                            <path
                                d="M12 24c3.24 0 5.95-1.08 7.93-2.92l-3.86-3.017c-1.075.717-2.437 1.143-4.07 1.143-3.136 0-5.794-2.114-6.746-4.956H1.208v3.097C3.18 21.42 7.205 24 12 24z" />
                            <path
                                d="M5.254 14.25c-.29-.872-.454-1.799-.454-2.75s.164-1.878.454-2.75V6.653H1.208C.437 8.214 0 10.053 0 12s.437 3.786 1.208 5.347l4.046-3.097z" />
                            <path
                                d="M12 4.8c1.668 0 3.168.576 4.353 1.707l3.222-3.222C17.95 1.08 15.24 0 12 0 7.205 0 3.18 2.58 1.208 6.653l4.046 3.097C6.206 6.914 8.864 4.8 12 4.8z" />
                        </svg>
                        Register with Google
                    </button>
                </form>
        `;
    };
    protected schema() {
        this.register('username', (value) => {
            if (!value) {
                return `Please enter username`;
            }
            if (value.length < 3) {
                return `Please enter at least 3 characters`;
            }
        });
        this.register('email', (value) => {
            if (!value) {
                return `Please enter email`;
            }
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                return `Please enter valid email`;
            }
        });
        this.register('firstName', (value) => {
            if (!value) {
                return `Please enter first name`;
            }
            if (value.length < 3) {
                return `Please enter at least 3 characters`;
            }
        });
        this.register('lastName', (value) => {
            if (!value) {
                return `Please enter last name`;
            }
            if (value.length < 3) {
                return `Please enter at least 3 characters`;
            }
        });
        this.register('password', (value) => {
            if (!value) {
                return `Please enter password`;
            }
            if (value.length < 6) {
                return `Please enter at least 6 characters`;
            }
        });
        this.register('confirmPassword', (value) => {
            if (!value) {
                return `Please enter confirm password`;
            }
            if (value !== this.field('password')!.value) {
                return `Confirm password is not match`;
            }
        });
    }

    protected addEventListener(): void {
        super.addEventListener();
        this.signEvent('#btn-submit', 'click', this.submitForm.bind(this));
    }

    // support
    private async submitForm() {
        const formData = await this.getDataForm();
        // console.log(formData);
        if (formData) {
            try {
                const result = await authenService.register(formData);

                try {
                    await userReducer.login(result.email, result.password);
                } catch (error) {
                    toast.error('Login failed!');
                }

                toast.success('Register success!');

                setTimeout(() => {
                    QBRouter.nav('/');
                }, 2000);
            } catch (error) {
                toast.error('Account already exists!');
            }
        }
    }
}

export default FormRegister;
