import authenService from '../api/authenService';
import { IUser } from '../interface/user';
import signal from '../lib/listener';
import QBRouter from '../lib/QBRouter';
import { decodeTokenPayload } from '../util/token';
import cartReducer from './cartReducer';
import checkoutReducer from './checkoutReducer';

class userReducer {
    data: IUser | null = null;

    constructor() {
        this.verify().then((isOk) => {
            if (isOk) {
                const user = decodeTokenPayload(localStorage.getItem('accessToken')!) as IUser;
                this.setUser(user);
            }
        });
    }

    get getData() {
        return this.data;
    }

    setUser(data: IUser | Partial<IUser> | null) {
        if (!data) {
            this.data = null;
        } else {
            this.data = { ...this.data, ...data } as IUser;
        }

        signal.emit('user-change');
    }

    async verify() {
        try {
            const accessToken = localStorage.getItem('accessToken');

            if (accessToken) {
                const token = JSON.parse(accessToken);

                console.log('start verify token::::::::::::::::::::::::::::::::: ');
                const res = await authenService.verifyToken(token);
                console.log('end verify token:::::::::::::::::::::::::::::::::::::::');

                if (res.ok) {
                    /// xac thuc dung, con phien dang nhap
                    return true;
                } else {
                    /// xac thuc that bai, xoa token

                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            // token expire or invalid
            try {
                console.log('verify token fail start re-verify token :::::::::::::::::');
                const res = await authenService.verifyToken(JSON.parse(localStorage.getItem('accessToken')!));
                console.log('re-verify token end :::::::::::::::::');
                if (res.ok) {
                    return true;
                }
            } catch (error) {
                return false;
            }
        }
    }

    async login(email: string, password: string) {
        const res = await authenService.login(email, password);
        if (res) {
            const user = decodeTokenPayload(res.accessToken) as IUser;

            if (user) {
                // save res to local storage
                localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
                localStorage.setItem('refreshToken', JSON.stringify(res.refreshToken));

                // add user to store
                this.setUser(user);

                //load cart form server
                cartReducer.loadCartOnServerByUser(user.userId);
                return true;
            }
        }

        return false;
    }

    async refreshToken() {
        const accessToken = localStorage.getItem('accessToken');
        const result = await authenService.refreshToken(JSON.parse(accessToken!)!);

        if (result) {
            localStorage.setItem('accessToken', JSON.stringify(result.accessToken));
            localStorage.setItem('refreshToken', JSON.stringify(result.refreshToken));
            this.setUser(decodeTokenPayload(result.accessToken) as IUser);
        }
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('cart');
        //sync cart on server
        cartReducer.synCartOnServer();
        QBRouter.nav('/');
        this.setUser(null);

        //clear checkout
        checkoutReducer.clear();

        //clear cart
        cartReducer.clear();
    }
}

export default new userReducer();
