import categoryService from '../api/categoryService';

class categoryReducer {
    data: Category[] = [];
    get getData() {
        return this.data;
    }
    async setCategory() {
        try {
            const data = await categoryService.getCategory();
            this.data = data;
        } catch (error) {
            console.log(error);
        }
    }

    getCategoryId(name: string) {
        const cate = this.data.find((item) => item.name == name);
        if (cate) {
            return cate._id;
        }
    }
}

export default new categoryReducer();
