import signal from './listener';
import { Route } from './QBRouter';

class QBRouter {
    /**
     * Define routes of the application
     */
    private routes: Route[] = [];
    private rootElement: HTMLElement | null = null;

    private paramUrl: any = null;
    private querryUrl: any = null;

    private setParam(param: any) {
        this.paramUrl = param;
    }

    private setQuerry(query: any) {
        this.querryUrl = query;
    }

    get params() {
        return this.paramUrl;
    }

    get querries() {
        return this.querryUrl;
    }

    route(path: string, component: any) {
        /** Define a route for the application */
        this.routes.push({ path, component });
    }

    root(selector: string) {
        /** Set root element */
        this.rootElement = document.querySelector(selector) as HTMLElement;
    }

    private navigate(path: string) {
        /** Navigate to a route */
        if (path === '#') {
            return;
        }

        const { route, params, queryParams } = this.matchRoute(path);
        if (!route) {
            if (this.routes.find((route) => route.path === '*')) {
                this.navigate('*');
                return;
            }
            console.error(`Route not found: ${path}`);
            return;
        }

        if (this.rootElement) {
            this.rootElement.innerHTML = '';
            const componentInstance = new route.component();
            componentInstance.render(this.rootElement, { params, queryParams });
            this.setParam(params);
            this.setQuerry(queryParams);
            signal.emit('page-change');
        } else {
            console.error('Root element not found');
        }
        signal.emit('page-change');
    }

    listen() {
        /**
         * Listen to URL changes (support back/forward navigation)
         */
        window.addEventListener('popstate', () => {
            this.navigate(window.location.pathname + window.location.search);
        });

        this.navigate(window.location.pathname + window.location.search);
    }

    nav(path: string) {
        /**
         * Navigate and change URL
         */
        history.pushState({}, '', path);

        this.navigate(path);
    }

    prev() {
        history.back();
    }

    // Match the route and extract parameters
    private matchRoute(url: string): {
        route: Route | undefined;
        params: Record<string, string>;
        queryParams: Record<string, string>;
    } {
        const [path, queryString] = url.split('?');
        const queryParams = this.extractQueryParams(queryString || '');
        for (const route of this.routes) {
            const { params, matched } = this.matchPath(route.path, path);
            if (matched) {
                return { route, params, queryParams };
            }
        }
        return { route: undefined, params: {}, queryParams };
    }

    // Match a route path to a URL path and extract parameters
    private matchPath(routePath: string, urlPath: string): { params: Record<string, string>; matched: boolean } {
        const routeSegments = routePath.split('/').filter(Boolean);
        const urlSegments = urlPath.split('/').filter(Boolean);
        if (routeSegments.length !== urlSegments.length) return { params: {}, matched: false };

        const params: Record<string, string> = {};
        for (let i = 0; i < routeSegments.length; i++) {
            const routeSegment = routeSegments[i];
            const urlSegment = urlSegments[i];
            if (routeSegment.startsWith(':')) {
                const paramName = routeSegment.slice(1);
                params[paramName] = urlSegment;
            } else if (routeSegment !== urlSegment) {
                return { params: {}, matched: false };
            }
        }
        return { params, matched: true };
    }

    // Extract query parameters from a query string
    private extractQueryParams(queryString: string): Record<string, string> {
        const queryParams: Record<string, string> = {};
        const pairs = queryString.split('&');
        for (const pair of pairs) {
            const [key, value] = pair.split('=');
            if (key) {
                queryParams[key] = value || '';
            }
        }
        return queryParams;
    }
}

export { QBRouter as Router };
