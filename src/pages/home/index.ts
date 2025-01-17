import AppLoading from '../../components/common/AppLoading';
import signal from '../../lib/listener';
import QBComponent from '../../lib/QBComponent';
import HomeCategory from './partials/Home.Category';
import HomeProductSection from './partials/Home.ProductSection';
import HomeSectionHotSale from './partials/Home.SectionHotSale';

interface HomeState {
    isLoadding: boolean;
    counterLoading: number;
}
class Home extends QBComponent<{}, HomeState> {
    constructor() {
        super();

        this.state = {
            isLoadding: true,
            counterLoading: 0,
        };
        signal.on(
            'load-home-page',
            (count: number) => {
                this.state.counterLoading += count;
                if (this.state.counterLoading == 0) {
                    document.querySelector('.app-loading')?.remove();
                }
            },
            'load-home'
        );
    }

    protected markup: () => string = () => {
        return /*html*/ `
        <!-- main -->
<main>
    <section class=" ">
        <div class="w-full ">
            <img class="w-full h-[300px] md:h-[400px] lg:h-[600px] object-cover"
                src="https://www.apple.com/newsroom/images/2023/10/apple-unveils-new-macbook-pro-featuring-m3-chips/tile/Apple-MacBook-Pro-2up-231030.jpg.og.jpg?202405162110"
                alt="">
        </div>
    </section>
    <!-- category -->
    <div class="contents" id="category-section"></div>
    <!-- category -->

    <!-- hot sale -->
    <div class="contents" id="section-hot-sale"></div>
    <!-- hot sale -->

    <!-- baner sale -->
    <section class="section bg-white">
        <div class="container py-10">
            <div class="relative">
                <img class="w-full h-[400px] object-cover"
                    src="https://applemagazine.com/wp-content/uploads/2023/11/MacBook-Pro-M3-1.jpg" alt="">
                <div class="absolute top-0 left-0 w-full h-full p-8 md:p-16 lg:p-20 text-white items-end justify-start">
                    <div class="w-9/12 md:w-6/12 lg:w-4/12 -mt-6">
                        <p class=" text-xl font-bold pb-4">
                            30% off sale
                        </p>
                        <h2 class="text-3xl font-bold  pb-4">
                            Latest Exclusive
                            Summer Collection
                        </h2>
                        <div class="flex mt-2">
                            <button class=" py-2 px-3 bg-black text-white font-bold rounded">Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- baner sale -->
    <!-- product -->
    <div class="contents" id="product-section"></div>
    <!-- product -->

    <!-- feature -->
    <section class="section ">
        <div class="container">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div class="w-full h-[300px] bg-gray-100 rounded overflow-hidden relative ">
                    <div class="p-4 text-red-700 bg-red-100 font-bold absolute top-0 left-0 z-10">-50% <br>
                        OFF
                    </div>
                    <img class="w-full h-full object-cover"
                        src="https://www.apple.com/newsroom/images/product/watch/lifestyle/Apple-watchOS-9-hero-220912.jpg.landing-big_2x.jpg"
                        alt="">
                    <div class="absolute inset-0 flex justify-end">
                        <div class="w-6/12 h-full bg-gradient-to-r to-black/70 from-black/0 flex items-center">
                            <div class="text-white pl-[150px]">
                                <h2 class="text-2xl font-bold">Apple Watch</h2>
                                <button class=" bg-black px-3 py-2 text-white font-bold mt-4">Shop Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full h-[300px] bg-gray-100 rounded overflow-hidden relative ">
                    <div class="p-4 text-red-700 bg-red-100 font-bold absolute top-0 left-0 z-10">-50% <br>
                        OFF
                    </div>
                    <img class="w-full h-full object-cover"
                        src="https://us.casestation.com/wp-content/uploads/2018/01/Corporate-Phone-Case-Banner-Apple-Watch.png"
                        alt="">
                    <div class="absolute inset-0 flex justify-end">
                        <div class="w-6/12 h-full bg-gradient-to-r to-black/70 from-black/0 flex items-center">
                            <div class="text-white pl-[150px]">
                                <h2 class="text-2xl font-bold">Apple Watch</h2>
                                <button class=" bg-black px-3 py-2 text-white font-bold mt-4">Shop Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- feature -->

    <!-- service -->
    <section class="section bg-white">
        <div class="container">
            <div class="grid grid-cols-2 gap-5">
                <div class="w-full h-[250px] bg-white border border-gray-100 rounded p-8">
                    <div class="grid place-content-center text-green-600 text-5xl">
                        <i class="fa-solid fa-truck-fast"></i>
                    </div>
                    <h3 class="text-lg md:text-2xl font-semibold mt-4 text-gray-600 text-center">Free Shipping</h3>
                    <p class="text-center text-sm md:text-[16px] text-gray-400 mt-4">Free shipping on all orders</p>
                </div>

                <div class="w-full h-[250px] bg-white border border-gray-100 rounded p-8">
                    <div class="grid place-content-center text-green-600 text-5xl">
                        <i class="fa-solid fa-headset"></i>
                    </div>
                    <h3 class="text-lg md:text-2xl font-semibold mt-4 text-gray-600 text-center">24X7 Support</h3>
                    <p class="text-center text-sm md:text-[16px] text-gray-400 mt-4">ontact us 24 hours a day, 7
                        days a week</p>
                </div>

                <div class="w-full h-[250px] bg-white border border-gray-100 rounded p-8">
                    <div class="grid place-content-center text-green-600 text-5xl">
                        <i class="fa-solid fa-percent"></i>
                    </div>
                    <h3 class="text-lg md:text-2xl font-semibold mt-4 text-gray-600 text-center">30 Days Return</h3>
                    <p class="text-center text-sm md:text-[16px] text-gray-400 mt-4">Simply return it within 30 days
                        for an
                        exchange</p>
                </div>

                <div class="w-full h-[250px] bg-white border border-gray-100 rounded p-8">
                    <div class="grid place-content-center text-green-600 text-5xl">
                        <i class="fa-solid fa-money-bill-wave"></i>
                    </div>
                    <h3 class="text-lg md:text-2xl font-semibold mt-4 text-gray-600 text-center">Payment Secure</h3>
                    <p class="text-center text-sm md:text-[16px] text-gray-400 mt-4">Contact us 24 hours a day, 7
                        days a week</p>
                </div>
            </div>
        </div>
    </section>
    <!-- service -->

    <!-- top selling -->
    <section class="section bg-white">
        <div class="container">
            <div class="flex justify-between">
                <h2 class="text-2xl font-bold text-gray-600 bg-white">Top Selling</h2>
                <div class="flex gap-6 pb-1">
                    <i class="fa-solid fa-chevron-left"></i>
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div class="w-full p-5 rounded shadow flex gap-5 items-center">
                    <img class="w-[80px] aspect-[1/1] object-contain rounded"
                        src="data:image/jpeg;base64,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"
                        alt="">
                    <div class="flex flex-col gap-2 flex-1">
                        <h3 class="text-lg font-semibold text-gray-600">
                            Macbook M2 Pro
                        </h3>
                        <p class="text-sm text-gray-400">Apple</p>
                        <div class="flex gap-4">
                            <p class="text-gray-700 font-semibold">$1,247.99</p>
                            <p class="text-gray-400  line-through">$1,299.99</p>
                        </div>
                    </div>
                </div>
                <div class="w-full p-5 rounded shadow flex gap-5 items-center">
                    <img class="w-[80px] aspect-[1/1] object-contain rounded"
                        src="data:image/jpeg;base64,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"
                        alt="">
                    <div class="flex flex-col gap-2 flex-1">
                        <h3 class="text-lg font-semibold text-gray-600">
                            iPhone 14 Pro Max
                        </h3>
                        <p class="text-sm text-gray-400">Apple</p>
                        <div class="flex gap-4">
                            <p class="text-gray-700 font-semibold">$1,287.99</p>
                            <p class="text-gray-400  line-through">$1,399.99</p>
                        </div>
                    </div>
                </div>
                <div class="w-full p-5 rounded shadow flex gap-5 items-center">
                    <img class="w-[80px] aspect-[1/1] object-contain rounded"
                        src="https://cdn.tgdd.vn/Products/Images/44/263914/macbook-pro-14-m1-max-2021-10-core-cpu-600x600.jpg"
                        alt="">
                    <div class="flex flex-col gap-2 flex-1">
                        <h3 class="text-lg font-semibold text-gray-600">
                            MacBook Pro 14-inch M1 Max
                        </h3>
                        <p class="text-sm text-gray-400">Apple</p>
                        <div class="flex gap-4">
                            <p class="text-gray-700 font-semibold">$2,743.99</p>
                            <p class="text-gray-400  line-through">$2,799.99</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
    <!-- top selling -->

    <!-- top rate -->
    <section class="section bg-white">
        <div class="container">
            <div class="flex justify-between">
                <h2 class="text-2xl font-bold text-gray-600 bg-white">Top Rate</h2>
                <div class="flex gap-6 pb-1">
                    <i class="fa-solid fa-chevron-left"></i>
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div class="w-full p-5 rounded shadow flex gap-5 items-center">
                    <img class="w-[80px] aspect-[1/1] object-contain rounded"
                        src="https://cdn.xtmobile.vn/vnt_upload/product/01_2022/thumbs/(600x600)_crop_iphone-13-pro-128gb-likenew.jpg"
                        alt="">
                    <div class="flex flex-col gap-2 flex-1">
                        <h3 class="text-lg font-semibold text-gray-600">
                            Iphone 13
                        </h3>
                        <p class="text-sm text-gray-400">Apple</p>
                        <div class="flex gap-4">
                            <p class="text-gray-700 font-semibold">$899.99</p>
                            <p class="text-gray-400  line-through">$999.99</p>
                        </div>
                    </div>
                </div>
                <div class="w-full p-5 rounded shadow flex gap-5 items-center">
                    <img class="w-[80px] aspect-[1/1] object-contain rounded"
                        src="data:image/jpeg;base64,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"
                        alt="">
                    <div class="flex flex-col gap-2 flex-1">
                        <h3 class="text-lg font-semibold text-gray-600">
                            Iphone 15 Pro Max
                        </h3>
                        <p class="text-sm text-gray-400">Apple</p>
                        <div class="flex gap-4">
                            <p class="text-gray-700 font-semibold">$1,379.99</p>
                            <p class="text-gray-400  line-through">$1,499.99</p>
                        </div>
                    </div>
                </div>

                <div class="w-full p-5 rounded shadow flex gap-5 items-center">
                    <img class="w-[80px] aspect-[1/1] object-contain rounded"
                        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExEWFRUVFxUWFxgYFhUVGBUVFRcWFhgYHRUYHSggGholHRUVITEiJSsrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGy0lHyUtLS0tLy8tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAwQFBgcCCAH/xABNEAACAAQCBQQNCAkEAgIDAAABAgADBBESIQUxQVFxEyJhgQYHIzIzQlJyc5GhscEIJGKys7TR4RQVVIKSosLS8DRDU5RE8YOTFmOE/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAQBAgMFBv/EADoRAAECAwUGBAUDAwQDAAAAAAEAAgMRIQQSMUFRYXGBkaHwIrHB0QUTMkLhUmLxcoLCFJKi0gYVM//aAAwDAQACEQMRAD8A3GCCCBCIIr3Zjpw0skFBeY5CoOk2HxHv2RlukeyE47T658ZPergsDuAmAk21ZeoaoELc4IwmTpPEbLPqGOZsqSibAZmwQnVCtVpErJad+mTiqqWNjLvYbBzNZOQvtgQtxgjynWdldZMJIqJktdgluyW4uLMx4ngBqht+vav9tqf+zO/vgQvWsEeS/wBe1mytqf8Aszv74+HTlZ+2VX/Ynf3xMjohetYI8k/r+r/ban/szv74+/r2r/ban/szv74hC9awR5KOm6o/+bUdHzmd/fHY01WftlTt/wDJnbMz4+yBC9ZQR5KOmqzP57U9HzidxHjwLpysOQrKonoqJx9gaBTIr1rBHk2ZpXSAy/SawG9s51Rrva3fa75QmdNVv7XVar/6ifq1X77VAggr1tBHkldMVpNhVVRbcJ88nVfVivqzjr9cV37VV29PUf3RMioXrSCPJZ0zXDXV1Y4z54/qjk6drP22p/7E7++AtIxQvW0EeSP19WfttT/2Z398cfrqqP8A5lQf/wCiaf6oA0nJRNeuoI8oaM7La+nYPKrJ2RvZpjTEboKuSDHojtf9k40hRrPwhZgJlzVGoTFte3QQQRxiCCMVKs8EEECEQQQQIRBBBAhULtiScU2QxY2RXbDlYscgTlfIE6jGAVqs8yYbYsRIJNzhtkdXWesx6E7YN8aAeQ3vjzxpimeXMcMpzJwNcgDM5jed4GYOR1RIQpvQulp0pzMkzjKdVw4gFYkNrFmBGweoR27E0FRn3roOIE2Rln0tfq4xUUqWxG2IA31Ak9GXqi2y6SZL0ZN5QFWdlex1gGdTgA7jYXsd4iEKpVwNltvPwhqk0jZD2oQkC3T8I4WXM8i/Vf3RvDwxkoIJyXKOp1/564cpiGo4huP+XhEovjSyvA29hjpJA8SYR0MPiModhE5dDI9aLFxCUOBsmGE9P+fhCUylZcxmsOgH1FVmDoIJ/GOVsDkzSzuYZQyYbX448j/1PNVDj33Poo6w2at20cIVp55U69oIOvMam4jURtBMO50q+bLb6SZj1Q0mySM7gjeNXXuPTCUWzObtC0a8FOZ1iuQsCMhutcgX6LuOBWJrsM0LNmTBUGW4p0ZMU3ASmIzETDiyAPdVJzyAOs5RBTaSdLRZjypiy3712lsqPlfmsRY6r5buiJ/sR09UKj0aziKY45jS8KWLZWOIjF3wTbsjmxGi6QnbO5xitljNPdKVFzckjWxte4LYrkfSGKb1lIhGmMzWUAscwPFAXIEnZLTp1m8L17sxuQQCMQJBUML2xX2jK1x5I2iE5kxZN1NwxsWuLMcri48VbWsN2eeuGIEO8Z4BXtEeRkndNLWWCFOJj37nItt1nvUvs1nWdwRqK8DUQTv1AcB8fbHEuiqJqhsPJyjmGchEPSGbvuq56I4ZKWX388zW3Sxl/wDYwueoLHUYbo8EgNT5gHPaajINokXB7xXDvjLYN6aTZzMeO06zwHwjuVo528XrbL+XX64U/XwW4kSFTpN2J4nX7TEfU101++ew3Cyj1CKTgtqSXHvM+yrdy8k/m08pPCPiO69v5VzhzN7LH14nY3xElhm2/UdwithRvvwzhRZe5D7ozdaXGjAB1PVTdClK3TU2qmtMmsWOEawNQIA1AbzGyfJ7buFWL/7yG3/xrc+71Rh1MhF7i2XxEbh8nnwNX6VPs1hCLO9VXC12CCCM1KIIIIEIggggQqP2fnusrzG98VJpKE3Ki51nUTxI1xbO2Ee6SvMb3iKniiwQjkV3e0/jEH2b/wCkcDIWX7enicxRA9mp+azOC/b08QhZ9Ln4R1/hC6aQG4ez8YZiQz5KL2vfMDdCq6ObaUHFrfCMnXc05AMSQDQpKVpEbh6/zjv9KlHXKU/5whhLoF2z5Q4Xc+oRLUXY4z97yz+bTED+JzaMqH6Z8JrpsMaXiaON31KQM6nOuWeo/nAHp9WJx/CR6rxY6LsFnN/tzR58ymlj1IHPsiYk9rwgXmPLl/vzZnwlRqyJHbVt4byB5+yziNhGjmMJ3eyoPJSNk0L+4w9qwto+TIWdKmPMlsizJbOM+cisCwIIGK4ByOuNC/8AxCklgY5jsdyrhvwE0vfqMLpoKnlkMKZVIIZWmswa4NwRLQA3uNot0xv/AK+IBIkHl6SCW/0UJ1WslxI8yfJUeg0c7TZ5nVcuYs+TUYyJ0ub+kMsp3R8AYlcDKHxMFw4LayBEf2M0DzGd2p2EuXJRW5FHJmAMosCCe6zCACwyFy1rKYvOmNOyKYMJVPKWYw5zBMBsc8gCSAbbzcX1ZiMy0npapnzmd3m4gMIF3XCqAm2EagACegAmKCMIxw01Cwi2c2cBxNdM650Vr0xOnqKae8t1YSpihRKVFS0+oEtVadzZeFbYeaxAAI3wx7IquaKgtLEpGMumJmuOVnEmmkm5dsVjnrUA7YhaiZUT5cqWUmOJQKrZZjE3mM9zru15uHrUbY5q6pprl2FjhloQLgASpaSh12QX6SYZY2tUiYkgkqmmaY2KbPLsdrY3J62tHK0aDax4BR746lSma1msSdoBFuuFKvR9TLXGyKV8oWtnvOVjxh1jWyvXZ8z6rK/MymuRKlDxGPFgPjBiQapC9br8Fhq019sr1YveDCJqF2oep2gdFaMKcJf4lSGnv+U8apOxEH75Pwjj9If/APWPXDUzE3OP3r++Obp5Tj1fCMjGJz6/hWuDRPVmsbhipy2DpEbR8nnwVX6RPqCMPo7XNiTzdvnLG5/J58DWeml/ZiEorrzp+s1oBJa5BBBGalEEEECEQQQQIVD7Yx7pJ8x/eIqN4tfbJPdZPmP9YRT7xIQlbxB9mZ+bTPNX7xTxL4ohey8/Npnmr94p4koVG0fKV3wtc3BIzIzBXd1xYKDRCE5IDxGL33it0VQJc6S5AIxkG+qzAKffGm0tM5ysAPUBHQslohw4crgLp4ymeQBPknLNCMQGuG7zJCcaHogtrLboUW90WWQ4TXhXibk/urnEfR04A5znguQ9esw7kaQlKSspcT7QmZHnOch1mKxXWuNgLo5dASf+QKeaIYoKnZ70HRSKO7d6GPSe5D1C7e6OHRQbM5LeRKFm63viXiWAjqXKmPm7YF8lSR631nqtEfO0oL8jSoHYa2t3NDvy748PXfKOfEgNbWISe8hieZV2hzzJvTAbyacqpWsqVkrfmysWoKMUxzuxayeFreVFL03ppiWRcj4w77Bf/kYd8xysg1nXfXHWlK+7OsqbjYDu1S2ayxtWXsvw35ZnKr1z58mgKgZkX5y49WI3zmv/ACi++5RcC50stO6cE627CbMVOvt7nfSRKb6Q7IZ6rZJpAGQyQ3sLXzGe0bt3imGK9k1UxBM3nLcg4UB5/fDIWsbZjbc7CYZaRfEwF8ujIEDK/A2a3Qqw2p82bqh+CJEBeatLrziVNzdO1JIYzbsQRcpLORK3FitrHAtxtAtqJuzmsTck3ZiSSdZLG5J9scOMxw98KAZjoz+Ah0NE0g5yk9C02KZquBl+PwH70WisVnZKaWec5wk7hrdj0AX9sM9AU4lyy7f4f/d/UIkKO8uU08juk8YZY2rJvlbpc5+ox2YbSyGGjE9+Sxhtvur2P5UNpnsblzZwSiHJsAB3xCMFGbsfFvvGRyyzilmqcXDYWtvCsMvpDXxvF37IKzkUalQ91mAGpceIhHNkjpI19BO/KsmmEzmiyhRm2xRHNjAX5QsNmabc4A+L+FHGch1y/wCFiPYY5MuWdTMvnD4iOCn5a8xvF9kJlt8KF+su9oVpJ3SSwCecG5uzzljcvk8+BrPSy/s4wnR/fNbyf6hG7fJ58DWell/ZiF3GZV1rkEEEVQiCCCBCIIIIELPu2We6yfMf6yxTrxb+2ce6yfMf6wil3iwQlLxDdlh+bTfNX7xTxK3iJ7KT82m+Yv3imgKFnGkBkvE+4Ro+gNPmbITCjTJoGFgMgGXK5Y5AEWPXGc6R71eJ9wixdrXT6UtThmgclNspJzwP4j24mx6GvshqxWgQYkyJg9hXYZFaVo/QdRPznvhQ+Il1BHSe+f3dMTM2rpqNABbcAACSdwA1nh1kRXtMdlzuxlU64iTYnMgE7LjNz9FcuOqHdDoZKdDV18zMAXxZnoWw2nZLXr3B+0RHy8Uhsy/K6MNrZTeaeacEzqpS81uQpwCTmBdRmbnVbfsG0tENU1pqA0qm7jRywTNnHmlwBdszqW2/PVewsp+ctO0q+YMiilm9rgYsGfOOokW81Ok62WlNIS5iHAOToJFiLZGpcHmmx8XF3oOs887I4kagvZ9TsGgTTYheZCgxlkAPudu/AUbpGrAVBKQhCcNNKIsZr6jOmX2C97HUNeZNoarGEcmGuzMwL7Xa1503gq5Dj9GH0su3zhgBOqBgkrskybE3z2WBPAHa0QtU2IEpqmHkJF9fJqbzHPSSc+lmhJg8XfdPQrSI/wAM9a7Za73UFMAWt1Uf3zXtYHMDcuSKP4bmEKLW3SYeSQCzEaudh81BhX6/shpRjNvO90dCD9YXAjiTJp43fcAPd+cO9GSMbgbz7F/OGe1j0/lFm7G5ARWmtqUWHV0euOpZYd+IJ4LnRCpxKQTHWRqRRjm28gZYb72Nl6mg0xpTk+72BmMStMmy4yM0jyEGQ3n2OXAkSWEwkFrTJ5GbC/NSSu9vFHSXMUfTFc0yYzNYMQAbd5Klr3ssdA27zcw3aIssM+g/PlVbNHy2yzPfQY7U1cliRivmWd22k5sxO8wpLlKyhmykjNV1NOPlH6Md09KMOJxZBmqnW58ph7lhzRaLm1eKYXEmnU2ee/eC3iqPHboGXTCwa1gm/PAa+w88cFVsMuM+vefko+YXqZqS0ll3OSqg1L7go3nLhDKfIChsQzS4YHIhgbWtsN8ouH61lyEMmhQykPfzm8POttv4i7gN/im8VbT9AwUTQDhOTX37G69V99t8RGES46I4DdorhzLwaFGaM75vN/qWN5+T14Gs9NL+zEYNozW3m/1LG8/J58DWell/Zxx1utcggggQiCCCBCIIIIELOe2ke6yPMf6yxSsUXLtqnusjzH+ssUjFEhCVxRF9kx+bTfMX7zTQ/wAURvZGfm83zF+800SULP8ASXerxPuER4iQ0l3q8T7hEfFULVO112W0kmQ/LITUSxzCBczUOWFdiMPGJ1jPO1okNG0FTpady9SSlOhIVVNl3FE3nypmvYNy4+rEajY7x+MahTdl83SMqTQS0EklcM7BZeVVchLlKO8UjNtwB2Xuw2IXUNSmITyXAclM19cKxv0SlslDKFpkwc1Jol6wDskLtPjHozivTXWtnWUEUVLsOXLOdVxvbb5K5ZXMO+yGcbpomisXYhZzLkpK5mXfZKl2JbeRbyr/AHSVJLQS9HymtKRWmT5l8+THhZhOwuQVG4X2QraJiueugXQg3XuLcWiRP7jkP6QegJ1UHpaqZxjHhKk8nJHkyLgFrbMZFvNWIusKhphXvKdORQ73a4ZuN8Z9UPWrcTT621hLHJSF3OwwqAPoqb8WMRdRIwypEnbMPKNvs2S/yhowY2Rl3qeTZDfNWiRC4F/HrJv+55vf0taMkrQybJ1KOtrufhEZQZk9LGLHSplfeZkzqQW+EVnR2r1+6GLK+9FKS+IQflQ4e0H090/p0LEAayfbs9pEaJomkC4crrJwm2XPnEXRc/J78nZzScoqnYpRlpmK18Ngo3uclHrJ4WvE32T6UWSgkrziQR55bNiR9I6xuwptcDvwiIUIuOJ8vyuOwTdeOA6lRfZLpjEwCtcC5BzF2YWM0jZcZINYXpYwyoaAKBMm31jAmssx1Ega23DZ0mHei9EtczJli45xxNZJYOWN3OQ27ycwoY63kmrdpmCiR5s45GdhIKg5ESlz5JbeMbzCPJ1RhMucTiduA36nYKBb3PueceZ9hrruXE6kRDjrBdh3tKpsegz3F8APkDnHbaE8dTXOqol1HNlqqlZUtRlZJa+0jrNouGgO1hqm10wDbgBvrzz13P8AFwEXmlmSZC4KaSOIF723k6+s9UAiNaZtF52Z/OHLggsfEpgNFUOx3ta2tMqXttsLXHE5qvVi4iLHpfRlGaSbSBFCzUKkjytauWObsrBTc31RxX6Uue6TRfyV57ezJfZEdMriOckoKPLnH4bIuYMSN/8AQ00FB6TW7ITGLBaaSUmTEYWZbqw3FWAPtEbp8njwNZ6WX9nGVdmKD9NmTA6vyqByUthx3AYZZaxfrjVfk8eBrPSy/s45ERhY4tOSotdgggiiEQQQQIRBBBAhZn22D3aR5j/WWKPii7dts92p/MmfWWKLeLBCUBiO7ID83neYv3mlh7eGOnf9PO9Gv3mlgKFQ9Jd6vE+4RHxIaS71eJ9wiOiqF2sO6YFWDYipUgqVNiCMwQRqMNUMKqH2CLtlmoKunYh2Ryqbli6MZsxQqzQcRRNbLbYWIHO32vqvDjS9QZVIMw1RXYZr4SGCyr4ZMkEcMx9FxFF/R3Ov3w4oXmSnWYpF0YML84YhqJByMWewuM7q2h2gtZ8udPehO+U5byrNpWj58jR6m/J2aaRtmzOcx6luf3ojqycJlTMcd6lwvAcwewE9cKaP0wVmTZ0xS01w5VltZXfUSDqA1ZXyhno5BYgkDEwXM25oyB9pjD5T2/UMuZNSfROfOY+QacXT3BousHWe9Tc5cEp+inPrf/DFUodXr/CLhps/Nqhtd8Cj+ID4xXexmm5Saq4SwF2IUXJC52A2kmw676gYz+GeJx2n0HumP/ICA9jBkPUj0VxoZgpKZSRebMvhUC5JbI5cOb/HfKGlHRnlA0wPOqJmaS5YxvY6sIIOEZ+EYEbQGzifotFKWM6onc7VgkKaiYq7Ja4AyyxkMyGJzuq5WnKbSEySpSh0ZOUNmzt3MzCfGeaxaYx4iO1EjsnjQYV7PIclxoUB0gAOh75ppQ9g0ybhavmiUgOJaaTzmva12bPnEWuSSdl7ZRbKSdIpk5OmlJKUCxKjG2XlMMh1kRUaqm0xOFsMqSp2AFz/AD2W/VEbU9hFVMzn1U1/3kQDgLtaFnWuA0VmZZBpl5e6bh2KMTQDi5vuVZtJ9lchLl5yX3s3KH+FOaOtjFV0r2xZOoY5nQSEX+BBY+uGrdgiLmQpO9phY/CG0/sdVdXJjgo994z/APagfQzmnR8GtDxV7eHYTCq7P57ZSlCD6Chf7m9oiCq9NVEw3Zjfecz63uYmKnRoGuYfYPhEZPpFG2/XFDb4r85JeL8LMP6zNMpcx2Yl2JOHab7RG4/J28BWeml/ZxiIQAm274iNu+Tv4Gs9LL+zjO9eqUk9l0yWuwQQQKiIIIIEIggggQsv7bp7tT+jmfWWKGGi89uE92p/RzPrLFCBiQhK3hlps/N53o1+80sOQYaaZPzef6NfvVLElCo2ke9XifcIj4kNI96vE+4RHxVCUR7Q4l1I2iG6LePplxcEiqhSCVCnaPdCmIa9kN/1Y/JcrlhvYjaBvI3ZiFKcgEbFcYWG47IbZfnJ4lPuaoZZJRZgIbDmQL8YampaO6c8nMsdhseBy/OEp8rCzLuJ9WsRDnG7PAzkfREk7o9Zv/l//UWXsVq+Tnk7DLIYAlSVBUmzLYggXa4N+bFXpDzuIETOiG+dSQdTEof/AJEZP6objun8Oibj7q1mIbamHKY60WhVVZpKUOUpKpp6ZdynBZji5yAci7cL32DETEfTdtuoU4Z1MpIJBwkqbjIixvY9EOtB11hgbWLg6tWo68rccjnsBhXTGhJNTczFOK3hEF5qgZXwnw8sWIKt3RLWB3eah2kzuuNfNegiWcsMwJjQjvzTyl7aVO+TBlPUR6yVPsh//wDmlO4ymoPOxJ7XAHtjI+yDsamUwDnC8lu8mocUl92euW30W9ZiHW67SvA5GGS9+M1myLDGLPTofUrbKjS6sLrdulSrD2AxA1+kwfGYcQnxURmqzG16+kZH1jOFhpGYP9x+s4h/NeKEOOJTjbe1go3r7qxVdYD4/wDKvwiIqqj6Q/htDKZVudeBurCfZlDZ5h2oRwN4sGpSPbC/EJUte/D4iNr+Tv4Cs9LL+zjDZD3J4fFY3L5O/gKz0sv7ONAJBciI686a16CCCJWaIIIIEIggggQsq7ch7tT+jmfWWKApi+9uXw9P6OZ9ZYoAMWCEpeGul/8ATz/Rr96pYcCG2lj83n+iX71SwFCpOkO9XifcIj4f6Q71eJ9whiIqhLSgTYAXvlbaeHTD9FMtsMxMxkQRq3gjYwh7S6EnJLSpA77nKNRw7CGGpssof1GCrTXhmjK5yxW8Vhsb/OiOpZ7I8tvYOxaDmPXd7qDKd00PfYy2pjQVGBsB50txYdKnxeOu3XDaposDMmtSMSHev4iG+aky3BGfWDEnTtyicmT3ROch3n8Dt6Y1aWxW3CKjD1b6jasCC0981G1IxKH2jmNx2Hrgqswj7xhPnL+ULkC+eSvzWHksDl6jCEsHC6HWOcOK5N7PdC7mknf5ioPEVVwVxSnNesfGHzzsEyW/ksrfwm/wiNknPrB9eUOqs5jq95izHA2d7SoNHghaFWHBPOHxjiW+rEbBb/R5yoeh3MTdHVgqCCQLYgfGS2RNtrLazLtA3iK1pB8ciRNOppSY/Nw4ZnqDMf3IX0VWtiAY2aYSL+TUoBcdAmLgfibR40z+WHDEUPDFe4m0urg6R3E173Eqyu73YIE5RhebJaxk1KHxlvlc79RORtmYpelexaVPxPRdzmLfHSzLjCRrwk5rwOWY1C0WbGrqoJwKW5j7aecfF9Gx2atmorZpVSuWbA55CslgYXFwHHinZiU522jMZG4NoNqc3OneIzGpxbnSSVjWVrjdcK8jwPoablmE0NLYo6lXBsVa4I64UlzgdefsP5xdK6olzj+j10sJNF8M0ZA9OK2Q6bW3gRV9MaAm05OXKS9d9oG+3xGUdRkVrvCaHLQ7Qc+i5b4ERgLmG80Y6t/qGI34JsJanbY+qPjSWGo/CEJTX703+idfUYVWow3zII2GNZLARGOScljja+xf6hG5fJ28BWell/ZxhNE12c7xf+YRu3yd/AVnpZf2caJMmZmteggggUIggggQiCCCBCyftznu9N6OZ9ZYz9Yv3bpPd6b0cz6yxnymJCErDfSv+nn+iX71SQqDCGk/AT/RL96pIkoVLr+9XifcIddj2gplWzLLF8C4jmATsAF9Z/Aw1rdS8T7hDvR9XMkDm5Z3PHZqzBjWzMa54v8A05omBj5yT6k0hPo2aW63S9mlsCBnxzU9O3ph/UUaThy1O1nAuVPfAdIHfL0jP3Q5ldlEmoUS6uXjtkHuBMXhMyvwa19t4Zz9AzJfdqOZyyDMgXExOMvWOI17rR2WC4KeJmzEbRn671e7fbIeIDLBw/GsptnkE2mYagYH5k5RkTtG4naNzbPfEAtLbC2TKcr7Og9BibWql1WT9znDU2wnptqPTq3wjVysfcpwwzFHMfYRsB6PXbZcRWMwRJPaa5H9Ww6O896wO2o1773pKcRMGPfk43NqDfA9RhpNOFlmdTdNhb2rf1R8kzWlOVYdDA+MvxhxUSwQRe4YZH3Hq1QsXX2zzHn36qspKOmphYruuPiD6s4UqmyHAe+E5+YU7bYTxXL3EeqOZrXA4QqDIOCsr/olw+j0JzEt3VvNLG/8kyI2nBJ5ImzPzL3thqZF+TYHZi5wv9NYc9gzB6efKPlBup0w/wBERtUCcr2LLiB2idJPJueOSnqjzoEo0Rm2fOv54L1kM37JDdjSXKnXD+5Wmi0mHQTmHMe8uoW2SuBm2HcQcVtxI2CHFRT8php5j2mLdqWfrLC1yhPjEC1x4ygHWLxXaLSKrMWc+UmrGGcP+Ocp5zdTHFwZomElYsVFNNmQ4pLA5jDmAp3r3y9FxCr4dx0xTPdKk9t3AjNsqLVkQRmSJ8QkNJjFp4jPIyqkpsxai9NVqEnLqa+vyWD7jsbqOeuDeonUJ5KaDMk3sNhXh5J6NRidqF/S1MmaQlXJFwwHfKfHA2o2pl2HqiMkaSDXpasYWXmhjzrA6rnxpZ2HZ7QxBMgRKYxLdP3M2Z05LKIZkOJuuwa/b+h46S4hRdfoqXNUzZDcbZWP0h4p6R+cV2pmOOY+zrPr3RNV9DMo5oMtrA7L3BH9SxBVBJYkm5JJPSTHUgmbaGYy1XFtoAfItuu+4D6d43pTR2tvN/qEbz8nbwFZ6WX9nGD6O1t5v9QjePk7eBrPSy/s41SK16CCCBCIIIIEIggggQsj7dZ7vTejmfWWM+Uxf+3ce703o5n1kjPkMSEJUGENJHuE/wBEv3qkhaENJeAn+iX71SRJQqhPW+DK/OOW8ACJkaalPlOlA9JujD94flEPMnFMLDXc79w3R9Okr98oPGx/Aw1ZoohgydKeyYIUTIwUs+ipEzOTPwHyZmQ4couXrvDdpVVSkNZgBqZTdepl1esQwE2Xe4BU71NvYfxh3TaQmJ3k3LcwIHsyPXG99s7wodWn/EyU3mnES3d/lP30jIqfDrhmf8yABuLILB+IsY5mqypaZadI2TE1oeka0PQR+MNnqJUzwkkA+XKIB42F1PqEElXQ4pE6+yzcxrbs+aw6Dl0Re+ZzzOO3e00PDmpJvY1258deK+1MsFQGbEupJo8W/isN3/sdLSQ5UmW/VuuencYcmetzdeQc6+b3J+MvZfetx9EQ3qZVxYiwztY4gPNbxl+icxGb3Am8Me+PPqs7uSRqRr6c+sa4bE5CHWO4z74a/pDUD/nRDMwq45qZK1dr+otNmJ5Uu/8AAw+DGFNMLhabb/bmJOHSswYZntBMQ/YlPw1Uv6WJf4lNvbaLBp0DlkY6nDyW4MLj23jiRxdtU9W+X4mvUfDzfsBE8HS5+xIPBR1EmMzKU/7nPl9E1B/UuUSVDUGoprgkVFJa58Yyh3jcUOR6B0xW2ZlVSDz5TW/eTV/nTErNruQnyq6UOZNuWXpOU1Pjxi8WEftxxG8Yj+5qTZFl4/00I/Y4/wCDuQKn50w1UpamUQlRKPO3K+242y3H+ZGIzTNbInyOUY8lOQlcPjK+0dKHX+cJ1VcKepL0rLMR173xcLC4RrbVPXa19sQVRIZ2LzHGI9XVwgs1jJcHCYAkW6ieLZaK0e3hrCyU3Gjv0mX0ux+obMeS4qKzFYXLWFhe9gNwvshoFub6ocmUg8Ynh+ccEoPFvxz/ACjsshBq4T3lxXNOAGaxvzfiI3T5O/gaz0sv7OMOSYCTbYv9SxuPydvAVnpZf2cYPEnFAWvQQQRVSiCCCBCIIIIELIO3d/qKb0c36yRniGNB7eH+opfRzPrLGeoYkISohLSPgJ/oV+9UkKAwlXeBn+hX73RxJQqvyRYZLitfbbdB+iH/AI29hhOYchnbM/CE+U+n74ahFl0THkqGc04FCPIf+H846SlI1Fx+60ICf9NvUY7Wf0zPYPjGw+Sft8lXxJ0uPaEfz5Zv6wAY65u2QQd8uaR7HDQirMf+T+L8Icqp2kji0ZvZBymOfqmIbohxkd4H8rnmWtjcDc8u49aH24YT/Q/ImJn4uIAHqfD7BCrOo1t7b/CPiKWuVRiBrJ5qjizGw64wLT9pPGS08B+oDgT7lM58iYuZQjpF2X17oYzDFqpdEMbMSBfVhuSeBNr8bW6YV0xRypLyZLSgzOuOZc3ZcXg1DbDYE/vCMDGBddFTs2Yq7rKQ29gKY7evMKqUUzDNRvJdT6iIt3ZG45O9wDiuLka1N/xhrV9jzYRMkMjq1rKwQE31ANYAnPUbHdiiCec6MVZMLDWCCpHEZWips8OK9r70iNi2g2t9mgxIJbMO24JWpnguxUEhwDkDk0fEmzcHJhWKhsQGEnM9X+Xj6tcdWr95h+IhZagnViPBg3uhxkGENTy9SkHxYhJMwJznjnjkkOSnnxH9REfP0Cd5B9g98LPUHyiPOuPfCZmtssesQxKFne6egWJvbEkaCbtFutfxg/Vz9HWRH0z38g+wwmak7VPqih+Rt74I8SUl0xS5JGq2RvtEbh8nXwFZ6WX9nGHSp17jo+Ijcfk6+ArPSy/s4Uilt7w4LQTlVa/BBBGalEEEECEQQQQIWO9vH/UUvopv1kjPEMaD29WtUUnTLm+xk/GM7ltEhCXhOt8DUehH3ujjrFCVa/cZ/TJA4fOqQ59GXtESUKsTFFhfefhHIVd0fXOQyvmfhAoJjeGJtVCV2lvJjvlTst1Zx8kSSxsoLn6OduvUOuHfIInhJgB8iXZ36271fbFjFYymegqeQWjYT3CYoNTQcz/OxNgHO2w3k4R7IdjRRAxTXEtTndrqTwSxmNxC26Y6p6xybU8sJsL3xP1zW73goEPJej5MrulS3KOc8Jvdj5pzbiYXjW25SUjoKu5YDjPcnbP8PMbxAzaMXGbWjji7gAudGUav4CTiG2bOuqDpEsG562I3iJKWigrhPLPnhdgoRcPfGXKyRVG17WHTqjh502ayy8F2YXSQDkF8uc48Qbol6HRzE2AZsRsWKECYVzLYbc2Qnip4zWvfOOTFjPeZxDTT3PoABouxCs8Kz+GHV2pAEtwOB5uFJkYGR0Do8XM2ZmFGJib55AjXmMrGxzthuM7Jm2n68zal521nuOgDvR6gI1TsjYyaQy0VizDcSTvJO0knM7TeMlm0M0nwMzWfEfVq3Q18KZfgvtLvuN1o/a3E8Seg0XM+KRJObDB1cfIeqs2j9JckwVudJnriUZZM1sa2bLPEGsebz7HK5D+toxMUDkxPUglZd2WZhU2Y081uddfGkPcqQRmM4hNH0MybSmUZTh5bHBdGGvFMXXrv3ZeLS4caLnzMJWZKmsuTMAGDc0WE2W1spyb/ABltfMRaICKhVgRJ0OHdNOijX0HjBalfllHfS2AScnFDkeIiI5NbkMMLDWDzSPXl7ou+kqMM6GZM5Ke2cmrUFFnblmjLDM9/sMdX1S4uR0lIwv4s9BYkbyF74dI61vFYNsfgRe2fdLyO3AjMIi2RhrO7t+3cam7sxaRgVXcLjvZhHQxK++6n1xzMdh36KeK2/mWJau7H5stcclxOlHUVswPVqPVn0REpUAZZoduHV1odUdKFHhRRNju+KQjWeLBMojd2h3FcCcvkEeax+Mfca7JhHnC/thUoGzwq3SvNPWIQMpdjWO5hYxqQ4aHp+FiJJVdvOUi2ziI2/wCTr4Cs9LL+zjDJUore42evMRufydfAVnpZf2cKxZ3qhXC1+CCCM1KIIIIEIggggQqF22exWZWSEmSFxTpBYhdrowGJR9LmqRwI2xhM2pEtisy8thrVxhYHpU5jrEes44ZAdYB6okIXk39ZS/LHrEdJpOVmrOMDqyPaxIVhkwG0qwVgN6iPWHJL5I9Qg5JfJHqEE0Lx5Po3TOwdTqdOejdIYauBsRtENyb7PZ+Uey1QDUAOAjuImULxuap7Ybm24AAewQ32Wtl5v5R7QggFMFJJOK8cS9ITV71iANVlGXshMVj4seI4t5Fz7RHsuCK3G6K/zolBeNMKmnVeNpGlpsvFgmshcgsQcLMR9Mc72w8TsurQbitmgm3j31atcevCI+wXW6Kt92pXkGp7K6x++rJx4TCv1bQh+v6j9sn/AP3zf7o9iwRbYoJJqV4+l9kVSt7Vk7PI92c6iG2nLMDV+MfD2Q1N7/pk6+vw0zXr1Xyj2FBAomvHU/Tk91ZHns6sbsHOP617dVo5n6YmPLEp5uNFtZWwta2qxIuPXHsXCN0fbRW43Tb3tV77pSmefHzXjai0k8q/JzMGLWBax4qcjHFRV4zd2Vjvst/YI9mWgtEyE5yqovuu3ZmWmXLBeLw667r7I6eeDrKnjhj2daPmEbotM4Kq8daNopk9xKkS2mMTkstcXrtqHSco9Ldq7sWbR9EJcwgzpjGbNtmAxAAUHbYADjeLgBH2IQiCCCBCIIIIEIggggQiCCCBCIIIIEIggggQiCCCBCIIIIEIggggQiCCCBCIIIIEIggggQiCCCBCIIIIEIggggQiCCCBCIIIIEL/2Q=="
                        alt="">
                    <div class="flex flex-col gap-2 flex-1">
                        <h3 class="text-lg font-semibold text-gray-600">
                            iPad Pro 12.9-inch M1
                        </h3>
                        <p class="text-sm text-gray-400">Apple</p>
                        <div class="flex gap-4">
                            <p class="text-gray-700 font-semibold">$1,044.99</p>
                            <p class="text-gray-400  line-through">$1,099.99</p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </section>
    <!-- top rate -->

    <!-- blog -->
    <section class="section bg-white">
        <div class="container">
            <div class="flex justify-between">
                <h2 class="text-2xl font-bold text-gray-600 bg-white">Blog</h2>
                <div class="flex gap-4 items-center">
                    <a href="#">All Blog</a>
                    <i class="fa-solid fa-angles-right"></i>
                </div>
            </div>
            <p class="text-gray-400 text-sm pt-2 pb-5">Stay updated with the latest news, trends, and insights from the
                world of technology. Discover the latest gadgets, innovations, and technology advancements that are
                shaping the digital landscape.</p>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div class="w-full rounded relative">
                    <img class="w-full aspect-[6/5]" src="https://picsum.photos/200/300?1" alt="">
                    <div class="p-3 bg-black/50 absolute top-3 right-3 text-white text-center">
                        <p class="font-bold text-xl">30</p>
                        <p>Nov</p>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-600 pt-4">
                        Top 10 sản phẩm công nghệ mới nhất năm 2024
                    </h3>
                    <div class="flex gap-2 items-center pt-3 text-gray-500">
                        <a href="#" class="text-sm font-medium">Read More</a>
                        <i class="fa-solid fa-angles-right text-[12px]"></i>
                    </div>
                </div>

                <div class="w-full rounded relative">
                    <img class="w-full aspect-[6/5]" src="https://picsum.photos/200/300?2" alt="">
                    <div class="p-3 bg-black/50 absolute top-3 right-3 text-white text-center">
                        <p class="font-bold text-xl">15</p>
                        <p>Dec</p>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-600 pt-4">
                        Công nghệ AI trong năm 2024
                    </h3>
                    <div class="flex gap-2 items-center pt-3 text-gray-500">
                        <a href="#" class="text-sm font-medium">Read More</a>
                        <i class="fa-solid fa-angles-right text-[12px]"></i>
                    </div>
                </div>

                <div class="w-full rounded relative">
                    <img class="w-full aspect-[6/5]" src="https://picsum.photos/200/300?3" alt="">
                    <div class="p-3 bg-black/50 absolute top-3 right-3 text-white text-center">
                        <p class="font-bold text-xl">05</p>
                        <p>Jan</p>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-600 pt-4">
                        Những tiến bộ trong công nghệ di động 2024
                    </h3>
                    <div class="flex gap-2 items-center pt-3 text-gray-500">
                        <a href="#" class="text-sm font-medium">Read More</a>
                        <i class="fa-solid fa-angles-right text-[12px]"></i>
                    </div>
                </div>

                <div class="w-full rounded relative">
                    <img class="w-full aspect-[6/5]" src="https://picsum.photos/200/300?4" alt="">
                    <div class="p-3 bg-black/50 absolute top-3 right-3 text-white text-center">
                        <p class="font-bold text-xl">20</p>
                        <p>Feb</p>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-600 pt-4">
                        Công nghệ blockchain và ứng dụng năm 2024
                    </h3>
                    <div class="flex gap-2 items-center pt-3 text-gray-500">
                        <a href="#" class="text-sm font-medium">Read More</a>
                        <i class="fa-solid fa-angles-right text-[12px]"></i>
                    </div>
                </div>




            </div>
        </div>
    </section>
    <!-- blog -->
</main>
<div class="app-loading">
${this.state.isLoadding ? new AppLoading().html : ''}
</div>
<!-- main -->
        `;
    };

    protected renderUI(): void {
        super.renderUI();
        this.renderSectionHotSale();
        this.renderCategorySection();
        this.renderProductSection();
    }

    private renderSectionHotSale() {
        this.renderComponent('#section-hot-sale', new HomeSectionHotSale());
    }

    private renderCategorySection() {
        this.renderComponent('#category-section', new HomeCategory());
    }

    private renderProductSection() {
        this.renderComponent('#product-section', new HomeProductSection());
    }
}

export default Home;
