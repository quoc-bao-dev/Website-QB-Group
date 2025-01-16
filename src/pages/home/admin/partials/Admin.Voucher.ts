import voucherService from '../../../../api/voucherService';
import { Voucher } from '../../../../interface/voucher';
import signal from '../../../../lib/listener';
import QBComponent from '../../../../lib/QBComponent';
import QBForm from '../../../../lib/QBForm';
import { date, dateInput } from '../../../../util/date';
import toast from '../../../../util/toast';

class FormAddVoucher extends QBForm<{ onCancel: () => void; onSave: () => void }> {
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="fixed z-50 inset-0 bg-black/50 grid place-items-center">
            <div class="p-16 bg-white rounded-lg">
                <h3 class="text-xl font-bold text-gray-700">
                    Add Voucher
                </h3>

                <form class="pt-5">
                    <div class="grid grid-cols-2 gap-5">
                        <div>
                            <label class="text-sm text-gray-500 " for="code"> Code</label>
                            <input type="text" class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                            name="code" id="code" placeholder="code"
                            />
                            ${
                                this.error('code')
                                    ? `<p class="text-red-500 py-1">${this.error('code')?.message}</p>`
                                    : ''
                            }
                        </div>
                       
                        <div>
                            <label class="text-sm text-gray-500 " for="discountPercentage"> Discount Percentage</label>
                            <input type="number" class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                            name="discountPercentage" id="discountPercentage" placeholder="discountPercentage"
                            min="0" max="100"
                            />
                            ${
                                this.error('discountPercentage')
                                    ? `<p class="text-red-500 py-1">${this.error('discountPercentage')?.message}</p>`
                                    : ''
                            }
                        </div>
                        <div>
                            <label class="text-sm text-gray-500 " for="expirationDate"> Expiration Date</label>
                            <input type="date" class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                            name="expirationDate" id="expirationDate" placeholder="expirationDate"
                            />
                            ${
                                this.error('expirationDate')
                                    ? `<p class="text-red-500 py-1">${this.error('expirationDate')?.message}</p>`
                                    : ''
                            }
                        </div>
                        <div>
                            <label class="text-sm text-gray-500 " for="usageLimit"> Usage Limit</label>
                            <input type="number" class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                            name="usageLimit" id="usageLimit" placeholder="usageLimit"
                            min="0" max="1000"
                            />
                            ${
                                this.error('usageLimit')
                                    ? `<p class="text-red-500 py-1">${this.error('usageLimit')?.message}</p>`
                                    : ''
                            }
                        </div>
                        <div>
                            <label class="text-sm text-gray-500 " for="maxDiscountAmount"> Max Discount Amount</label>
                            <input type="number" class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                            name="maxDiscountAmount" id="maxDiscountAmount" placeholder="maxDiscountAmount"
                            min="0" 
                            />
                            ${
                                this.error('maxDiscountAmount')
                                    ? `<p class="text-red-500 py-1">${this.error('maxDiscountAmount')?.message}</p>`
                                    : ''
                            }
                        </div>
                        <div>
                            <label class="text-sm text-gray-500 " for="minOrderValue"> Min Order Value</label>
                            <input type="number" class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                            min="0"
                            name="minOrderValue" id="minOrderValue" placeholder="minOrderValue"
                            />
                            ${
                                this.error('minOrderValue')
                                    ? `<p class="text-red-500 py-1">${this.error('minOrderValue')?.message}</p>`
                                    : ''
                            }
                        </div>
                    </div>
                     <div class="pt-5">
                            <label class="text-sm text-gray-500 " for="description"> Description</label>
                            <input type="text" class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                            name="description" id="description" placeholder="description"
                            />
                        </div>
                    <div class="flex gap-5 mt-5">
                    <button class="btn-create py-2 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex-1" > Save</button>
                    <button class="btn-cancel py-2 px-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100 flex-1" > Cancel</button>
                    </div>
                </form>
            </div>
        </div>
        `;
    };
    schema() {
        this.register('code', (value) => {
            if (!value) {
                return 'code is required';
            }
        });
        this.register('discountPercentage', (value) => {
            if (!value) {
                return 'discountPercentage is required';
            }
        });
        this.register('expirationDate', (value) => {
            if (!value) {
                return 'expirationDate is required';
            }
            if (new Date(value) < new Date()) {
                return 'expirationDate must be greater than today';
            }
        });
        this.register('usageLimit', (value) => {
            if (!value) {
                return 'usageLimit is required';
            }
        });
        this.register('maxDiscountAmount', (value) => {
            if (!value) {
                return 'maxDiscountAmount is required';
            }
        });
        this.register('minOrderValue', (value) => {
            if (!value) {
                return 'minOrderValue is required';
            }
        });
    }

    protected addEventListener() {
        super.addEventListener();
        this.signEvent('.btn-create', 'click', async () => {
            // save form
            const data = (await this.getDataForm()) as Partial<Voucher>;
            if (data) {
                try {
                    const res = await voucherService.addVoucher(data);
                    if (res) {
                        this.props.onSave();
                        toast.success('Create voucher successfully');
                    } else {
                        toast.error('Create voucher failed');
                    }
                } catch (error) {
                    toast.error('Create voucher failed');
                    this.props.onCancel();
                }
            }
        });

        this.signEvent('.btn-cancel', 'click', () => {
            this.props.onCancel();
        });
    }
}
class FormEditVoucher extends QBForm<Voucher & { onCancel: () => void; onSave: () => void }> {
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="fixed z-50 inset-0 bg-black/50 grid place-items-center">
            <div class="p-16 bg-white rounded-lg">
                <h3 class="text-xl font-bold text-gray-700">
                    Edit Voucher
                </h3>

                <form class="pt-5">
                    <div class="grid grid-cols-2 gap-5">
                        <div>
                            <label class="text-sm text-gray-500 " for="code"> Code</label>
                            <input type="text" class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                            name="code" id="code" placeholder="code"
                            value = ${this.props.code}
                            />
                            ${
                                this.error('code')
                                    ? `<p class="text-red-500 py-1">${this.error('code')?.message}</p>`
                                    : ''
                            }
                        </div>
                       
                        <div>
                            <label class="text-sm text-gray-500 " for="discountPercentage"> Discount Percentage</label>
                            <input type="number" class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                            name="discountPercentage" id="discountPercentage" placeholder="discountPercentage"
                            value="${this.props.discountPercentage}"
                            />
                            ${
                                this.error('discountPercentage')
                                    ? `<p class="text-red-500 py-1">${this.error('discountPercentage')?.message}</p>`
                                    : ''
                            }
                        </div>
                        <div>
                            <label class="text-sm text-gray-500 " for="expirationDate"> Expiration Date</label>
                            <input type="date" class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                            name="expirationDate" id="expirationDate" placeholder="expirationDate"
                            value="${dateInput(this.props.expirationDate)}"
                            />
                            ${
                                this.error('expirationDate')
                                    ? `<p class="text-red-500 py-1">${this.error('expirationDate')?.message}</p>`
                                    : ''
                            }
                        </div>
                        <div>
                            <label class="text-sm text-gray-500 " for="usageLimit"> Usage Limit</label>
                            <input type="number" class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                            name="usageLimit" id="usageLimit" placeholder="usageLimit"
                            value="${this.props.usageLimit}"
                            />
                            ${
                                this.error('usageLimit')
                                    ? `<p class="text-red-500 py-1">${this.error('usageLimit')?.message}</p>`
                                    : ''
                            }
                        </div>
                        <div>
                            <label class="text-sm text-gray-500 " for="maxDiscountAmount"> Max Discount Amount</label>
                            <input type="number" class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                            name="maxDiscountAmount" id="maxDiscountAmount" placeholder="maxDiscountAmount"
                            value="${this.props.maxDiscountAmount}"
                            />
                            ${
                                this.error('maxDiscountAmount')
                                    ? `<p class="text-red-500 py-1">${this.error('maxDiscountAmount')?.message}</p>`
                                    : ''
                            }
                        </div>
                        <div>
                            <label class="text-sm text-gray-500 " for="minOrderValue"> Min Order Value</label>
                            <input type="number" class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                            name="minOrderValue" id="minOrderValue" placeholder="minOrderValue"
                            value="${this.props.minOrderValue}"
                            />
                            ${
                                this.error('minOrderValue')
                                    ? `<p class="text-red-500 py-1">${this.error('minOrderValue')?.message}</p>`
                                    : ''
                            }
                        </div>
                    </div>
                     <div class="pt-5">
                            <label class="text-sm text-gray-500 " for="description"> Description</label>
                            <input type="text" class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                            name="description" id="description" placeholder="description"
                            value="${this.props.description}"
                            />
                        </div>
                    <div class="flex gap-5 mt-5">
                    <button class="btn-save py-2 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex-1" > Save</button>
                    <button class="btn-cancel py-2 px-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100 flex-1" > Cancel</button>
                    </div>
                </form>
            </div>
        </div>
        `;
    };
    schema() {
        this.register('code', (value) => {
            if (!value) {
                return 'code is required';
            }
        });
        this.register('discountPercentage', (value) => {
            if (!value) {
                return 'discountPercentage is required';
            }
        });
        this.register('expirationDate', (value) => {
            if (!value) {
                return 'expirationDate is required';
            }
            if (new Date(value) < new Date()) {
                return 'expirationDate must be greater than today';
            }
        });
        this.register('usageLimit', (value) => {
            if (!value) {
                return 'usageLimit is required';
            }
        });
        this.register('maxDiscountAmount', (value) => {
            if (!value) {
                return 'maxDiscountAmount is required';
            }
        });
        this.register('minOrderValue', (value) => {
            if (!value) {
                return 'minOrderValue is required';
            }
        });
    }

    protected addEventListener() {
        super.addEventListener();
        this.signEvent('.btn-save', 'click', async () => {
            // save form
            const data = (await this.getDataForm()) as Partial<Voucher>;
            if (data) {
                try {
                    const res = await voucherService.updateVoucher(this.props._id, {
                        ...data,
                        expirationDate: new Date(data.expirationDate as Date).toISOString(),
                    });
                    if (res) {
                        this.props.onSave();
                        toast.success('Update voucher success');
                    } else {
                        toast.error('Update voucher failed');
                    }
                } catch (error) {
                    this.props.onCancel();
                    toast.error('Update voucher failed');
                }
            }
        });

        this.signEvent('.btn-cancel', 'click', () => {
            this.props.onCancel();
        });
    }
}

