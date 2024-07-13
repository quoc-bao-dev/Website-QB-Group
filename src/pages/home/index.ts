import QBComponent from '../../lib/QBComponent';
import HomeCategory from './partials/Home.Category';
import HomeProductSection from './partials/Home.ProductSection';

class Home extends QBComponent<null> {
    constructor() {
        super(null);
        this.pathTemplate = '/src/pages/home/index.html';
    }

    protected renderUI(): void {
        super.renderUI();
        this.renderCategorySection();
        this.renderProductSection();
    }

    private renderCategorySection() {
        this.renderComponent('#category-section', new HomeCategory());
    }

    private renderProductSection() {
        this.renderComponent('#product-section', new HomeProductSection());
    }
}

export default Home;
