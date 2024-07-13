import { TListener } from './listener';

export class EventBus {
    /**
     * event listeners
     *
     * Trigger all callback when emit
     */
    private listeners: { [event: string]: TListener[] } = {};

    on(event: string, callback: Function, key: string = '') {
        /** Register event listener
         * @param event: name of event
         * @param callback: callback function
         * @param key: key of listener (use to performence optimization)
         *
         * NOTE: key is unique for each callback event
         */
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        if (key === '') {
            this.listeners[event].push({
                key,
                fn: callback,
            });
        } else {
            const index = this.listeners[event].findIndex((listener) => listener.key === key);
            if (index > -1) {
                console.warn('Exist event!');
                this.listeners[event][index].fn = callback;
            } else {
                this.listeners[event].push({
                    key,
                    fn: callback,
                });
            }
        }
    }

    emit(event: string, ...args: any[]) {
        /** Trigger event listeners */
        if (this.listeners[event]) {
            this.listeners[event].forEach((event) => {
                event.fn(...args);
            });
        }
    }

    off(event: string, key: string) {
        /** Unregister event listener */
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter((listener) => listener.key !== key);
        }
    }
}
