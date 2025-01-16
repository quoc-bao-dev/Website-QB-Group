import wishlistService from '../api/wishlistService';
import userReducer from './userReducer';

class wishListReducer {
    listId: string[] = [];
    constructor() {}

    get getData() {
        return this.listId;
    }

    setData(data: string[]) {
        this.listId = data;
    }
    async loadWishList() {
        const lsWish = await wishlistService.getLsIdByUserId(userReducer.getData?.userId!);

        if (lsWish) {
            this.listId = lsWish;
        }
    }
}

export default new wishListReducer();
