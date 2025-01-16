import _ from 'lodash';
import categoryService from '../../../api/categoryService';
import { productService } from '../../../api/productService';
import { Product, ProductOfCategorySection } from '../../../interface/product';
import QBComponent from '../../../lib/QBComponent';
import { prd } from '../../../util/productUtils';
import cartReducer from '../../../store/cartReducer';
import toast from '../../../util/toast';
import QBRouter from '../../../lib/QBRouter';
import Star from '../../../components/common/Start';
import wishlistService from '../../../api/wishlistService';
import userReducer from '../../../store/userReducer';
import wishListReducer from '../../../store/wishListReducer';
import signal from '../../../lib/listener';

interface ProductCardState {
    isLoved: boolean;
}
export class ProductCard extends QBComponent<Product, ProductCardState> {
    constructor(props: Product) {
        super(props);
        this.state = {
            isLoved: wishListReducer.getData.includes(props._id),
        };
    }
    protected markup = () => {
        return /*html*/ `
        <!-- item -->
                <div class="w-full h-full bg-white rounded-lg overflow-hidden shadow-md relative flex flex-col gap-3 pt-2 hover:scale-105 hover:shadow-lg transition duration-300 group">
                    <div class="relative">
                    <img class="w-full aspect-[4/3] object-contain pt-4 group-hover:scale-110 transition duration-300" src="${
                        this.props.image
                    }" alt="" id="link">
                    <div class="w-full py-2 flex items-center justify-center gap-5 absolute bottom-0 left-0 transition tranform-translate-y-[100%] group-hover:translate-y-0 transition duration-300 opacity-0 group-hover:opacity-100">
                            <a href="/product-detail/${this.props._id}">
                            <div
                                    class="w-[40px] aspect-[1/1] bg-slate-800/30 text-white font-bold rounded-full mt-2 grid place-items-center active:bg-red-700 hover:bg-slate-800/50 transition duration-100" >
                                <i class="fa-regular fa-eye"></i>
                                </div>
                            </a>
                            <div
                                class="w-[40px] aspect-[1/1] bg-slate-800/30  font-bold rounded-full mt-2 grid place-items-center active:bg-red-700 hover:bg-slate-800/50 transition duration-100 ${
                                    this.state.isLoved ? 'text-red-500 scale-110' : 'text-white'
                                }" id="btn-add-to-wishlist">
                               <i class="fa-solid fa-heart"></i>
                            </div>
                    </div>
                    </div>
                    <div class="p-4 flex flex-col flex-1">
                        <h3 class="font-bold text-lg text-gray-600">
                            ${this.props.name}
                        </h3>
                        <p class="text-sm text-gray-400 text-overflow-2 line-clamp-2 mt-2">${this.props.description}</p>
                        <div class="py-1 px-2 bg-red-100 text-red-600 rounded font-bold absolute top-3 left-3"> -${
                            this.props.discount
                        }%</div>
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
                       
                        </div>
                        <div class="flex gap-2 mt-3 flex-wrap">
                            ${this.props.tags
                                .map((tag) => {
                                    return `<div class="rounded-full py-[1.5px] px-3 text-sm bg-blue-100 text-blue-500">${tag}</div>`;
                                })
                                .join('')}
                        </div>

                        <div class="mt-3 flex gap-2 text-gray-500 text-sm"> ${new Star(this.props.rating).html} (${
            this.props.rating
        })</div>
                        <div class="mt-auto flex justify-between items-end text-gray-400 text-sm ">
                            <div class=" flex gap-2">
                            <div class="flex gap-4 ">
                                    <p class=" font-bold text-xl text-red-700"> ${prd.sl(this.props)}</p>
                                    
                                </div>
                                <p class=" text-gray-400 text-lg line-through"> ${prd.od(this.props)}</p>
                                
                            </div>
                           <div
                                class="w-[40px] aspect-[1/1] font-bold rounded-full  grid place-items-center active:scale-110  text-xl transition duration-100 ${
                                    this.state.isLoved ? 'text-red-500 scale-110' : 'text-red-600 scale-110'
                                }" id="btn-add-to-wishlist">
                              ${
                                  this.state.isLoved
                                      ? '<i class="fa-solid fa-heart"></i>'
                                      : '<i class="fa-regular fa-heart"></i>'
                              }
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
        this.addWishlist();
    }

    private addToCart() {
        this.signEvent('#btn-add-to-cart', 'click', () => {
            cartReducer.addProductToCart(this.props);
            toast.success('Add to cart successfully!!!', 'Add to cart', {
                positionClass: 'toast-top-center',
            });
        });
    }

    private addWishlist() {
        this.signEvent('#btn-add-to-wishlist', 'click', async () => {
            const data = {
                productId: this.props._id,
                userId: userReducer.getData?.userId,
            };
            const res = await wishlistService.toggleItem(data);

            if (res.status == 'added') {
                toast.success('Add to wishlist successfully!!!', 'Add to wishlist', {
                    positionClass: 'toast-top-center',
                });
                this.setState({ isLoved: true });
            } else {
                toast.error('Remove from wishlist successfully!!!', 'Remove from wishlist', {
                    positionClass: 'toast-top-center',
                });
                this.setState({ isLoved: false });
            }
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
                ? /*html*/ `
                <div class="flex justify-center mt-5">
                    <button class="px-16 py-2 bg-white  border-gray-900 font-bold rounded mt-6 btn-load-more hover:bg-gray-900 hover:text-white">Xem thêm</button>
                </div>
                `
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
    lsWish: string[];
}
class HomeProductSection extends QBComponent<{}, HomeSectionState> {
    constructor() {
        super();
        this.state = {
            lsSection: [],
            lsWish: [],
        };
    }
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
    protected async afterRender(): Promise<void> {
        signal.emit('load-home-page', 1);
        const category = await categoryService.getCategory();
        await wishListReducer.loadWishList();
        signal.emit('load-home-page', -1);

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
