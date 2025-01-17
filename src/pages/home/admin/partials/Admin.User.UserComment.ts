import commentService from '../../../../api/commentService';
import QBComponent from '../../../../lib/QBComponent';
import { date } from '../../../../util/date';
import { toImage } from '../../../../util/image';
import toast from '../../../../util/toast';
import { IProductComment } from '../../../product-detail/partials/ProductDetaiTapContent';

interface AdminUserCommentItemState {
    isShow: boolean;
}
class AdminUserCommentItem extends QBComponent<
    IProductComment,
    AdminUserCommentItemState
> {
    constructor(props: IProductComment) {
        super(props);
        this.state = {
            isShow: props.isShow,
        };
    }
    protected markup: () => string = () => {
        return /*html*/ `
            <div class="flex flex-col space-y-2 py-2 round border-b w-full">
                <div class="flex space-x-2 w-full">
                    <div class="bg-gray-300 size-12 rounded-full">
                    ${
                        this.props.userId.avatar
                            ? `<img src="${toImage(this.props.userId.avatar)}"
                    class="w-full aspect-[1/1] object-cover rounded-full border border-gray-300" alt="">`
                            : `<img src="https://ui-avatars.com/api/?name=${this.props.userId.username}&size=200"
                    class="w-fullaspect-[1/1] object-cover rounded-full " alt="">`
                    }
                    </div>
                    <div class="flex flex-col space-y-1 ">
                        <div class="text-gray-700 font-semibold">
                            ${this.props.userId.username}
                        </div>
                        <div class="text-gray-500 text-sm">
                           ${date(this.props.createdAt)}
                        </div>
                    </div>
                    <div class="ml-auto flex items-center gap-3">
                        <a href="/product-detail/${
                            this.props.productId._id
                        }?scroll=${
            this.props._id
        }" class="bg-blue-100 text-blue-600 px-2 rounded flex items-center gap-1 text-sm hover:bg-blue-200" 
                        target="_blank" rel="noopener noreferrer"
                        > <i class="fa-solid fa-pager"></i> View</a>
                        ${
                            this.state.isShow
                                ? /*html*/ `
                            <button class="bg-red-100 text-red-600 px-2 rounded flex items-center gap-1 text-sm hover:bg-red-200 btn-active"> <i class="fa-solid fa-eye-slash"></i> Hide</button>
                            `
                                : /*html*/ `
                                <button class="bg-green-100 text-green-600 px-2 rounded flex items-center gap-1 text-sm hover:bg-green-200 btn-active"> <i class="fa-solid fa-eye"></i> Show</button>
                                `
                        }
                    </div>
                </div>
                 <div class="text-gray-700 text-sm ">
                   Rating: ${
                       this.props.rating
                   } <i class="fa-solid fa-star text-yellow-400"></i>
                </div>
                <div class="text-gray-700 text-sm ${
                    !this.state.isShow ? 'text-gray-300' : ''
                }">
                    ${this.props.comment}
                </div>
                <div class="pt-2 grid grid-cols-3 gap-2 w-[250px] ${
                    !this.state.isShow ? 'opacity-50' : ''
                }">
                  ${this.props.images
                      ?.map((image) => {
                          return /*html*/ ` <img src="${toImage(
                              image
                          )}" class="w-full h-full object-cover comment-image" alt="">`;
                      })
                      .join('')}
                </div>
        `;
    };

    protected addEventListener(): void {
        this.signEvent('.btn-active', 'click', async () => {
            const isShow = !this.state.isShow;
            const res = await commentService.changeStatus(
                this.props._id,
                isShow
            );
            if (res) {
                this.setState({ isShow: isShow });
                toast.success('Update success');
            } else {
                toast.error('Update failed');
            }
        });
    }
}
interface AdminUserTabProps {
    userId: string;
}
interface AdminUserTabState {
    lsComment: IProductComment[];
}
class AdminUserComments extends QBComponent<
    AdminUserTabProps,
    AdminUserTabState
> {
    constructor(props: AdminUserTabProps) {
        super(props);

        this.state = {
            lsComment: [],
        };
    }
    protected markup: () => string = () => {
        if (this.state.lsComment.length === 0) {
            return /*html*/ `
             <div class=" w-full py-16 flex justify-center items-center border boreder-gray-200 rounded-lg bg-white">
                <p class="text-lg text-gray-500">
                    No comment
                </p>
            </div>
            `;
        }
        return /*html*/ `
        <div id="list-items"></div>
        `;
    };

    protected renderUI(): void {
        super.renderUI();
        this.renderList(
            '#list-items',
            this.state.lsComment,
            AdminUserCommentItem
        );
    }

    protected async afterRender(): Promise<void> {
        const userId = this.props.userId;
        const lsComment = await commentService.getCmtByUserId(userId);

        this.setState({ lsComment });
    }
}

export default AdminUserComments;
