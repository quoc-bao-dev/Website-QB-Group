import orderService from '../../../../api/orderService';
import { IOrderItem, Order } from '../../../../interface/order';
import { Product } from '../../../../interface/product';
import signal from '../../../../lib/listener';
import QBComponent from '../../../../lib/QBComponent';
import { date, dateInput } from '../../../../util/date';
import { prd, usd } from '../../../../util/productUtils';
import sortItemsByStatus, { indexStatus } from '../../../../util/sort';
import toast from '../../../../util/toast';
import OrderFormAddress from '../../../user-profile/partial/Proflie.Order.FormAddress';

class EmptyOrder extends QBComponent {
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="flex justify-center items-center h-[300px]">
            <p class="text-gray-500 text-lg font-medium">No order yet</p>
        </div>
        `;
    };
}
class ProductItem extends QBComponent<IOrderItem> {
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="flex justify-between items-center bg-slate-100 px-3 py-1 rounded">
                    <div class="flex gap-3 items-center">
                        <img class="w-16 h-16 rounded-lg object-contain" src="${
                            this.props.product.image
                        }" alt="Product 2">
                        <div>
                            <p class="font-medium text-gray-800">${
                                this.props.product.name
                            }</p>
                            <p class="text-sm text-gray-500">Quantity: ${
                                this.props.quantity
                            }</p>
                        </div>
                    </div>
                    <p class="font-medium text-gray-800">${usd(
                        prd.pr(this.props.product as Product)
                    )}</p>
                </div>
        `;
    };
}
class OrderItem extends QBComponent<Order> {
    constructor(order: Order) {
        super(order);
    }

    protected markup: () => string = () => {
        const deliveryDate = new Date(this.props.deliveryDate);
        const daysToAdd = 3;
        const resultDate = new Date(
            deliveryDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000
        );
        const deliDay = resultDate;
        return /*html*/ `
        <div class="border border-gray-200 rounded-lg p-5 bg-white">
            <div class="flex justify-between items-center mb-4">
                <div>
                    <p class="text-sm text-gray-500">Order ID: <span
                            class="font-medium text-gray-800">#${
                                this.props._id
                            }</span>
                    </p>
                    <p class="text-sm text-gray-500">User Order: <span
                            class="font-medium text-gray-800">${
                                this.props.deliveryAddress.recipientName
                            }</span>
                    </p>
                    <p class="text-sm text-gray-500">Order Date: <span
                            class="font-medium text-gray-800">${date(
                                this.props.createdAt
                            )}</span></p>
                </div>
                <div class="text-sm text-right">
                    <p class="text-gray-500">Status:</p>
                    <p class="font-medium text-blue-600">${
                        this.props.status
                    }</p>
                </div>
            </div>
            <div class="flex flex-col gap-3">

               <div class="contents" id="product-items"></div>
            </div>
            <div class="mt-4 flex justify-between items-center">
                <p class="text-base text-gray-500">Total:</p>
                <p class="font-medium text-gray-800">${usd(
                    this.props.orderItems.reduce(
                        (a, b) => a + prd.pr(b.product as Product) * b.quantity,
                        0
                    )
                )}</p>
            </div>

            ${
                this.props.status === 'pending'
                    ? /*html*/ `<input type="date" class="mt-5 w-fit p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400" id="deliveryDate" name="deliveryDate" value="${dateInput(
                          deliDay
                      )}" />
