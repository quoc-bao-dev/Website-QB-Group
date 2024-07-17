import QBComponent from '../../lib/QBComponent';
import HomeCategory from './partials/Home.Category';
import HomeProductSection from './partials/Home.ProductSection';
import HomeSectionHotSale from './partials/Home.SectionHotSale';

class Home extends QBComponent<null> {
    constructor() {
        super(null);
        this.pathTemplate = '/src/pages/home/index.html';
    }

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
