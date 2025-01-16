import brandService from '../../../../api/brandService';
import categoryService from '../../../../api/categoryService';
import { productService } from '../../../../api/productService';
import { BrandDetail } from '../../../../interface/product';
import signal from '../../../../lib/listener';
import QBForm from '../../../../lib/QBForm';
import toast from '../../../../util/toast';

interface FormAddProductState {
    lsCategory: Category[];
    lsBrand: BrandDetail[];
}
class FormAddProduct extends QBForm<{}, FormAddProductState> {
    constructor() {
        super();

        this.state = {
            lsCategory: [],
            lsBrand: [],
        };
    }
    protected markup: () => string = () => {
        return /*html*/ ` 
        <form class="flex flex-col gap-5">
            <div class="grid grid-cols-2 gap-5">
                <!-- Name -->
                <div class="relative">
                    <label class="text-sm text-gray-500" for="name">Name</label>
                    <input
                        class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                        id="name" name="name" type="text" placeholder="I Phone 13 Pro" value="New Product">
                        ${this.error('name') ? `<p class="text-red-500 py-1">${this.error('name')?.message}</p>` : ''}
                </div>

                 <!-- Stock -->
                <div class="relative">
                    <label class="text-sm text-gray-500" for="stock">Stock</label>
                    <input
                        class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                        id="stock" name="stock" type="number" placeholder="100" value="100">
                        ${this.error('stock') ? `<p class="text-red-500 py-1">${this.error('stock')?.message}</p>` : ''}
                </div>

              

                <!-- Price -->
                <div class="relative">
                    <label class="text-sm text-gray-500" for="price">Price</label>
                    <input
                        class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                        id="price" name="price" type="number" min="0" step="0.01" placeholder="999.99" value="999.99">
                        ${this.error('price') ? `<p class="text-red-500 py-1">${this.error('price')?.message}</p>` : ''}
                </div>

                 <!-- Discount -->
                <div class="relative">
                    <label class="text-sm text-gray-500" for="discount">Discount</label>
                    <input
                        class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                        id="discount" name="discount" min="0" max="100" type="number" step="1" placeholder="10" value="0">
                        ${
                            this.error('discount')
                                ? `<p class="text-red-500 py-1">${this.error('discount')?.message}</p>`
                                : ''
                        }
                </div>

                <!-- Category ID -->
                <div class="relative">
                    <label class="text-sm text-gray-500" for="category">Category</label>
                    <select
                        class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                        id="category" name="category">
                        ${this.state.lsCategory
                            .map((item) => {
                                return `<option value="${item._id}">${item.name}</option>`;
                            })
                            .join('')}
                        <!-- Add more options as needed -->
                    </select>
                </div>

                <!-- Brand ID -->
                <div class="relative">
                    <label class="text-sm text-gray-500" for="brand">Brand</label>
                    <select
                        class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                        id="brand" name="brand">
                        ${this.state.lsBrand
                            .map((item) => {
                                return `<option value="${item._id}">${item.name}</option>`;
                            })
                            .join('')}
                        <!-- Add more options as needed -->
                    </select>
                </div>

                <!-- Image URL -->
                <div class="relative col-span-2">
                    <label class="text-sm text-gray-500" for="image">Image URL</label>
                    <input
                        class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                        id="image" name="image" type="url"
                        placeholder="https://cdn.xtmobile.vn/vnt_upload/product/01_2022/thumbs/(600x600)_crop_iphone-13-pro-128gb-likenew.jpg"
                        value="https://imagedelivery.net/ZeGtsGSjuQe1P3UP_zk3fQ/9f52cd95-308d-4bc2-88da-5f23b46c3700/storedata"
                        >
                        ${this.error('image') ? `<p class="text-red-500 py-1">${this.error('image')?.message}</p>` : ''}
                </div>

                <!-- Tags -->
                <div class="relative col-span-2">
                    <label class="text-sm text-gray-500" for="tags">Tags</label>
                    <input
                        class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                        id="tags" name="tags" type="text" placeholder="iPhone, Smartphone, Apple">
                </div>

                 <!-- Description -->
                <div class="relative col-span-2">
                    <label class="text-sm text-gray-500" for="description">Description</label>
                    <textarea
                        class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                        id="description" name="description"
                        placeholder="The latest model of the iPhone series with advanced features."></textarea>
                </div>


                <!-- Features -->
                <div class="relative col-span-2">
                    <label class="text-sm text-gray-500" for="features">Features</label>
                    <textarea
                        class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                        id="features" name="features"
                        placeholder='[{ "featureName": "5G Enabled", "featureDescription": "Experience blazing fast internet speeds with 5G support." }, { "featureName": "High-resolution Display", "featureDescription": "Enjoy crystal-clear visuals on the high-resolution display." }]'></textarea>
                </div>

                <!-- Options -->
                <div class="relative col-span-2">
                    <label class="text-sm text-gray-500" for="options">Options</label>
                    <textarea
                        class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                        id="options" name="options"
                        placeholder='{"color":[{"value":"gray","priceInc":100,"stock":0,"isDefault":false,"color":"#333333"},{"value":"blue-gray","priceInc":100,"stock":0,"isDefault":false,"color":"#cdcdcd"}],"ram":[{"value":"128GB","priceInc":100,"stock":100,"isDefault":true}],"storage":[{"value":"128GB","priceInc":100,"stock":100,"isDefault":true}]}'></textarea>
                </div>

            </div>
            <div class="flex justify-end items-center gap-5 mt-5 pb-16">
                            <button class="px-5 py-3 bg-blue-600 hocver:bg-blue-700 text-white rounded-lg btn-create" type="submit">
                                Create
                            </button>
                            <button class="px-5 py-3 bg-red-600 hocver:bg-red-700 text-white rounded-lg" type="submit">
                                Cancel
                            </button>
            </div>
        </form>
        `;
    };

