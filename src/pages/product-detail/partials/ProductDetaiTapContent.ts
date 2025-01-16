import commentService from '../../../api/commentService';
import Star from '../../../components/common/Start';
import { Product } from '../../../interface/product';
import signal from '../../../lib/listener';
import QBComponent from '../../../lib/QBComponent';
import QBRouter from '../../../lib/QBRouter';
import ImageCommentReduce from '../../../store/ImageCommentReduce';
import userReducer from '../../../store/userReducer';
import { date } from '../../../util/date';
import toast from '../../../util/toast';
import { IUser } from './../../../interface/user';

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

export interface IProductComment {
    productId: Product;
    userId: IUser;
    rating: number;
    comment: string;
    images?: string[];
    _id: string;
    createdAt: string;
    updatedAt: string;
    isShow: boolean;
}
interface TabCommentsState {
    lsComment: IProductComment[];
    lsImageCmt: string[];
    fileLoadding: number;
    files: File[];
    rate: number;
    cmtInput: string;
}

class CommentItem extends QBComponent<IProductComment> {
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="border border-gray-200 pt-2 pb-4 px-5 rounded" id="cmt-${this.props._id}">
                <div class="flex items-center gap-3">
                    ${
                        typeof this.props.userId === 'object' && this.props.userId.avatar
                            ? /*html*/ `
                        <img class="w-[40px] h-[40px] object-cover rounded-full border border-gray-200"
                        src="${this.props.userId?.avatar}" alt="">
                        `
                            : `<div class="w-[40px] h-[40px] flex items-center justify-center bg-gray-200 text-xl rounded-full">${this.props.userId.fullName.slice(
                                  0,
                                  1
                              )}</div>`
                    }
                    <div class="">
                        <div class="flex items-center gap-2">
                            <p class="text-gray-700 font-semibold">${this.props.userId?.fullName}</p>
                            <p>(${this.props.rating} <i class="fa-solid fa-star text-yellow-400"></i>)</p>
                        </div>
                        <p class="text-gray-400">${date(this.props.createdAt)}</p>
                    </div>
                </div>
                <div class="h-[1px] w-full bg-gray-200 my-2"></div>
                ${
                    this.props.images!?.length > 0
                        ? /*html*/ `
                    <div class="grid grid-cols-3 gap-2 pb-2">
                        ${this.props.images
                            ?.map((image) => {
                                return /*html*/ `
                            <img class="w-full h-full object-cover comment-image" src="${image}" alt="">
                            `;
                            })
                            .join('')}
                    </div>
                `
                        : ''
                }
                <div class="pt-1">
                    ${this.props.comment}
                </div>
                <div class="pt-2 flex item-center gap-4">
                    <div class="flex items-center gap-1 text-gray-900">
                        <p class="">0</p>
                        <i class="fa-regular fa-thumbs-up "></i> 
                    </div>
                    <div class="flex items-center gap-1 text-gray-900"> 
                        <p class="">0</p>
                        <i class="fa-regular fa-thumbs-down "></i>
                    </div>
                    <div class="flex items-center gap-1 text-gray-900">
                        <i class="fa-regular fa-comment"></i>
                        <p class="">Reply</p>
                    </div>
                </div>
            </div>
        `;
    };

    protected addEventListener(): void {
        this.eventShowImages();
    }

    private eventShowImages() {
        this.signEventAll('img.comment-image', 'click', (e) => {
            e.target;

            const image = (e.target as HTMLImageElement).src;

            ImageCommentReduce.setCurIamge(image);

            signal.emit('open-image-modal');
        });
    }
}

class ImageSkeleton extends QBComponent<{ fileLoadding: number }> {
    protected markup: () => string = () => {
        let html = '';
        for (let index = 0; index < this.props.fileLoadding; index++) {
            html += /*html*/ `
            <div class="w-[160px] h-[160px]  rounded-xl border border-gray-200 flex items-center justify-center bg-gray-100">
                                        <i class="fa-solid fa-spinner animate-spin"></i>
                                        ${index + 1}/${this.props.fileLoadding}
                                        </div>
            `;
        }
        return /*html*/ `${html}
                        `;
    };
}
class TabComments extends QBComponent<{}, TabCommentsState> {
    constructor() {
        super();
        this.state = {
            lsComment: [],
            lsImageCmt: [],
            fileLoadding: 0,
            files: [],
            rate: 5,
            cmtInput: '',
        };
    }
    markup = () => {
        return /*html*/ `
        <div class="pt-3">
            <div class = "flex flex-col gap-5" id="ls-comment"></div>
        </div>
        ${
            userReducer.getData?.userId
                ? /*html*/ `
            <div class="pt-5">
            <p class="text-gray-600 font-semibold pb-3">Write your comment</p>
            <div class="border border-gray-200 pt-2 pb-4 px-5 rounded">
                <div class="flex items-center gap-3">
                    ${
                        userReducer.getData?.image
                            ? `<img class="size-[48px] object-cover rounded-full border border-gray-200"
                        src="${userReducer.getData.image}" alt="">`
                            : `<div class="size-[48px] object-cover rounded-full bg-gray-200 flex items-center justify-center text-xl">${userReducer.getData?.username.charAt(
                                  1
                              )}</div>`
                    }
                    <div class="">
                        <div class="flex items-center gap-2">
                            <p class="text-gray-700 font-semibold">${userReducer.getData?.username}</p>
                        </div>
                        ${new Star(this.state.rate).html}
                        <select class="py-0 mt-1 border border-gray-200 rounded focus:ring-1 focus:ring-gray-300 outline-none" name="rate" id="rating-intput" >
                            <option value="1" ${this.state.rate === 1 ? 'selected' : ''}>1</option>
                            <option value="1.5" ${this.state.rate === 1.5 ? 'selected' : ''}>1.5</option>
                            <option value="2" ${this.state.rate === 2 ? 'selected' : ''}>2</option>
                            <option value="2.5" ${this.state.rate === 2.5 ? 'selected' : ''}>2.5</option>
                            <option value="3" ${this.state.rate === 3 ? 'selected' : ''}>3</option>
                            <option value="3.5" ${this.state.rate === 3.5 ? 'selected' : ''}>3.5</option>
                            <option value="4" ${this.state.rate === 4 ? 'selected' : ''}>4</option>
                            <option value="4.5" ${this.state.rate === 4.5 ? 'selected' : ''}>4.5</option>
                            <option value="5" ${this.state.rate === 5 ? 'selected' : ''}>5</option>
                        </select>
                    </div>
                </div>
                ${
                    this.state.lsImageCmt.length > 0
                        ? /*html*/ `<p class="text-gray-400 text-sm">Attached images</p>
                        <div class="flex items-center gap-3 pt-3  w-full">
                            <div class="flex items-center gap-3 flex-wrap w-full">
                                ${this.state.lsImageCmt
                                    .map((item, index) => {
                                        return /*html*/ `
                                        <div class="relative">
                                        <img class="w-[160px] h-[160px] object-cover rounded-xl border border-gray-200"
                                        src="${item}" alt="">
                                       <span class="absolute top-0 right-0 cursor-pointer text-red-500 bg-white/80 hover:text-red-700 hover:bg-white w-[30px] flex items-center justify-center rounded-full aspect-[1/1]" id="btn-delete-image-${index}">
                                         <i class="fa-solid fa-xmark cursor-pointer" ></i>
                                       </span>
                                        </div>
                                        `;
                                    })
                                    .join('')}
                                    ${new ImageSkeleton({ fileLoadding: this.state.fileLoadding }).html}
                            </div>
                            </div>
                        `
                        : this.state.fileLoadding > 0
                        ? /*html*/ `
                        <p class="text-gray-400 text-sm">Uploading ${this.state.fileLoadding}</p>
                        <div class="flex items-center gap-3 pt-3  w-full">
                            <div class="flex items-center gap-3 flex-wrap w-full">
                            ${new ImageSkeleton({ fileLoadding: this.state.fileLoadding }).html}
                            </div>
                            </div>
                        `
                        : ''
                }
                
                <div class="flex items-center gap-3 pt-3">
                    <input type="text" name="" id="comment-input" class="flex-1 border border-gray-200 rounded  focus:ring-1 focus:ring-gray-300" placeholder="Type your comment" value="${
                        this.state.cmtInput
                    }" /> 
                    <input type="file" multiple class="hidden" id="image-input" enctype="multipart/form-data"/>
                    <i class="fa-solid fa-image text-blue-900" id="btn-add-image"></i>
                    <i class="fa-solid fa-paper-plane text-blue-900" id="btn-comment"></i>
                </div>
            </div>
        </div>
            `
                : ''
        }
        `;
    };

    // UI
    protected renderUI(): void {
        super.renderUI();
        this.renderComments();
    }

    private renderComments() {
        this.renderList('#ls-comment', this.state.lsComment, CommentItem);
    }

    // event
    protected addEventListener(): void {
        this.signEvent('#btn-comment', 'click', this.comment);
        this.eventAddImage();
        this.signEvent('#rating-intput', 'change', () => {
            this.setState({ rate: Number((document.querySelector('#rating-intput') as HTMLInputElement).value) });
        });

        this.signEvent('#comment-input', 'keyup', (e: any) => {
            if (e.key === 'Enter') {
                this.comment();
            } else {
                this.state.cmtInput = (e.target as HTMLInputElement).value;
            }
        });
    }

    private eventAddImage() {
        this.signEvent('#btn-add-image', 'click', () => {
            this.node('#image-input')?.click();
        });

        //up files
        this.signEvent('#image-input', 'change', async (e) => {
            const files = (e.target as HTMLInputElement).files;
            if (!files) return;

            const lsImages = [] as string[];
            const readFileAsDataURL = (file: File): Promise<string> => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = (error) => reject(error);
                });
            };
            this.setState({ fileLoadding: files.length });

            for (let file of files) {
                this.state.files?.push(file);
                try {
                    const image = await readFileAsDataURL(file);
                    lsImages.push(image);
                } catch (error) {
                    console.error('Error reading file:', error);
                }
            }

            this.setState({ lsImageCmt: [...this.state.lsImageCmt, ...lsImages], fileLoadding: 0 });
        });

        // delete image
        this.signEventAll('[id^=btn-delete-image]', 'click', (e) => {
            const btn = (e.target as HTMLElement).closest('[id^=btn-delete-image]') as HTMLElement;
            const id = btn.id;

            const index = Number(id.replace('btn-delete-image-', ''));

            this.state.files = this.state.files?.filter((item, i) => {
                item;
                return i != index;
            });

            this.setState({
                lsImageCmt: this.state.lsImageCmt.filter((item, i) => {
                    item;
                    return i != index;
                }),
            });
        });
    }

    // api

    protected async afterRender(): Promise<void> {
        await this.setComment();
    }

    private async setComment() {
        const result = await commentService.getCmtByProductId(QBRouter.params.id);
        const lsImageCmts: (string | undefined)[] = (result as IProductComment[]).map((item) => item.images).flat();
        ImageCommentReduce.setImageList(lsImageCmts as string[]);
        this.setState({ lsComment: result });
        if (result) {
            signal.emit('comment-change', result);
        }
    }
    //support
    private comment = async () => {
        const userComment = {
            productId: QBRouter.params.id,
            userId: userReducer.getData?.userId,
            rating: (this.node('#rating-intput') as HTMLSelectElement)?.value,
            comment: (this.node('#comment-input') as HTMLInputElement)?.value,
            lsFileImages: this.state.files,
        };

        if (userComment.comment == '') {
            toast.error('Please enter your comment');
            return;
        }
        try {
            // add comment
            await commentService.addComment(userComment);
            const result = await commentService.getCmtByProductId(QBRouter.params.id);
            this.setState({ lsComment: result, lsImageCmt: [], fileLoadding: 0, files: [], cmtInput: '', rate: 5 });
            signal.emit('comment-change', result);
            toast.success('Add comment success');
            this.state.fileLoadding = 0;
            this.state.files = [];
        } catch (error) {
            toast.error('Add comment failed');
        }
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
