import QBComponent from '../../lib/QBComponent';
import CheckoutAddress from './partials/CheckoutAddress';
import CheckoutInfo from './partials/CheckoutInfo';

class CheckOutPage extends QBComponent {
    constructor() {
        super(null);
        this.pathTemplate = '/src/pages/checkout/index.html';
    }

    //UI
    protected renderUI(): void {
        super.renderUI();
        this.renderCheckoutAddress();
        this.renderCheckoutInfo();
    }
    private renderCheckoutAddress() {
        this.renderComponent('#checkout-address', new CheckoutAddress());
    }
    private renderCheckoutInfo() {
        this.renderComponent('#checkout-info', new CheckoutInfo());
    }
    // event
}

export default CheckOutPage;
