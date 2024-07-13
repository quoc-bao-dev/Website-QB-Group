import FormContext from './FormContext';
import QBComponent from './QBComponent';

type FieldError = {
    name: string;
    message: string;
};
type FormField = {
    name: string;
    value: any;
};
type FieldRegister = {
    name: string;
    validate: (value: any) => string | undefined;
};
class QBForm extends QBComponent {
    protected isValid: boolean = true;
    protected isSubmited: boolean = false;
    private erors: FieldError[] = [];
    protected fieldValidate: FieldRegister[] = [];
    protected fields: FormField[] = [];
    protected formContextKey = '';
    protected currentFocus = '';

    protected async affterRender(): Promise<void> {
        this.schema();
        this.signFormContext();
    }

    protected addEventListener(): void {
        this.element.querySelectorAll('input').forEach((input) => {
            input.addEventListener('input', () => {
                this.validateFidld();
            });
            input.addEventListener('click', () => {
                this.currentFocus = input.name;
            });
        });
    }
    protected register(name: string, validate: (value: any) => string | undefined) {
        this.fieldValidate.push({ name, validate });
    }

    private validate() {
        this.erors = [];
        const formData = this.getData();
        this.fieldValidate.forEach((field) => {
            const value = formData[field.name];
            const message = field.validate(value);
            if (message) {
                this.erors.push({ name: field.name, message });
            }
        });

        if (this.erors.length > 0) {
            this.isValid = false;
        } else {
            this.isValid = true;
        }
        return this.isValid;
    }

    private validateFidld() {
        if (this.isSubmited) {
            this.validate();
            this.reRender();
            this.setFormData();
            if (this.currentFocus != '') {
                this.field(this.currentFocus)!.focus();
            }
        }
    }

    // ---------------------- get field ---------------------
    protected error(name: string): FieldError | undefined {
        const errorObj = this.erors.find((error) => error.name === name) as FieldError;
        if (!errorObj) {
            console.warn('field not found');
            return undefined;
        }
        return errorObj as FieldError;
    }

    protected field(name: string) {
        const input = this.node(`[name="${name}"]`) as
            | HTMLInputElement
            | HTMLSelectElement
            | HTMLTextAreaElement
            | null;
        return input;
    }
    // ---------------------- get field ---------------------

    private getData() {
        const formData = new FormData(this.node('form') as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        this.setFormFieldData();
        return data;
    }

    protected async getDataForm() {
        this.validate();
        if (!this.isSubmited) {
            this.isSubmited = true;
        }

        this.reRender();
        this.setFormData();

        if (this.isValid) {
            return this.getData();
        }
        return null;
    }

    protected schema() {}

    // ------------------------ form context -----------------------
    protected signFormContext() {
        if (this.formContextKey != '') {
            FormContext.signForm(this.formContextKey, this.getDataForm.bind(this));
        }
    }
    // ------------------------ form context -----------------------

    // support
    private setFormFieldData() {
        this.element.querySelectorAll('input, select, textarea').forEach((input) => {
            const _input = input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
            const name = _input.getAttribute('name')!;
            const value = _input.value;
            this.fields.push({ name, value });
        });
    }

    private setFormData() {
        this.fields.forEach((field) => {
            const input = this.field(field.name);
            if (input) {
                input.value = field.value;
            }
        });
    }
}

export default QBForm;

// support function

function readFile(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);

        reader.readAsText(file); // Đọc tệp dưới dạng text, có thể thay bằng readAsDataURL hoặc readAsArrayBuffer nếu cần
    });
}

async function getFormData(selector: string): Promise<{ [key: string]: any } | null> {
    const form = document.querySelector(selector) as HTMLFormElement;

    if (!form) {
        console.error('Form not found with the given selector:', selector);
        return null;
    }

    const formData: { [key: string]: any } = {};
    const inputs = form.elements;

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | any;
        if (input.name) {
            switch (input.type) {
                case 'checkbox':
                    formData[input.name] = input.checked;
                    break;
                case 'radio':
                    if (input.checked) {
                        formData[input.name] = input.value;
                    }
                    break;
                case 'file':
                    if (input.files && input.files.length > 0) {
                        formData[input.name] = await readFile(input.files[0]);
                    }
                    break;
                default:
                    formData[input.name] = input.value;
            }
        }
    }

    return formData;
}
