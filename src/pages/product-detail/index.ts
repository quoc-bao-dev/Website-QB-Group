import { productService } from '../../api/productService';
import { ProductDetail } from '../../interface/product';
import QBComponent from '../../lib/QBComponent';
import ProductDetailBreadcrumb from './partials/ProductDetailBreadcrumb';
import ProductDetailLeft from './partials/ProductDetailLeft';
import ProductDetailRright from './partials/ProductDetailRright';
import RelatedProduct from './partials/RelatedProduc';

interface ProductDetailPageState {
    product: ProductDetail;
}
class ProductDetailPage extends QBComponent<{}, ProductDetailPageState> {
    constructor() {
        super(null);
        this.pathTemplate = '/src/pages/product-detail/index.html';
    }

    //UI
    protected renderUI(): void {
        super.renderUI();
        this.renderBreadcrumb();
        this.renderProductDetailLeft();
        this.renderProductDetailRight();
        this.renderRelatedProduct();
    }

    private renderBreadcrumb() {
        this.renderComponent('#breadcrumb', new ProductDetailBreadcrumb(this.state.product));
    }
    private renderProductDetailLeft() {
        this.renderComponent('#product-detail-left', new ProductDetailLeft(this.state.product), 'product-detail-left');
    }
    private renderProductDetailRight() {
        this.renderComponent(
            '#product-detail-right',
            new ProductDetailRright(this.state.product),
            'product-detail-right'
        );
    }
    private renderRelatedProduct() {
        const id = this.state.product?._id;
        if (!id) return;
        this.renderComponent(
            '#related-product',
            new RelatedProduct({ id: this.state.product._id }),
            'product-detail-right'
        );
    }

    // api
    protected async affterRender(): Promise<void> {
        const id = this.options.params!.id;
        const result = await productService.getProductDetail(id);

        this.setState({
            product: result,
        });
    }
}

export default ProductDetailPage;