`
                    : ''
            }
            <div class="flex justify-end items-center gap-3">
                ${
                    this.props.status !== 'cancelled'
                        ? `<button class="btn-tracking mt-4 bg-white text-blue-700  py-1 px-2 rounded hover:bg-blue-100 bg-blue-50 disabled:bg-blue-300 disabled:cursor-not-allowed" >
                    <i class="fa-solid fa-truck"></i> Order Tracking</button>`
                        : ``
                }
                ${
                    this.props.status == 'pending'
                        ? /*html*/ `
                            <button class="btn-confirmed mt-4 bg-white text-green-700  py-1 px-2 rounded hover:bg-green-100 bg-green-50 disabled:bg-green-300 disabled:cursor-not-allowed" >
                                <i class="fa-solid fa-check"></i> Confirm
                            </button>
                        `
                        : ''
                }

                  ${
                      this.props.status == 'confirmed'
                          ? `<button class="btn-shipped mt-4 bg-white text-green-700  py-1 px-2 rounded hover:bg-green-100 bg-green-50 disabled:bg-green-300 disabled:cursor-not-allowed" >
                    <i class="fa-solid fa-check"></i> Shiper Received</button>`
                          : ''
                  }

                  ${
                      this.props.status == 'shipped'
                          ? `<button class="btn-delivered mt-4 bg-white text-green-700  py-1 px-2 rounded hover:bg-green-100 bg-green-50 disabled:bg-green-300 disabled:cursor-not-allowed" >
                    <i class="fa-solid fa-check"></i> Delivered</button>`
                          : ''
                  }

                  ${
                      this.props.status == 'delivered'
                          ? `<button class="btn-received mt-4 bg-white text-red-700  py-1 px-2 rounded hover:bg-red-100 bg-red-50 disabled:bg-red-300 disabled:cursor-not-allowed" >
                    <i class="fa-solid fa-check"></i> User Received</button>`
                          : ''
                  }
               
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
        const payload = {} as any;
        payload.status = status;
        if (status == 'completed') {
            payload.paymentStatus = 'success';
        }

        if (this.node('#deliveryDate')) {
            const date = this.node('#deliveryDate') as HTMLInputElement;
            if (date.value) {
                payload.deliveryDate = date.value;
            }
        }
        const res = await orderService.updateOrderById(this.props._id, {
            ...payload,
        });
        console.log(payload);

        if (res) {
            toast.success('Order confirmed successfully');
            signal.emit('order-updated');
        }
    };
}

interface OrderDetailProps {
    id: string;
}
interface OrderDetailState {
    order: Order | null;
    isShowForm: boolean;
}

class OrderDetail extends QBComponent<OrderDetailProps, OrderDetailState> {
    constructor(props: OrderDetailProps) {
        super(props);

        this.state = {
            order: null,
            isShowForm: false,
        };
    }

    protected markup: () => string = () => {
        if (this.state.order === null) {
            return 'Loading...';
        }

        const satus = this.state.order.status as string;

        const step = indexStatus(satus);

        return /*html*/ `
        <p class="text-lg font-medium text-gray-800 mb-4"> Order ID: #${
            this.state.order?._id
        }</p>
        <div class="w-full bg-gray-200  h-3 grid grid-cols-5">
                <div class="col-span-1 h-3 ${
                    step >= 0 ? 'bg-blue-500' : 'bg-gray-200'
                } grid place-content-center">
                    <div class="size-10 rounded-full bg-white grid place-content-center">
                        <div class="size-9 rounded-full ${
                            step >= 0
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-500'
                        } grid place-content-center">
                            <i class="fa-regular fa-clock"></i>
                        </div>
                    </div>
                </div>   
                
                <div class="col-span-1 h-3 ${
                    step >= 1 ? 'bg-blue-500' : 'bg-gray-200'
                } grid place-content-center">
                    <div class="size-10 rounded-full bg-white grid place-content-center">
                        <div class="size-9 rounded-full ${
                            step >= 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-500'
                        } grid place-content-center">
                            <i class="fa-regular fa-square-check"></i>
                        </div>
                    </div>
                </div>   

                <div class="col-span-1 h-3 ${
                    step >= 2 ? 'bg-blue-500' : 'bg-gray-200'
                } grid place-content-center">
                    <div class="size-10 rounded-full bg-white grid place-content-center">
                        <div class="size-9 rounded-full ${
                            step >= 2
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-500'
                        } grid place-content-center">
                            <i class="fa-solid fa-truck"></i>
                        </div>
                    </div>
                </div>   

                <div class="col-span-1 h-3 ${
                    step >= 3 ? 'bg-blue-500' : 'bg-gray-200'
                } grid place-content-center">
                    <div class="size-10 rounded-full bg-white grid place-content-center">
                        <div class="size-9 rounded-full ${
                            step >= 3
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-500'
                        } grid place-content-center">
                            <i class="fa-solid fa-truck-ramp-box"></i>
                        </div>
                    </div>
                </div>   

                <div class="col-span-1 h-3 ${
                    step >= 4 ? 'bg-blue-500' : 'bg-gray-200'
                } grid place-content-center">
                    <div class="size-10 rounded-full bg-white grid place-content-center">
                        <div class="size-9 rounded-full ${
                            step >= 4
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-500'
                        } grid place-content-center">
                           <i class="fa-regular fa-circle-check"></i>
                        </div>
                    </div>
                </div>   


        </div>
        <div class="border border-gray-200 rounded-lg p-5 bg-white">
            <div class="flex justify-between items-center mb-4">
                <div>
                    <p class="text-sm text-gray-500">Order Date:</p>
                    <p class="font-medium text-gray-800">${date(
                        this.state.order?.createdAt
                    )}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-500">Expected Delivery Date:</p>
                    <p class="font-medium text-gray-800">${date(
                        this.state.order?.deliveryDate
                    )}</p>
                </div>
            </div>
            <div class="flex flex-col gap-3">
                <div class="flex flex-col gap-3">
                    <p class="text-sm text-gray-500">Order Items:</p>
                    <div class="flex flex-col gap-2">
                        ${this.state.order?.orderItems
                            .map((item) => {
                                return /*html*/ `
                                <div class="flex gap-3 items-center">
                                    <img src="${item.product?.image}" alt="${
                                    item.product?.name
                                }" class="w-20 h-20 object-cover">
                                    <div class="flex-1">
                                        <p class="text-base font-medium">${
                                            item.product?.name
                                        }</p>
                                        <p class="text-sm text-gray-500">${usd(
                                            prd.pr(item.product as Product) *
                                                item.quantity
                                        )}</p>
                                        <p class="text-sm text-gray-500">Quantity: ${
                                            item.quantity
                                        }</p>
                                    </div>
                                </div>
                            `;
                            })
                            .join('')}
                    </div>
                </div>
                <p class="text-base font-medium">Total: ${usd(
                    this.state.order.orderItems.reduce(
                        (total, item) =>
                            total +
                            prd.pr(item.product as Product) * item.quantity,
                        0
                    )
                )}</p>
                <div class="w-full h-[1px] bg-gray-200 my-2"></div>
                <div class="flex items-center justify-between">
                    <div class="flex flex-col gap-1">
                         <p class="text-base font-medium my-1">Phone: ${
                             this.state.order?.deliveryAddress.phone
                         }</p>
                    <p class="text-base font-medium my-1">Recipient Name: ${
                        this.state.order?.deliveryAddress.recipientName
                    }</p>
                    <p class="text-base font-medium">Payment Method: ${
                        this.state.order?.paymentMethod
                    }</p>
                 <p class="text-base font-medium">Payment Status:<span class="${
                     this.state.order?.paymentStatus === 'success'
                         ? 'text-green-500'
                         : this.state.order.paymentStatus === 'pending'
                         ? 'text-blue-500'
                         : 'text-red-500'
                 }"> ${this.state.order?.paymentStatus}</span></p>
                    </div>
                </div>

                <div class="grid grid-cols-2 p-4 bg-gray-50 rounded border border-gray-200">

                <div class="flex flex-col gap-3 col-span-1">
                    <p class="text-base font-medium text-gray-800 ">Shipping Address:</p>
                    <div class="flex flex-col gap-2">
                        <p class="text-sm text-gray-500">Country: ${
                            this.state.order?.deliveryAddress.country
                        }</p>
                        <p class="text-sm text-gray-500">City: ${
                            this.state.order?.deliveryAddress.city
                        }</p>
                        <p class="text-sm text-gray-500">District: ${
                            this.state.order?.deliveryAddress.district
                        }</p>
                        <p class="text-sm text-gray-500">Address: ${
                            this.state.order?.deliveryAddress.address
                        }</p>
                        <p class="text-sm text-gray-500">Postal Code: ${
                            this.state.order?.deliveryAddress.postalCode
                        }</p>

                    </div>
                </div>

                <div class="flex items-end justify-end h-full w-full col-span-1">
                   <div class="mt-auto flex items-end justify-end">

                   </div>
                </div>
              
            </div>
        </div>

        <div class="contents" id="form-address-info"></div>
        `;
    };

    protected renderUI(): void {
        super.renderUI();
        if (this.state.isShowForm) {
            this.renderForm();
        }
    }

    private renderForm() {
        const infoData = {
            city: this.state.order!?.deliveryAddress.city,
            district: this.state.order!?.deliveryAddress.district,
            country: this.state.order!?.deliveryAddress.country,
            address: this.state.order!?.deliveryAddress.address,
            recipientName: this.state.order!?.deliveryAddress.recipientName,
            phone: this.state.order!?.deliveryAddress.phone,
            postalCode: this.state.order!?.deliveryAddress.postalCode,
        };

        this.renderComponent(
            '#form-address-info',
            new OrderFormAddress({
                data: infoData,
                isShow: true,
                orderId: this.props.id,
                onClose: () => {
                    this.setState({ isShowForm: false });
                },
                onSave: async () => {
                    await this.loadOrder();
                    this.setState({ isShowForm: false });
                },
            })
        );
    }

    // event
    protected addEventListener(): void {
        super.addEventListener();
        this.signEvent('.btn-change-address', 'click', async () => {
            this.setState({ isShowForm: true });
        });
    }

    protected async afterRender(): Promise<void> {
        await this.loadOrder();
    }
    private async loadOrder() {
        try {
            const res = await orderService.getOrderById(this.props.id);
            this.setState({ order: res });
        } catch (error) {}
    }
}

interface OrderAdminState {
    curPage: string;
    listOrder: Order[];
    listOrederFull: Order[];
    orderDetailId: string | null;
}
class OrderAdmin extends QBComponent<{}, OrderAdminState> {
    constructor() {
        super();
        this.state = {
            curPage: 'all',
            listOrder: [],
            listOrederFull: [],
            orderDetailId: null,
        };

        signal.on('order-updated', this.loadOrder.bind(this), 'order-updated');
        signal.on(
            'set-order-detail',
            (id: string) => {
                this.setOrederDetailId(id);
            },
            'set-order-detail'
        );
    }
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="grid grid-cols-12 h-full">

                    <div class="col-span-3 bg-slate-50 h-full">
                        <div class="flex flex-col gap-3 px-5 pt-5">
                            <div
                                class="rounded-lg py-3 px-4 hover:bg-blue-50 hover:text-blue-900 sidebar-item ${
                                    this.state.curPage === 'all'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-500'
                                }" data-status="all">
                                <p class="">All</p>
                            </div>
                            <div
                                class="rounded-lg py-3 px-4 hover:bg-blue-50 hover:text-blue-900 sidebar-item ${
                                    this.state.curPage === 'pending'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-500'
                                }" data-status="pending">
                                <p>Pending</p>
                            </div>
                            <div
                                class="rounded-lg py-3 px-4 hover:bg-blue-50 hover:text-blue-900 sidebar-item ${
                                    this.state.curPage === 'confirmed'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-500'
                                }" data-status="confirmed">
                                <p>Confirmed</p>
                            </div>
                            <div
                                class="rounded-lg py-3 px-4 hover:bg-blue-50 hover:text-blue-900 sidebar-item ${
                                    this.state.curPage === 'shipped'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-500'
                                }" data-status="shipped">
                                <p>Shipped</p>
                            </div>
                            <div
                                class="rounded-lg py-3 px-4 hover:bg-blue-50 hover:text-blue-900 sidebar-item ${
                                    this.state.curPage === 'delivered'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-500'
                                }" data-status="delivered">
                                <p>Delivered</p>
                            </div>
                            <div
                                class="rounded-lg py-3 px-4 hover:bg-blue-50 hover:text-blue-900 sidebar-item ${
                                    this.state.curPage === 'completed'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-500'
                                }" data-status="completed">
                                <p>Completed</p>
                            </div>
                            <div
                                class="rounded-lg py-3 px-4 hover:bg-blue-50 hover:text-blue-900 sidebar-item ${
                                    this.state.curPage === 'cancelled'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-500'
                                }" data-status="cancelled">
                                <p>Cancelled</p>
                            </div>
                        </div>

                    </div>

                    <div class="col-span-9 h-full">
                        <div class="pl-5 py-5 h-full max-h-screen flex flex-col">
                            <h2 class="text-lg font-bold text-gray-800 mb-5">List Orders</h2>

                            <div class="flex flex-col gap-6 flex-1 overflow-y-auto ">
                                <!-- Order 1 -->
                                

                                <!-- Order 2 -->
                                <div class="contents" id="order-items"></div>

                                <!-- Additional orders can be added here in the same format -->
                            </div>
                        </div>
                    </div>


                </div>
        `;
    };

    protected reRender(): void {
        super.reRender();

        if (this.state.orderDetailId) {
            this.renderOrderDetail();
        } else {
            this.renderListOrder();
        }
    }

    private renderListOrder() {
        this.renderList('#order-items', this.state.listOrder, OrderItem);
        if (this.state.listOrder.length === 0) {
            this.renderComponent('#order-items', new EmptyOrder());
        }
    }

    private renderOrderDetail() {
        this.renderComponent(
            '#order-items',
            new OrderDetail({ id: this.state.orderDetailId! })
        );
    }

    protected addEventListener(): void {
        this.eventChangePage();
    }

    private eventChangePage() {
        this.signEventAll('.sidebar-item', 'click', (e) => {
            const emlt = (e.target as HTMLElement).closest('.sidebar-item');
            if (!emlt) return;

            const status = (emlt as HTMLElement).dataset.status;
            if (!status) return;
            // this.setState({ curPage: status });
            this.changePage(status);
        });
    }

    //api
    protected async afterRender(): Promise<void> {
        await this.loadOrder();
    }

    // support load order
    private async loadOrder() {
        const listOrder = await orderService.getAllOrder();
        this.state.listOrederFull = listOrder;
        this.setPage(this.state.curPage);
    }

    private changePage(status: string) {
        this.state.curPage = status;
        this.setPage(status);
    }

    private setPage(status: string) {
        this.state.orderDetailId = null;
        const listOrder = this.state.listOrederFull;
        const lsOrderAll = sortItemsByStatus(
            listOrder.filter((item) => item.status !== 'cancelled')
        ).sort(
            (a, b) =>
                new Date(b.orderDate).getTime() -
                new Date(a.orderDate).getTime()
        );
        const lsOrderPending = listOrder
            .filter((item) => item.status === 'pending')
            .sort(
                (a, b) =>
                    new Date(b.orderDate).getTime() -
                    new Date(a.orderDate).getTime()
            );
        const lsOrderConfirmed = listOrder
            .filter((item) => item.status === 'confirmed')
            .sort(
                (a, b) =>
                    new Date(b.orderDate).getTime() -
                    new Date(a.orderDate).getTime()
            );
        const lsOrderShipped = listOrder
            .filter((item) => item.status === 'shipped')
            .sort(
                (a, b) =>
                    new Date(b.orderDate).getTime() -
                    new Date(a.orderDate).getTime()
            );
        const lsOrderDelivered = listOrder
            .filter((item) => item.status === 'delivered')
            .sort(
                (a, b) =>
                    new Date(b.orderDate).getTime() -
                    new Date(a.orderDate).getTime()
            );
        const lsOrderCompleted = listOrder
            .filter((item) => item.status === 'completed')
            .sort(
                (a, b) =>
                    new Date(b.orderDate).getTime() -
                    new Date(a.orderDate).getTime()
            );
        const lsOrderCancelled = listOrder
            .filter((item) => item.status === 'cancelled')
            .sort(
                (a, b) =>
                    new Date(b.orderDate).getTime() -
                    new Date(a.orderDate).getTime()
            );

        switch (status) {
            case 'all':
                this.setState({ listOrder: lsOrderAll });
                break;

            case 'pending':
                this.setState({ listOrder: lsOrderPending });
                break;

            case 'confirmed':
                this.setState({ listOrder: lsOrderConfirmed });
                break;

            case 'shipped':
                this.setState({ listOrder: lsOrderShipped });
                break;

            case 'delivered':
                this.setState({ listOrder: lsOrderDelivered });
                break;

            case 'completed':
                this.setState({ listOrder: lsOrderCompleted });
                break;

            case 'cancelled':
                this.setState({ listOrder: lsOrderCancelled });
                break;

            default:
                break;
        }
    }

    private setOrederDetailId(id: string) {
        this.setState({ orderDetailId: id });
    }
}

export default OrderAdmin;
