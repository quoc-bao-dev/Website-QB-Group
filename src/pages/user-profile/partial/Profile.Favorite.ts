import wishlistService from '../../../api/wishlistService';
import { Product } from '../../../interface/product';
import QBComponent from '../../../lib/QBComponent';
import userReducer from '../../../store/userReducer';
import wishListReducer from '../../../store/wishListReducer';
import { ProductCard } from '../../home/partials/Home.ProductSection';

interface UserFavoriteState {
    lsProd: Product[];
}
class UserFavorite extends QBComponent<{}, UserFavoriteState> {
    constructor() {
        super();
        this.state = {
            lsProd: [],
        };
    }
    protected markup: () => string = () => {
        return /*html*/ `
       <div class="px-5 pt-5">
         <h2 class="text-xl font-bold py-5">Your favorite product</h2>
         <div class="grid grid-cols-1 md:grid-cols-3 gap-5 " id="list-product">fff</div>
       </div>
        `;
    };

    protected renderUI(): void {
        super.renderUI();
        this.renderList<Product>('#list-product', this.state.lsProd as Product[], ProductCard);
    }

    protected async afterRender(): Promise<void> {
        const lsProd = await wishlistService.getLsByUserId(userReducer.getData?.userId!);
        await wishListReducer.loadWishList();
        this.setState({ lsProd: lsProd });
    }
}

export default UserFavorite;
