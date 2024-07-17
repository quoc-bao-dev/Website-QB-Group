import QBComponent from '../../lib/QBComponent';
import FormRegister from './partials/FormRegister';

class RegisterPage extends QBComponent {
    constructor() {
        super(null);
        this.pathTemplate = '/src/pages/register/index.html';
    }

    protected renderUI(): void {
        super.renderUI();
        this.renderForm();
    }

    private renderForm() {
        this.renderComponent('#register-form', new FormRegister());
    }
}

export default RegisterPage;
