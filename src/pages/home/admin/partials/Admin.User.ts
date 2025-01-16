import userService from '../../../../api/userService';
import TableSkeleton from '../../../../components/common/Skeleton';
import { IUser } from '../../../../interface/user';
import signal from '../../../../lib/listener';
import QBComponent from '../../../../lib/QBComponent';
import QBRouter from '../../../../lib/QBRouter';
import userReducer from '../../../../store/userReducer';
import toast from '../../../../util/toast';
import UserDetail from './Admin.User.UserDetail';

class UserAdminItem extends QBComponent<IUser> {
    constructor(props: IUser) {
        super(props);

        this.element = document.createElement('tr');
        this.element.className = 'border-b border-gray-200';
    }
    protected markup: () => string = () => {
        return /*html*/ `
       <td class="p-2 text-center">
       ${
           this.props.avatar
               ? `<img src="${this.props.avatar}"
                    class="w-10 aspect-[1/1] object-cover rounded-full border border-gray-300" alt="">`
               : `<img src="https://ui-avatars.com/api/?name=${this.props.fullName}&size=200"
                    class="w-10 aspect-[1/1] object-cover rounded-full " alt="">`
       }
                    
                    </td>
            <td class="p-2 text-center">${this.props.username}</td>
            <td class="p-2 text-center">${this.props.email}</td>
            <td class="p-2 text-center">${this.props.fullName}</td>
            <td class="p-2 text-center">${this.props.phoneNumber ?? `<p class="text-gray-500">none</p>`}</td>
            <td class="p-2 text-center">
                <label class="inline-flex items-center cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 " ${
                    this.props._id === userReducer.getData?.userId ? 'disabled' : ''
                }>
                    <input type="checkbox" value="" class="sr-only peer btn-active" ${
                        this.props.isActive ? 'checked' : ''
                    }
                    ${this.props._id === userReducer.getData?.userId ? 'disabled' : ''}
                    >
                    <div
                        class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 ${
                            this.props._id === userReducer.getData?.userId
                                ? 'cursor-not-allowed peer-checked:bg-gray-300'
                                : 'peer-checked:bg-blue-600'
                        }"
                        
                        >
                    </div>
                </label>
            </td>
            <td class="p-2 text-center flex gap-2 items-center justify-center">
                <button class="bg-blue-500 text-white py-1 px-2 rounded btn-info">Info</button>
            </td>
        `;
    };

    protected addEventListener(): void {
        this.signEvent('.btn-info', 'click', () => {
            signal.emit('show-info-user-admin', this.props);
        });
        this.signEvent('.btn-active', 'click', async (e) => {
            const value = (e.target as HTMLInputElement).checked;
            const res = await userService.changeActive(this.props._id, value);
            if (res) {
                // signal.emit('user-change');
                toast.success('Change user active success');
            } else {
                toast.error('Change user active failed');
            }
        });
    }
}

class UserAdminTable extends QBComponent<IUser[]> {
    protected markup: () => string = () => {
        return /*html*/ `
           <div class="flex justify-between items-center">
             <h1 class="text-2xl font-semibold text-gray-900 py-5">
                            List User
                        </h1>
                        
           </div>
            <div class="overflow-y-auto max-h-[500px] relative">
            <table class="w-full table-auto border-l border-r border-b border-gray-200">
                <thead class="bg-gray-100 sticky top-0  z-50">
                    <tr class="border-b border-gray-200">
                        <th class="p-2">Avatar</th>
                        <th class="p-2">Account</th>
                        <th class="p-2">Email</th>
                        <th class="p-2">Full Name</th>
                        <th class="p-2">Phone</th>
                        <th class="p-2">Active</th>
                        <th class="p-2">Action</th>
                    </tr>
                </thead>
                <tbody class="overflow-y-auto" id="list-items">
                   
                </tbody>
            </table>
        </div>
        `;
    };

    protected renderUI(): void {
        super.renderUI();
        this.renderList('#list-items', this.props, UserAdminItem);
    }
}

interface UserAdminState {
    listUsser: IUser[];
    curPage: 'table' | 'detail';
    curUser: IUser | null;
}
class UserAdmin extends QBComponent<{}, UserAdminState> {
    constructor() {
        super();

        this.state = {
            listUsser: [],
            curPage: 'table',
            curUser: null,
        };

        signal.on(
            'show-info-user-admin',
            (user: IUser) => {
                this.setState({
                    curPage: 'detail',
                    curUser: user,
                });
                window.history.replaceState({}, '', '/admin/?page=user&user_id=' + user._id);
            },
            'show-info-user-admin'
        );
    }

    protected markup: () => string = () => {
        if (this.state.listUsser.length === 0) {
            return /*html*/ `
           <div class="pl-5 py-5">
               ${new TableSkeleton().html}
            </div>
            `;
        }
        return /*html*/ `
         <div class="pl-5 py-5">
             <div id="page-content"></div>
         </div>
        `;
    };

    protected renderUI(): void {
        super.renderUI();

        if (this.state.curPage === 'detail') {
            this.renderComponent('#page-content', new UserDetail(this.state.curUser!));
            return;
        }

        if (this.state.listUsser.length > 0) {
            this.renderTable();
        }
    }

    private renderTable = () => {
        // this.renderList<IUser>('#page-content', this.state.listUsser, UserAdminTable);
        this.renderComponent('#page-content', new UserAdminTable(this.state.listUsser));
    };

    protected async afterRender(): Promise<void> {
        const user = await userService.getAllUser();
        this.setState({ listUsser: user });

        this.showDettail();
    }

    private showDettail() {
        const userId = QBRouter.querries.user_id;
        if (userId) {
            const user = this.state.listUsser.find((item) => item._id === userId);
            if (user) {
                this.setState({
                    curPage: 'detail',
                    curUser: user,
                });
            }
        }
    }
}

export default UserAdmin;