interface AdminVoucherItemState {
    isShowFormEdit: boolean;
}
class AdminVoucherItem extends QBComponent<Voucher, AdminVoucherItemState> {
    constructor(props: Voucher) {
        super(props);
        this.state = {
            isShowFormEdit: false,
        };
    }
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="p-8 rounded-xl bg-blue-50  border-blue-900 ">
            <div class="">
                <h2 class="text-xl font-bold text-blue-900">
                    ${this.props.code}
                </h2>
                <div class="w-full h-[2px] bg-blue-900 my-2"></div>
                  <p class="text-blue-900"> ${this.props.description}</p>
               <div class="flex justify-between items-end">
                    <div>
                    <div> 
                    <p class="text-blue-900"> <span class="font-bold min-w-[200px]">Discount:</span> ${
                        this.props.discountPercentage
                    }%</p>
                </div>
                <div> 
                    <p class="text-blue-900"> <span class="font-bold min-w-[200px]">Expiration Date:</span> ${date(
                        this.props.expirationDate
                    )}</p>
                </div>
                <div> 
                    <p class="text-blue-900"> <span class="font-bold min-w-[200px]">Min Order Value:</span> ${
                        this.props.minOrderValue
                    }</p>
                </div>
                    <div> 
                    <p class="text-blue-900"> <span class="font-bold min-w-[200px]">Quantity:</span> ${
                        this.props.usageLimit - this.props.usageCount
                    }</p>
                </div>
                    </div>
                    <div class="h-full flex items-end">
                        <button class="py-2 px-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 flex gap-2 items-center btn-edit">
                            <i class="fa-solid fa-pen-to-square"></i>
                            <p>Change</p>
                        </button>
                    </div>

