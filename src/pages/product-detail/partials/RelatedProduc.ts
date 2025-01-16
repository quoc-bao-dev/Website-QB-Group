import { productService } from '../../../api/productService';
import { Product, ProductWithCategoryAndBrand } from '../../../interface/product';
import QBComponent from '../../../lib/QBComponent';
import QBRouter from '../../../lib/QBRouter';
import { prd } from '../../../util/productUtils';

class RelatedProductCard extends QBComponent<ProductWithCategoryAndBrand> {
    protected markup: () => string = () => {
        return /*html*/ `
            <div class="p-3 rounded shadow">
                    <img class="aspect-[4/3] w-full text-center object-contain image-product" src="${
                        this.props.image
                    }" alt="">
                    <h3 class="text-lg font-semibold text-gray-600 pt-3">${this.props.name}</h3>
                    <p class="text-gray-400 text-sm">${this.props.brandDetails.name}</p>
                    <p class="text-red-800 font-semibold">${prd.sl(this.props)}</p>
                </div>`;
    };

    // event
    protected addEventListener(): void {
        this.signEvent('.image-product', 'click', () => {
            QBRouter.nav(`/product-detail/${this.props._id}`);
        });
    }
}
interface RelatedProductProps {
    id: string;
}
interface RelatedProductState {
    lsProduct: ProductWithCategoryAndBrand[] | Product[];
}
class RelatedProduct extends QBComponent<RelatedProductProps, RelatedProductState> {
    markup = () => {
        return /*html*/ `
            <section class="section">
                <div class="container">
                    <h2 class="text-center font-bold text-2xl pb-6">
                        Related Products
                    </h2>
                    <div class="grid grid-cols-5 gap-5" id="list-product">
                    </div>
                </div>
            </section>
        `;
    };

    // UI
    protected renderUI(): void {
        super.renderUI();
        this.renderProductList();
    }

    private renderProductList = () => {
        this.renderList<Product>('#list-product', this.state.lsProduct, RelatedProductCard);
    };

    //api
    protected async afterRender(): Promise<void> {
        const result = await productService.getRelatedProduct(this.props.id);
        this.setState({
            lsProduct: result,
        });
    }
}

export default RelatedProduct;
