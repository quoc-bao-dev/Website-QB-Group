import { PaginationResult, Product, ProductDetail } from '../interface/product';
import { axiosClient } from './httpClient';

export const productService = {
    getProductOfCategory: async (catgoryID: string, page: number): Promise<PaginationResult<Product>> => {
        const res = await axiosClient.get(`/product/?category=${catgoryID}&page=${page}&limit=8`);
        return res.data;
    },

    getAllProduct: async (): Promise<Product[]> => {
        const res = await axiosClient.get('/product/all');
        return res.data;
    },

    getAllProductOfCategory: async (catgoryID: string): Promise<Product[]> => {
        const res = await axiosClient.get(`/product/?category=${catgoryID}&limit=200`);
        return res.data.products;
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

    //admin
    getBestSelling: async (): Promise<Product[]> => {
        const res = await axiosClient.get('/product/sold');
        return res.data;
    },
    getTopView: async (): Promise<Product[]> => {
        const res = await axiosClient.get('/product/view');
        return res.data;
    },

    createProduct: async (data: any) => {
        const res = await axiosClient.post('/product', data);
        return res.data;
    },

    deleteProduct: async (id: string) => {
        const res = await axiosClient.delete(`/product/${id}`);
        return res.data;
    },

    updateProduct: async (id: string, data: any) => {
        const res = await axiosClient.patch(`/product/${id}`, data);
        return res.data;
    },
    updateProductRate: async (id: string, rate: number) => {
        const res = await axiosClient.patch(`/product/${id}`, {
            rating: rate,
        });

        return res.data;
    },

    updateProductDetail: async (id: string, data: any) => {
        const res = await axiosClient.patch(`/product-detail/${id}`, data);
        return res.data;
    },
};