               </div>
              
            </div>
        </div>
        <div id="form-edit"></div>
        `;
    };

    protected renderUI(): void {
        super.renderUI();
        if (this.state.isShowFormEdit) {
            this.renderComponent(
                '#form-edit',
                new FormEditVoucher({
                    ...this.props,
                    onCancel: () => this.setState({ isShowFormEdit: false }),
                    onSave: async () => {
                        this.setState({ isShowFormEdit: false });
                        signal.emit('update-voucher');
                    },
                })
            );
        }
    }

    protected addEventListener(): void {
        this.signEvent('.btn-edit', 'click', () => {
            this.setState({ isShowFormEdit: true });
        });
    }
}

interface AdminVoucherState {
    listVoucher: Voucher[];
    isShowFormAdd: boolean;
}
class AdminVoucher extends QBComponent<{}, AdminVoucherState> {
    constructor() {
        super();

        this.state = {
            listVoucher: [],
            isShowFormAdd: false,
        };

        signal.on(
            'update-voucher',
            () => {
                this.updateVoucher();
            },
            'update-voucher'
        );
    }

    protected markup: () => string = () => {
        return /*html*/ `<div class="p-5">
        <div class="flex items-center justify-between pb-5">
            <h1 class="text-2xl font-semibold text-gray-900">List Voucher</h1>
            <button class="btn-add-voucher bg-blue-600 text-white py-1 px-3 rounded flex gap-2 items-center hover:bg-blue-700 ">
                <i class="fa-solid fa-plus"></i>
                Add Voucher
            </button>
        </div>
        <div class="overflow-y-auto max-h-[500px] relative  flex flex-col gap-3" id="list-voucher">
        
        </div>
        <div id="form-add-voucher"></div>
        </div>`;
    };

    protected renderUI(): void {
        super.renderUI();
        this.renderList('#list-voucher', this.state.listVoucher, AdminVoucherItem);
        if (this.state.isShowFormAdd) {
            this.renderComponent(
                '#form-add-voucher',
                new FormAddVoucher({
                    onCancel: () => this.setState({ isShowFormAdd: false }),
                    onSave: async () => {
                        this.setState({ isShowFormAdd: false });
                        signal.emit('update-voucher');
                    },
                })
            );
        }
    }

    protected addEventListener(): void {
        this.signEvent('.btn-add-voucher', 'click', () => {
            this.setState({ isShowFormAdd: true });
        });
    }

    protected async afterRender(): Promise<void> {
        const lsVoucher = await voucherService.getAllVoucher();
        this.setState({ listVoucher: lsVoucher });
    }

    private async updateVoucher() {
        const lsVoucher = await voucherService.getAllVoucher();
        this.setState({ listVoucher: lsVoucher });
    }
}

export default AdminVoucher;
