import QBComponent from '../../lib/QBComponent';
import QBRouter from '../../lib/QBRouter';
import userReducer from '../../store/userReducer';
import { getFormData } from '../../util/form';
import toast from '../../util/toast';

class LoginPage extends QBComponent {
    constructor() {
        super(null);
        this.pathTemplate = '/src/pages/login/index.html';
    }

    //event
    protected addEventListener(): void {
        this.eventLogin();
    }

    private eventLogin() {
        this.signEvent('#login-form', 'submit', (e) => {
            e.preventDefault();
        });
        this.signEvent('#btn-login', 'click', async () => {
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
        });
    }
}

export default LoginPage;
