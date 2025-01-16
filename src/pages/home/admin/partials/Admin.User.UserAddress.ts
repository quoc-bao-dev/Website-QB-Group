import addressService from '../../../../api/addressService';
import { AddressInfo } from '../../../../interface/order';
import QBComponent from '../../../../lib/QBComponent';

class AddressItem extends QBComponent<AddressInfo> {
    protected markup: () => string = () => {
        return /*html*/ `
       <div class="flex flex-col gap-1 bg-slate-50 px-3 py-2 rounded-lg border border-gray-200">
                    <div class="flex gap-3 items-center">
                        <p class="font-medium text-gray-800 min-w-[120px]">Country:</p>
                        <p class="text-gray-500">${this.props.country}</p>
                    </div>

                     <div class="flex gap-3 items-center">
                        <p class="font-medium text-gray-800 min-w-[120px]">City:</p>
                        <p class="text-gray-500">${this.props.city}</p>
                    </div>

                     <div class="flex gap-3 items-center">
                        <p class="font-medium text-gray-800 min-w-[120px]">District:</p>
                        <p class="text-gray-500">${this.props.district}</p>
                    </div>

                     <div class="flex gap-3 items-center">
                        <p class="font-medium text-gray-800 min-w-[120px]">Adsress:</p>
                        <p class="text-gray-500">${this.props.address}</p>
                    </div>
                </div>
        `;
    };
}

interface AdminUserAddressProps {
    userId: string;
}

interface AdminUserAddressState {
    lsAddress: AddressInfo[];
}
class AdminUserAddress extends QBComponent<AdminUserAddressProps, AdminUserAddressState> {
    constructor(props: AdminUserAddressProps) {
        super(props);
        this.state = {
            lsAddress: [],
        };
    }

    protected markup: () => string = () => {
        if (this.state.lsAddress.length === 0) {
            return /*html*/ `
            <div class=" w-full py-16 flex justify-center items-center border boreder-gray-200 rounded-lg bg-white">
                <p class="text-lg text-gray-500">
                    No address
                </p>
            </div>
            `;
        }
        return /*html*/ `
        <div class="list-address flex flex-col gap-5"></div>
        `;
    };

    protected renderUI(): void {
        super.renderUI();
        this.renderList('.list-address', this.state.lsAddress, AddressItem);
    }

    protected async afterRender(): Promise<void> {
        const res = await addressService.getAddByUserId(this.props.userId);

        this.setState({ lsAddress: res });
    }
}

export default AdminUserAddress;
