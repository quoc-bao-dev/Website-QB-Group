import QBComponent from '../../lib/QBComponent';
import QBRouter from '../../lib/QBRouter';

class BlogPage extends QBComponent {
    markup = () => {
        return /*html*/ ``;
    };

    protected renderUI(): void {
        super.renderUI();
    }

    protected async affterRender(): Promise<void> {
        const blog = QBRouter.param.blog;
        const post = fetch(`https://jsonplaceholder.typicode.com/posts/${blog}`);
    }
}
