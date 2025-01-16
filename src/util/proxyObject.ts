import { OrderInput } from '../interface/order';

const proxy = {
    transformOrder(input: OrderInput) {
        // Calculate the total, subtotal, discount, and tax
        const subTotal = input.subTotal;
        const discountPercentage = input.discountPercentage;
        const totalAmount = input.totalAmount;
        const shippingFee = input.shippingFee;

        // Transform delivery address
        const deliveryAddress = {
            address: input.addressInfo.address,
            city: input.addressInfo.city,
            country: input.addressInfo.country,
            deliveryMethod: input.addressInfo.deliveryMethod,
            district: input.addressInfo.district,
            phone: input.addressInfo.phone,
            postalCode: input.addressInfo.postalCode,
            recipientName: input.addressInfo.recipientName,
        };

        // Transform order items
        const orderItems = input.order.map((item) => ({
            product: {
                brand: item.product.brand,
                category: item.product.category,
                description: item.product.description,
                discount: item.product.discount,
                image: item.product.image,
                name: item.product.name,
                price: item.product.price,
                slug: item.product.slug,
                tags: item.product.tags,
            },
            quantity: item.quantity,
        }));

        // Construct the output object
        const output = {
            userId: input.user.userId,
            totalAmount: totalAmount.toFixed(2), // rounding to 2 decimal places
            subTotal: subTotal.toFixed(2), // rounding to 2 decimal places
            shippingFee: shippingFee,
            discountPercentage: discountPercentage, // fixed value
            paymentMethod: input.paymentMethod,
            deliveryAddress: deliveryAddress,
            orderItems: orderItems,
            tax: input.tax,
            paymentStatus: input.paymentStatus,
            voucher: input.voucher,
        };

        return output;
    },
};

export default proxy;
