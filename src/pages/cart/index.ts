import QBComponent from '../../lib/QBComponent';
import QBRouter from '../../lib/QBRouter';
import signal from '../../lib/listener';
import userReducer from '../../store/userReducer';
import CartPageInfo from './partials/CartPageInfo';
import CartPageListItem from './partials/CartPageList';

class CartPage extends QBComponent {
    constructor() {
        super();
        this.state = {
            trigger: false,
        };

        signal.on(
            'cart-change',
            () => {
                this.setState({
                    trigger: true,
                });
            },
            'cart-page-rerender'
        );
    }

    protected markup: () => string = () => {
        return /*html*/ `
        <section class="section">
    <div class="container">
        <h1 class="text-3xl font-bold pb-5">Cart</h1>
        <div class="grid grid-cols-12 gap-5">
            <div class="contents" id="cart-list-container"></div>

            <!-- cart info -->
            <div class="contents" id="cart-info"></div>
        </div>
</section>
        `;
    };

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
