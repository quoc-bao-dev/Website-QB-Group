import { Router as QBRouter } from './QBRouter.v1';

export type Route = {
    path: string;
    component: any;
};

export default new QBRouter();
