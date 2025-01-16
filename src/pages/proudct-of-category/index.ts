import { productService } from '../../api/productService';
import { Product } from '../../interface/product';
import QBComponent from '../../lib/QBComponent';
import QBRouter from '../../lib/QBRouter';
import { ProductCard } from '../home/partials/Home.ProductSection';

interface ProductOfCategoryPageState {
    lsProduct: Product[];
    lsProductFull: Product[];
    category: Category | null;
    keyword: string;
    selectedPrice: string;
    curFocus: string;
}
class ProductOfCategoryPage extends QBComponent<{}, ProductOfCategoryPageState> {
    constructor() {
        super(null);
        this.state = {
            lsProduct: [],
            lsProductFull: [],
            category: null,
            keyword: '',
            selectedPrice: '',
            curFocus: '',
        };
    }
    protected markup: () => string = () => {
        return /*html*/ `
        <section class="section"
        >
            <div class ="container">
                <img class="w-full aspect-[3/1]" src="https://img.odcdn.com.br/wp-content/uploads/2021/09/ipad-pro-m1.jpg"/>
            </div>
        </section>
        <section class="section">
            <div class="container">
            <h1 class="text-3xl font-bold">Product of category </h1>
            <div class="flex justify-between gap-5 mt-5 mb-5">
                <div class="">
                    <p class="text-gray-500 text-lg ">
                        Have ${this.state.lsProduct.length} products
                    </p>
                </div>
                <div class="flex gap-5">
                <div class="relative flex items-center w-fit">
                    <span class=" mr-3 text-gray-500 text-lg">Price:</span>
                    <select class="appearance-none w-fit bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600" id="filter-price">
                        <option ${this.state.selectedPrice === 'all' ? 'selected' : ''} value="all">All</option>
                        <option ${
                            this.state.selectedPrice === '0-200' ? 'selected' : ''
                        } value="0-200">0$ - 100$</option>
                        <option ${
                            this.state.selectedPrice === '100-200' ? 'selected' : ''
                        } value="100-200">100$ - 200$</option>
                        <option ${
                            this.state.selectedPrice === '200-500' ? 'selected' : ''
                        } value="200-500">200$ - 500$</option>
                        <option ${
                            this.state.selectedPrice === '500-1000' ? 'selected' : ''
                        } value="500-1000">500$ - 1000$</option>
                        <option ${
                            this.state.selectedPrice === '1000-2000' ? 'selected' : ''
                        } value="1000-2000">1000$ - 2000$</option>
                        <option ${this.state.selectedPrice === '2000' ? 'selected' : ''} value="2000"> > 2000$</option>
                    </select>
                </div>
                 <div class="relative flex items-center w-fit">
                    <span class="mr-3 text-gray-500 text-lg">Name:</span>
                    
                    <input class="appearance-none w-fit bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600" id="filter-name" placeholder="Search" 
                    />
                </div>
                </div>
            </div>
            <div class="grid grid-cols-4 gap-5" id="list-product"></div>
        </div>
        </section>
        `;
    };

    protected renderUI(): void {
        super.renderUI();
        this.renderProductList();
    }
    private renderProductList = () => {
        if (this.state.lsProduct.length == 0) return;
        this.renderList<Product>('#list-product', this.state.lsProduct, ProductCard);
    };

    // event
    protected addEventListener(): void {
        this.signEvent('#filter-name', 'keyup', this.filterName);
        this.signEvent('#filter-price', 'change', this.filterPrice);
    }
    private filterName = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        this.state.keyword = value;
        this.state.curFocus = '#filter-name';
        const lsProd = this.spFilterName(value);
        const lsProd2 = this.spFilterPrice(this.state.selectedPrice, lsProd);

        this.setState({
            lsProduct: lsProd2,
        });
    };
    private filterPrice = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        const value = target.value;
        this.state.selectedPrice = value;

        const lsProd = this.spFilterPrice(value);
        const lsProd2 = this.spFilterName(this.state.keyword, lsProd);

        this.setState({
            lsProduct: lsProd2,
        });
    };

    private spFilterName = (keyword: string, ls = this.state.lsProductFull) => {
        const value = keyword;
        const lsProd = ls.filter((item) => {
            return item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase());
        });
        return lsProd;
    };

    private spFilterPrice = (value: string, ls = this.state.lsProductFull) => {
        if (value == 'all') return this.spFilterName(this.state.keyword, this.state.lsProductFull);

        const lsProd = ls.filter((item) => {
            const min = parseInt(value.split('-')[0]);
            const max = parseInt(value.split('-')[1]);
            if (max == 0) return item.price >= min;
            if (!max) return item.price >= min;
            return item.price >= min && item.price <= max;
        });

        return lsProd;
    };

    // effect
    protected effect(): void {
        this.signEffect(() => {
            if (this.state.curFocus == '') return;
            this.node(this.state.curFocus)!.focus();
            (this.node(this.state.curFocus) as HTMLInputElement)!.value = this.state.keyword;
        }, ['lsProduct']);
    }

    protected async afterRender(): Promise<void> {
        this.callApiProduct();
    }

    private callApiProduct = async () => {
        const { id } = QBRouter.params;

        const result = await productService.getAllProductOfCategory(id);
        this.setState({
            lsProduct: result,
            lsProductFull: result,
        });
    };
}

export default ProductOfCategoryPage;
