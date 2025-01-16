import _ from 'lodash';
import QBComponent from '../../../lib/QBComponent';
import QBRouter from '../../../lib/QBRouter';
import signal from '../../../lib/listener';
import cartReducer from '../../../store/cartReducer';
import HeaderCartSidebar from './partials/HeaderCartSidebar';
import HeaderSearchResult from './partials/HeaderSearchResult';
import HeaderUserBtn from './partials/HeaderUserBtn';

class CounterLabel extends QBComponent {
    protected markup: () => string = () => {
        if (cartReducer.getQuantity == 0) {
            return '';
        }
        return /*html*/ `
        <span class="absolute -top-2 -right-3 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-semibold flex justify-center items-center">${cartReducer.getQuantity}</span>
        `;
    };
}
class HeaderComponent extends QBComponent<null> {
    constructor() {
        super(null);

        signal.on(
            'cart-change',
            () => {
                this.renderLabelCartQuantity();
            },
            'header-change-cart-quantity'
        );

        signal.on(
            'page-change',
            () => {
                this.onPageChange();
                this.hiddenHeaderBottom();
            },
            'header-change-page'
        );

        signal.on(
            'user-change',
            () => {
                this.renderUser();
            },
            'header-change-user-2'
        );
    }

    protected markup: () => string = () => {
        return /*html*/ `
        <!-- header -->
<header class="sticky top-0 bg-white z-40">
    <div class="w-full py-3 bg-slate-100 hidden md:block header-top" id="header-top">
        <div class="container">
            <div class="flex justify-between text-gray-400 text-sm">
                <div class="flex gap-5">
                    <div class="flex gap-2 items-center">
                        <i class="fa-solid fa-phone"></i>
                        <p>+84 919 616 224</p>
                    </div>
                    <div class="flex gap-2 items-center">
                        <i class="fa-solid fa-envelope"></i>
                        <p>pythagore@gmail.com</p>
                    </div>
                </div>
                <div class="flex gap-5">
                    <div class="flex gap-1 items-center">
                        <a href="#">Help</a>
                        <i class="fa-solid fa-question"></i>
                    </div>
                    <div class="flex gap-1 items-center">
                        <a href="#">Track Order</a>
                        <i class="fa-solid fa-question"></i>
                    </div>
                    <div class="flex gap-1 items-center">
                        <a href="#">English</a>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="flex gap-1 items-center">
                        <a href="#">Dollar</a>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="w-full py-3 transition-all duration-300" id="header-layout">
        <div class="container relative">
            <div class="flex justify-between items-center z-40">
                <div class="p-4 bg-blue-900 w-fit text-white font-bold rounded" id="link-to-home"> QB Group</div>
                <div class="flex items-center  text-gray-500 font-semibold hidden md:flex md:gap-5 lg:gap-8 z-10">
                    <div class="flex gap-2 items-center relative drop-down">
                        <div class="contents hover-drop-down">
                            <a href="#">Home</a>
                            <i class="fa-solid fa-chevron-down text-xs"></i>
                        </div>
                        <!-- drop down -->
                        <div
                            class=" p-4 border absolute top-full left-0 bg-white shadow-lg rounded w-[150px] drop-down-content">
                            <ul class="flex flex-col gap-4">
                                <li class="text-gray-400 text-sm hover:text-blue-900">Home 1</li>
                                <li class="text-gray-400 text-sm hover:text-blue-900">Home 2</li>
                                <li class="text-gray-400 text-sm hover:text-blue-900">Home 3</li>
                            </ul>
                        </div>
                        <!-- drop down -->
                    </div>
                    <div class="flex gap-2 items-center warp-drop-down drop-down">
                        <div class="contents hover-drop-down ">
                            <a href="#">Categories</a>
                            <i class="fa-solid fa-chevron-down text-xs"></i>
                        </div>
                        <!-- drop down -->
                        <div
                            class="absolute top-[64px] shadow-lg left-0 bg-white shadow-lg rounded p-4 w-full border drop-down-content">
                            <div class="grid grid-cols-4 gap-5">
                                <div class="">
                                    <h3 class="font-semibold text-blue-900">
                                        Smart Phone
                                    </h3>
                                    <div class="h-[1px] w-full bg-gray-200 mt-2"></div>
                                    <ul class="mt-2 flex flex-col gap-4">
                                        <li class="text-gray-400 text-sm hover:text-blue-900">Phone</li>
                                        <li class="text-gray-400 text-sm hover:text-blue-900">Tablet</li>
                                        <li class="text-gray-400 text-sm hover:text-blue-900">Laptop</li>
                                    </ul>
                                </div>
                                <div class="">
                                    <h3 class="font-semibold text-blue-900">
                                        Laptop
                                    </h3>
                                    <div class="h-[1px] w-full bg-gray-200 mt-2"></div>
                                    <ul class="mt-2 flex flex-col gap-4">
                                        <li class="text-gray-400 text-sm hover:text-blue-900">Phone</li>
                                        <li class="text-gray-400 text-sm hover:text-blue-900">Tablet</li>
                                        <li class="text-gray-400 text-sm hover:text-blue-900">Laptop</li>
                                    </ul>
                                </div>

                                <div class="">
                                    <h3 class="font-semibold text-blue-900">
                                        Smart Watch
                                    </h3>
                                    <div class="h-[1px] w-full bg-gray-200 mt-2"></div>
                                    <ul class="mt-2 flex flex-col gap-4">
                                        <li class="text-gray-400 text-sm hover:text-blue-900">Phone</li>
                                        <li class="text-gray-400 text-sm hover:text-blue-900">Tablet</li>
                                        <li class="text-gray-400 text-sm hover:text-blue-900">Laptop</li>
                                    </ul>
                                </div>
                                <div class="">
                                    <h3 class="font-semibold text-blue-900">
                                        TV
                                    </h3>
                                    <div class="h-[1px] w-full bg-gray-200 mt-2"></div>
                                    <ul class="mt-2 flex flex-col gap-4">
                                        <li class="text-gray-400 text-sm hover:text-blue-900">Phone</li>
                                        <li class="text-gray-400 text-sm hover:text-blue-900">Tablet</li>
                                        <li class="text-gray-400 text-sm hover:text-blue-900">Laptop</li>
                                        <li class="text-gray-400 text-sm hover:text-blue-900">Laptop</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- drop down -->
                    </div>
                    <div class="flex gap-2 items-center">
                        <a href="#">Products</a>
                        <i class="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                    <div class="flex gap-2 items-center">
                        <a href="#">Blog</a>
                        <i class="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                    <div class="flex gap-2 items-center">
                        <a href="#">Order</a>
                        <i class="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                </div>
                <div class="flex items-center justify-end gap-8 text-2xl text-gray-600 z-10">
                    <div class="contents" id="user-btn"></div>
                    <a href="/user-profile?page=favorite" class="relative h-fit flex items-center">
                        <i class="fa-regular fa-heart"></i>
                       
                    </a>
                    <div class="relative  h-fit flex items-center" id="show-cart-btn">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <div class="contents" id="cart-quantity"></div>
                    </div>
                    <div class="relative md:hidden">
                        <i class="fa-solid fa-bars"></i>
                    </div>
                </div>
            </div>
            <div class="header-bottom bg-white z-0" id="header-bottom">
                <div class="h-[1px] w-full bg-gray-200 mt-2 hidden md:block"></div>
                <div class="py-2 justify-between hidden md:flex relative">
                    <div
                        class="w-[48px] aspect-[1/1] bg-blue-900 text-white font-bold rounded grid place-items-center text-xl">
                        <i class="fa-solid fa-table-cells-large"></i>
                    </div>
                    <div class="relative wrap-input flex gap-2 items-center  h-[48px] border border-gray-100 p-4 text-gray-400 lg:absolute lg:top-2 lg:left-[50%] lg:translate-x-[-50%] md:relative"
                        id="wrap-input-search">
                        <input type="text" placeholder="Search" class="w-full outline-none  border-0 focus:ring-0"
                            id="input-search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <div id="search-result-content" class="contents"></div>
                    </div>

                    <div
                        class="h-[48px] w-[200px] px-4 bg-blue-900 text-white font-bold rounded grid place-items-center text-xl">
                        <div class="flex gap-2 items-center justify-between w-full">
                            <div class="flex gap-2 items-center">
                                <i class="fa-solid fa-location-dot"></i>
                                <p class="text-[16px] font-semibold">HCM City</p>
                            </div>
                            <i class="fa-solid fa-chevron-down text-xs"></i>
                        </div>

                    </div>
                </div>
                <div class="h-[1px] w-full bg-gray-200  hidden md:block"></div>
            </div>

        </div>
    </div>
    <!-- cart -->
    <div class="contents" id="cart-side-bar"></div>
    <!-- cart -->
</header>
<!-- header -->
        `;
    };

