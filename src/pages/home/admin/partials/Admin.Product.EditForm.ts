import _ from 'lodash';
import { productService } from '../../../../api/productService';
import TableSkeleton from '../../../../components/common/Skeleton';
import { IOptionItem, Option, Product, ProductDetail } from '../../../../interface/product';
import QBComponent from '../../../../lib/QBComponent';
import QBForm from '../../../../lib/QBForm';
import { usd } from '../../../../util/productUtils';
import toast from '../../../../util/toast';
import signal from '../../../../lib/listener';

class OptionItem extends QBComponent<IOptionItem & { index: number }> {
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="grid grid-cols-2  gap-3">
        ${
            this.props.color
                ? /*html*/ `
            
            <div class="grid grid-cols-2 gap-3">
                                <input
                                    class="value w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                    type="text" 
                                    placeholder="128GB"
                                    value="${this.props.value}"
                                    >
                                <input
                                    class="color aspect-square h-full rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                    type="color" value="${this.props.color}" readonly
                                    placeholder="128GB">
                            </div>
            `
                : /*html*/ `
                     <input
                                class="value w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                type="text" 
                                placeholder="128GB"
                                 value="${this.props.value}"
                                >
                `
        }
                            <input
                                class="priceInc w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                               type="text" 
                                placeholder="128GB"
                                 value="${this.props.priceInc}"
                                >
                                </div>
                                <div class="h-[1px] bg-gray-200 my-3"></div>
        `;
    };

    protected addEventListener(): void {
        super.addEventListener();

        this.signEvent('input.value', 'change', () => {
            const value = (this.node('input.value') as HTMLInputElement).value;
            console.log(value);
        });
        this.signEvent('input.color', 'change', () => {
            const value = (this.node('input.color') as HTMLInputElement).value;
            console.log(value);
        });
        this.signEvent('.priceInc', 'change', () => {
            const value = (this.node('input.priceInc') as HTMLInputElement).value;
            console.log(value);
        });
    }
}

interface OptionFormProps {
    isEdit: boolean;
    option: Option;
}
class OptionForm extends QBComponent<OptionFormProps> {
    constructor(props: OptionFormProps) {
        super(props);
    }
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="pt-3"></div>
        <label class="text-sm text-gray-500 " for="options">
                Options
            </label>
            <div class="flex flex-col gap-2 ${this.props.isEdit ? 'group' : ''}">
                <div class="grid grid-cols-3 gap-3 ">
                    <div class="text-gray-500 flex items-center justify-between">
                        <p class="text-lg">
                            Color
                        </p>
                    </div>

                    <div class="col-span-2 flex flex-col gap-3">
                       
                        ${this.props.option.color
                            .map((item, index) => new OptionItem({ ...item, index }).html)
                            .join('')}

                    </div>

                </div>

                <div class="flex items-center hidden group-hover:flex">
                    <div class=" my-2 h-[1px] flex-1 bg-gray-200"></div>
                    <i class="fa-solid fa-circle-plus"></i>
                </div>
            </div>



            <div class="flex flex-col gap-2 pt-3 ${this.props.isEdit ? 'group' : ''}">
                <div class="grid grid-cols-3 gap-3 ">
                    <div class="text-gray-500 flex items-center justify-between">
                        <p class="text-lg">
                            RAM
                        </p>

                    </div>
                    <div class="col-span-2 flex flex-col gap-3">
                        <!-- item -->
                        ${this.props.option.ram.map((item, index) => new OptionItem({ ...item, index }).html).join('')}
                        <!-- item -->
                    </div>
                </div>

                <div class="flex items-center hidden group-hover:flex">
                    <div class=" my-2 h-[1px] flex-1 bg-gray-200"></div>
                    <i class="fa-solid fa-circle-plus"></i>
                </div>
            </div>


            <div class="flex flex-col gap-2 pt-3 ${this.props.isEdit ? 'group' : ''}">
                <div class="grid grid-cols-3 gap-3 ">
                    <div class="text-gray-500 flex items-center justify-between">
                        <p class="text-lg">
                            Storage
                        </p>

                    </div>
                    <div class="col-span-2 flex flex-col gap-3">
                        <!-- item -->
                         ${this.props.option.storage
                             .map((item, index) => new OptionItem({ ...item, index }).html)
                             .join('')}
                        <!-- item -->
                    </div>
                </div>

                <div class="flex items-center hidden group-hover:flex">
                    <div class=" my-2 h-[1px] flex-1 bg-gray-200"></div>
                    <i class="fa-solid fa-circle-plus"></i>
                </div>
            </div>
            <!-- option -->
        `;
    };
}

