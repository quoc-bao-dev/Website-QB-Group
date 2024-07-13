export interface PaginationResult<T> {
    totalResults: number;
    products: T[];
    total: number;
    limit: number;
    page: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    previousPage: number | null;
    nextPage: number | null;
}
export interface ProductOfCategorySection {
    cateId: string;
    title: string;
    data: PaginationResult<Product>;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string | CategoryDetail;
    brand: string | BrandDetail;
    image: string;
    tags: string[];
    discount: number;
    isShow: boolean;
    orderNumber: number;
    isNewItem: boolean;
}

export interface ProductDetail extends Omit<Product, 'category' | 'brand'> {
    description: string;
    brand: BrandDetail;
    category: CategoryDetail;
}

export interface ProductInCart extends Omit<Product, 'category' | 'brand'> {
    category: string | CategoryDetail;
    brand: string | BrandDetail;
}

export interface CategoryDetail {
    _id: string;
    name: string;
    image: string;
    description: string;
    orderNumber: number;
    isShow: boolean;
    slug: string;
}

export interface BrandDetail {
    _id: string;
    name: string;
    image: string;
    description: string;
    orderNumber: number;
    isShow: boolean;
    slug: string;
}

export interface ProductWithCategoryAndBrand extends Product {
    categoryDetails: CategoryDetail;
    brandDetails: BrandDetail;
}
