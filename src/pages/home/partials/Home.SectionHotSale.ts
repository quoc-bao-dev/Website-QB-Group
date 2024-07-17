import { productService } from '../../../api/productService';
import { Product } from '../../../interface/product';
import QBComponent from '../../../lib/QBComponent';
import { prd } from '../../../util/productUtils';

import { tns } from 'tiny-slider/src/tiny-slider';
import 'tiny-slider/dist/tiny-slider.css';
class HotsaleItem extends QBComponent<Product> {
    constructor(props: Product) {
        super(props);
        this.element = document.createElement('div');
        this.element.className = 'w-full h-full bg-gray-100 rounded overflow-hidden p-4 relative item';
    }
    protected markup: () => string = () => {
        return /*html*/ `
        <a href="/product-detail/${this.props._id}"><img class="w-full aspect-[4/3] object-contain" src="${
            this.props.image
        }" alt=""></a>
                        <h2 class="text-center font-bold text-lg text-gray-600">${this.props.name}</h2>
                        <div class="w-full h-[1px] bg-gray-300 my-1"></div>
                        <p class="text-center font-bold text-sm text-gray-400 line-through ">${prd.od(this.props)}</p>
                        <p class="text-center font-bold text-lg text-red-800">${prd.sl(this.props)}</p>
                        <div
                            class="w-full py-1 px-3 text-sm bg-red-600 text-white font-bold rounded-full mt-2 flex gap-1">
                            <p>con lai:</p>
                            <p>10</p>
                            <p>days</p>
                        </div>
                        <button class="w-full py-2 bg-black text-white font-bold rounded-full mt-2">Buy Now</button>
                        <div class="px-3 py-2 bg-red-600 text-white font-medium w-fit absolute top-2 right-3">
                            <p>-${this.props.discount}%</p>
                        </div>
        `;
    };
}

interface HotsaleState {
    lsProduct: Product[];
}
class HomeSectionHotSale extends QBComponent<{}, HotsaleState> {
    constructor() {
        super();
        this.state = {
            lsProduct: [],
        };
    }
    protected markup: () => string = () => {
        return /*html*/ `
            <section class="section bg-gray-800">
        <div class="container">
            <h2 class="text-center font-bold text-2xl text-white pb-6">Hot Sale</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  my-slider" id="hot-sale-container">
            </div>
    </section>
        `;
    };

    renderUI() {
        super.renderUI();
        this.renderHotSale();
    }
    private renderHotSale() {
        this.renderList<Product>('#hot-sale-container', this.state.lsProduct as Product[], HotsaleItem);
    }

    protected async affterRender(): Promise<void> {
        const ls = await productService.getHotSaleProduct();
        this.setState({ lsProduct: ls });
    }

    // event
    addEventListener() {
        this.startSlider();
    }
    private startSlider() {
        if (this.node('#hot-sale-container') && this.node('#hot-sale-container')!.children.length > 0) {
            const slider = tns({
                container: '#hot-sale-container',
                items: 1,
                slideBy: 'page',
                autoplay: true,
                controls: true,
                nav: true,
                responsive: {
                    600: {
                        items: 2,
                    },
                    900: {
                        items: 3,
                    },
                },
            });

            console.log(slider);
        }
    }
}

export default HomeSectionHotSale;
