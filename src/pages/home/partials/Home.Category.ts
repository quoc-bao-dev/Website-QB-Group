import categoryService from '../../../api/categoryService';
import QBComponent from '../../../lib/QBComponent';

class CategoryItem extends QBComponent<Category> {
    constructor(props: Category) {
        super(props);
    }
    protected markup = () => {
        return /*html*/ `
        <div class="w-full aspect-[1/1] bg-white">
                    <div class="flex">
                        <img class="aspect-[1/1] w-8/12 p-4 text-center m-auto"
                            src="${this.props.image}"
                            alt="">
                    </div>
                    <h2 class="text-center  font-bold text-gray-600">${this.props.name}</h2>
                </div>`;
    };
}

interface HomeState {
    lsCategory: Category[];
}
class HomeCategory extends QBComponent<{}, HomeState> {
    protected markup: () => string = () => {
        return /*html*/ `
        <!-- category -->
    <section class="section  bg-gray-100">
        <div class="container">
            <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 " id="list-category">
                
            </div>
        </div>
    </section>
    <!-- category -->
        `;
    };
    renderUI() {
        super.renderUI();
        this.renderCategory();
        this.renderProductSection();
    }

    private renderCategory = () => {
        this.renderList<Category>('#list-category', this.state.lsCategory as Category[], CategoryItem);
    };

    private renderProductSection = () => {};
    protected async affterRender(): Promise<void> {
        const result = await categoryService.getCategory();
        this.setState({ lsCategory: result });
    }
}

export default HomeCategory;
