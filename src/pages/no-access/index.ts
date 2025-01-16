import QBComponent from '../../lib/QBComponent';

class NoAccess extends QBComponent {
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="h-screen grid place-content-center">
            <div class="flex flex-col gap-3 justify-center">
                <h1 class="text-3xl font-bold text-gray-600 text-center">Access Denied</h1>
                <div class="round-lg overflow-hidden -my-16">
                    <img src="https://cdn3d.iconscout.com/3d/premium/thumb/no-access-7846980-6293636.png?f=webp"/>
                </div>
                <p class="text-gray-500 text-center">You don't have permission to access this page</p>
                <a href="/" class="text-red-600 font-bold text-center">Back to Home</a>
            </div>
        </div>
        `;
    };
}

export default NoAccess;
