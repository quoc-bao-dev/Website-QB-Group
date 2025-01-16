import categoryService from '../../../../api/categoryService';
import ConfirmModal from '../../../../components/common/ConfirmModal';
import TableSkeleton from '../../../../components/common/Skeleton';
import signal from '../../../../lib/listener';
import QBComponent from '../../../../lib/QBComponent';
import toast from '../../../../util/toast';
import FormAddCategory from './Admin.Category.FormAddCate';
import FormEditCategory from './Admin.Category.FormEditCate';

class CategoryAdminItem extends QBComponent<Category> {
    constructor(props: Category) {
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
                    <input type="checkbox" value="" class="sr-only peer" ${
                        this.props.isShow ? 'checked' : ''
                    } id="input-show-category">
                    <div
                        class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
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
        super.addEventListener();

        this.signEvent('#input-show-category', 'change', async (e) => {
            const target = e.target as HTMLInputElement;
            const isShow = target.checked;

            try {
                await categoryService.changeShow(this.props._id, isShow);
                toast.success('Update category successfully');
            } catch (error) {
                toast.error('Failed to update category');
            }
        });

        this.signEvent('.btn-edit', 'click', () => {
            signal.emit('update-category-item', this.props);
        });

        this.signEvent('.btn-delete', 'click', () => {
            signal.emit('show-modal-delete-cate', this.props);
        });
    }
}

interface CategoryAdminTableSate {
    isShowFormAdd: boolean;
    isShowFormEdit: boolean;
    isShowModal: boolean;
    curCate: Category | null;
}
class CategoryAdminTable extends QBComponent<Category[], CategoryAdminTableSate> {
    constructor(props: Category[]) {
        super(props);

        this.state = {
            isShowFormAdd: false,
            isShowFormEdit: false,
            isShowModal: false,
            curCate: null,
        };

        signal.on(
            'update-category-item',
            (cate: Category) => {
                this.setState({ curCate: cate, isShowFormEdit: true });
            },
            'update-category-item'
        );

        signal.on(
            'show-modal-delete-cate',
            (cate: Category) => {
                this.setState({ curCate: cate, isShowModal: true });
            },
            'show-modal-delete-cate'
        );
    }
    protected markup: () => string = () => {
        return /*html*/ `
           <div class="flex justify-between items-center">
             <h1 class="text-2xl font-semibold text-gray-900 py-5">
                            List Category
                        </h1>
                        <button class="bg-blue-600 text-white py-1 px-3 rounded flex gap-2 items-center hover:bg-blue-700" id="btn-add-category">
                        <i class="fa-solid fa-plus"></i>
                        Add Category
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

      <div class="z-50" id="form-add-cate">
        
      </div>

       <div class="z-50" id="form-edit-cate">
        
      </div>

      <div class="z-50" id="model-delete">
        
      </div>


        `;
    };

    protected renderUI(): void {
        super.renderUI();
        this.renderList('#list-items', this.props, CategoryAdminItem);

        // Form add
        if (this.state.isShowFormAdd) {
            this.renderComponent(
                '#form-add-cate',
                new FormAddCategory({
                    onSave: () => {
                        this.setState({ isShowFormAdd: false });
                        signal.emit('update-category');
                    },
                    onCancle: () => this.setState({ isShowFormAdd: false }),
                })
            );
        }

        // Form edit
        if (this.state.isShowFormEdit) {
            this.renderComponent(
                '#form-edit-cate',
                new FormEditCategory({
                    category: this.state.curCate as Category,
                    onSave: () => {
                        this.setState({ isShowFormEdit: false });
                        signal.emit('update-category');
                    },
                    onCancle: () => this.setState({ isShowFormEdit: false }),
                })
            );
        }

        //Modal
        if (this.state.isShowModal) {
            this.renderComponent(
                '#model-delete',
                new ConfirmModal({
                    title: 'Delete Category',
                    content: 'Are you sure you want to delete this category?',
                    onConfirm: () => {
                        this.deleteItem();
                        this.setState({ isShowModal: false });
                    },
                    onCancel: () => this.setState({ isShowModal: false }),
                })
            );
        }
    }

    protected addEventListener(): void {
        this.signEvent('#btn-add-category', 'click', () => {
            this.setState({ isShowFormAdd: true });
        });
    }

    private async deleteItem() {
        try {
            await categoryService.delteCategory(this.state.curCate?._id as string);
            toast.success('Delete category successfully');
            signal.emit('update-category');
        } catch (error) {}
    }
}

interface CategoryAdminState {
    listCate: Category[];
}
class CategoryAdmin extends QBComponent<{}, CategoryAdminState> {
    constructor() {
        super();

        this.state = {
            listCate: [],
        };

        signal.on(
            'update-category',
            () => {
                this.updateLs();
            },
            'update-category'
        );
    }
    protected markup: () => string = () => {
        if (this.state.listCate.length === 0) {
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

        if (this.state.listCate.length > 0) {
            this.renderTable();
        }
    }

    private renderTable() {
        this.renderComponent('#page-content', new CategoryAdminTable(this.state.listCate));
    }

    protected async afterRender(): Promise<void> {
        const result = await categoryService.getCategoryAdmin();
        this.setState({ listCate: result });
    }

    private async updateLs() {
        const result = await categoryService.getCategoryAdmin();
        this.setState({ listCate: result });
    }
}

export default CategoryAdmin;
