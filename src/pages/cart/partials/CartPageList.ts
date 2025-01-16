import { ICartItem } from '../../../interface/cart';
import QBComponent from '../../../lib/QBComponent';
import cartReducer from '../../../store/cartReducer';
import { prd } from '../../../util/productUtils';

class CartItem extends QBComponent<ICartItem> {
    protected markup: () => string = () => {
        return /*html*/ `
        <!-- cart items -->
                <div class="p-3 border border-gray-200 rounded bg-white">
                    <div class="grid grid-cols-12 gap-3">
                        <div class="col-span-2 grid place-content-center">
                            <!-- product image -->
                            <img class="w-full aspect-[1/1] object-contain" src="${this.props.product.image}" alt="">
                        </div>
                        <div class="col-span-8">
                            <!-- product name -->
                            <h2 class="text-gray-600 text-lg font-semibold pb-1">${this.props.product.name}</h2>
                            <div class="grid grid-cols-12 gap-3">
                                <div class="col-span-6">
                                    <div class="grid grid-cols-2">
                                        <p class="text-gray-700 font-semibold">Color:</p>
                                        <div class="">
                                            <div class="w-10 h-5 rounded bg-[${
                                                this.props.product.option?.color.color
                                            }]"></div>
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-2">
                                        <p class="text-gray-700 font-semibold">Ram:</p>
                                        <p class="text-gray-700 font-semibold">${
                                            this.props.product.option?.ram.value
                                        }</p>
                                    </div>
                                    <div class="grid grid-cols-2">
                                        <p class="text-gray-700 font-semibold">Rom:</p>
                                        <p class="text-gray-700 font-semibold">${
                                            this.props.product.option?.storage.value
                                        }</p>
                                    </div>
                                </div>
                                <div class="col-span-3">
                                    <p class="text-red-700 text-lg font-semibold">${prd.sl(this.props.product)}</p>
                                </div>
                                <div class="col-span-3">
                                    <div class="py-2 px-3 bg-gray-200 text-gray-700 rounded grid grid-cols-3">
                                        <div class="grid place-items-center">
                                            <i class="fa-solid fa-minus"></i>
                                        </div>
                                        <div class="grid place-items-center">
                                            <input
                                                class="bg-none p-0 border-0 outline-none w-full bg-transparent text-center" id="input-quantity"
                                                type="number" value="${this.props.quantity}" min="1">
                                        </div>
                                        <div class="grid place-items-center">
                                            <i class="fa-solid fa-plus"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-1">
                            <div class="flex items-center justify-end w-full h-full">
                                <div class="flex flex-col gap-4 text-xl">
                                    <i class="fa-solid fa-trash-can text-blue-600"></i>
                                    <i class="fa-regular fa-heart text-red-500"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-1">
                            <div class="flex">
                                <input class="ml-auto check-box" type="checkbox" ${this.props.checked ? 'checked' : ''}>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- cart items -->
        `;
    };

    // event
    protected addEventListener(): void {
        this.eventRemoveItem();
        this.eventPlus();
        this.eventMinus();
        this.enventChangeQuantity();
        this.eventChecked();
    }

    private eventRemoveItem() {
        this.signEvent('.fa-trash-can', 'click', () => {
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
    private eventChecked() {
        this.signEvent('.check-box', 'click', () => {
            cartReducer.changeChecked(this.props.product, !this.props.checked);
        });
    }

    // support
    private getQuantity() {
        return parseInt((this.element.querySelector('#input-quantity') as HTMLInputElement).value);
    }
}

class CartPageListItem extends QBComponent {
    markup = () => {
        if (cartReducer.getData.length === 0) {
            return /*html*/ `
            <div class="col-span-8 flex flex-col gap-4 ">
            <div class="w-full h-full grid place-items-center">
                    <h1 class="text-3xl font-semibold text-gray-500">Your cart is empty</h1>
                </div>
            </div>
                
            `;
        }
        return /*html*/ `
         <!-- cart  -->
            <div class="col-span-8 flex flex-col gap-4" id="list-cart">
            </div>
            <!-- cart  -->
        `;
    };

    //UI
    protected renderUI(): void {
        super.renderUI();
        this.renderListCart();
    }

    private renderListCart() {
        this.renderList('#list-cart', cartReducer.getData, CartItem);
    }
}

export default CartPageListItem;
