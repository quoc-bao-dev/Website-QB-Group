import authenService from '../api/authenService';
import { IUser } from '../interface/user';
import Listener from '../lib/listener';
import { decodeTokenPayload } from '../util/token';

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

    setUser(data: IUser | null) {
        this.data = data;
        Listener.emit('user-change');
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

                return true;
            }
        }

        return false;
    }

    logout() {
        localStorage.removeItem('accessToken');
        this.setUser(null);
    }
}

export default new userReducer();
