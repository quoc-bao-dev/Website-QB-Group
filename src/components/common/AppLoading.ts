import QBComponent from '../../lib/QBComponent';

class AppLoading extends QBComponent {
    protected markup: () => string = () => {
        return /*html*/ `
         <div class="fixed inset-0 bg-black/60 z-50  flex items-center justify-center">
           <div class="relative">
            <div class="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin">
            </div>
        </div>
    </div>
        `;
    };
}

export default AppLoading;
