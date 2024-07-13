import { productService } from '../../../../api/productService';
import { Product } from '../../../../interface/product';
import QBComponent from '../../../../lib/QBComponent';
import QBRouter from '../../../../lib/QBRouter';
import Listener from '../../../../lib/listener';
import { prd } from '../../../../util/productUtils';

class SearchResultItem extends QBComponent<Product> {
    markup = () => {
        return /*html*/ `
        <div class="w-full flex gap-5 result hover:bg-gray-100 result-item" >
            <img class="w-[80px] h-[80px] object-contain p-2" src="${this.props.image}"
                alt="">
            <div class="flex flex-col gap-1">
                <p class="font-semibold">${this.props.name}</p>
                <div class = "flex items-center gap-2">
                    <p class="text-sm text-red-800">${prd.sl(this.props)}</p>
                    <p class="text-sm text-gray-400 line-through"> ${prd.od(this.props)}</p>
                </div>
            </div>
        </div>
        <div class="h-[1px] w-full bg-gray-200 my-2"></div>
        `;
    };

    protected addEventListener(): void {
        this.signEvent('.result-item', 'click', () => {
            const id = this.props._id;
            QBRouter.nav(`/product-detail/${id}`);
        });
    }
}
// interface HeaderSearchResultProps {
//     input: string;
// }

interface HeaderSearchResultState {
    data: Product[];
    isShow: boolean;
}
class HeaderSearchResult extends QBComponent<{}, HeaderSearchResultState> {
    constructor() {
        super(null);
        this.state = {
            data: [],
            isShow: false,
        };

        Listener.on(
            'page-change',
            () => {
                this.clearSearchResult();
            },
            'search-result-clear'
        );
    }
    markup = () => {
        return /*html*/ `
        <div class="w-full p-4 bg-white absolute top-[50px] left-0 flex flex-col gap-2 search-result ${
            this.state.isShow ? 'show' : ''
        }"
            id="search-result">
            <div class="max-h-[400px] overflow-y-auto flex flex-col gap-2">
                <div class="contents" id="list-search-result"></div>
            </div>
            <div class="py-2 ">
                <p class="text-sm text-blue-600 font-semibold">
                   ${
                       this.state.data.length == 0
                           ? 'Không có kết quả tìm kiếm'
                           : `Có ${this.state.data.length} kết quả tìm kiếm`
                   }
                </p>
            </div>
        </div>
        `;
    };

    protected renderUI(): void {
        super.renderUI();
        this.renderListResult();
    }

    private renderListResult = () => {
        this.renderList<Product>('#list-search-result', this.state.data, SearchResultItem);
    };

    // public
    async updateSearchResult(input: string) {
        const result = await productService.getSearchProduct(input);
        this.setState({ data: result, isShow: true });
    }

    clearSearchResult() {
        this.setState({ data: [], isShow: false });
    }
}

export default HeaderSearchResult;
