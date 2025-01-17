import ListChatBox from '../../../components/common/ListChatBox';
import signal from '../../../lib/listener';
import QBComponent from '../../../lib/QBComponent';
import QBRouter from '../../../lib/QBRouter';
import chatReducer from '../../../store/chatReducer';
import userReducer from '../../../store/userReducer';
import BrandAdmin from './partials/Admin.Brand';
import CategoryAdmin from './partials/Admin.Category';
import DashboardAdmin from './partials/Admin.Dashboard';
import OrderAdmin from './partials/Admin.Order';
import ProductAdmin from './partials/Admin.Product';
import UserAdmin from './partials/Admin.User';
import AdminVoucher from './partials/Admin.Voucher';

interface AdminPageState {
    curPage: string;
    countLoading: number;
}
class AdminPage extends QBComponent<{}, AdminPageState> {
    constructor() {
        super();

        this.state = {
            curPage: 'dashboard',
            countLoading: 1,
        };

        signal.on(
            'user-change',
            () => {
                this.reRender();
            },
            'user-profile-rerender-1'
        );

        signal.on(
            'set-cur-page',
            (page: string) => {
                this.changePage(page);
            },
            'set-cur-page-1'
        );
    }
    protected markup: () => string = () => {
        return /*html*/ `
          <!-- main -->
    <main class="bg-gray-000">
        <div class=" grid grid-cols-12">

            <div class="px-5 py-4 col-span-2 bg-gray-100 flex justify-between items-center border border-gray-200">
               <a href="/">
                 <div class="flex items-center gap-3">
                    <div class="size-[48px] overflow-hidden">
                        <img src="./public/image/logo.png" class="w-full aspect-[1/1] object-cover " alt="">
                    </div>
                    <h1 class="text font-semibold text-gray-900">QB Group</h1>
                </div>
               </a>
                <div class="text-gray-600 grid place-content-center pl-5">
                    <i class="fa-solid fa-arrows-up-down"></i>
                </div>
            </div>

            <div class="px-5 py-4 col-span-10 bg-gray-100 flex items-center justify-between border border-gray-200">
                <div class="relative w-fit ">
                    <input
                        class="w-[300px] bg-gray-200 pl-9 px-3 py-1 rounded-lg outline-none border-none ring-0 focus:ring-1 focus:ring-gray-300 text-gray-600"
                        type="text" placeholder="Search...">
                    <i
                        class="absolute w-fit top-[50%] translate-y-[-50%] left-2 text-lg fa-solid fa-magnifying-glass absolute right-5 text-gray-700"></i>
                </div>
                <div class="flex gap-2">
                    <div
                        class="flex items-center justify-center size-[48px] border rounded-full bg-white border-gray-200">
                        <i class="fa-regular fa-bell"></i>
                    </div>
                    <div
                        class="flex items-center justify-center gap-3 pr-5 h-[48px] border border-gray-200 bg-white rounded-full ">
                        ${
                            userReducer.getData?.image
                                ? `<img src="${userReducer.data?.image}" class="h-full rounded-full overflow-hidden p-1 aspect-[1/1] object-cover" alt="">`
                                : `<img src="https://ui-avatars.com/api/?name=${userReducer.getData?.username}&size=200" class="h-full rounded-full overflow-hidden p-1 aspect-[1/1] object-cover" alt="">`
                        }
                        <div class="flex flex-col ">
                            <h2 class="text-gray-900 ftex"> ${
                                userReducer.getData?.fullName
                            }</h2>
                            <p class="text-xs text-gray-500">
                                ${userReducer.getData?.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <div class="grid grid-cols-12 border border-gray-300 ">

            <!-- sidebar -->
            <div class="col-span-2 bg-gray-100 pl-5 pr-5 py-5 h-screen ">

                 <p class="text-gray-600 text-sm">
                    Admin
                </p>
                <div class=" flex flex-col gap-3 pt-2">
                    <div
                    class="py-2 px-3 rounded-lg flex gap-5 items-center hover:bg-blue-100 hover:text-blue-900 cursor-pointer side-bar-items ${
                        this.state.curPage === 'dashboard'
                            ? 'bg-blue-200 text-blue-900'
                            : 'text-gray-600'
                    }" data-page="dashboard">
                        <i class="fa-solid fa-chart-line"></i>
                        <p class="text-gray-600">Dashboard</p>
                    </div>

                </div>

                 <p class="text-gray-600 text-sm">
                    Account
                </p>
                <div class=" flex flex-col gap-3 pt-2">
                    <div
                    class="py-2 px-3 rounded-lg flex gap-5 items-center hover:bg-blue-100 hover:text-blue-900 cursor-pointer side-bar-items ${
                        this.state.curPage === 'user'
                            ? 'bg-blue-200 text-blue-900'
                            : 'text-gray-600'
                    }" data-page="user">
                        <i class="fa-solid fa-user"></i>
                        <p class="text-gray-600">User</p>
                    </div>

                </div>

                <p class="text-gray-600 text-sm">
                    Manager
                </p>
                <div class=" flex flex-col gap-3 pt-2">
                    <div
                        class="py-2 px-3 rounded-lg flex gap-5 items-center hover:bg-blue-100 hover:text-blue-900 cursor-pointer side-bar-items ${
                            this.state.curPage === 'product'
                                ? 'bg-blue-200 text-blue-900'
                                : 'text-gray-600'
                        }" data-page="product">
                        <i class="fa-solid fa-mobile-screen-button"></i>
                        <p class="text-gray-600">Product</p>
                    </div>

                    <div
                        class="py-2 px-3 rounded-lg flex gap-5 items-center hover:bg-blue-100 hover:text-blue-900 cursor-pointer side-bar-items ${
                            this.state.curPage === 'category'
                                ? 'bg-blue-200 text-blue-900'
                                : 'text-gray-600'
                        }" data-page="category">
                        <i class="fa-solid fa-list"></i>
                        <p class="text-gray-600">Category</p>
                    </div>

                    <div
                        class="py-2 px-3 rounded-lg flex gap-5 items-center hover:bg-blue-100 hover:text-blue-900 cursor-pointer side-bar-items ${
                            this.state.curPage === 'brand'
                                ? 'bg-blue-200 text-blue-900'
                                : 'text-gray-600'
                        }" data-page="brand">
                        <i class="fa-brands fa-apple"></i>
                        <p class="text-gray-600">Brand</p>
                    </div>

                    <div
                        class="py-2 px-3 rounded-lg flex gap-5 items-center hover:bg-blue-100 hover:text-blue-900 cursor-pointer side-bar-items ${
                            this.state.curPage === 'order'
                                ? 'bg-blue-200 text-blue-900'
                                : 'text-gray-600'
                        }" data-page="order">
                        <i class="fa-solid fa-file-invoice"></i>
                        <p class="text-gray-600">Order</p>
                    </div>

                   

                    <div
                        class="py-2 px-3 rounded-lg flex gap-5 items-center hover:bg-blue-100 hover:text-blue-900 cursor-pointer side-bar-items ${
                            this.state.curPage === 'voucher'
                                ? 'bg-blue-200 text-blue-900'
                                : 'text-gray-600'
                        }" data-page="voucher">
                        <i class="fa-solid fa-ticket"></i>
                        <p class="text-gray-600">Voucher</p>
                    </div>

                </div>



                
            </div>
            <!-- sidebar -->

            <!-- section -->
            <div class="col-span-10 bg-white  pr-5 h-screen overflow-y-scroll">
                <div class="contents" id="content-section"></div>
            </div>

             
            <!-- section -->
        </div>
       
    </main>
     <div class="fixed bottom-0 right-0 mr-5 z-49">
                        <div class="contents" id="box-chat"></div>
        </div>
    <!-- main -->
        
    <div class="fixed bottom-0 right-0 mr-5 z-50" id="app-loading"> 
    </div>
        `;
    };
    protected renderUI(): void {
        super.renderUI();

        switch (this.state.curPage) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'user':
                this.renderUserAdmin();
                break;
            case 'product':
                this.renderProductAdmin();
                break;
            case 'category':
                this.renderCategoryAdmin();
                break;
            case 'brand':
                this.renderBrandAdmin();
                break;
            case 'order':
                this.renderOrderAdmin();
                break;
            case 'promotion':
                break;
            case 'voucher':
                this.renderVoucherAdmin();
                break;
            default:
                break;
        }

