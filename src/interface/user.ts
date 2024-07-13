enum Role {
    ADMIN = 'admin',
    USER = 'user',
}
export interface IUser {
    email: string;
    exp: number;
    iat: number;
    role: Role;
    userId: string;
    username: string;
}
