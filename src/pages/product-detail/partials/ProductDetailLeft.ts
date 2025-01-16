import { ImagesProdDetail, ProductDetail } from '../../../interface/product';
import QBComponent from '../../../lib/QBComponent';
import ProductDetailTab from './ProductDetaiTapContent';
type Timeout = ReturnType<typeof setTimeout>;

interface ProductDetailLeftState {
    curImage: string;
    curIndex: number;
    images?: ImagesProdDetail[];
    tmerId: Timeout | null;
}
class ProductDetailLeft extends QBComponent<ProductDetail, ProductDetailLeftState> {
    constructor(props: ProductDetail) {
        super(props);

        this.state = {
            curImage: this.props.image,
            images: props?.images ? [...this.props?.images] : [],
            curIndex: 0,
            tmerId: null,
        };
    }
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="">
            <div class="w-full aspect-[4/3] rounded">
                <img class="w-full h-full object-contain large-image" src="${this.state.curImage}" alt="">
            </div>
            <div class="mt-5 w-full p-3 bg-white border rounded border border-gray-200 wrap-image">
                <div class="flex items-center gap-3 overflow-x-auto">
                 ${this.state?.images
                     ?.map((image, index) => {
                         return /*html*/ `
                    <img class="size-[120px] object-cover rounded border-2 border-gray-200 image-item ${
                        index === this.state.curIndex ? 'border-blue-500' : ''
                    }" src="${image.url}" alt="" 
                    data-index-image = "${index}"
                    />
                    `;
                     })
                     .join('')}

                    ${
                        this.state?.images?.length! <= 5
                            ? new Array(6 - this.state?.images?.length!)
                                  .fill(0)
                                  .map(
                                      (
                                          ...agm
                                      ) => /*html*/ `  <img class="size-[120px] object-cover rounded border-2 border-gray-200 image-item ${
                                          this.state?.images?.length! + agm[1] === this.state.curIndex
                                              ? 'border-blue-500'
                                              : ''
                                      }" src="${this.props.image}" alt=""
                                          data-index-image = "${this.state?.images?.length! + agm[1]}"
                                          />`
                                  )
                                  .join('')
                            : ''
                    }
                    
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

    protected addEventListener(): void {
        this.signEventAll('.image-item', 'click', (e: any) => {
            const index = e.target.getAttribute('data-index-image');
            this.setImage(Number(index));
        });

        if (!this.state.tmerId) {
            const totalImg = this.element.querySelectorAll('.image-item').length;
            this.state.tmerId = setInterval(() => {
                this.setImage((this.state.curIndex + 1) % totalImg);
            }, 1000);
        }
    }

    setImage(index: number) {
        this.state.curIndex = index;
        this.state.curImage = this.state.images![index]?.url ?? this.props.image;

        this.node('.large-image')?.setAttribute('src', this.state.curImage);

        //ui
        this.element.querySelectorAll('.image-item').forEach((image) => {
            image.classList.remove('border-blue-500');
        });
        this.element.querySelector(`.image-item[data-index-image="${index}"]`)?.classList.add('border-blue-500');

        const container = this.node('.wrap-image') as HTMLElement;
        const imageElement = this.node(`img[data-index-image="${index}"]`) as HTMLImageElement;

        if (container && imageElement) {
            container.scrollTo({
                left: imageElement.offsetLeft,
                // behavior: 'smooth',
            });
        }
    }

    private renderTabContent() {
        this.renderComponent('#tab-content', new ProductDetailTab());
    }
}

export default ProductDetailLeft;