interface ProductAdminEditFormState {
    product: ProductDetail | null;
    isEdit: boolean;
}
class ProductAdminEditForm extends QBForm<{ id: string }, ProductAdminEditFormState> {
    constructor(props: { id: string }) {
        super(props);

        this.state = {
            product: null,
            isEdit: false,
        };
    }
    protected markup: () => string = () => {
        if (this.state.product === null) {
            return /*html*/ `
           <div class="pl-5 py-5">
               ${new TableSkeleton().html}
            </div>
            `;
        }
        return /*html*/ `
          <!-- section -->
          <div class="py-2 flex items-center text-xl text-gray-500">
          <a href="/admin?page=product"> <i class="fa-solid fa-chevron-left"></i></a>
          </div>
            <div class="col-span-10 bg-white  pr-5 h-screen">
                <div class="grid grid-cols-12 pl-5 py-5">


                    <!-- col-span-4 -->
                    <div class="col-span-4">

                        <div class="flex justify-center ">
                            <img src="${
                                this.state.product.image
                            }" class="h-[200px] aspect-[3/4] text-center object-contain"
                                alt="">
                        </div>
                        <p class="text-base text-gray-600 mt-2">
                            ${this.state.product.name}
                        </p>
                        <p class="text-sm text-red-800">
                           Price: ${usd(this.state.product.price)}
                        </p>
                        <p class="text-sm text-gray-500">
                           Sale: ${this.state.product.discount}%
                        </p>
                        <p class="text-sm text-gray-500">
                           Stock: ${this.state.product.stock}
                        </p>
                    </div>
                    <!-- col-span-4 -->



                    <!-- col-span-8 -->

                    <div class="col-span-8 p-4 border border-gray-300 rounded">
                    <div class="flex justify-between items-center">
                             <h2 class=" text-xl font-bold text-gray-700">Product Detail </h2>
                            <div class="flex gap-1 items-center cursor-pointer text-gray-700 hover:text-blue-900 btn-edit">
                                <i class="fa-solid fa-pen-to-square "></i>
                                <p class=" font-semibold">Edit</p>
                            </div>
                    </div>
                        <form class=" px-2 ">
                            <div class="">

                                <div class="flex flex-col gap-5">


                                    <!-- change product form -->
                                    <div class="flex flex-col gap-5">
                                        <div class="relative">
                                            <label class="text-sm text-gray-500" for="name">
                                                Name
                                            </label>
                                            <input
                                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                                id="name" name="name" type="text" placeholder="I Phone 13 Pro"
                                                ${!this.state.isEdit ? 'readonly' : ''}
                                                >
                                        </div>
                                        <div class="relative">
                                            <label class="text-sm text-gray-500" for="description">
                                                Description
                                            </label>
                                            <textarea
                                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                                id="description" name="description" type="text"
                                                placeholder="The latest model of the iPhone series"
                                                 ${!this.state.isEdit ? 'readonly' : ''}
                                                >
                                                                                        </textarea>
                                        </div>
                                        <div class="grid grid-cols-2 gap-5">
                                            <div class="relative">
                                                <label class="text-sm text-gray-500" for="price">
                                                    Price
                                                </label>
                                                <input
                                                    class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                                    id="price" name="price" type="number" step="0.01"
                                                    placeholder="999.99"
                                                    ${!this.state.isEdit ? 'readonly' : ''}
                                                    >
                                            </div>
                                            <div class="relative">
                                                <label class="text-sm text-gray-500" for="stock">
                                                    Stock
                                                </label>
                                                <input
                                                    class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                                    id="stock" name="stock" type="number" placeholder="100"
                                                     ${!this.state.isEdit ? 'readonly' : ''}
                                                    >
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-2 gap-5">
                                            <div class="relative">
                                                <label class="text-sm text-gray-500" for="category">
                                                    Category
                                                </label>
                                                <input
                                                    class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                                    id="category" name="category" type="text" placeholder="id"
                                                    readonly
                                                    >
                                            </div>
                                            <div class="relative">
                                                <label class="text-sm text-gray-500" for="brand">
                                                    Brand
                                                </label>
                                                <input
                                                    class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                                    id="brand" name="brand" type="text" placeholder="id"
                                                    readonly
                                                    >
                                            </div>
                                        </div>
                                        <div class="relative">
                                            <label class="text-sm text-gray-500" for="tags">
                                                Tags
                                            </label>
                                            <input
                                                class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 "
                                                id="tags" name="tags" type="text" placeholder="tag1, tag2, tag3"
                                                 ${!this.state.isEdit ? 'hidden' : ''}
                                                >
                                            <div class="flex gap-2 mt-3">
                                                ${this.state.product.tags
                                                    .map((tag) => {
                                                        return /*html*/ `<div class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full">${tag}</div>`;
                                                    })
                                                    .join('')}
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-2 gap-5">
                                            <div class="relative">
                                                <label class="text-sm text-gray-500" for="discount">
                                                    Discount
                                                </label>
                                                <input
                                                    class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                                    id="discount" name="discount" type="number" placeholder="10"
                                                     ${!this.state.isEdit ? 'readonly' : ''}
                                                    >
                                            </div>

                                            <div class="relative">
                                                <label class="text-sm text-gray-500" for="orderNumber">
                                                    Order Number
                                                </label>
                                                <input
                                                    class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                                    id="orderNumber" name="orderNumber" type="number" placeholder="0" min="0"
                                                     ${!this.state.isEdit ? 'readonly' : ''}
                                                    >
                                            </div>
                                        </div>

                                        <!-- option -->
                                        


                                        <div>
                                              <label class="text-sm text-gray-500" for="images">
                                                Image Primary
                                            </label>  
                                              <input
                                                    class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                                                    id="image" name="image" type="text" placeholder="image url" 
                                                     ${!this.state.isEdit ? 'readonly' : ''}
                                                    >       
                                        </div>

                                        <div class="relative">
                                            <label class="text-sm text-gray-500" for="images">
                                                Images Detail
                                            </label>
                                              ${
                                                  this.state.product.images.length <= 10 && this.state.isEdit
                                                      ? /*html*/ `
                                                <div class="flex items-center gap-5">
                                                <input  class="w-full p-3 bg-gray-100 rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 input-image" placeholder="image url" />
                                                <button class="w-auto px-3 py-2 bg-blue-600 text-white rounded-lg border-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 whitespace-nowrap btn-add-image">
                                                    Add Image
                                                </button>
                                                </div>
                                                `
                                                      : ''
                                              }
                                            <div class="grid grid-cols-5 gap-3 pt-5">

                                                ${this.state.product.images
                                                    .map((image, index) => {
                                                        return /*html*/ `
                                                        <div
                                                            class="col-span-1 aspect-square h-full rounded-lg  focus:ring-gray-300 relative group border border-gray-300">
                                                            <img src="${image.url}"
                                                                class="w-full aspect-[1/1] object-cover rounded p-2" alt="">
                                                            <div
                                                                class="absolute top-0 right-0 hidden size-[24px] aspect-square bg-gray-500/50 rounded-full flex items-center justify-center delete-image cursor-pointer ${
                                                                    this.state.isEdit ? 'group-hover:block ' : 'hidden'
                                                                }"
                                                                data-index="${index}"
                                                                >
                                                                <i
                                                                    class="fa-solid fa-xmark  text-red-500 cursor-pointer mx-auto block m-auto"></i>
                                                            </div>
                                                            <div class="absolute top-0 left-0 mt-1 ml-2 ">
                                                                <input type="radio" name="" id="">
                                                            </div>
                                                        </div>
                                                        `;
                                                    })
                                                    .join('')}

                                            </div>

                                        </div>
                                       
                                    </div>
                                    <!-- change product form -->


                                </div>


                            </div>
                        </form>
                        ${
                            this.state.isEdit
                                ? /*html*/ `
                             <div class="flex gap-5 pt-8">
                                            <button
                                                class="py-2 px-6 rounded-lg bg-blue-500 text-white hover:bg-blue-600 btn-save">Save</button>
                                            <button
                                                class="py-2 px-6 rounded-lg bg-red-500 text-white hover:bg-red-600">Cancel</button>
                                        </div>
                            `
                                : ''
                        }

                        <div id="option-form"></div>
                    </div>
                    <!-- col-span-8 -->


                </div>
            </div>
            <!-- section -->
        `;
    };
    protected renderUI(): void {
        super.renderUI();

        this.renderComponent(
            '#option-form',
            new OptionForm({ isEdit: this.state.isEdit, option: this.state.product?.options as Option })
        );
    }

    protected addEventListener(): void {
        this.signEvent('.btn-edit', 'click', () => {
            this.setState({ isEdit: !this.state.isEdit });
        });

        this.signEvent('.btn-save', 'click', this.updateProduct);

        this.signEvent('.btn-add-image', 'click', () => {
            this.addImageDetail();
        });

        this.signEventAll('.delete-image', 'click', (e) => {
            const index = Number(((e.target as HTMLElement).closest('.delete-image') as HTMLElement).dataset.index);
            this.deleteImage(index);

            toast.success('Delete image success');
        });
    }

    protected reRender(): void {
        super.reRender();
        this.setValueForm();
    }

    protected async afterRender(): Promise<void> {
        const res = await productService.getProductDetail(this.props.id);

        this.setState({ product: res });
        this.setValueForm();
    }

    //support
    private setValueForm() {
        const defaultValue = {
            ...this.state.product,
            category: this.state.product!.category.name,
            brand: this.state.product!.brand.name,
            orderNumber: 1,
        };
        this.setDefaultValue(defaultValue);
    }

    private updateProduct = async () => {
        const dataForm = await this.getDataForm();

        if (dataForm) {
            const data = {
                ...dataForm,
                price: Number(dataForm.price),
                tags: (dataForm.tags as string).split(',').map((tag) => tag.trim()),
            };

            const dataUpdate: Partial<Product> = _.omit(data, ['category', 'brand']);
            const images: Partial<ProductDetail> = { images: this.state.product!.images };

            try {
                await productService.updateProductDetail(this.props.id, images);
                const res = await productService.updateProduct(this.props.id, dataUpdate);
                if (res) {
                    toast.success('Update product successfully');
                    signal.emit('update-product-detail');
                }
            } catch (error) {
                toast.error('Update product failed');
            }
        } else {
            return;
        }
    };

    private addImageDetail = () => {
        const url = (this.node('.input-image') as HTMLInputElement).value;

        if (url) {
            const newImage = {
                url: url,
                isPrimary: false,
            };
            this.setState({
                product: {
                    ...this.state.product!,
                    images: [...this.state.product!.images, newImage],
                },
            });

            this.node('.input-image')?.focus();
        } else {
            return;
        }
    };

    private deleteImage = (index: number) => {
        console.log(index);

        this.setState({
            product: {
                ...this.state.product!,
                images: this.state.product!.images.filter((image, i) => {
                    image;
                    return i !== index;
                }),
            },
        });
    };
}

export default ProductAdminEditForm;
