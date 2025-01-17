import orderService from '../../../api/orderService';
import userService from '../../../api/userService';
import signal from '../../../lib/listener';
import QBComponent from '../../../lib/QBComponent';
import userReducer from '../../../store/userReducer';
import copyToClipboard from '../../../util/coppyToClipBoard';
import { toImage } from '../../../util/image';
import loadFile from '../../../util/loadFile';
import { usd } from '../../../util/productUtils';
import toast from '../../../util/toast';
import UserInfoForm from './FormProfile.UserInfoFrom';
import ChangePassForm from './FromProfile.ChangePassForm';
import ProfileAddress from './Profile.Address';

interface ProfileWrapperProps {
    curPage: string;
}

interface ProfileWrapperState {
    totalPayment: number;
}
class ProfielWarpper extends QBComponent<
    ProfileWrapperProps,
    ProfileWrapperState
> {
    constructor(props: ProfileWrapperProps) {
        super(props);
        this.state = {
            totalPayment: 0,
        };
        signal.on(
            'user-change',
            () => {
                this.reRender();
            },
            'user-profile-rerender-2'
        );
    }

    protected markup: () => string = () => {
        return /*html*/ `
        <div class="grid grid-cols-12 pl-5 py-5">

                    <!-- col-span-4 -->
                    <div class="col-span-4">
                        <div class="size-[80px] rounded-full overflow-hidden relative btn-change-avatar">
                            ${
                                userReducer.getData?.image
                                    ? `<img src="${toImage(
                                          userReducer.getData?.image
                                      )}" class="w-full aspect-[1/1] object-cover z-0" alt="">`
                                    : `<img src="https://ui-avatars.com/api/?name=${userReducer.getData?.username}&size=200" class="w-full aspect-[1/1] object-cover rounded-full" alt="">`
                            }
                            <div class="absolute bottom-0 left-0 right-0 w-full h-[30%] bg-black opacity-50 grid place-content-center z-20">
                                <i class="text-white fa-solid fa-camera z-10"></i>
                            </div>
                        </div>
                        <div class="pt-5">
                            <h3 class="text-gray-900 text-lg font-semibold">
                                ${userReducer.getData?.username}
                            </h3>
                            <div class="flex gap-2 items-center">
                                <div
                                    class="flex gap-2 w-fit mt-2 px-2 py-1 text-sm border border-gray-200 rounded-full bg-gray-100  ">
                                    <p class="text-gray-900 font-semibold whitespace-nowrap w-fit">Email: </p>
                                    <p class="to-gray-500 user-email-text">${
                                        userReducer.getData?.email
                                    }</p>
                                </div>
                                <div
                                    class="w-fit mt-2 px-2 py-1 text-sm border border-gray-200 rounded-full bg-gray-100 btn-copy active:bg-gray-200 cursor-pointer">
                                    Copy</div>

                                    
                            </div>

                            <div class="flex flex-col gap-3 pt-3 pr-5">
                                    <div class=" w-full font-semibold text-gray-700 flex items-center gap-2 ">
                                        <p class="">User name: </p>
                                        <p class="">${
                                            userReducer.getData?.username
                                        }</p>
                                    </div>
                                   <div class="p-5 bg-gray-100 rounded-lg w-full text-gray-500">
                                   Total Payment: <span class="font-semibold text-green-500">${usd(
                                       this.state.totalPayment || 0
                                   )}</span>
                                   </div>
                            </div>
                        </div>
                    </div>
                    <!-- col-span-4 -->



                    <!-- col-span-8 -->
                    <div class="col-span-8">

                        <div class="flex flex-col gap-5">


                            <div class="contents" id="page-content"></div>


                        </div>


                    </div>
                    <!-- col-span-8 -->

                </div>
        `;
    };

    protected renderUI(): void {
        super.renderUI();
        switch (this.props.curPage) {
            case 'changePassword': {
                this.renderChangePassForm();
                break;
            }
            case 'profile': {
                this.renderUserInfoForm();
                break;
            }
            case 'address': {
                this.renderUserAddressForm();
                break;
            }
        }
    }

    private renderChangePassForm() {
        this.renderComponent('#page-content', new ChangePassForm());
    }

    private renderUserInfoForm() {
        this.renderComponent('#page-content', new UserInfoForm());
    }

    private renderUserAddressForm() {
        this.renderComponent('#page-content', new ProfileAddress());
    }

    // event
    protected addEventListener(): void {
        this.signEvent('.btn-copy', 'click', () => {
            const text = (this.node('.user-email-text') as HTMLInputElement)
                .innerHTML;
            copyToClipboard(text);
        });
        this.signEvent('.btn-change-avatar', 'click', () => {
            this.changeAvatar();
        });
    }

    protected async afterRender(): Promise<void> {
        const totalPayment = await orderService.getToTalPaymentByUserId(
            userReducer.getData?.userId!
        );
        if (totalPayment) {
            this.setState({ totalPayment: totalPayment });
        }
    }

    //support
    private async changeAvatar() {
        const avatar = await loadFile();

        if (avatar) {
            const res = await userService.updateUserById(
                userReducer.getData?.userId || '',
                { avatar: avatar }
            );
            if (res) {
                toast.success('Update success');
                userReducer.setUser({ image: res.avatar });

                /// check token
                userReducer.refreshToken();
            } else {
                toast.error('Update failed');
            }
        }
    }
}

export default ProfielWarpper;
