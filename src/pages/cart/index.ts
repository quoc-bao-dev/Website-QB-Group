import QBComponent from '../../lib/QBComponent';
import QBRouter from '../../lib/QBRouter';
import Listener from '../../lib/listener';
import userReducer from '../../store/userReducer';
import CartPageInfo from './partials/CartPageInfo';
import CartPageListItem from './partials/CartPageList';

class CartPage extends QBComponent {
    constructor() {
        super(null);
        this.pathTemplate = '/src/pages/cart/index.html';
        this.state = {
            trigger: false,
        };

        Listener.on(
            'cart-change',
            () => {
                this.setState({
                    trigger: true,
                });
            },
            'cart-page-rerender'
        );
    }

    protected async beforeRender(): Promise<void> {
        const isLogin = await userReducer.verify();

        if (!isLogin) {
            this.rejectRender();
            QBRouter.nav('/login');
        }
    }

    protected renderUI(): void {
        super.renderUI();
        this.renderListCart();
        this.renderCartInfo();
    }
    private renderListCart() {
        this.renderComponent('#cart-list-container', new CartPageListItem());
    }
    private renderCartInfo() {
        this.renderComponent('#cart-info', new CartPageInfo());
    }
}

export default CartPage;
