import QBComponent from '../../lib/QBComponent';
import QBRouter from '../../lib/QBRouter';

class NotFoundPage extends QBComponent {
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="h-screen grid place-content-center">
            <div class="flex flex-col gap-3 justify-center">
                <h1 class="text-3xl font-bold text-gray-600 text-center">Page Not Found</h1>
                <div class="round-lg overflow-hidden -my-16">
                    <img src="https://cdn3d.iconscout.com/3d/premium/thumb/sad-boy-with-404-error-5336508-4460194.png"/>
                </div>
                <p class="text-gray-500 text-center">The page you are looking for does not exist</p>
                <a href="/" class="text-red-600 font-bold text-center">Back to Home</a>
            </div>
        </div>
        `;
    };

    protected async afterRender(): Promise<void> {
        if (window.location.pathname !== '/404') {
            QBRouter.nav('/404');
        }
    }
}

export default NotFoundPage;
