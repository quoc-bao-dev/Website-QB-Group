import QBComponent from '../../lib/QBComponent';

class AppLoading extends QBComponent {
    protected markup: () => string = () => {
        return /*html*/ `
         <div class="fixed inset-0 bg-black/60 z-50  flex items-center justify-center">
           <div class="relative flex justify-center items-center">
    <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
    <img src="https://static.vecteezy.com/system/resources/previews/011/153/365/original/3d-web-developer-working-on-project-illustration-png.png"  class="rounded-full h-[300px] w-[300px]">
</div>
    </div>
        `;
    };
}

export default AppLoading;