    protected renderUI(): void {
        super.renderUI();
        this.renderCartSidebar();
        this.renderSearch();
        this.renderLabelCartQuantity();
        this.renderUser();

        this.hiddenHeaderBottom();
    }
    // UI
    private renderCartSidebar() {
        this.renderComponent('#cart-side-bar', new HeaderCartSidebar(), 'cart-drawer');
    }
    private renderSearch() {
        this.renderComponent('#search-result-content', new HeaderSearchResult(), 'search-result');
    }
    private renderLabelCartQuantity() {
        this.renderComponent('#cart-quantity', new CounterLabel(), 'cart-quantity');
    }

    private renderUser() {
        this.renderComponent('#user-btn', new HeaderUserBtn(), 'user');
    }

    private hiddenHeaderBottom() {
        const path = window.location.pathname;
        switch (path) {
            case '/admin':
            case '/admin/':
            case '/user-profile':
                this.node('header')?.classList.add('hidden-important');
                break;
            case '/signup':
            case '/no-access':
            case '/404':
                this.node('#header-bottom')?.classList.add('hidden-important');
                this.node('#header-layout')?.classList.add('hidden-important');
                break;
            case '/checkout':
            case '/login':
            case '/cart':
                this.node('#header-layout')?.classList.remove('hidden-important');
                this.node('#header-bottom')?.classList.add('hidden-important');

                break;
            default:
                this.node('#header-bottom')?.classList.remove('hidden-important');
                this.node('#header-layout')?.classList.remove('hidden-important');
                this.node('header')?.classList.remove('hidden-important');
                break;
        }
    }

