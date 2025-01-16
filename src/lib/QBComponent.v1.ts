import { QBComponentInstance } from './QBComponent';
import QBRouter from './QBRouter';

class QBComponent<T = {}, S = {}> {
    /**
     * author: Quoc Bao
     * version: 1.1.3
     * status: stable (14-07-2024)
     * type: class
     * last update: 14-07-2024
     * last update by: Quoc Bao
     * date: 07-07-2024
     * description: Base class for all components
     *
     *
     * @param T: type of props
     * @param S: type of state
     */

    protected element: HTMLElement = document.createElement('div');
    protected parent: HTMLElement | null = null;
    protected props: T = {} as T;
    protected state: S = {} as S;
    protected options: { params?: Record<string, string>; queryParams?: Record<string, string> } = {};
    protected markup = () => '';
    protected template: string = '';
    protected pathTemplate: string = '';

    //? fix type of children
    protected children: { [key: string]: any } = {};
    private effects: { [key: string]: (() => void)[] } = {};
    private fisrtRender = true;
    private isReject = false;

    constructor(data: T | null = null) {
        /**
         * set props and initailize state,
         * define path template
         */

        if (data) {
            this.props = data;
        } else {
            this.props = {} as T;
        }

        this.element.style.display = 'contents';
    }

    async render(
        selector: string | HTMLElement,
        options: { params?: Record<string, string>; queryParams?: Record<string, string> } = {}
    ) {
        /**
         * INFO: render component into container
         *
         * @param selector: selector of container
         * @param options: options to get param from url
         * @param options.params: params to use in url
         * @param options.queryParams: query params to use in url
         *
         * life cycle:
         * 1. render
         * 2. beforeRender
         * 3. renderUI
         * 4. addEventListener
         * 5. effect
         * 6. affterRender
         * 7. reRender
         */
        let container: HTMLElement | null;

        if (options) {
            this.options = options;
        }

        if (typeof selector === 'string') {
            container = document.querySelector(selector) as HTMLElement;
        } else {
            container = selector;
        }

        if (container !== null) {
            this.parent = container;
            await this.beforeRender();
            if (this.isReject) {
                return;
            }
            await this.loadTemplate();
            this.renderUI();
            this.parent.appendChild(this.element);
            this.preventDefault();
            this.addEventListener();
            this.effect();
            await this.afterRender();
            this.fisrtRender = false;
        } else {
            console.error('Container not found', selector, 'in render');
        }
    }

    protected renderUI() {
        /** INFO: render UI of component */
        if (this.template !== '') {
            this.element.innerHTML = this.template;
        } else {
            this.element.innerHTML = this.markup();
        }
    }

    update(data: T) {
        /**
         * INFO: update props and trigger re-render
         * @param data: new props
         */
        if (data) {
            this.props = data;
            this.reRender();
        } else {
            console.error('Data not found in update');
        }
    }

    protected setState(newState: Partial<S>) {
        /** INFO: update state and trigger re-render
         * @param newState: new state
         * @param newState.key: key of state
         * @param newState.key.value: value of state
         */
        this.state = { ...this.state, ...newState };
        const keys = Object.keys(newState);

        this.reRender();
        keys.forEach((key) => {
            // if have effect will call it
            this.effects[key] && this.effects[key].forEach((effect) => effect());
        });

        // run when state change
        this.onChange();
    }
    protected setStateWithoutRender(newState: Partial<S>) {
        /** INFO: update state and not trigger re-render, this supoport for animation (like, isShow, isHide,...)
         *  WARN: Don't recomend use that
         * @param newState: new state
         * @param newState.key: key of state
         * @param newState.key.value: value of state
         */
        this.state = { ...this.state, ...newState };
        const keys = Object.keys(newState);

        keys.forEach((key) => {
            // if have effect will call it
            this.effects[key] && this.effects[key].forEach((effect) => effect());
        });
    }

