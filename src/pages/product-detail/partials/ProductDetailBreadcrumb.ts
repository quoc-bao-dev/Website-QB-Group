import { ProductDetail } from '../../../interface/product';
import QBComponent from '../../../lib/QBComponent';

class ProductDetailBreadcrumb extends QBComponent<ProductDetail> {
    protected markup: () => string = () => {
        return /*html*/ `
         <div class="flex gap-2">
                    <a href="/">Home</a>
                    /
                    <a href="/product/category/${this.props?.category?._id}">${this.props?.category?.name}</a>
                    /
                    <a href="/product/brand/${this.props?.brand?._id}">${this.props?.brand?.name}</a>
                    /
                    <div href="">${this.props.name}</div>
                </div>
        `;
    };
}

export default ProductDetailBreadcrumb;
