import _ from 'lodash';
import categoryService from '../../../api/categoryService';
import { productService } from '../../../api/productService';
import { Product, ProductOfCategorySection } from '../../../interface/product';
import QBComponent from '../../../lib/QBComponent';
import { prd } from '../../../util/productUtils';
import cartReducer from '../../../store/cartReducer';
import toast from '../../../util/toast';
import QBRouter from '../../../lib/QBRouter';

class ProductCard extends QBComponent<Product> {
    constructor(props: Product) {
        super(props);
    }
    protected markup = () => {
        return /*html*/ `
        <!-- item -->
                <div class="w-full h-full rounded overflow-hidden shadow relative flex flex-col gap-3">
                    <img class="w-full aspect-[4/3] object-contain pt-4" src="${this.props.image}" alt="" id="link">
                    <div class="p-4 flex flex-col flex-1">
                        <h3 class="font-bold text-xl text-gray-600">
                            ${this.props.name}
                        </h3>
                        <p class="text-sm text-gray-400">Online giá rẻ</p>
                        <div
                            class="rounded-full w-fit px-2 py-1 bg-white/80 text-blue-600 text-xs border border-blue-600 font-bold absolute top-3 left-3">
                            Trả góp 0%
                        </div>
                        <div class="flex flex-col gap-2 absolute top-3 right-3 mt-1">
                            ${
                                this.props.isNewItem
                                    ? `<div class="px-3 py-[2px] bg-green-700  text-white font-bold rounded text-[11px]">New
                            </div>`
                                    : ''
                            }
                            ${
                                this.props.discount > 0
                                    ? `<div class="px-3 py-[2px] bg-red-500  text-white font-bold rounded text-[11px]">Sale
                            </div>`
                                    : ''
                            }
                        </div>
                        <div class="flex flex-wrap gap-2 mt-3">
                            <div class="rounded py-[1.5px] px-3 text-sm bg-gray-100 text-gray-500">8GB</div>
                            <div class="rounded py-[1.5px] px-3 text-sm bg-gray-100 text-gray-500">16GB</div>
                        </div>
                        <div class="flex gap-2 mt-3 flex-wrap">
                            ${this.props.tags
                                .map((tag) => {
                                    return `<div class="rounded-full py-[1.5px] px-3 text-sm bg-blue-100 text-blue-500">${tag}</div>`;
                                })
                                .join('')}
                        </div>
                        <div class="mt-auto flex justify-between items-end text-gray-400 text-sm ">
                            <div class="">
                                <p class=" text-gray-400 text-lg line-through"> ${prd.od(this.props)}</p>
                                <div class="flex gap-4 ">
                                    <p class=" font-bold text-xl text-red-700"> ${prd.sl(this.props)}</p>
                                    <div class="py-1 px-2 bg-red-100 text-red-600 rounded font-bold"> -${
                                        this.props.discount
                                    }%</div>
                                </div>
                            </div>
                            <div
                                class="w-[40px] aspect-[1/1] bg-slate-800 text-white font-bold rounded-full mt-2 grid place-items-center" id="btn-add-to-cart">
                                <i class="fa-solid fa-cart-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- item -->
        `;
    };

    // event
    protected addEventListener(): void {
        this.addToCart();
        this.eventGotoDetail();
    }

    private addToCart() {
        this.signEvent('#btn-add-to-cart', 'click', () => {
            cartReducer.addProductToCart(this.props);
            toast.success('Thêm sản phẩm vào giỏ hàng thành công', 'Add to cart', {
                positionClass: 'toast-top-center',
            });
        });
    }

    private eventGotoDetail() {
        this.signEvent('#link', 'click', () => {
            QBRouter.nav('/product-detail/' + this.props._id);
        });
    }
}

interface ProductSectionState extends ProductOfCategorySection {}
class ProductSection extends QBComponent<ProductOfCategorySection, ProductSectionState> {
    private currentPage = 1;
    constructor(props: ProductOfCategorySection) {
        super(props);
        this.state = props;
    }

    protected markup = () => {
        if (this.state.data.products.length == 0) return '';

        return /*html*/ `
        <section class="section" id="product-section">
        <h2 class="text-center font-bold text-2xl pb-6">
            ${this.state.title}
        </h2>
        <div class="container">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5" id="list-product">

            </div>
        ${
            this.state.data.hasNextPage
                ? /*html*/ `<button class="w-full py-2 bg-black text-white font-bold rounded mt-6 btn-load-more">Xem thêm</button>`
                : ''
        }
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
        this.renderList<Product>('#list-product', this.state.data.products, ProductCard);
    };

    // event
    protected addEventListener(): void {
        this.signEvent('.btn-load-more', 'click', this.loadMore);
    }

    private loadMore = async () => {
        this.currentPage++;
        const result = await productService.getProductOfCategory(this.props.cateId, this.currentPage);

        const newSate = {
            ...this.state,
            data: {
                ...this.state.data,
                ...result,
                products: [...this.state.data.products, ...result.products],
            },
        };
        this.setState({
            ...newSate,
        });
    };
}

interface HomeSectionState {
    lsSection: ProductOfCategorySection[];
}
class HomeProductSection extends QBComponent<{}, HomeSectionState> {
    protected markup: () => string = () => {
        return /*html*/ `
       <div class ="contents" id="product-section"></div>
        `;
    };

    renderUI() {
        super.renderUI();
        this.renderProductSection();
    }

    private renderProductSection = () => {
        this.renderList<ProductOfCategorySection>(
            '#product-section',
            this.state.lsSection as ProductOfCategorySection[],
            ProductSection
        );
    };

    // api
    protected async affterRender(): Promise<void> {
        const category = await categoryService.getCategory();
        const lsCate = category.map((item) => {
            return item._id;
        });
        const result = await Promise.all(
            lsCate.map((cateId) => {
                return productService.getProductOfCategory(cateId, 1);
            })
        );
        const lsSection: ProductOfCategorySection[] = category.map((item, index) => {
            return {
                cateId: item._id,
                title: item.name,
                data: result[index],
            };
        });
        this.setState({ lsSection });
    }
}

export default HomeProductSection;
