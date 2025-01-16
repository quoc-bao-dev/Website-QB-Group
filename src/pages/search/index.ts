import categoryService from '../../api/categoryService';
import { productService } from '../../api/productService';
import { Product } from '../../interface/product';
import QBComponent from '../../lib/QBComponent';
import QBRouter from '../../lib/QBRouter';
import { usd } from '../../util/productUtils';
import { ProductCard } from '../home/partials/Home.ProductSection';

interface SearchPageState {
    listProduct: Product[];
    listCate: Category[];
    listCateFillter: string[];
    maxPrice: number;
    minPrice: number;
    listFillter: Product[];
}
class SearchPage extends QBComponent<{}, SearchPageState> {
    constructor() {
        super();

        this.state = {
            listProduct: [],
            listCate: [],
            listCateFillter: [],
            maxPrice: 4000,
            minPrice: 0,
            listFillter: [],
        };
    }
    protected markup: () => string = () => {
        const cate = Array.from(
            new Set(
                this.state.listProduct.map((item) => {
                    const cate = item.category as string;

                    const cateFind = this.state.listCate.find((i) => i._id === cate);
                    return cateFind?.name;
                })
            )
        );
        return /*html*/ `
         <main>
            <section class="section">
                <div class="container">
                    <div class="grid grid-cols-12 gap-5">
                        <div class="col-span-3 h-full relative">
                            <div class="p-4 rounded-lg bg-white sticky top-0 shadow-md">
                                <p class="text-gray-700 ">(${this.state.listFillter.length}) Results</p>
                                <label class="text-gray-500 text-sm">Price</label>

                                <input type="range" value="${
                                    this.state.minPrice
                                }" step="500" min="0" max="5000" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" id="price-range-min"  />

                                <input type="range" value="${
                                    this.state.maxPrice
                                }" step="500" min="0" max="5000" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" id="price-range-max"  />

                               <p class="text-gray-700 text-sm"> Min: ${usd(this.state.minPrice)} - Max: ${usd(
            this.state.maxPrice
        )}</p>

                                 <label class="text-gray-500 text-sm">Category</label>
                                ${cate
                                    .map((item) => {
                                        return `<div calss="flex gap-2 items-center">
                                       
                                        <label class="text-gray-500 text-sm cate-check-item">
                                            <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" name="category" value="${item}" ${
                                            this.state.listCateFillter.includes(
                                                this.state.listCate.find((i) => i.name === item)?._id as string
                                            )
                                                ? 'checked'
                                                : ''
                                        } />
                                            ${item}
                                        </label>
                                        </div>`;
                                    })
                                    .join('')}
                            </div>
                        </div>
                        <div class="col-span-9 h-[600px] overflow-y-auto">
                            <div class="grid grid-cols-3 gap-5 " id="search-result">
                                
                            </div>
                            ${
                                this.state.listFillter.length === 0
                                    ? '<div class="p-16 text-xl font-medium rounded-lg shadow-md  bg-white text-center text-gray-500">No result</div>'
                                    : ''
                            }
                        </div>
                    </div>
                </div>
            </section>
         </main>
        `;
    };

    protected renderUI(): void {
        super.renderUI();

        this.renderList('#search-result', this.state.listFillter, ProductCard);
    }

    protected addEventListener(): void {
        this.signEventAll('.cate-check-item', 'click', () => {
            const lsCheck = this.getListCheckCate() as string[];

            this.setState({
                listCateFillter: lsCheck,
            });
            this.setListFilter();
        });

        this.signEvent('#price-range-max', 'input', () => {
            const maxPrice = Number((document.querySelector('#price-range-max') as HTMLInputElement).value);
            this.setState({
                maxPrice: maxPrice <= this.state.minPrice ? this.state.minPrice + 500 : maxPrice,
            });
            this.setListFilter();
        });

        this.signEvent('#price-range-min', 'input', () => {
            const minPrice = Number((document.querySelector('#price-range-min') as HTMLInputElement).value);
            this.setState({
                minPrice: minPrice >= this.state.maxPrice ? this.state.maxPrice - 500 : minPrice,
            });
            this.setListFilter();
        });
    }

    protected async afterRender(): Promise<void> {
        const keyword = QBRouter.params.keyword as string;

        const result = await Promise.all([productService.getSearchProduct(keyword), categoryService.getCategory()]);
        this.setState({
            listProduct: result[0],
            listCate: result[1],
            listFillter: result[0],
        });
    }

    //support
    private getListCheckCate() {
        const lsCate = Array.from(document.querySelectorAll('input[name="category"]:checked')) as HTMLInputElement[];
        const lsCheck = lsCate.map((item) => {
            return this.state.listCate.find((i) => i.name === item.value)?._id;
        });
        return lsCheck;
    }

    private setListFilter() {
        let lsFilter = this.state.listProduct;
        if (this.state.listCateFillter.length > 0) {
            lsFilter = this.state.listProduct.filter((item) => {
                return this.state.listCateFillter.includes(item.category as string);
            });
        }

        lsFilter = lsFilter.filter((item) => {
            return item.price >= this.state.minPrice && item.price <= this.state.maxPrice;
        });

        this.setState({ listFillter: lsFilter });
    }
}

export default SearchPage;
