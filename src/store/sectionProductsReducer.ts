import _ from 'lodash';
import { productService } from '../api/productService';
import { PaginationResult, Product } from '../interface/product';
import categoryReducer from './categoryReducer';
import signal from '../lib/listener';

class SectionProudctReducer {
    data: { [key: string]: PaginationResult<Product> } = {};
    get getData() {
        return this.data;
    }

    async setByLsCategory(lsCate: Partial<Category>[]) {
        try {
            const lsKeys = lsCate.map((item) => item.name) as string[];
            const lsCateId = lsCate.map((item) => item._id);
            const result = await Promise.all(
                lsCateId.map((item) => {
                    return productService.getProductOfCategory(item as string, 1);
                })
            );
            this.data = _.zipObject(lsKeys, result);
        } catch (error) {}
    }

    async addProductToSection(category: string, page: number) {
        const cateID = categoryReducer.getCategoryId(category) as string;
        const result = await productService.getProductOfCategory(cateID, page);
        this.data[category].products.push(...result.products);
        this.data[category].page = result.page;
        signal.emit('product-of-section-change');
    }
}

export default new SectionProudctReducer();
