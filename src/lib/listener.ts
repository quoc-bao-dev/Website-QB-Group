import { EventBus } from './EventBus.v1';

export type TListener = {
    key: string;
    fn: Function;
};
const signal = new EventBus();

export default signal;
