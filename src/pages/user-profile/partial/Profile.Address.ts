import addressService from '../../../api/addressService';
import { AddressInfo } from '../../../interface/order';
import signal from '../../../lib/listener';
import QBComponent from '../../../lib/QBComponent';
import userReducer from '../../../store/userReducer';
import UserAdressFrom, { AddAddress } from './FormProfile.UserAddressFrom';

interface ProfileAddressSate {
    lsAdress: AddressInfo[];
}
class ProfileAddress extends QBComponent<{}, ProfileAddressSate> {
    constructor() {
        super();
        this.state = {
            lsAdress: [],
        };

        signal.on('address-user-update', this.updateAddress.bind(this), 'address-user-update');
    }
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="flex flex-col gap-5" id="list-address"></div>
        `;
    };

    protected renderUI(): void {
        super.renderUI();
        this.renderListAddress();
    }

    private renderListAddress() {
        const lsAdd = this.state.lsAdress.map((add) => {
            return {
                address: add,
            };
        });
        this.renderList('#list-address', lsAdd, UserAdressFrom);
        if (lsAdd.length <= 2) {
            this.renderComponent('#list-address', new AddAddress());
        }
    }

    protected async afterRender(): Promise<void> {
        const userId = userReducer.getData?.userId;

        const lsAddress = await addressService.getAddByUserId(userId as string);

        this.setState({ lsAdress: lsAddress });
    }

    private updateAddress = async () => {
        const userId = userReducer.getData?.userId;

        const lsAddress = await addressService.getAddByUserId(userId as string);

        this.setState({ lsAdress: lsAddress });
    };
}

export default ProfileAddress;
