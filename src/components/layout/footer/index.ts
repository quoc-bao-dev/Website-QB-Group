import QBComponent from '../../../lib/QBComponent';

class FooterComponent extends QBComponent<null> {
    constructor() {
        super(null);
    }

    protected markup: () => string = () => {
        return /*html*/ `
        
        <!-- footer -->
<footer>
    <div class="container py-16">
        <div class="h-[1px] w-full bg-gray-200 mb-20 mt-3"></div>

        <div class="grid grid-cols-12 gap-3">
            <div class="flex flex-col gap-5 justify-start col-span-12 lg:col-span-4">
                <a href="/" class="content">
                    <div class="py-2 px-3 bg-blue-900 w-fit text-white font-bold rounded"> QB Group</div>
                </a>
                <p class="text-sm text-gray-400 pt-4"> QB Group is a Vietnamese technology company that specializes in
                    the development of mobile applications and web systems. Founded in 2015, the company has a team of
                    highly skilled developers and designers who strive to deliver high-quality products to their
                    clients. With a strong commitment to innovation and customer satisfaction, QB Group aims to become a
                    leading technology provider in Southeast Asia.</p>
                <div class="pt-2">
                    <div class=" flex gap-2">
                        <img class="w-[120px]"
                            src="https://maraviyainfotech.com/projects/grabit-tailwind/grabit-tailwind/assets/img/app/android.png"
                            alt="">
                        <img class="w-[120px]"
                            src="https://maraviyainfotech.com/projects/grabit-tailwind/grabit-tailwind/assets/img/app/apple.png"
                            alt="">
                    </div>
                </div>
            </div>
            <div class=" grid gap-5 md:gap-3 grid-cols-1 md:grid-cols-4 col-span-12 lg:col-span-8">
                <div class="">
                    <div class="flex justify-between text-gray-500">
                        <h3 class="font-semibold">Category</h3>
                        <i class="fa-solid fa-chevron-down text-[12px] md:hidden"></i>
                    </div>
                    <div class="h-[1px] w-full bg-gray-200 mb-1 mt-3"></div>
                    <div class="flex-col gap-3 pt-3 text-sm text-gray-400 hidden md:flex">
                        <a href="#">Cell Phones</a>
                        <a href="#">Laptop</a>
                        <a href="#">Smart Watch</a>
                        <a href="#">TV</a>
                        <a href="#">Accessories</a>
                    </div>
                </div>
                <div class="">
                    <div class="flex justify-between text-gray-500">
                        <h3 class="font-semibold">Company</h3>
                        <i class="fa-solid fa-chevron-down text-[12px] md:hidden"></i>
                    </div>
                    <div class="h-[1px] w-full bg-gray-200 mb-1 mt-3"></div>
                    <div class="flex-col gap-3 pt-3 text-sm text-gray-400 hidden md:flex">
                        <a href="#">About us</a>
                        <a href="#">Delivery</a>
                        <a href="#">Legal Notice</a>
                        <a href="#">Terms & conditions</a>
                        <a href="#">Contact Us</a>
                    </div>
                </div>
                <div class="">
                    <div class="flex justify-between text-gray-500">
                        <h3 class="font-semibold">Account</h3>
                        <i class="fa-solid fa-chevron-down text-[12px] md:hidden"></i>
                    </div>
                    <div class="h-[1px] w-full bg-gray-200 mb-1 mt-3"></div>
                    <div class="flex-col gap-3 pt-3 text-sm text-gray-400 hidden md:flex">
                        <a href="#">Sigin In</a>
                        <a href="#">View Cart</a>
                        <a href="#">Return Policy</a>
                        <a href="#">Terms & conditions</a>
                        <a href="#">Payments</a>
                    </div>
                </div>
                <div class="">
                    <div class="flex justify-between text-gray-500">
                        <h3 class="font-semibold">Company</h3>
                        <i class="fa-solid fa-chevron-down text-[12px] md:hidden"></i>
                    </div>
                    <div class="h-[1px] w-full bg-gray-200 mb-1 mt-3"></div>
                    <div class="flex-col gap-3 pt-3 text-sm text-gray-400 hidden md:flex">
                        <div class="flex gap-2">
                            <i class="fa-solid fa-location-dot text-green-600 text-lg"></i>
                            <p>Q.1, HCM city, Viet Nam</p>
                        </div>
                        <div class="flex gap-2 items-center">
                            <i class="fa-solid fa-phone text-green-600 text-lg"></i>
                            <p>0919 616 224</p>
                        </div>
                        <div class="flex gap-2">
                            <i class="fa-solid fa-location-dot text-green-600 text-lg"></i>
                            <p>Q.1, HCM city, Viet Nam</p>
                        </div>
                        <div class="flex gap-2 items-center">
                            <i class="fa-solid fa-envelope text-green-600 text-lg"></i>
                            <p>pythagore@gamail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="bg-slate-900 text-white py-4 mt-4 md:mt-10">
        <div class="container md:flex justify-between">
            <p class="py-3 text-center text-sm">© 2024. Bản quyền thuộc về QB Group</p>
            <div class="flex justify-center">
                <img src="https://maraviyainfotech.com/projects/grabit-tailwind/grabit-tailwind/assets/img/hero-bg/payment.png"
                    alt="">
            </div>
        </div>
    </div>
</footer>
<!-- footer -->`;
    };
}

export default FooterComponent;
