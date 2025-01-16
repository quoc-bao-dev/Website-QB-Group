import signal from '../../../../lib/listener';
import QBComponent from '../../../../lib/QBComponent';
import userReducer from '../../../../store/userReducer';

class HeaderUserBtn extends QBComponent {
    constructor() {
        super();
        signal.on(
            'page-change',
            () => {
                this.reRender();
            },
            'page-change-rerender-user-btn'
        );
        signal.on(
            'user-change',
            () => {
                this.reRender();
            },
            'user-profile-rerender'
        );
    }
    protected markup: () => string = () => {
        return /*html*/ `
        
        <div class="relative z-49" >
                       <div class="flex items-center cursor-pointer" id="user-icon">
                        ${
                            userReducer.data?.image
                                ? `<img src="${userReducer.data?.image}" alt="Profile Picture" class="size-[48px] rounded-full object-cover">`
                                : userReducer.getData?.username
                                ? `<div class="size-[48px] rounded-full mx-auto bg-gray-300 flex items-center justify-center">${userReducer.data?.username
                                      .charAt(0)
                                      .toUpperCase()}</div>`
                                : `<i class="fa-regular fa-user"></i>`
                        }
                        
                       </div>
                        <div class="contents" id="user"></div>
                        <!-- drop down -->
                        <div class="origin-top-right absolute right-0 mt-2 min-w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden" id="user-dropdown"
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="py-1" role="none" id="menu-items">
                                ${
                                    userReducer.data?.userId
                                        ? `
                                    <div class="px-4 py-3 text-center border-b">
                                    ${
                                        userReducer.data?.image
                                            ? `<img src="${userReducer.data?.image}" alt="Profile Picture"
                                        class="w-16 h-16 rounded-full mx-auto object-cover">`
                                            : `<div class="class="w-16 h-16 rounded-full mx-auto bg-gray-300 flex items-center justify-center">
                                            ${userReducer.data?.username.charAt(0).toUpperCase()}
                                            </div>`
                                    }
                                    <p class="text-gray-900 text-lg font-bold">${userReducer.data?.username}</p>
                                    <p class="text-gray-500 text-sm">${userReducer.data?.email}</p>
                                </div>
                                    `
                                        : `
                                        <h2 class="px-4 py-3 text-center border-b">
                                        QB Group
                                        </h2>
                                        `
                                }
                                
                                
                               ${
                                   userReducer.data?.userId
                                       ? /*html*/ `
                                       ${
                                           userReducer.data.role === 'admin'
                                               ? /*html*/ `
                                         <a href="/admin" class="flex items-center gap-4 text-gray-700 px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                                   <i class="fa-solid fa-user-tie"></i>
                                    Admin
                                </a> 
                                         `
                                               : ''
                                       }
                                       <a href="/user-profile" class="flex items-center gap-4 text-gray-700 px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                                   <i class="fa-solid fa-user"></i>
                                    My Profile
                                </a>
                                <a href="#" class="flex items-center  gap-4  text-gray-700 px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                    Edit Profile
                                </a>
                                <a href="#" class="flex items-center gap-4 text-gray-700 px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                                    <i class="fa-solid fa-cart-shopping"></i>
                                    Cart
                                </a>
                                <a href="#" class="flex items-center gap-4 text-gray-700 px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                                   <i class="fa-solid fa-gear"></i>
                                    Settings
                                </a>
                                       <a href="#" class="flex items-center gap-4 text-gray-700 px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                                   <i class="fa-solid fa-circle-info"></i>
                                    Help
                                </a>
                                       <a href="#" class="flex items-center gap-4 text-gray-700 px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" id="btn-logout">
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                    Logout
                                </a>`
                                       : /*html*/ `
                                       <a href="/login" class="flex items-center gap-4 text-gray-700 px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                                    <i class="fa-solid fa-right-to-bracket"></i>
                                    Login
                                </a>
                                 <a href="/signup" class="flex items-center gap-4 text-gray-700 px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                                  <i class="fa-solid fa-user-plus"></i>
                                    Signup
                                </a>
                                       `
                               }
                            </div>
                        </div>
                        <!-- drop down -->
                    </div>
        `;
    };

    // envent
    protected addEventListener(): void {
        this.signEvent('#btn-logout', 'click', () => {
            userReducer.logout();
        });

        this.signEvent('#user-icon', 'click', () => {
            this.showUser();
        });

        this.signEvent('#menu-items', 'click', () => {
            this.node('#user-dropdown')?.classList.add('hidden');
        });
    }

    private showUser() {
        this.node('#user-dropdown')?.classList.toggle('hidden');
    }
}

export default HeaderUserBtn;
