import signal from '../lib/listener';

class imageCmtReducer {
    listImage: string[] = [];
    curIndex: number = 0;
    isShow: boolean = false;

    get getListImage() {
        return this.listImage;
    }

    get getCurIndex() {
        return this.curIndex;
    }

    get getIsShow() {
        return this.isShow;
    }

    get getCurImage() {
        return this.listImage[this.curIndex];
    }

    setShow(isShow: boolean) {
        this.isShow = isShow;
    }

    setImageList(imageList: string[]) {
        this.listImage = imageList;
    }

    nextImage() {
        if (this.curIndex === this.listImage.length - 1) {
            this.curIndex = 0;
        } else {
            this.curIndex++;
        }
        signal.emit('change-image');
    }

    prevImage() {
        if (this.curIndex === 0) {
            this.curIndex = this.listImage.length - 1;
        } else {
            this.curIndex--;
        }
        signal.emit('change-image');
    }

    setCurIamge(image: string) {
        this.curIndex = this.listImage.findIndex((item) => item === image);
        signal.emit('change-image');
    }
}

export default new imageCmtReducer();
