import FooterComponent from './components/layout/footer';
import HeaderComponent from './components/layout/header';
import FormTestComponent from './formCompoent.test';
import { test } from './function.test';
import QBRouter from './lib/QBRouter';
import CartPage from './pages/cart';
import CheckOutPage from './pages/checkout';
import Home from './pages/home';
import LoginPage from './pages/login';
import NotFoundPage from './pages/not-found';
import ProductDetailPage from './pages/product-detail';
import RegisterPage from './pages/register';

const appInit = async () => {
    new HeaderComponent().render('#header');
    new FooterComponent().render('#footer');

    QBRouter.root('#app-router');
    QBRouter.route('/', Home);
    QBRouter.route('/product-detail/:id', ProductDetailPage);
    QBRouter.route('/cart', CartPage);
    QBRouter.route('/checkout', CheckOutPage);
    QBRouter.route('/login', LoginPage);
    QBRouter.route('/signup', RegisterPage);
    QBRouter.route('*', NotFoundPage);
    // QBRouter.route('/product/category/:id', ProductPage);
    // QBRouter.route('/product/brand/:id', ProductPage);
    // QBRouter.route('/all-product', AllProductPage);
    // QBRouter.route('/cart', CartPage);
    // QBRouter.route('*', NotFoundPage);

    // QBRouter.route('/test', TestComponent);
    // QBRouter.nav('/');
    QBRouter.route('/test-form', FormTestComponent);
    QBRouter.listen();

    test();
};

export default appInit;
