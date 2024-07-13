export interface Voucher {
    _id: string;
    code: string;
    discountPercentage: number;
    expirationDate: Date;
    isActive: boolean;
    description: string;
    discountAmount: number | null;
    minOrderValue: number;
    maxDiscountAmount: number;
    usageLimit: number;
    usageCount: number;
}
