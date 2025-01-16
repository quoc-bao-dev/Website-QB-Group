import { productService } from '../../../../api/productService';
import TableSkeleton from '../../../../components/common/Skeleton';
import { Product } from '../../../../interface/product';
import signal from '../../../../lib/listener';
import QBComponent from '../../../../lib/QBComponent';
import QBRouter from '../../../../lib/QBRouter';
import ProductAdminEditForm from './Admin.Product.EditForm';
import ProductAdminContent from './Admin.ProductTable';

interface ProductAdminState {
    lsProduct: Product[];
    curProductId: string;
}

class ProductAdmin extends QBComponent<{}, ProductAdminState> {
    constructor() {
        super();

        this.state = {
            lsProduct: [],
            curProductId: '',
        };

        signal.on(
            'set-cur-product-id',
            (id: string) => {
                this.setCurProductId(id);
                window.history.replaceState({}, '', `/admin?page=product&product_id=${id}`);
            },
            'admin-product-1'
        );

        signal.on(
            'update-product-detail',
            () => {
                this.reRender();
            },
            'admin-product-2'
        );
    }
    protected markup: () => string = () => {
        return /*html*/ `
        
        <div class="flex flex-col pl-5 py-5 relative">
                    <div id="page-content"></div>
                </div>
        `;
    };

    protected renderUI(): void {
        super.renderUI();

        if (this.state.curProductId !== '') {
            this.renderProductDetail();
        } else {
            this.renderProductList();
        }
    }

    private renderProductList() {
        if (this.state.lsProduct.length === 0) {
            this.renderHTML(
                `#page-content`,
                /*html*/ `
                <div class="pl-5 py-5">
               ${new TableSkeleton().html}
            </div>
                `
            );
        } else {
            this.renderComponent('#page-content', new ProductAdminContent(this.state.lsProduct));
        }
    }

    private renderProductDetail() {
        this.renderComponent('#page-content', new ProductAdminEditForm({ id: this.state.curProductId }));
    }

    private setCurProductId(id: string) {
        this.setState({ curProductId: id });
    }

    protected async afterRender(): Promise<void> {
        try {
            const result = await productService.getAllProduct();
            this.setState({ lsProduct: result });
        } catch (error) {}

        const paramId = QBRouter.querries.product_id;
        if (paramId) {
            this.setCurProductId(paramId);
        }
    }
}

export default ProductAdmin;
