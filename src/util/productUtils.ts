import { Product, ProductDetail } from '../interface/product';

export const usd = (price: number) =>
    !!price
        ? price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
          })
        : '';

export const prd = {
    sl: (prod: Product | ProductDetail) =>
        !!prod?.price
            ? ((prod.price * (100 - prod.discount)) / 100)?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
              })
            : '',
    od: (prod: Product | ProductDetail) => {
        if (!prod?.price) return '';

        return prod.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    },
    pr: (prod: Product | ProductDetail) => (prod?.price ? (prod.price * (100 - prod.discount)) / 100 : 0),
};