    protected reRender() {
        const srcollY = window.scrollY;
        this.renderUI();
        this.preventDefault();
        this.addEventListener();
        setTimeout(() => {
            window.scrollTo(0, srcollY);
        });
    }
    private async loadTemplate() {
        if (this.pathTemplate !== '') {
            const response = await fetch(this.pathTemplate);
            if (response.ok) {
                this.template = await response.text();
            } else {
                console.error('Failed to load template:', response.statusText);
            }
        }
    }

    protected effect() {
        /** INFO: sign effect to component */
    }
    protected addEventListener() {
        /** INFO: sign event to component */
    }
    protected async beforeRender() {
        /** INFO: call before render (use check condition like role of user) */
    }
    protected async afterRender() {
        /** INFO: call after render (use to call API) */
    }
    protected onChange() {
        /** INFO: call when state change */
    }

    // support function
    //? fix type of component
    protected renderList<P = unknown>(selector: string | HTMLElement, data: P[] | undefined, component: any): void {
        let container: string | HTMLElement;
        if (typeof selector === 'string') {
            container = this.element.querySelector(selector) as HTMLElement;
        } else {
            container = selector;
        }

        if (container !== null) {
            container.innerHTML = '';
            if (data?.length && data.length > 0) {
                data.forEach((item) => {
                    const componentInstance = new component(item);
                    componentInstance.render(container);
                });
            }
        } else {
            console.assert(this.fisrtRender, 'Container not found ', selector);
        }
    }

    protected renderHTML(selector: string | HTMLElement, html: string): void {
        let container: string | HTMLElement;
        if (typeof selector === 'string') {
            container = this.element.querySelector(selector) as HTMLElement;
        } else {
            container = selector;
        }

        if (container !== null) {
            container.innerHTML = html;
        } else {
            console.assert(this.fisrtRender, 'Container not found ', selector, ' in renderHTML');
        }
    }

    protected renderComponent<P = unknown>(
        selector: string | HTMLElement,
        component: QBComponentInstance<P>,
        key: string = ''
    ): void {
        /**
         * NOTE: support for v2
         * INFO: render component into container and store to childrens
         *
         * @param selector: selector of container
         * @param component: intance component (new Component())
         * @param key: key to store component to list children
         */
        let container: string | HTMLElement;
        if (typeof selector === 'string') {
            container = this.element.querySelector(selector) as HTMLElement;
        } else {
            container = selector;
        }
        if (container !== null) {
            container.innerHTML = '';
            const componentInstance = component;
            componentInstance.render(container);
            this.children[key] = componentInstance;
        } else {
            console.error('Container not found ', selector, ' in renderComponent');
        }
    }

    protected signEvent(selector: string, event: string, callback: (e: Event) => void) {
        const elm = this.element.querySelector(selector) as HTMLElement;
        if (elm !== null) {
            elm.addEventListener(event, callback);
        } else {
            // console.assert(this.fisrtRender, 'Element not found ', selector, ' in sign event');
        }
    }
    protected signEventAll(selector: string, event: string, callback: (e: Event) => void) {
        const elms = this.element.querySelectorAll(selector) as NodeListOf<HTMLElement>;
        if (elms !== null) {
            elms.forEach((elm) => {
                elm.addEventListener(event, callback);
            });
        } else {
        }
    }

    protected signEffect(cb: () => void, deps: string[]) {
        deps.forEach((key) => {
            if (!this.effects[key]) {
                this.effects[key] = [];
            }
            this.effects[key].push(cb);
        });
    }

    protected rejectRender() {
        this.isReject = true;
    }
    private preventDefault() {
        this.element.querySelectorAll('a').forEach((a) => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                QBRouter.nav(a.getAttribute('href') as string);
            });
        });
        this.element.querySelectorAll('form').forEach((form) => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
            });
        });
    }
    // extends feature
    get html(): string {
        /**
         * warning: not working with template
         * usage: use it only in component just render UI
         */
        /** Get HTML of component */
        console.assert(this.pathTemplate == '', 'Template not working in get html');

        this.renderUI();
        return this.element.innerHTML;
    }

    protected node(selector: string): HTMLElement | null {
        return this.element.querySelector(selector) as HTMLElement;
    }
}

export { QBComponent as Component };
