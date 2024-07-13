import cartReducer from '../../../../store/cartReducer';
import QBComponent from '../../../../lib/QBComponent';
import QBRouter from '../../../../lib/QBRouter';
import Listener from '../../../../lib/listener';
import { ICartItem } from '../../../../interface/cart';
import { prd, usd } from '../../../../util/productUtils';

class HeaderCartItem extends QBComponent<ICartItem> {
    constructor(props: ICartItem) {
        super(props);
    }
    markup = () => {
        return /*html*/ `
            <div class="p-3 bg-white border rounded">
                        <div class="grid grid-cols-12 gap-3">
                            <div class="col-span-3 grid place-items-center">
                                <div class="w-full aspect-[1/1]">
                                    <img src="${this.props.product.image}" alt="" class="w-full h-full object-cover">
                                </div>
                            </div>
                            <div class="col-span-8">
                                <h3 class="text-base font-semibold text-gray-600">${this.props.product.name}</h3>
                                <div class="">
                                    <div class="flex gap-4 grid grid-cols-2">
                                        <div class="flex gap-2 items-center">
                                            <p class="text-red-700 font-semibold flex items-center">${prd.sl(
                                                this.props.product
                                            )}</p>
                                            x ${this.props.quantity}
                                        </div>
                                        <div class="p-2 bg-gray-200 text-gray-400 rounded overflow-hidden">
                                            <div class="grid grid-cols-3 ">
                                                <div class="grid place-items-center btn-minus">
                                                    <i class="fa-solid fa-minus"></i>
                                                </div>
                                                <input class="focus:ring-0 border-0 bg-transparent p-0 text-center" id="input-quantity" min="1" type="text" value="${
                                                    this.props.quantity
                                                }"
                                                    class="w-full text-center bg-transparent border-0 p-0 m-0 outline-none">
                                                <div class=" grid place-items-center btn-plus" >
                                                    <i class="fa-solid fa-plus"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-1" id="btn-cancle">
                                <i class="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                    </div>
        `;
    };

    // event
    protected addEventListener(): void {
        this.eventRemoveItem();
        this.eventPlus();
        this.eventMinus();
        this.enventChangeQuantity();
    }

    private eventRemoveItem() {
        this.signEvent('.fa-xmark', 'click', () => {
            cartReducer.removeProductFromCart(this.props.product);
        });
    }
    private eventPlus() {
        this.signEvent('.fa-plus', 'click', () => {
            const value = this.getQuantity();
            cartReducer.changeQuantity(this.props.product, value + 1);
        });
    }

    private eventMinus() {
        this.signEvent('.fa-minus', 'click', () => {
            const value = this.getQuantity() <= 1 ? 1 : this.getQuantity() - 1;
            cartReducer.changeQuantity(this.props.product, value);
        });
    }

    private enventChangeQuantity() {
        this.signEvent('#input-quantity', 'change', () => {
            const value = this.getQuantity();
            cartReducer.changeQuantity(this.props.product, value);
        });
    }

    // support
    private getQuantity() {
        return Number((this.element.querySelector('#input-quantity') as HTMLInputElement).value);
    }
}

interface HeaderCartState {
    trigger: boolean;
    isShow: boolean;
}
class HeaderCartSidebar extends QBComponent<{}, HeaderCartState> {
    constructor() {
        super(null);
        this.state.trigger = false;
        this.state.isShow = false;

        Listener.on(
            'cart-change',
            () => {
                this.listenCart();
            },
            'cart-header'
        );
        Listener.on(
            'page-change',
            () => {
                this.hideCart();
            },
            'cart-header-change-page'
        );
    }

    protected markup: () => string = () => {
        return /*html*/ `
             <div class="fixed inset-0 bg-black/50 z-10 cart-drawer-wrapper ${
                 this.state.isShow ? 'show' : ''
             }" id="cart-drawer-wrapper">
        <div class="flex h-full justify-end cart-drawer ${this.state.isShow ? 'show' : ''} " id="cart-drawer">
            <div class="p-6 bg-white h-full w-[500px] flex flex-col">
                <div class="">
                    <div class="flex justify-between">
                        <h2 class="text-2xl font-bold">Cart</h2>
                        <i class="fa-solid fa-xmark text-xl" id="close-cart-btn"></i>
                    </div>
                    ${
                        cartReducer.getQuantity > 0
                            ? /*html*/ `<p class="text-gray-400 text-sm pt-2 pb-5" >${cartReducer.getQuantity} item${
                                  cartReducer.getQuantity > 1 ? 's' : ''
                              } </p>`
                            : /*html*/ `<p class="text-center text-gray-400">No item in cart</p>`
                    }
                    <div class="h-[1px] w-full bg-gray-200 mt-2 mb-4"></div>
                </div>
                <div class="flex-1 flex flex-col gap-3 overflow-y-auto" id="cart-items">
                </div>
                <div class="h-[1px] w-full bg-gray-200 mt-4"></div>
                <div class="mt-auto">
                    <div class="pt-5">
                        <div class="flex flex-col gap-1">
                            <div class="flex justify-between">
                                <p class="text-gray-600">Subtotal</p>
                                <p class="text-gray-600 font-bold" id="sub-total">${usd(cartReducer.getSubtotal)}</p>
                            </div>
                            <div class="flex justify-between">
                                <p class="text-gray-600">Shipping</p>
                                <p class="text-gray-600 font-bold" id="shipping">${usd(cartReducer.getShipping)}</p>
                            </div>
                            <div class="flex justify-between">
                                <p class="text-gray-600">Total</p>
                                <p class="text-gray-600 font-bold" id="total-price">${usd(cartReducer.getTotal)}</p>
                            </div>
                        </div>

                        <div class="flex gap-2 mt-4">
                            <button
                                class="w-full h-[48px] bg-blue-900 text-white font-medium rounded grid place-items-center ">
                                Check Out
                            </button>
                            <button
                                class="w-full h-[48px] border-blue-900 border bg-white text-blue-900 font-medium rounded grid place-items-center " id="btn-view-cart">
                                View Cart
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
    };
    //UI
    protected renderUI(): void {
        super.renderUI();
        this.renderCartItems();
    }

    private renderCartItems = () => {
        this.renderList<ICartItem>('#cart-items', cartReducer.getData, HeaderCartItem); ///
    };

    // event
    protected addEventListener(): void {
        this.eventCartDrawer();
    }

    private eventCartDrawer = () => {
        this.signEvent('#close-cart-btn', 'click', this.hideCart);
        this.signEvent('#btn-view-cart', 'click', () => {
            QBRouter.nav('/cart');
        });
    };

    // listen
    private listenCart = () => {
        this.setState({ trigger: !this.state.trigger });
    };

    hideCart = () => {
        const cartDrawerWrapper = this.element.querySelector('#cart-drawer-wrapper');
        const cartDrawer = this.element.querySelector('#cart-drawer');
        cartDrawerWrapper?.classList.remove('show');
        cartDrawer?.classList.remove('show');
        this.setStateWithoutRender({ isShow: false });
    };
    showCartDrawer = () => {
        const cartDrawerWrapper = this.element.querySelector('#cart-drawer-wrapper');
        const cartDrawer = this.element.querySelector('#cart-drawer');
        cartDrawerWrapper?.classList.add('show');
        cartDrawer?.classList.add('show');
        this.setStateWithoutRender({ isShow: true });
    };
}

export default HeaderCartSidebar;
