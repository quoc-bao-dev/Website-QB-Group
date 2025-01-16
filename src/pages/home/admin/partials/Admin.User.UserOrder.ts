import orderService from '../../../../api/orderService';
import { IOrderItem, Order } from '../../../../interface/order';
import { Product } from '../../../../interface/product';
import signal from '../../../../lib/listener';
import QBComponent from '../../../../lib/QBComponent';
import { date } from '../../../../util/date';
import { prd, usd } from '../../../../util/productUtils';
import toast from '../../../../util/toast';

class ProductItem extends QBComponent<IOrderItem> {
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="flex justify-between items-center bg-slate-100 px-3 py-1 rounded">
                    <div class="flex gap-3 items-center">
                        <img class="w-16 h-16 rounded-lg object-contain" src="${
                            this.props.product.image
                        }" alt="Product 2">
                        <div>
                            <p class="font-medium text-gray-800">${this.props.product.name}</p>
                            <p class="text-sm text-gray-500">Quantity: ${this.props.quantity}</p>
                        </div>
                    </div>
                    <p class="font-medium text-gray-800">${usd(prd.pr(this.props.product as Product))}</p>
                </div>
        `;
    };
}
class OrderItem extends QBComponent<Order> {
    constructor(order: Order) {
        super(order);
    }

    protected markup: () => string = () => {
        return /*html*/ `
        <div class="border border-gray-200 rounded-lg p-5 bg-white">
            <div class="flex justify-between items-center mb-4">
                <div>
                    <p class="text-sm text-gray-500">Order ID: <span
                            class="font-medium text-gray-800">#${this.props._id}</span>
                    </p>
                    <p class="text-sm text-gray-500">User Order: <span
                            class="font-medium text-gray-800">${this.props.deliveryAddress.recipientName}</span>
                    </p>
                    <p class="text-sm text-gray-500">Order Date: <span
                            class="font-medium text-gray-800">${date(this.props.createdAt)}</span></p>
                </div>
                <div class="text-sm text-right">
                    <p class="text-gray-500">Status:</p>
                    <p class="font-medium text-blue-600">${this.props.status}</p>
                </div>
            </div>
            <div class="flex flex-col gap-3">

               <div class="contents" id="product-items"></div>
            </div>
            <div class="mt-4 flex justify-between items-center">
                <p class="text-base text-gray-500">Total:</p>
                <p class="font-medium text-gray-800">${usd(
                    this.props.orderItems.reduce((a, b) => a + prd.pr(b.product as Product) * b.quantity, 0)
                )}</p>
            </div>
        </div>
        `;
    };

    protected renderUI(): void {
        super.renderUI();

        this.renderList('#product-items', this.props.orderItems, ProductItem);
    }

    protected addEventListener(): void {
        super.addEventListener();
        this.signEvent('.btn-tracking', 'click', this.setOrderId);
        this.signEvent('.btn-confirmed', 'click', () => {
            this.changeStatus('confirmed');
        });
        this.signEvent('.btn-shipped', 'click', () => {
            this.changeStatus('shipped');
        });
        this.signEvent('.btn-delivered', 'click', () => {
            this.changeStatus('delivered');
        });
        this.signEvent('.btn-received', 'click', () => {
            this.changeStatus('completed');
        });
    }

    // support

    private setOrderId = () => {
        signal.emit('set-order-detail', this.props._id);
    };

    private changeStatus = async (status: string) => {
        const res = await orderService.updateOrderById(this.props._id, { status });
        if (res) {
            toast.success('Order confirmed successfully');
            signal.emit('order-updated');
        }
    };
}
interface AdminUserOrderProps {
    userId: string;
}
interface AdminUserOrderState {
    listOrder: Order[];
}
class AdminUserOrder extends QBComponent<AdminUserOrderProps, AdminUserOrderState> {
    constructor(props: AdminUserOrderProps) {
        super(props);
        this.state = {
            listOrder: [],
        };
    }
    protected markup: () => string = () => {
        if (this.state.listOrder.length === 0) {
            return /*html*/ ` 
             <div class=" w-full py-16 flex justify-center items-center border boreder-gray-200 rounded-lg bg-white">
                <p class="text-lg text-gray-500">
                    No order
                </p>
            </div>
            `;
        }
        return /*html*/ `<div class="list-order flex flex-col gap-5"></div>`;
    };

    protected renderUI(): void {
        super.renderUI();
        this.renderListOrder();
    }

    protected async afterRender(): Promise<void> {
        const lsOrder = (await orderService.getOrderByUserId(this.props.userId)) as Order[];
        const ls = lsOrder.filter((item) => item.status === 'completed');

        this.setState({ listOrder: ls });
    }

    private renderListOrder() {
        this.renderList('.list-order', this.state.listOrder, OrderItem);
    }
}

export default AdminUserOrder;
