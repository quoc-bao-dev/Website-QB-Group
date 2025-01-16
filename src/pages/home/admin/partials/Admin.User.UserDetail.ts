import orderService from '../../../../api/orderService';
import { Order } from '../../../../interface/order';
import { IUser } from '../../../../interface/user';
import QBComponent from '../../../../lib/QBComponent';
import QBRouter from '../../../../lib/QBRouter';
import { usd } from '../../../../util/productUtils';
import AdminUserAddress from './Admin.User.UserAddress';
import AdminUserComments from './Admin.User.UserComment';
import AdminUserOrder from './Admin.User.UserOrder';

interface UserDetailState {
    pageContent: string;
    totalPayment: number;
}
class UserDetail extends QBComponent<IUser, UserDetailState> {
    constructor(user: IUser) {
        super(user);
        this.state = {
            pageContent: 'user-history',
            totalPayment: 0,
        };
    }
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="flex flex-col gap-5">

                    <!-- user info -->
                    <div class="w-full flex gap-5 items-end">
                        <div class="size-[120px] rounded-full overflow-hidden rounded-full overflow-hidden">
                             ${
                                 this.props.avatar
                                     ? `<img src="${this.props.avatar}"
                    class="w-full aspect-[1/1] object-cover rounded-full border border-gray-300" alt="">`
                                     : `<img src="https://ui-avatars.com/api/?name=${this.props.fullName}&size=200"
                    class="w-fullaspect-[1/1] object-cover rounded-full " alt="">`
                             }
                        </div>
                        <div class="flex flex-col gap-2">
                            <h1 class="text-3xl font-bold"> ${this.props.fullName}</h1>
                            <p class="text-gray-500">${this.props.email}</p>
                        </div>
                    </div>
                    <!-- user info -->

                    <!-- sub info -->
                    <div class="h-[1px] w-full bg-gray-200"></div>
                    <div class="flex flex-col gap-2">
                        <div class="flex items-center gap-3">
                            <p class="font-semibold min-w-[140px]">
                                <i class="fa-regular fa-envelope"></i>
                                Email:
                            </p>
                            <p>${this.props.email}</p>
                        </div>
                        <div class="flex items-center gap-3">
                            <p class="font-semibold min-w-[140px]">
                                <i class="fa-solid fa-phone"></i>
                                Phone:
                            </p>
                            <p>${this.props.phoneNumber}</p>
                        </div>

                        <div class="flex items-center gap-3">
                            <p class="font-semibold min-w-[140px]">
                                <i class="fa-solid fa-user"></i>
                                User Name:
                            </p>
                            <p>${this.props.username}</p>
                        </div>

                         <div class="flex items-center gap-3">
                            <p class="font-semibold min-w-[140px]">
                                <i class="fa-solid fa-dollar-sign"></i>
                                Total Payment:
                            </p>
                            <p class="text-green-500">${usd(this.state.totalPayment)}</p>
                        </div>


                    </div>
                    <!-- sub info -->

                    <!-- navgation -->
                    <div class="grid grid-cols-5 gap-3 py-5">
                        <div
                            class="w-full flex items-center justify-center gap-3 py-2 rounded-lg  text-base  group  group-active group-active:bg-slate-900 group-active:text-white  tab-item ${
                                this.state.pageContent === 'user-history'
                                    ? 'text-white bg-slate-900 hover:bg-slate-700'
                                    : 'bg-slate-100 text-slate-600 hover:text-blue-900 hover:bg-slate-200'
                            }" data-tab="user-history">
                            <i class="fa-solid fa-money-bill"></i>
                            <p class="
                                               
                                            ">Order history</p>
                        </div>

                         <div
                            class="w-full flex items-center justify-center gap-3 py-2 rounded-lg  text-base  group  group-active group-active:bg-slate-900 group-active:text-white  tab-item ${
                                this.state.pageContent === 'user-address'
                                    ? 'text-white bg-slate-900 hover:bg-slate-700'
                                    : 'bg-slate-100 text-slate-600 hover:text-blue-900 hover:bg-slate-200'
                            }" data-tab="user-address">
                           <i class="fa-solid fa-location-dot"></i>
                            <p class="
                                               
                                            ">Address</p>
                        </div>

                        <div
                            class="w-full flex items-center justify-center gap-3 py-2 rounded-lg  text-base  group  group-active group-active:bg-slate-900 group-active:text-white  tab-item ${
                                this.state.pageContent === 'user-comment'
                                    ? 'text-white bg-slate-900 hover:bg-slate-700'
                                    : 'bg-slate-100 text-slate-600 hover:text-blue-900 hover:bg-slate-200'
                            }" data-tab="user-comment">
                            <i class="fa-solid fa-comment"></i>
                            <p class="
                                               
                                            ">Comment</p>
                        </div>

                    </div>
                    <!-- navgation -->

                    <div class="py-5" id="admin-user-page-content"></div>
                </div>
        `;
    };

    protected renderUI(): void {
        super.renderUI();
        this.renderContent();
    }

    private renderContent() {
        switch (this.state.pageContent) {
            case 'user-history':
                this.renderComponent('#admin-user-page-content', new AdminUserOrder({ userId: this.props._id }));
                break;

            case 'user-address':
                this.renderComponent('#admin-user-page-content', new AdminUserAddress({ userId: this.props._id }));
                break;

            case 'user-comment':
                this.renderComponent('#admin-user-page-content', new AdminUserComments({ userId: this.props._id }));
                break;

            default:
                break;
        }
    }

    protected addEventListener(): void {
        this.signEventAll('.tab-item', 'click', (e) => {
            const tab = e.target as HTMLElement;

            const pageContent = (tab.closest('.tab-item') as HTMLElement)?.dataset.tab;
            this.setState({ pageContent });
            window.history.replaceState({}, '', '/admin/?page=user&user_id=' + this.props._id + '&tab=' + pageContent);
        });
    }

    protected async afterRender(): Promise<void> {
        const order = (await orderService.getOrderByUserId(this.props._id)) as Order[];
        if (order) {
            const totalPayment = order
                .filter((item) => item.status === 'completed' || item.paymentStatus === 'success')
                .reduce((acc, item) => acc + item.totalAmount, 0);
            this.setState({ totalPayment });
        }

        this.showTab();
    }

    private showTab() {
        const tab = QBRouter.querries.tab;
        if (tab) {
            this.setState({ pageContent: tab });
        }
    }
}

export default UserDetail;
