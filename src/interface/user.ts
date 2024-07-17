enum Role {
    ADMIN = 'admin',
    USER = 'user',
}
export interface IUser {
    exp: number;
    iat: number;
    userId: string;
    image?: string;

    address: string;
    avatar: string;
    createdAt: string;
    email: string;
    firstName: string;
    fullName: string;
    isActive: boolean;
    lastName: string;
    password: string;
    phoneNumber: string;
    role: Role;
    updatedAt: string;
    username: string;
    __v: number;
    _id: string;
}

export interface IUserProfile {
    address: string;
    avatar: string;
    createdAt: string;
    email: string;
    firstName: string;
    fullName: string;
    isActive: boolean;
    lastName: string;
    password: string;
    phoneNumber: string;
    role: Role;
    updatedAt: string;
    username: string;
    __v: number;
    _id: string;
}
