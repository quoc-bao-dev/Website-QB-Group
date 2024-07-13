import { EventBus } from './EventBus.v1';

export type TListener = {
    key: string;
    fn: Function;
};
const Listener = new EventBus();

export default Listener;
