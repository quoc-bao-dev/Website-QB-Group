import brandService from '../../../../api/brandService';
import TableSkeleton from '../../../../components/common/Skeleton';
import { BrandDetail } from '../../../../interface/product';
import QBComponent from '../../../../lib/QBComponent';

class BrandAdminItem extends QBComponent<BrandDetail> {
    constructor(props: BrandDetail) {
        super(props);

        this.element = document.createElement('tr');
        this.element.className = 'border-b border-gray-200';
    }
    protected markup: () => string = () => {
        return /*html*/ `
       <td class="p-2 text-center"><img src="${this.props.image}"
                    class="w-10 aspect-[1/1] object-contain" alt=""></td>
            <td class="p-2 text-center">${this.props.name}</td>
            <td class="p-2 text-center">${this.props.description}</td>
            <td class="p-2 text-center">${this.props.orderNumber}</td>
            <td class="p-2 text-center">
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" ${this.props.isShow ? 'checked' : ''}>
                    <div
                        class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
                </label>
            </td>
            <td class="p-2 text-center flex gap-2 items-center justify-center">
                <button class="bg-blue-500 text-white py-1 px-2 rounded">Edit</button>
                <button class="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
            </td>
        `;
    };
}
class BrandAdminTable extends QBComponent<BrandDetail[]> {
    protected markup: () => string = () => {
        return /*html*/ `
           <div class="flex justify-between items-center">
             <h1 class="text-2xl font-semibold text-gray-900 py-5">
                            List Brand
                        </h1>
                        <button class="bg-blue-600 text-white py-1 px-3 rounded flex gap-2 items-center hover:bg-blue-700">
                        <i class="fa-solid fa-plus"></i>
                        Add Brand
                        </button>
           </div>
            <div class="overflow-y-auto max-h-[500px] relative">
            <table class="w-full table-auto border-l border-r border-b border-gray-200">
                <thead class="bg-gray-100 sticky top-0  z-50">
                    <tr class="border-b border-gray-200">
                        <th class="p-2">Image</th>
                        <th class="p-2">Name</th>
                        <th class="p-2">Description</th>
                        <th class="p-2">Order</th>
                        <th class="p-2">Show</th>
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
        this.renderList('#list-items', this.props, BrandAdminItem);
    }
}
interface BrandAdminState {
    listBrand: BrandDetail[];
}
class BrandAdmin extends QBComponent<{}, BrandAdminState> {
    constructor() {
        super();

        this.state = {
            listBrand: [],
        };
    }
    protected markup: () => string = () => {
        if (this.state.listBrand.length === 0) {
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

        if (this.state.listBrand.length > 0) {
            this.renderTable();
        }
    }

    private renderTable() {
        this.renderComponent('#page-content', new BrandAdminTable(this.state.listBrand));
    }

    protected async afterRender(): Promise<void> {
        const result = await brandService.getAllBrand();

        this.setState({ listBrand: result });
    }
}

export default BrandAdmin;
