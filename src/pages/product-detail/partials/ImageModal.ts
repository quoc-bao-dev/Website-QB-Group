import signal from '../../../lib/listener';
import QBComponent from '../../../lib/QBComponent';
import ImageCommentReduce from '../../../store/ImageCommentReduce';
import { extractFileName, toImage } from '../../../util/image';

class ImageModal extends QBComponent {
    constructor() {
        super(null);
        signal.on(
            'open-image-modal',
            this.showModal.bind(this),
            'open-image-modal'
        );
        signal.on(
            'change-image',
            () => {
                this.reRender();
            },
            'change-image'
        );
    }
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="fixed inset-0 bg-black/50 z-50 grid place-items-center image-modal ${
            ImageCommentReduce.getIsShow ? 'show' : ''
        }" id="modal">
        <div class="flex flex-col gap-5">
            <img class="max-h-[70vh] max-w-[90vw] object-contain" src="${toImage(
                ImageCommentReduce.getCurImage
            )}" alt="">
        <div class="flex items-center justify-center">
            ${ImageCommentReduce.getListImage
                .map((image, index) => {
                    return /*html*/ `<img class="max-w-[120px] max-h-[120px] object-contain cursor-pointer m-2 image-item ${
                        index == ImageCommentReduce.curIndex
                            ? 'border-2 border-blue-300'
                            : ''
                    }" src="${toImage(image)}" alt="" />`;
                })
                .join('')}
        </div>
        </div>
        <div class='flex items-center justify-between px-8 absolute top-50 translate-y-[-50%] left-0 w-full '>
        <i class="fa-solid fa-arrow-left text-white text-3xl cursor-pointer"></i>
        <i class="fa-solid fa-arrow-right text-white text-3xl cursor-pointer"></i>
        </div>
    </div>
        `;
    };

    protected addEventListener(): void {
        this.signEvent('#modal', 'click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeModal();
            }
        });

        this.signEvent('.fa-arrow-left', 'click', () => {
            ImageCommentReduce.prevImage();
        });
        this.signEvent('.fa-arrow-right', 'click', () => {
            ImageCommentReduce.nextImage();
        });

        this.signEventAll('.image-item', 'click', (e) => {
            const image = (e.target as HTMLImageElement).src;
            const fileName = extractFileName(image);
            if (fileName) ImageCommentReduce.setCurIamge(fileName);
        });
    }

    private closeModal = () => {
        ImageCommentReduce.setShow(false);
        document.getElementById('modal')?.classList.remove('show');
    };

    private showModal = () => {
        ImageCommentReduce.setShow(true);
        document.getElementById('modal')?.classList.add('show');
    };
}

export default ImageModal;
