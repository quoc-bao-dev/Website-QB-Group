import ListChatBox from '../../components/common/ListChatBox';
import signal from '../../lib/listener';
import QBComponent from '../../lib/QBComponent';
import QBRouter from '../../lib/QBRouter';
import chatReduecer from '../../store/chatReducer';
import userReducer from '../../store/userReducer';
import { toImage } from '../../util/image';
import UserFavorite from './partial/Profile.Favorite';
import UserProfileOrder from './partial/Profile.Order';
import ProfielWarpper from './partial/Profile.ProfileWrapper';

interface UserProfilePageState {
    curPage: string;
}
class UserProfilePage extends QBComponent<{}, UserProfilePageState> {
    constructor() {
        super();

        this.state = {
            curPage: 'profile',
        };

        signal.on(
            'user-change',
            () => {
                this.reRender();
            },
            'user-profile-rerender-1'
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
                    <div class="size-[48px]  overflow-hidden">
                        <img src="./public/image/logo.png" class="w-full aspect-[1/1] object-cover" alt="">
                    </div>
                    <h1 class="text font-semibold text-gray-900 hidden md:block">QB Group</h1>
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
                <div class="flex gap-2 hidden md:flex">
                    <div
                        class="flex items-center justify-center size-[48px] border rounded-full bg-white border-gray-200">
                        <i class="fa-regular fa-bell"></i>
                    </div>
                    <div
                        class="flex items-center justify-center gap-3 pr-5 h-[48px] border border-gray-200 bg-white rounded-full ">
                        ${
                            userReducer.getData?.image
                                ? `<img src="${toImage(
                                      userReducer.data?.image!
                                  )}" class="h-full rounded-full overflow-hidden p-1 aspect-[1/1] object-cover" alt="">`
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
                <p class="text-gray-600 text-sm -ml-3 md:ml-0">
                    User
                </p>
                <div class="flex flex-col gap-3 pt-2">
                    <div
                        class=" px-3 rounded-lg flex gap-5 items-center justify-center md:justify-start w-full py-3 md:py-2  hover:bg-blue-100 hover:text-blue-900 cursor-pointer side-bar-items ${
                            this.state.curPage === 'profile'
                                ? 'bg-blue-200 text-blue-900'
                                : 'text-gray-600'
                        }" data-page="profile">
                        <i class="fa-solid fa-user"></i>
                        <p class="text-gray-600 hidden md:block">Profile</p>
                    </div>

                    <div
                        class=" px-3 rounded-lg flex gap-5 items-center justify-center md:justify-start w-full py-3 md:py-2  hover:bg-blue-100 hover:text-blue-900 cursor-pointer side-bar-items ${
                            this.state.curPage === 'address'
                                ? 'bg-blue-200 text-blue-900'
                                : 'text-gray-600'
                        }" data-page="address">
                        <i class="fa-solid fa-location-dot"></i>
                        <p class="text-gray-600 hidden md:block">Address</p>
                    </div>

                    <div
                        class=" px-3 rounded-lg flex gap-5 items-center justify-center md:justify-start w-full py-3 md:py-2  hover:bg-blue-100 hover:text-blue-900 cursor-pointer side-bar-items ${
                            this.state.curPage === 'changePassword'
                                ? 'bg-blue-200 text-blue-900'
                                : 'text-gray-600'
                        }" data-page="changePassword">
                        <i class="fa-solid fa-key"></i>
                        <p class="text-gray-600 hidden md:block">Change Password</p>
                    </div>
                </div>

                <p class="text-gray-600 text-sm -ml-3 md:ml-0">
                    Shopping
                </p>
                <div class="flex flex-col gap-3 pt-2">
                    <div
                        class=" px-3 rounded-lg flex gap-5 items-center justify-center md:justify-start w-full py-3 md:py-2  hover:bg-blue-100 hover:text-blue-900 cursor-pointer side-bar-items ${
                            this.state.curPage === 'orders'
                                ? 'bg-blue-200 text-blue-900'
                                : 'text-gray-600'
                        }" data-page="orders">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <p class="text-gray-600 hidden md:block">Orders</p>
                    </div>

                    <div
                        class=" px-3 rounded-lg flex gap-5 items-center justify-center md:justify-start w-full py-3 md:py-2  hover:bg-blue-100 hover:text-blue-900 cursor-pointer side-bar-items ${
                            this.state.curPage === 'favorite'
                                ? 'bg-blue-200 text-blue-900'
                                : 'text-gray-600'
                        }" data-page="favorite">
                        <i class="fa-solid fa-heart"></i>
                        <p class="text-gray-600 hidden md:block">Favorite</p>
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

        <div class="fixed bottom-0 right-0 mr-5 z-49">
                        <div class="contents" id="box-chat-2"></div>
        </div>
    </main>
    <!-- main -->
        
        `;
    };

    protected renderUI(): void {
        super.renderUI();

        switch (this.state.curPage) {
            case 'profile':
                this.renderUserProfileSection();
                break;

            case 'changePassword':
                this.renderChangePassSection();
                break;

            case 'address':
                this.renderAddressSection();
                break;

            case 'orders':
                this.renderUserProfileOrder();
                break;

            case 'favorite':
                this.renderUserFavorite();
                break;

            default:
                break;
        }

        this.renderBoxChat();
    }

    private renderUserProfileSection() {
        this.renderComponent(
            '#content-section',
            new ProfielWarpper({ curPage: 'profile' })
        );
    }
    private renderChangePassSection() {
        this.renderComponent(
            '#content-section',
            new ProfielWarpper({ curPage: 'changePassword' })
        );
    }

    private renderAddressSection() {
        this.renderComponent(
            '#content-section',
            new ProfielWarpper({ curPage: 'address' })
        );
    }

    private renderUserProfileOrder() {
        this.renderComponent('#content-section', new UserProfileOrder());
    }

    private renderUserFavorite() {
        this.renderComponent('#content-section', new UserFavorite());
    }

    private renderBoxChat() {
        this.renderComponent('#box-chat-2', new ListChatBox());
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
                history.replaceState(null, '', `/user-profile?page=${page}`);
            }
        });
    }

    // before render
    protected async beforeRender(): Promise<void> {
        const verify = await userReducer.verify();
        if (!verify) {
            this.rejectRender();
            QBRouter.nav('/login');
        }
    }

    // after render
    protected async afterRender(): Promise<void> {
        const page = QBRouter.querries.page;
        if (
            page &&
            [
                'profile',
                'changePassword',
                'address',
                'orders',
                'favorite',
            ].includes(page)
        ) {
            this.setState({ curPage: page });
            history.replaceState(null, '', `/user-profile?page=${page}`);
        }
        await chatReduecer.start();
    }
}

export default UserProfilePage;
