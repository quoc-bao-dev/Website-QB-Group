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
    slug: string;
    isShow: boolean;
    orderNumber: number;
    isNewItem: boolean;
    rating: number;
    isLoved: boolean;
    option?: OptionProduct;
    view: number;
    sold: number;
}

interface Feature {
    featureName: string;
    featureDescription: string;
}

interface Specification {
    specKey: string;
    specValue: string;
}

export interface IOptionItem {
    value: string;
    priceInc: number;
    stock: number;
    isDefault: boolean;
    color?: string;
}

export interface Option {
    color: IOptionItem[];
    ram: IOptionItem[];
    storage: IOptionItem[];
}

export interface OptionProduct {
    color: IOptionItem;
    ram: IOptionItem;
    storage: IOptionItem;
}

interface ShippingDetails {
    weight: string;
    dimensions: string;
    shippingFee: number;
}

export interface ImagesProdDetail {
    url: string;
    isPrimary: boolean;
}

export interface ProductDetail extends Omit<Product, 'category' | 'brand'> {
    brand: BrandDetail;
    category: CategoryDetail;

    productId: string;
    description: string;
    features: Feature[];
    specifications: Specification[];
    options: Option;
    rating: number;
    promotions: any[]; // Assuming promotions can be of any type as it is an empty array in the given JSON
    shippingDetails: ShippingDetails;
    _id: string;
    images: ImagesProdDetail[];
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
