import { productService } from '../../api/productService';
import AppLoading from '../../components/common/AppLoading';
import { ProductDetail } from '../../interface/product';
import QBComponent from '../../lib/QBComponent';
import QBRouter from '../../lib/QBRouter';
import ImageModal from './partials/ImageModal';
import ProductDetailBreadcrumb from './partials/ProductDetailBreadcrumb';
import ProductDetailLeft from './partials/ProductDetailLeft';
import ProductDetailRright from './partials/ProductDetailRright';
import RelatedProduct from './partials/RelatedProduc';

interface ProductDetailPageState {
    product: ProductDetail | null;
}
class ProductDetailPage extends QBComponent<{}, ProductDetailPageState> {
    constructor() {
        super();

        this.state = {
            product: null,
        };
    }

    protected markup: () => string = () => {
        if (!this.state.product) {
            return new AppLoading().html;
        }
        return /*html*/ `
        <main class="bg-white">
    <section class="section">
        <div class="container">
            <div class="py-3 mb-3" id="breadcrumb">
            </div>
            <div class="grid grid-cols-2 gap-8">
                <!-- detail -->
                <div class="contents" id="product-detail-left"></div>
                <!-- detail -->
                <!-- info -->
                <div class="contents" id="product-detail-right"></div>
                <!-- info -->
            </div>
        </div>
    </section>

    <!-- related proudct -->
    <div id="related-product" class="contents"></div>
    <!-- related proudct -->

    <div class="contents" id="image-model"></div>
</main>
        `;
    };

    //UI
    protected renderUI(): void {
        super.renderUI();
        this.renderBreadcrumb();
        this.renderProductDetailLeft();
        this.renderProductDetailRight();
        this.renderRelatedProduct();
        this.renderImageModel();
    }

    private renderBreadcrumb() {
        this.renderComponent('#breadcrumb', new ProductDetailBreadcrumb(this.state.product));
    }
    private renderProductDetailLeft() {
        if (!this.state.product) return;
        this.renderComponent('#product-detail-left', new ProductDetailLeft(this.state.product), 'product-detail-left');
    }
    private renderProductDetailRight() {
        this.renderComponent(
            '#product-detail-right',
            new ProductDetailRright(this.state.product as ProductDetail),
            'product-detail-right'
        );
    }
    private renderRelatedProduct() {
        const id = this.options.params!.id;
        if (!id) return;

        this.renderComponent(
            '#related-product',

            new RelatedProduct({ id: id }),
            'product-detail-right'
        );
    }

    private renderImageModel() {
        this.renderComponent('#image-model', new ImageModal());
    }

    // api
    protected async afterRender(): Promise<void> {
        const id = this.options.params!.id;

        const result = await productService.getProductDetail(id);

        this.setState({
            product: result,
        });

        this.srcollToId();
    }

    private srcollToId = () => {
        const scroll = QBRouter.querries.scroll;
        if (!scroll) return;
        setTimeout(() => {
            const id = scroll;
            const elm = document.querySelector(`#cmt-${id}`);

            if (elm) {
                const offset = 200;
                elm.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                window.scrollBy(0, elm.getBoundingClientRect().top - offset);
            }
        }, 500);
    };
}

export default ProductDetailPage;
