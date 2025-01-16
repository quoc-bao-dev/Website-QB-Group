import { productService } from '../../../../api/productService';
import ConfirmModal from '../../../../components/common/ConfirmModal';
import { BrandDetail, CategoryDetail, Product } from '../../../../interface/product';
import signal from '../../../../lib/listener';
import QBComponent from '../../../../lib/QBComponent';
import { n, usd } from '../../../../util/productUtils';
import toast from '../../../../util/toast';
import FormAddProduct from './Admin.ProductForm';
class ProductAdminItem extends QBComponent<{ product: Product }> {
    constructor(props: { product: Product }) {
        super(props);
        this.element = document.createElement('tr');
        this.element.className = 'border-b border-gray-200';
    }
    protected markup: () => string = () => {
        return /*html*/ `
           <td class="p-2 text-center"><img src="${this.props.product.image}"
                                                class="w-10 aspect-[1/1] object-contain" alt=""></td>
        <td class="p-2 text-center">${this.props.product.name}</td>
        <td class="p-2 text-center">${usd(this.props.product.price)}</td>
        <td class="p-2 text-center">${this.props.product.discount}%</td>
        <td class="p-2 text-center">${(this.props.product.category as CategoryDetail)?.name}</td>
        <td class="p-2 text-center">${(this.props.product.brand as BrandDetail)?.name}</td>
        <td class="p-2 text-center">${n(this.props.product.stock)}</td>
        <td class="p-2 text-center">${this.props.product.orderNumber}</td>
        <td class="p-2 text-center">${n(this.props.product.sold)}</td>
        <td class="p-2 text-center">${n(this.props.product.view)}</td>
        <td class="p-2 text-center">
            <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" ${
                    this.props.product.isShow ? 'checked' : ''
                } class="sr-only peer" id="input-show-product">
                <div
                    class="relative z-0 w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                </div>
            </label>
        </td>
        <td class="p-2 text-center flex gap-2 items-center justify-center">
            <button class="bg-blue-500 text-white py-1 px-2 rounded btn-edit">Edit</button>
            <button class="bg-red-500 text-white py-1 px-2 rounded btn-delete">Delete</button>
        </td>
        `;
    };

    protected addEventListener(): void {
        this.signEvent('.btn-edit', 'click', () => {
            signal.emit('set-cur-product-id', this.props.product._id);
        });

        this.signEvent('.btn-delete', 'click', () => {
            signal.emit('show-modal', this.props.product._id);
        });

        this.signEvent('#input-show-product', 'change', () => {
            this.changeShowProduct();
        });
    }

    // support
    private async changeShowProduct() {
        try {
            const isShow = (this.node('#input-show-product') as HTMLInputElement).checked;
            await productService.updateProduct(this.props.product._id, { isShow: isShow });
            toast.success('Update success');
        } catch (error) {
            toast.error('Update fail');
        }
    }
}

class ProductAdminTable extends QBComponent<Product[]> {
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="flex flex-col flex-1 ">
            <div class="h-[500px] overflow-y-auto relative">
                <table class="w-full  table-auto border-l border-r z-50 border-gray-200">
                    <thead class="bg-gray-100 sticky top-0  z-50">
                        <tr class="border-b border-gray-200">
                            <th class="p-2">Image</th>
                            <th class="p-2">Name</th>
                            <th class="p-2">Price</th>
                            <th class="p-2">Sale</th>
                            <th class="p-2">Category</th>
                            <th class="p-2">Brand</th>
                            <th class="p-2">Stock</th>
                            <th class="p-2">Order</th>
                            <th class="p-2">Sold</th>
                            <th class="p-2">Views</th>
                            <th class="p-2">Show</th>
                            <th class="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody class="overflow-y-auto h-[200px] z-40" id="product-list">
                        
                    </tbody>
                </table>
            </div>
        </div>
        `;
    };

    protected renderUI(): void {
        super.renderUI();
        this.renderTable();
    }

    private renderTable() {
        const ls = this.props.map((item) => ({ product: item }));
        this.renderList('#product-list', ls, ProductAdminItem);
    }
}

interface ProductAdminContentState {
    isShowForm: boolean;
    isShowModal: boolean;
    deleteId: string;
}
class ProductAdminContent extends QBComponent<Product[], ProductAdminContentState> {
    constructor(props: Product[]) {
        super(props);

        this.state = {
            isShowForm: false,
            isShowModal: false,
            deleteId: '',
        };

        signal.on(
            'show-modal',
            (id: string) => {
                this.showConfirmModal(id);
            },
            'show-modal-2'
        );
    }
    protected markup: () => string = () => {
        return /*html*/ `
       <div class="flex justify-between items-center">
             <h1 class="text-2xl font-semibold text-gray-900 py-5">
                            List Product
                        </h1>
                       ${
                           !this.state.isShowForm
                               ? ` <button class="bg-blue-600 text-white py-1 px-3 rounded flex gap-2 items-center hover:bg-blue-700 btn-add-prod">
                        <i class="fa-solid fa-plus"></i>
                        Add Product
                        </button>`
                               : ` <button class="bg-blue-600 text-white py-1 px-3 rounded flex gap-2 items-center hover:bg-blue-700 btn-back">
                        <i class="fa-solid fa-chevron-left"></i>
                        Back
                        </button>`
                       }
        </div>
            <div class="contents" id="content-page"></div> 

            <div class="contents" id="modal-confirm"></div>
    `;
    };

    protected renderUI(): void {
        super.renderUI();
        if (this.state.isShowForm) {
            this.renderForm();
            return;
        }
        this.renderTable();
        if (this.state.isShowModal) {
            this.renderComponent(
                '#modal-confirm',
                new ConfirmModal({
                    title: 'Delete Product',
                    content: 'Are you sure you want to delete this product?',
                    onConfirm: () => this.deleteProduct(this.state.deleteId),
                    onCancel: () => this.setState({ isShowModal: false }),
                })
            );
        }
    }

    private renderTable() {
        this.renderComponent('#content-page', new ProductAdminTable(this.props));
    }

    private renderForm() {
        this.renderComponent('#content-page', new FormAddProduct());
    }

    protected addEventListener(): void {
        this.signEvent('.btn-add-prod', 'click', () => {
            this.setState({ isShowForm: true });
        });
        this.signEvent('.btn-back', 'click', () => {
            this.setState({ isShowForm: false });
        });
    }

    // support
    private showConfirmModal(id: string) {
        this.setState({ isShowModal: true, deleteId: id });
    }

    private async deleteProduct(id: string) {
        const res = await productService.deleteProduct(id);
        if (res) {
            toast.success('Delete product successfully');
            signal.emit('set-cur-page', 'product');
        }
    }
}

export default ProductAdminContent;
