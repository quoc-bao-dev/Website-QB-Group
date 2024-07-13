import QBComponent from '../../../lib/QBComponent';

class TabDetails extends QBComponent {
    markup = () => {
        return /*html*/ `
            <div class="prose prose-lg max-w-none">
                <p>iPhone 13 is the latest addition to the iPhone lineup, and it's packed with features that make it one of the best smartphones on the market. With a powerful A15 Bionic chip, a quad-camera system, and incredible performance, it's no wonder that it's one of the most anticipated smartphones of the year. In this blog post, we'll take a closer look at what makes the iPhone 13 so great.</p>
                <h2>Design</h2>
                <p>The iPhone 13 has a stunning design that sets it apart from other smartphones on the market. With a sleek and durable design, it's easy to take with you wherever you go. The device is available in a range of colors, including black, silver, gold, and blue.</p>
                <h2>Display</h2>
                <p>The iPhone 13 has a 6.7-inch Super Retina XDR display with 120Hz refresh rate and HDR10+. This means that you'll get a stunning and vibrant display that is perfect for watching movies, playing games, and scrolling through social media.</p>
                <h2>Camera</h2>
                <p>The iPhone 13 has a quad-camera system that includes a wide-angle camera, ultra-wide camera, and telephoto camera. This means that you'll be able to capture stunning photos and videos with incredible clarity and detail. The camera also supports 4K video recording and has a feature called "ProRes" that allows you to record video in lossless format.</p>
                <h2>Performance</h2>
                <p>The iPhone 13 is powered by a powerful A15 Bionic chip that is designed to deliver incredible performance. With support for up to 16 cores and up to 16GB of RAM, you'll be able to multitask and run complex apps with ease. The device also has support for 5G connectivity, which means that you'll be able to enjoy fast and reliable data speeds.</p>
                <h2>Storage</h2>
                <p>The iPhone 13 is available with up to 1TB of storage. This means that you'll have plenty of space to store your photos, videos, music, and apps. You can also expand the storage capacity by adding a microSD card.</p>
                <h2>Battery</h2>
                <p>The iPhone 13 has a large 3566mAh battery that provides up to 10 hours of battery life. This means that you'll be able to enjoy all day with your device without needing to recharge it. The battery also supports fast charging and wireless charging.</p>
                <h2>Software</h2>
                <p>The iPhone 13 runs on iOS 15, which means that you'll have access to all of the latest features and improvements. This includes support for ARKit 4, Face ID 2, and a range of other updates and improvements.</p>
                <h2>Conclusion</h2>
                <p>The iPhone 13 is one of the best smartphones on the market, and it's easy to see why. With its powerful hardware, stunning design, and incredible performance, it's the perfect device for anyone who wants to enjoy the latest technology.</p>
            </div>
        <div class="grid grid-cols-1 gap-5">
            <div class="bg-white rounded-lg p-5 shadow">
                <h2 class="text-lg font-semibold mb-3">Apple iPhone 13 Pro</h2>
                <p class="text-gray-500">The fastest and most powerful smartphone ever made, with a powerful A15 Bionic chip, a quad-camera system, and incredible performance.</p>
                <ul class="list-disc list-inside mt-3">
                    <li>Dimensions: 158.6 x 76.2 x 8.9 mm</li>
                    <li>Display: 6.7-inch Super Retina XDR display with 120Hz refresh rate and HDR10+</li>
                    <li>Rear Camera: Triple cameras: Wide-angle camera, Ultra-wide camera, and Telephoto camera</li>
                    <li>Battery: 3566mAh</li>
                    <li>Storage: Up to 1TB</li>
                    <li>Operating System: iOS 15</li>
                </ul>
                <div class="flex justify-between items-center mt-5">
                    <p class="text-gray-600">$1,049.00</p>
                    <button class="bg-blue-500 text-white py-2 px-5 rounded">Buy Now</button>
                </div>
            </div>
        </div>
        `;
    };
}
class TabComments extends QBComponent {
    markup = () => {
        return /*html*/ `
        <div class="pt-3">
            <div class="border border-gray-200 py-2 px-5 rounded">
                <div class="flex items-center gap-3">
                    <img class="w-[40px] h-[40px] object-cover rounded-full"
                        src="https://picsum.photos/200/300" alt="">
                    <div class="">
                        <div class="flex items-center gap-2">
                            <p class="text-gray-700 font-semibold">Lorem, ipsum.</p>
                            <p>(5 <i class="fa-solid fa-star text-yellow-400"></i>)</p>
                        </div>
                        <p class="text-gray-400">20/02/2022</p>
                    </div>
                </div>
                <div class="h-[1px] w-full bg-gray-200 my-2"></div>
                <div class="pt-1">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi facilis quia
                    dicta quas nobis optio, magni labore obcaecati distinctio blanditiis. Recusandae
                    a doloremque aut amet consequuntur. Voluptas laudantium alias rerum!
                </div>
            </div>
        </div>
        <div class="pt-5">
            <p class="text-gray-600 font-semibold pb-3">Write your comment</p>
            <div class="border border-gray-200 py-2 px-5 rounded">
                <div class="flex items-center gap-3">
                    <img class="w-[40px] h-[40px] object-cover rounded-full"
                        src="https://picsum.photos/200/300" alt="">
                    <div class="">
                        <div class="flex items-center gap-2">
                            <p class="text-gray-700 font-semibold">Lorem, ipsum.</p>
                        </div>
                        <select class="py-0 mt-1" name="rate" id="">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div class="flex items-center gap-3 pt-3">
                    <input type="text" name="" id="" class="flex-1 border border-gray-200 rounded">
                    <i class="fa-solid fa-paper-plane text-blue-900"></i>
                </div>
            </div>
        </div>
        `;
    };
}
class ProductDetaiWrap extends QBComponent<{ choose?: chooseTab }> {
    markup = () => {
        return /*html*/ `
        <div class="pt-5">
                        <div class="flex gap-2">
                            <div class="tab-comment py-2 px-3 text-blue-900  border-b-2 ${
                                this.props.choose == 'comment' ? 'border-blue-900' : 'border-gray-200'
                            } hover:bg-gray-200">
                                Comment
                            </div>
                            <div class="tab-detail py-2 px-3 text-blue-900  border-b-2 ${
                                this.props.choose == 'detail' ? 'border-blue-900' : 'border-gray-200'
                            } hover:bg-gray-200">
                                Detail
                            </div>
                        </div>
                       <div class= "contents" id="tab-content"></div>
                    </div>
        `;
    };
}

type chooseTab = 'detail' | 'comment';
interface ProductTapState {
    tab: chooseTab;
}

class ProductDetailTab extends QBComponent<{}, ProductTapState> {
    constructor() {
        super(null);
        this.state = {
            tab: 'comment',
        };
    }

    markup = () => {
        return new ProductDetaiWrap({
            choose: this.state.tab,
        }).html;
    };

    protected renderUI(): void {
        super.renderUI();
        if (this.state.tab == 'comment') {
            this.renderComment();
        }
        if (this.state.tab == 'detail') {
            this.renderDetail();
        }
    }

    private renderComment() {
        this.renderComponent('#tab-content', new TabComments());
    }
    private renderDetail() {
        this.renderComponent('#tab-content', new TabDetails());
    }

    // event
    protected addEventListener(): void {
        this.eventChooseTab();
    }
    private eventChooseTab() {
        this.signEvent('.tab-detail', 'click', () => {
            this.setState({ tab: 'detail' });
        });
        this.signEvent('.tab-comment', 'click', () => {
            this.setState({ tab: 'comment' });
        });
    }
}

export default ProductDetailTab;
