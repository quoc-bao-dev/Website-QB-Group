import categoryService from '../../../../api/categoryService';
import QBForm from '../../../../lib/QBForm';
import toast from '../../../../util/toast';

interface FormEditCategoryProps {
    onSave: () => void;
    onCancle: () => void;
    category: Category;
}

class FormEditCategory extends QBForm<FormEditCategoryProps> {
    constructor(props: FormEditCategoryProps) {
        super(props);
    }
    protected markup: () => string = () => {
        return /*html*/ `
            <div class="fixed z-50 inset-0 bg-black/50 grid place-items-center">
                <div class="p-16 bg-white rounded-lg">
                    <form class="flex flex-col gap-3 w-[500px]">
                        <h2 class="text-xl font-bold text-gray-700">
                            Edit Category
                        </h2>
                        <div class="relative">
                            <label class="text-sm text-gray-500 " for="image">
                               Image
                            </label>
                            <input
                                class=" w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                id="image" name="image" type="text" placeholder="image url"                                >
                            ${
                                this.error('image')
                                    ? `<p class="text-red-500 py-1">${this.error('image')?.message}</p>`
                                    : ''
                            }
                        </div>

                         <div class="relative">
                            <label class="text-sm text-gray-500 " for="name">
                                Name
                            </label>
                            <input
                                class=" w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                id="name" name="name" type="text" placeholder="categoray name"                                >
                                ${
                                    this.error('name')
                                        ? `<p class="text-red-500 py-1">${this.error('name')?.message}</p>`
                                        : ''
                                }
                            </div>

                        <div class="relative">
                            <label class="text-sm text-gray-500 " for="description">
                                Description
                            </label>
                            <input
                                class=" w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                id="description" name="description" type="text" placeholder="categoray description"                                >
                        </div>
                         <div class="flex gap-3">
                            <button class="btn-save w-full p-3 bg-blue-600 text-white rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400">Save</button>
                            <button class="btn-cancle w-full p-3 text-blue-600 bg-white border border-blue-600 rounded-lg focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    };

    protected schema(): void {
        this.register('image', (value) => {
            if (!value) {
                return 'image is required';
            }
        });
        this.register('name', (value) => {
            if (!value) {
                return 'name is required';
            }
        });
    }

    protected addEventListener(): void {
        super.addEventListener();
        this.signEvent('.btn-save', 'click', () => {
            this.addCategory();
        });

        this.signEvent('.btn-cancle', 'click', () => {
            this.props.onCancle();
        });
    }

    protected async afterRender(): Promise<void> {
        this.setDefaultValue(this.props.category);
    }

    //support
    private async addCategory() {
        const data = await this.getDataForm();
        try {
            await categoryService.updateCategory(this.props.category._id, data);
            toast.success('Add category success');
            this.props.onSave();
        } catch (error) {
            toast.error('Add category fail');
        }
        if (data) {
        } else {
            return;
        }
    }
}

export default FormEditCategory;
