import _ from 'lodash';
import QBComponent from '../../../lib/QBComponent';
import QBRouter from '../../../lib/QBRouter';
import Listener from '../../../lib/listener';
import cartReducer from '../../../store/cartReducer';
import HeaderCartSidebar from './partials/HeaderCartSidebar';
import HeaderSearchResult from './partials/HeaderSearchResult';
import userReducer from '../../../store/userReducer';

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
        this.pathTemplate = '/src/components/layout/header/index.html';

        Listener.on(
            'cart-change',
            () => {
                this.renderLabelCartQuantity();
            },
            'header-change-cart-quantity'
        );

        Listener.on(
            'page-change',
            () => {
                this.onPageChange();
                this.hiddenHeaderBottom();
            },
            'header-change-page'
        );

        Listener.on(
            'user-change',
            () => {
                this.renderUser();
            },
            'header-change-user'
        );
    }

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
        this.renderHTML('#user', `<p>${userReducer.data?.username} </p>`);

        this.signEvent('#user', 'click', () => {
            userReducer.logout();
        });
    }

    // template UI

    private hiddenHeaderBottom() {
        const path = window.location.pathname;
        switch (path) {
            case '/checkout':
            case '/login':
            case '/register':
            case '/cart':
                this.node('#header-bottom')?.classList.add('hidden-important');
                break;
            default:
                this.node('#header-bottom')?.classList.remove('hidden-important');
                break;
        }
    }

    // event
    protected addEventListener(): void {
        this.eventLogo();
        this.eventScroll();
        this.eventCartDrawer();
        this.eventDropDown();
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
    private eventDropDown() {
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
