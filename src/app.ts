import FooterComponent from './components/layout/footer';
import HeaderComponent from './components/layout/header';
import QBRouter from './lib/QBRouter';
import CartPage from './pages/cart';
import CheckOutPage from './pages/checkout';
import Home from './pages/home';
import AdminPage from './pages/home/admin';
import LoginPage from './pages/login';
import NoAccess from './pages/no-access';
import NotFoundPage from './pages/not-found';
import ProductDetailPage from './pages/product-detail';
import ProductOfCategoryPage from './pages/proudct-of-category';
import RegisterPage from './pages/register';
import SearchPage from './pages/search';
import UserProfilePage from './pages/user-profile';

const appInit = async () => {
    new HeaderComponent().render('#header');
    new FooterComponent().render('#footer');

    QBRouter.root('#app-router');

    QBRouter.route('/', Home);
    QBRouter.route('/index.html', Home);
    QBRouter.route('/product-detail/:id', ProductDetailPage);
    QBRouter.route('/search/:keyword', SearchPage);
    QBRouter.route('/cart', CartPage);
    QBRouter.route('/checkout', CheckOutPage);
    QBRouter.route('/login', LoginPage);
    QBRouter.route('/signup', RegisterPage);
    QBRouter.route('*', NotFoundPage);
    QBRouter.route('/404', NotFoundPage);
    QBRouter.route('/product/category/:id', ProductOfCategoryPage);
    QBRouter.route('/user-profile', UserProfilePage);
    QBRouter.route('/admin', AdminPage);
    QBRouter.route('no-access', NoAccess);
    QBRouter.listen();
};

export default appInit;
