import { ProductDetail } from '../../../interface/product';
import QBComponent from '../../../lib/QBComponent';
import ProductDetailTab from './ProductDetaiTapContent';

class ProductDetailLeft extends QBComponent<ProductDetail> {
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="">
            <div class="w-full aspect-[4/3] rounded">
                <img class="w-full h-full object-contain" src="${this.props.image}" alt="">
            </div>
            <div class="mt-5 w-full p-3 bg-white border rounded border border-gray-200">
                <div class="grid grid-cols-4 gap-3">
                    <img class="aspect-[1/1] object-contain p-2 border border-gray-300"
                        src="https://picsum.photos/200/300" alt="">
                    <img class="aspect-[1/1] object-contain p-2 border border-gray-300"
                        src="https://picsum.photos/200/300" alt="">
                    <img class="aspect-[1/1] object-contain p-2 border border-gray-300"
                        src="https://picsum.photos/200/300" alt="">
                    <img class="aspect-[1/1] object-contain p-2 border border-gray-300"
                        src="https://picsum.photos/200/300" alt="">
                </div>
            </div>
            <div class= "contents" id="tab-content"></div>
        </div>
        `;
    };

    // UI
    protected renderUI(): void {
        super.renderUI();
        this.renderTabContent();
    }

    private renderTabContent() {
        this.renderComponent('#tab-content', new ProductDetailTab());
    }
}

export default ProductDetailLeft;
