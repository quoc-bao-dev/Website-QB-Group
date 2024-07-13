import { PaginationResult, Product, ProductDetail } from '../interface/product';
import { axiosClient } from './httpClient';

export const productService = {
    getProductOfCategory: async (catgoryID: string, page: number): Promise<PaginationResult<Product>> => {
        const res = await axiosClient.get(`/product/?category=${catgoryID}&page=${page}&limit=8`);
        return res.data;
    },
    getSearchProduct: async (keyword: string): Promise<Product[]> => {
        const res = await axiosClient.get(`/product/?search=${keyword}&limit=200`);
        return res.data.products;
    },

    getProductDetail: async (id: string): Promise<ProductDetail> => {
        const res = await axiosClient.get(`/product/${id}`);
        return res.data;
    },

    getRelatedProduct: async (id: string): Promise<Product[]> => {
        const res = await axiosClient.get(`product/related/${id}`);
        return res.data;
    },

    getHotSaleProduct: async (): Promise<Product[]> => {
        const res = await axiosClient.get('/product/hotsale');
        return res.data;
    },
};