    // event
    protected addEventListener(): void {
        this.eventLogo();
        this.eventScroll();
        this.eventCartDrawer();
        this.eventDrawer();
        this.eventSearchInput();
    }

    private eventLogo() {
        this.signEvent('#link-to-home', 'click', () => {
            QBRouter.nav('/');
        });
    }

    private eventScroll() {
        const headerTop = this.element.querySelector('#header-top');
        const headerBottom = this.element.querySelector('#header-bottom');
        let prevScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                headerTop?.classList.add('close');
            } else {
                if (window.scrollY == 0) {
                    headerTop?.classList.remove('close');
                }
            }

            if (window.scrollY > 50) {
                if (prevScrollY > window.scrollY) {
                    headerBottom?.classList.remove('close');
                } else {
                    headerBottom?.classList.add('close');
                }
            } else {
                if (window.scrollY == 0) {
                    headerBottom?.classList.remove('close');
                }
            }
            prevScrollY = window.scrollY;
        });
    }
    private eventCartDrawer() {
        this.signEvent('#show-cart-btn', 'click', () => {
            const cartDrawerWrapper = this.element.querySelector('#cart-drawer-wrapper');
            const cartDrawer = this.element.querySelector('#cart-drawer');
            cartDrawerWrapper?.classList.add('show');
            cartDrawer?.classList.add('show');
            this.children['cart-drawer'].showCartDrawer();
        });
    }
    private eventDrawer() {
        this.element.querySelectorAll('.drop-down').forEach((dropdown) => {
            let timerId: NodeJS.Timeout;
            dropdown.addEventListener('mouseenter', () => {
                dropdown.querySelector('.drop-down-content')?.classList.remove('hidden');
                setTimeout(() => {
                    dropdown.querySelector('.drop-down-content')?.classList.add('show');
                }, 50);
                clearTimeout(timerId);
            });
            dropdown.addEventListener('mouseleave', () => {
                timerId = setTimeout(() => {
                    dropdown.querySelector('.drop-down-content')?.classList.remove('show');
                    setTimeout(() => {
                        dropdown.querySelector('.drop-down-content')?.classList.add('hidden');
                    }, 300);
                }, 100);
            });
        });
    }

    private eventSearchInput() {
        const inputSearch = this.element.querySelector('#input-search') as HTMLInputElement;
        if (inputSearch) {
            inputSearch.addEventListener('focus', () => {
                this.element.querySelector('#wrap-input-search')?.classList.add('input-focus');
                this.element.querySelector('#search-result')?.classList.add('show');
            });
            inputSearch.addEventListener('blur', () => {
                this.element.querySelector('#wrap-input-search')?.classList.remove('input-focus');
                this.element.querySelector('#search-result')?.classList.remove('show');
            });
            inputSearch.addEventListener('input', (e) => {
                const searchKey = (e.target as HTMLInputElement).value;
                _.debounce(() => {
                    this.updateSearchResult(searchKey);
                }, 100)();
            });
            inputSearch.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const searchKey = (e.target as HTMLInputElement).value;
                    QBRouter.nav(`/search/${searchKey}`);
                }
            });
        }
    }

    // support
    updateSearchResult = (input: string) => {
        this.children['search-result'].updateSearchResult(input);
    };

    // listen
    private onPageChange = () => {
        const input = this.element.querySelector('#input-search') as HTMLInputElement;
        if (input) {
            input.value = '';
        }
    };
}

export default HeaderComponent;
