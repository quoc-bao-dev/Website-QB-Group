import QBComponent from '../../lib/QBComponent';
import FormRegister from './partials/FormRegister';

class RegisterPage extends QBComponent {
    constructor() {
        super();
    }

    protected markup: () => string = () => {
        return /*html*/ `
        
        <section class="section">
    <div class="container">
        <div
            class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full md:max-w-4xl mx-auto">

            <!-- Left side with image -->
            <div class="hidden md:block md:w-1/2">
                <img src="https://beyondthebox.ph/cdn/shop/files/Preorder-SEA_iPhone_15_Pro_Sep23_Web_Banner_Pre-Avail_750x1150_FFH_750x.png?v=1697079609"
                    alt="Register Image" class="object-cover w-full h-full">
            </div>

            <!-- Right side with form -->
            <div class="w-full md:w-1/2 p-8 bg-white bg-opacity-80 backdrop-blur-sm">
                <h2 class="text-2xl font-bold text-gray-700 mb-6">Register</h2>

                <div class="contents" id="register-form"></div>

                <!-- Login Link -->
                <div class="mt-8 text-center">
                    <p class="text-sm text-gray-600">Already have an account? <a href="/login"
                            class="text-blue-600 hover:underline">Login</a></p>
                </div>
            </div>
        </div>
    </div>
</section>`;
    };

    protected renderUI(): void {
        super.renderUI();
        this.renderForm();
    }

    private renderForm() {
        this.renderComponent('#register-form', new FormRegister());
    }
}

export default RegisterPage;
