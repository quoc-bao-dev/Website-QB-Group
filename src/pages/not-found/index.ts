import QBComponent from '../../lib/QBComponent';

class NotFoundPage extends QBComponent {
    protected markup: () => string = () => {
        return `<h1>not found</h1>`;
    };
}

export default NotFoundPage;
