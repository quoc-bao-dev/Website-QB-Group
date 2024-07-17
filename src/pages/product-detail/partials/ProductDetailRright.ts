import { ProductDetail } from '../../../interface/product';
import QBComponent from '../../../lib/QBComponent';
import cartReducer from '../../../store/cartReducer';
import { prd } from '../../../util/productUtils';
import toast from '../../../util/toast';

class ProductDetailRright extends QBComponent<ProductDetail> {
    protected markup: () => string = () => {
        return /*html*/ `
            <div class="">
                    <h1 class="text-3xl text-gray-700 font-bold">
                        ${this.props.name}
                    </h1>
                    <div class="py-3 flex items-center gap-3">
                        <p class="text-blue-400 text-sm">499 user rate</p>
                        <div class="flex gap-1 text-xs">
                            <i class="fa-solid fa-star text-yellow-400"></i>
                            <i class="fa-solid fa-star text-yellow-400"></i>
                            <i class="fa-solid fa-star text-yellow-400"></i>
                            <i class="fa-solid fa-star text-yellow-400"></i>
                            <i class="fa-solid fa-star text-yellow-400"></i>
                        </div>
                    </div>
                    <div class="h-[1px] w-full bg-gray-200"></div>
                    <div class="flex gap-3 items-end pt-4">
                        <p class="pt-3 text-2xl text-red-800 font-bold">${prd.sl(this.props)}</p>
                        <p class="pt-3 text-base text-gray-400 line-through">${prd.od(this.props)}</p>
                        ${
                            this.props.discount > 0
                                ? /*html*/ `
                        <div class="bg-red-100 py-2 px-3 text-sm rounded text-red-800">-${this.props.discount}%</div>
                        `
                                : ''
                        }
                    </div>
                    <div class="pt-5">
                        <p class="text-gray-500 font-semibold">Select Option</p>
                    </div>
                    <div class="pt-3 flex gap-3">
                        <div class="py-2 px-3 bg-blue-900 w-fit text-white font-bold rounded">
                            32GB
                        </div>
                        <div class="py-2 px-3 bg-blue-100 w-fit text-blue-900 font-bold rounded">
                            64GB
                        </div>
                        <div class="py-2 px-3 bg-gray-100 w-fit text-gray-400 font-bold rounded">
                            128GB
                        </div>
                    </div>
                    <div class="pt-5">
                        <p class="text-gray-500 font-semibold">Select Color</p>
                    </div>
                    <div class="pt-3 flex gap-3">
                        <div class=" aspect-[1/1] bg-blue-900 w-[32px] rounded-full text-white font-bold">
                        </div>
                        <div class=" aspect-[1/1] bg-blue-100 w-[32px] rounded-full text-blue-900 font-bold">
                        </div>
                        <div class=" aspect-[1/1] bg-gray-100 w-[32px] rounded-full text-gray-400 font-bold">
                        </div>
                        <div
                            class=" aspect-[1/1] bg-gray-100 w-[32px] rounded-full text-gray-400 font-bold outline-2 outline outline-blue-500">
                        </div>
                    </div>
                    <div class="pt-5">
                        <div class="flex gap-3">
                            <button class="py-2 px-3 bg-black text-white font-bold rounded flex-1" id="btn-add-to-cart">Add To
                                Cart</button>
                            <button
                                class="py-2 px-3 bg-white stroke-1 stroke-black text-black font-bold rounded flex-1">Favorite</button>
                        </div>
                    </div>
                    <div class="pt-5">
                        <h2 class="text-gray-500 font-semibold">Configurations</h2>
                        <div class="pt-5 ">
                            <div class="grid grid-cols-2 gap-3">
                                <div class="grid grid-cols-2">
                                    <p class="text-gray-700 font-semibold">Brand:</p>
                                    <p class="text-gray-500 font-semibold">Apple</p>
                                </div>
                                <div class="grid grid-cols-2">
                                    <p class="text-gray-700 font-semibold">Brand:</p>
                                    <p class="text-gray-500 font-semibold">Apple</p>
                                </div>
                                <div class="grid grid-cols-2">
                                    <p class="text-gray-700 font-semibold">Brand:</p>
                                    <p class="text-gray-500 font-semibold">Apple</p>
                                </div>
                                <div class="grid grid-cols-2">
                                    <p class="text-gray-700 font-semibold">Brand:</p>
                                    <p class="text-gray-500 font-semibold">Apple</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="pt-5">
                        <h2 class="text-gray-500 font-semibold">Sale</h2>
                        <div class="pt-3 flex gap-3 flex-col">
                            <div class="p-3 rounded-lg bg-gray-100 border border-gray-200">
                                <div class="grid grid-cols-12">
                                    <div class="col-span-1 grid place-content-center">
                                        <input type="radio" name="sale">
                                    </div>
                                    <div class="col-span-10">
                                        <p class="text-gray-500 font-semibold">Lorem ipsum dolor sit amet
                                            consectetur
                                            adipisicing
                                            elit. Officiis, natus. </p>
                                    </div>
                                </div>
                            </div>
                            <div class="p-3 rounded-lg bg-gray-100 border border-gray-200">
                                <div class="grid grid-cols-12">
                                    <div class="col-span-1 grid place-content-center">
                                        <input type="radio" name="sale">
                                    </div>
                                    <div class="col-span-10">
                                        <p class="text-gray-500 font-semibold">Lorem ipsum dolor sit amet
                                            consectetur
                                            adipisicing
                                            elit. Officiis, natus. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pt-5">
                        <h2 class="text-gray-500 font-semibold">Description</h2>
                        <p class="text-gray-500 font-semibold pt-3">Lorem ipsum dolor sit amet consectetur
                            adipisicing
                            elit. Officiis, natus. </p>
                    </div>
                    <div class="pt-5">
                        <h2 class="text-gray-500 font-semibold">Specifications</h2>
                        <p class="text-gray-500 font-semibold pt-3">Lorem ipsum dolor sit amet consectetur
                            adipisicing
                            elit. Officiis, natus. </p>
                    </div>
                </div>
        `;
    };

    // event
    protected addEventListener(): void {
        this.signEvent('#btn-add-to-cart', 'click', () => {
            cartReducer.addProductToCart(this.props);
            toast.success('Add to cart success');
        });
    }
}

export default ProductDetailRright;