        this.renderBoxChat();
    }

    private renderDashboard() {
        this.renderComponent('#content-section', new DashboardAdmin());
    }

    private renderUserAdmin() {
        this.renderComponent('#content-section', new UserAdmin());
    }
    private renderProductAdmin() {
        this.renderComponent('#content-section', new ProductAdmin());
    }

    private renderCategoryAdmin() {
        this.renderComponent('#content-section', new CategoryAdmin());
    }

    private renderBrandAdmin() {
        this.renderComponent('#content-section', new BrandAdmin());
    }

    private renderOrderAdmin() {
        this.renderComponent('#content-section', new OrderAdmin());
    }

    private renderVoucherAdmin() {
        this.renderComponent('#content-section', new AdminVoucher());
    }

    private renderBoxChat() {
        this.renderComponent('#box-chat', new ListChatBox());
    }

    //event

    protected addEventListener(): void {
        this.eventChangePage();
    }

    private eventChangePage() {
        this.signEventAll('.side-bar-items', 'click', (e: Event) => {
            const btnClick = e.target as HTMLElement;
            const page = (btnClick.closest('.side-bar-items') as HTMLElement)
                .dataset.page;

            if (page) {
                this.setState({ curPage: page });
                history.replaceState(null, '', `/admin?page=${page}`);
            }
        });
    }

    // before render
    protected async beforeRender(): Promise<void> {
        const verify = await userReducer.verify();
        if (!verify) {
            this.rejectRender();
            QBRouter.nav('/login');
        } else {
            const role = userReducer.data?.role as string;
            if (role !== 'admin') {
                this.rejectRender();
                QBRouter.nav('/no-access');
            }
        }
    }

    // after render
    protected async afterRender(): Promise<void> {
        const page = QBRouter.querries.page;

        if (
            page &&
            [
                'dashboard',
                'user',
                'product',
                'category',
                'brand',
                'order',
                'promotion',
                'voucher',
            ].includes(page)
        ) {
            this.changePage(page);
        }
        await chatReducer.start();
    }
    //support
    private changePage(page: string) {
        this.setState({ curPage: page });
    }
}

export default AdminPage;
