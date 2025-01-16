import { Product, ProductDetail } from '../interface/product';

export const usd = (price: number) =>
    !!price
        ? price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
          })
        : '$0';

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

export const p = {
    sl: (price: number, discout: number) => {
        return (price * (100 - discout)) / 100;
    },
};

export const n = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
