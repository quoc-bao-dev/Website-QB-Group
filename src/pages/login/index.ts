import QBComponent from '../../lib/QBComponent';
import QBRouter from '../../lib/QBRouter';
import userReducer from '../../store/userReducer';
import { getFormData } from '../../util/form';
import toast from '../../util/toast';

class LoginPage extends QBComponent {
    constructor() {
        super();
    }

    protected markup: () => string = () => {
        return /*html*/ `<section class="section bg-gray-100">
    <div class="container">
        <div
            class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full md:max-w-4xl mx-auto">

            <!-- Left side with image -->
            <div class="hidden md:block md:w-1/2">
                <img src="https://pcdn.beyondthebox.com.au/wp-content/uploads/2023/11/MacBookPro14-inchBlackboth.jpg"
                    alt="Login Image" class="object-cover w-full h-full">
            </div>

            <!-- Right side with form -->
            <div class="w-full md:w-1/2 p-8 bg-white bg-opacity-80 backdrop-blur-sm">
                <h2 class="text-2xl font-bold text-gray-700 mb-6">Login</h2>

                <form action="#" method="POST" id="login-form">
                    <!-- Email/Username Field -->
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium text-gray-700">Email/Username</label>
                        <input type="text" id="email" name="email" value="pythagore1102@gmail.com"
                            class="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required>
                    </div>

                    <!-- Password Field -->
                    <div class="mb-4">
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" value="111111"
                            class="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required>
                    </div>

                    <!-- Remember Me and Forgot Password -->
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center">
                            <input type="checkbox" id="remember" name="remember"
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                            <label for="remember" class="ml-2 block text-sm text-gray-700">Remember me</label>
                        </div>
                        <div>
                            <a href="#" class="text-sm text-blue-600 hover:underline">Forgot password?</a>
                        </div>
                    </div>

                    <!-- Login Button -->
                    <button type="submit"
                        class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        id="btn-login">Login</button>
                    <!-- Login with Google Button -->
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
                        Login with Google
                    </button>
                </form>

                <!-- Register Link -->
                <div class="mt-8 text-center">
                    <p class="text-sm text-gray-600">Don't have an account? <a href="#"
                            class="text-blue-600 hover:underline">Register</a></p>
                </div>
            </div>
        </div>
    </div>
</section>`;
    };

    //event
    protected addEventListener(): void {
        this.eventLogin();
    }

    private eventLogin() {
        this.signEvent('#login-form', 'submit', (e) => {
            e.preventDefault();
        });
        this.signEvent('#btn-login', 'click', async () => {
            try {
                const form = await getFormData('#login-form');
                const loginSuccess = await userReducer.login(form!.email, form!.password);

                if (loginSuccess) {
                    toast.success('Đăng nhập thành công');
                    setTimeout(() => {
                        QBRouter.prev();
                    }, 1000);
                } else {
                    toast.error('Đăng nhập thất bại');
                }
            } catch (error) {
                toast.error('Đăng nhập thất bại');
            }
        });
    }
}

export default LoginPage;