    protected schema(): void {
        this.register('name', (value) => {
            if (!value) {
                return 'Product name is required';
            }
        });

        this.register('price', (value) => {
            if (!value) {
                return 'Product price is required';
            }

            if (value <= 0) {
                return 'Product price must be greater than or equal to 0';
            }

            if (!Number(value)) {
                return 'Product price must be an number';
            }
        });

        this.register('image', (value) => {
            if (!value) {
                return 'Product image is required';
            }
        });

        this.register('discount', (value) => {
            if (!value) {
                return 'Product discount is required';
            }
        });

        this.register('stock', (value) => {
            if (!value) {
                return 'Product stock is required';
            }
        });

        this.register('brand', (value) => {
            if (!value) {
                return 'Product brand is required';
            }
        });
    }

    protected addEventListener(): void {
        super.addEventListener();
        this.signEvent('.btn-create', 'click', () => {
            this.createProduct();
        });
    }

    protected async afterRender(): Promise<void> {
        super.afterRender();
        const lsCate = await categoryService.getCategory();
        const lsBrand = await brandService.getAllBrand();

        this.setState({ lsCategory: lsCate, lsBrand: lsBrand });
    }

    //support
    private async createProduct() {
        const formData = await this.getDataForm();
        const option = {
            color: [
                {
                    value: 'gray',
                    priceInc: 100,
                    stock: 0,
                    isDefault: false,
                    color: '#333333',
                },
                {
                    value: 'blue-gray',
                    priceInc: 100,
                    stock: 0,
                    isDefault: false,
                    color: '#cdcdcd',
                },
            ],
            ram: [
                {
                    value: '128GB',
                    priceInc: 100,
                    stock: 100,
                    isDefault: true,
                },
            ],
            storage: [
                {
                    value: '128GB',
                    priceInc: 100,
                    stock: 100,
                    isDefault: true,
                },
            ],
        };

        const data = {
            ...formData,
            options: option,
        };

        if (formData) {
            try {
                const res = await productService.createProduct(data);
                if (res) {
                    toast.success('Create product successfully');
                    signal.emit('set-cur-page', 'product');
                } else {
                    toast.error('Create product failed');
                }
            } catch (error) {
                toast.error('Create product failed');
            }
        }
    }
}

export default FormAddProduct;
