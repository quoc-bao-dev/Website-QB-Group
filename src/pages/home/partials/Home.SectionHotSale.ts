import { productService } from '../../../api/productService';
import { Product } from '../../../interface/product';
import signal from '../../../lib/listener';
import QBComponent from '../../../lib/QBComponent';
import { prd } from '../../../util/productUtils';

class HotsaleItem extends QBComponent<Product> {
    constructor(props: Product) {
        super(props);
        this.element = document.createElement('swiper-slide');
        this.element.className = 'w-full h-full bg-white rounded overflow-hidden p-4 relative item swiper-slide';
    }
    protected markup: () => string = () => {
        return /*html*/ `
        <a href="/product-detail/${this.props._id}"><img class="w-full aspect-[4/3] object-contain " src="${
            this.props.image
        }" alt=""></a>
                        <h2 class="text-center font-bold text-lg text-gray-600 mt-2">${this.props.name}</h2>
                        <div class="w-full h-[1px] bg-gray-300 my-2"></div>
                        <p class="text-center font-bold text-sm text-gray-400 line-through">${prd.od(this.props)}</p>
                        <p class="text-center font-bold text-lg text-red-800">${prd.sl(this.props)}</p>
                      
                        <button class="w-full py-2 bg-black text-white font-bold rounded-full mt-2 active:bg-red-700 hover:bg-red-600">Buy Now</button>
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
            <swiper-container id="list-items" navigation="true"  slides-per-view="5" space-between="24" autoplay="1000" pagination="true" loop="true">

            </swiper-container>
    </section>
        `;
    };

    renderUI() {
        super.renderUI();
        this.renderHotSale();
    }
    private renderHotSale() {
        this.renderList<Product>('#list-items', this.state.lsProduct as Product[], HotsaleItem);
    }

    protected async afterRender(): Promise<void> {
        signal.emit('load-home-page', 1);
        const ls = await productService.getHotSaleProduct();
        signal.emit('load-home-page', -1);

        this.setState({ lsProduct: ls });

        // this.startSlider();
    }

    // event
    addEventListener() {
        super.addEventListener();
    }

    // private startSlider() {
    //     (async () => {
    //         new Swiper(document.querySelector('#hot-sale-container') as HTMLElement, {
    //             spaceBetween: 24,
    //             slidesPerView: 4,
    //             loop: true,
    //             autoplay: {
    //                 delay: 3000,
    //             },
    //             pagination: {
    //                 el: '.swiper-pagination',
    //                 clickable: true,
    //             },
    //             navigation: {
    //                 nextEl: '.swiper-button-next',
    //                 prevEl: '.swiper-button-prev',
    //             },
    //         });
    //     })();
    // }
}

export default HomeSectionHotSale;
