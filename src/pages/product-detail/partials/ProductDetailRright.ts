import _ from 'lodash';
import { productService } from '../../../api/productService';
import Star from '../../../components/common/Start';
import { Option, OptionProduct, Product, ProductDetail } from '../../../interface/product';
import signal from '../../../lib/listener';
import QBComponent from '../../../lib/QBComponent';
import cartReducer from '../../../store/cartReducer';
import { p, usd } from '../../../util/productUtils';
import toast from '../../../util/toast';
import { IProductComment } from './ProductDetaiTapContent';

interface ProductDetailRrightState {
    lsCmt: IProductComment[];
    lsUserRate: number[];
    options?: Option;
    optionsSelected?: {
        color: string;
        ram: string;
        storage: string;
    };
    price: number;
}
class ProductDetailRright extends QBComponent<ProductDetail, ProductDetailRrightState> {
    constructor(props: ProductDetail) {
        super(props);
        this.state = {
            lsCmt: [],
            lsUserRate: [],
            price: props?.price,
            options: {
                color: [
                    {
                        value: 'gray',
                        isDefault: true,
                        stock: 100,
                        color: '#333333',
                        priceInc: 0,
                    },
                    {
                        value: 'blue-gray',
                        isDefault: false,
                        stock: 100,
                        color: '#cdcdcd',
                        priceInc: 20,
                    },
                ],
                ram: [
                    {
                        value: '32GB',
                        priceInc: 0,
                        stock: 100,
                        isDefault: true,
                    },
                    {
                        value: '64GB',
                        priceInc: 50,
                        stock: 100,
                        isDefault: false,
                    },
                    {
                        value: '128GB',
                        priceInc: 100,
                        stock: 0,
                        isDefault: false,
                    },
                ],
                storage: [
                    {
                        value: '128GB',
                        priceInc: 0,
                        stock: 100,
                        isDefault: true,
                    },

                    {
                        value: '256GB',
                        priceInc: 50,
                        stock: 100,
                        isDefault: false,
                    },

                    {
                        value: '1T',
                        priceInc: 100,
                        stock: 100,
                        isDefault: false,
                    },
                ],
            },
        };

        this.state.optionsSelected = {
            color: this.state.options?.color.find((i) => i.isDefault)!.value!,
            ram: this.state.options?.ram.find((i) => i.isDefault)!.value!,
            storage: this.state.options?.storage.find((i) => i.isDefault)!.value!,
        };

        signal.on(
            'comment-change',
            (ls: IProductComment[]) => {
                this.setState({
                    lsCmt: ls,
                });
            },
            'comment-change'
        );
    }
    protected markup: () => string = () => {
        const avg = this.state.lsCmt.reduce((a, b) => a + b.rating, 0) / this.state.lsCmt.length;

        const rate = this.state.lsCmt.length > 0 ? avg : this.props.rating ?? 5;

        this.state.price = this.props.price + this.calcInc();

        if (rate) {
            productService.updateProductRate(this.props.productId, Number(rate.toFixed(1)));
        }

        console.log(this.state.optionsSelected);

        return /*html*/ `
            <div class="">
                    <h1 class="text-3xl text-gray-700 font-bold">
                        ${this.props.name}
                    </h1>
                    <div class="py-3 flex items-center gap-3">
                    ${
                        this.state.lsCmt.length > 0
                            ? ` <p class="text-blue-400 text-sm">${this.state.lsCmt.length} rate</p>`
                            : ''
                    }
                        ${new Star(rate || 5).html}(${Number(rate.toFixed(1)) || 5})
                    </div>
                    <div class="h-[1px] w-full bg-gray-200"></div>
                    <div class="flex gap-3 items-end pt-4">
                        <p class="pt-3 text-2xl text-red-800 font-bold">${usd(
                            p.sl(this.state.price, this.props.discount)
                        )}</p>
                        <p class="pt-3 text-base text-gray-400 line-through">${usd(this.state.price)}</p>
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
                        ${this.state.options?.ram
                            .map((option) => {
                                return /*html*/ `
                            <div class="py-2 px-3  w-fit  font-bold rounded ram-item ${
                                option.stock == 0
                                    ? 'bg-gray-100 text-gray-400'
                                    : this.state.optionsSelected?.ram === option.value
                                    ? 'bg-blue-900 text-white'
                                    : 'bg-blue-100 text-blue-900'
                            }" 
                            data-value ="${option.stock == 0 ? '' : option.value}"
                            >
                            ${option.value}
                        </div>
                            `;
                            })
                            .join('')}
                    </div>

                    <div class="pt-5">
                        <p class="text-gray-500 font-semibold">Select Rom</p>
                    </div>
                    <div class="pt-3 flex gap-3">
                        ${this.state.options?.storage
                            .map((option) => {
                                return /*html*/ `
                            <div class="py-2 px-3  w-fit  font-bold rounded rom-item ${
                                option.stock == 0
                                    ? 'bg-gray-100 text-gray-400'
                                    : this.state.optionsSelected?.storage === option.value
                                    ? 'bg-blue-900 text-white'
                                    : 'bg-blue-100 text-blue-900'
                            }" 
                            data-value ="${option.stock == 0 ? '' : option.value}"
                            >
                            ${option.value}
                        </div>
                            `;
                            })
                            .join('')}
                    </div>
                    <div class="pt-5">
                        <p class="text-gray-500 font-semibold">Select Color</p>
                    </div>
                    <div class="pt-3 flex gap-3">

                        ${this.state.options?.color
                            .map((option) => {
                                return /*html*/ `
                             <div class=" aspect-[1/1] bg-[${option.color}] color-item w-[32px] rounded-full ${
                                    this.state.optionsSelected?.color === option.value
                                        ? 'outline-2 outline outline-blue-500'
                                        : ''
                                }" data-value ="${option.value}">
                        </div>
                            `;
                            })
                            .join('')}
                        
                    </div>
                    <div class="pt-5">
                        <div class="flex gap-3">
                            <button class="py-2 px-3 bg-black text-white font-bold rounded flex-1" id="btn-add-to-cart">Add To
                                Cart</button>
                            <button
                                class="py-2 px-3 bg-white border border-black text-black font-bold rounded flex-1">Favorite</button>
                        </div>
                    </div>
                    <div class="pt-5">
                        <h2 class="text-gray-500 font-semibold">Configurations</h2>
                        <div class="pt-5 ">
                            <div class="grid grid-cols-2 gap-3">
                                <div class="grid grid-cols-2">
                                    <p class="text-gray-700 font-semibold">Brand:</p>
                                    <p class="text-gray-500 font-semibold">${this.props.brand.name}</p>
                                </div>
                                <div class="grid grid-cols-2">
                                    <p class="text-gray-700 font-semibold">Category:</p>
                                    <p class="text-gray-500 font-semibold">${this.props.category.name}</p>
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
            cartReducer.addProductToCart(this.createProd());

            toast.success('Add to cart success');
        });

        //ram
        this.signEventAll('.ram-item', 'click', (e) => {
            const elm = (e.target as HTMLElement).closest('.ram-item');
            const value = elm?.getAttribute('data-value') as string;

            if (value) {
                this.setState({
                    optionsSelected: {
                        ...this.state.optionsSelected!,
                        ram: value,
                    },
                });
            }
        });

        //rom
        this.signEventAll('.rom-item', 'click', (e) => {
            const elm = (e.target as HTMLElement).closest('.rom-item');
            const value = elm?.getAttribute('data-value') as string;

            if (value) {
                this.setState({
                    optionsSelected: {
                        ...this.state.optionsSelected!,
                        storage: value,
                    },
                });
            }
        });

        this.signEventAll('.color-item', 'click', (e) => {
            const elm = (e.target as HTMLElement).closest('.color-item');
            const value = elm?.getAttribute('data-value') as string;

            if (value) {
                this.setState({
                    optionsSelected: {
                        ...this.state.optionsSelected!,
                        color: value,
                    },
                });
            }
        });
    }

    protected async afterRender(): Promise<void> {
        if (this.props.options) {
            this.setState({ options: this.props.options });
        } else {
            await productService.updateProductDetail(this.props.productId, { options: this.state.options });
        }

        this.state.optionsSelected = {
            color: this.state.options?.color.find((i) => i.isDefault)!.value!,
            ram: this.state.options?.ram.find((i) => i.isDefault)!.value!,
            storage: this.state.options?.storage.find((i) => i.isDefault)!.value!,
        };
    }

    //suport

    private createProd = () => {
        const prod: Product = _.omit(this.props, 'option');
        prod.price = this.props.price + this.calcInc();
        const option: OptionProduct = {
            color: this.state.options?.color.find((i) => i.value == this.state.optionsSelected?.color)!,
            ram: this.state.options?.ram.find((i) => i.value == this.state.optionsSelected?.ram)!,
            storage: this.state.options?.storage.find((i) => i.value == this.state.optionsSelected?.storage)!,
        };

        prod.option = option;
        return prod;
    };
    private calcInc = () => {
        const incColor =
            this.state.options?.color.find((i) => i.value === this.state.optionsSelected?.color)?.priceInc || 0;
        const incRam = this.state.options?.ram.find((i) => i.value === this.state.optionsSelected?.ram)?.priceInc || 0;
        const incStorage =
            this.state.options?.storage.find((i) => i.value === this.state.optionsSelected?.storage)?.priceInc || 0;
        return incColor + incRam + incStorage;
    };
}

export default ProductDetailRright;
