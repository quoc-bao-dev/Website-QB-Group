import QBComponent from '../../lib/QBComponent';
interface ConfirmModalProps {
    title: string;
    content: string;
    onConfirm: () => void;
    onCancel: () => void;
}
class ConfirmModal extends QBComponent<ConfirmModalProps> {
    constructor(props: ConfirmModalProps) {
        props.content = props.content || 'Are you sure?';
        props.title = props.title || 'Confirm';
        super(props);
    }
    protected markup: () => string = () => {
        return /*html*/ `
        <div class="fixed inset-0 flex items-center justify-center z-50" style="background-color: rgba(0,0,0,0.5);">
            <div class="bg-white rounded-lg p-8">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-lg font-semibold">${this.props.title}</h2>
                    <button class="text-gray-500 hover:text-red-500" onclick="this.closest('.fixed').remove()">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="mb-4">
                    <p class="text-gray-600">${this.props.content}?</p>
                </div>
                <div class="flex items-center gap-5">
                <button class="px-4 py-2 bg-blue-500 text-white rounded  btn-confirm flex-1" >
                        Confirm
                    </button>
                    <button class="px-4 py-2 mr-2 bg-red-500 text-white rounded btn-cancel flex-1" >
                        Cancle
                    </button>
                    
                </div>
            </div>
        </div>
        `;
    };

    protected addEventListener(): void {
        this.signEvent('.btn-confirm', 'click', this.props.onConfirm);
        this.signEvent('.btn-cancel', 'click', this.props.onCancel);
    }
}
export default ConfirmModal;
