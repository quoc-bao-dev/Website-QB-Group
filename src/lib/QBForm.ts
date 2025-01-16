import _ from 'lodash';
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
class QBForm<T = {}, S = {}> extends QBComponent<T, S> {
    protected isValid: boolean = true;
    protected isSubmited: boolean = false;
    protected isFillAll: boolean = false;
    private erors: FieldError[] = [];
    protected fieldValidate: FieldRegister[] = [];
    protected fields: FormField[] = [];
    protected formContextKey = '';
    protected currentFocus = '';
    protected formFill: { [key: string]: any } = {};
    protected cacheKey: string = '';
    protected defaultValue: { [key: string]: any } | null = null;

    protected async afterRender(): Promise<void> {
        this.schema();
        this.signFormContext();
        this.setDefaultValueForm();
    }

    protected addEventListener(): void {
        this.element.querySelectorAll('input').forEach((input) => {
            input.addEventListener('input', () => {
                this.validateField();
            });
            input.addEventListener('click', () => {
                this.currentFocus = input.name;
            });
        });
    }
    protected register(name: string, validate: (value: any) => string | undefined) {
        this.fieldValidate.push({ name, validate });
        this.formFill[name] = this.field(name)!.value;
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

    private checkIsFillAll() {
        return Object.keys(this.formFill).every((key) => {
            return this.field(key)!.value != '';
        });
    }

    private validateField() {
        if (this.isSubmited) {
            this.isFillAll = this.checkIsFillAll();
            this.validate();
            this.reRender();
            this.setFormData();
            if (this.currentFocus != '') {
                this.field(this.currentFocus)!.focus();
            }
        } else {
            if (this.checkIsFillAll()) {
                this.isFillAll = true;
                this.setFormFieldData();
                this.reRender();
                this.setFormData();
                if (this.currentFocus != '') {
                    this.field(this.currentFocus)!.focus();
                }
            } else {
                this.isFillAll = false;
                this.setFormFieldData();
                this.reRender();
                this.setFormData();
                if (this.currentFocus != '') {
                    this.field(this.currentFocus)!.focus();
                }
            }
        }
    }

    protected clearError() {
        this.erors = [];
    }

    // ---------------------- get field ---------------------
    protected error(name: string): FieldError | undefined {
        const errorObj = this.erors.find((error) => error.name === name) as FieldError;
        if (!errorObj) {
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
    protected reRender(): void {
        super.reRender();
        if (this.cacheKey != '') {
            this.fields = JSON.parse(sessionStorage.getItem(this.cacheKey) as string);
            this.setFormData();
        }
    }

    protected async getDataForm() {
        if (this.cacheKey != '') {
            this.fields = JSON.parse(sessionStorage.getItem(this.cacheKey) as string);
            this.setFormData();
        }
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

    private cacheData() {
        if (this.cacheKey != '') {
            sessionStorage.setItem(this.cacheKey, JSON.stringify(this.fields));
        }
    }
    private setFormFieldData() {
        this.element.querySelectorAll('input, select, textarea').forEach((input) => {
            const _input = input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
            const name = _input.getAttribute('name')!;
            const value = _input.value;
            const indexField = this.fields.findIndex((field) => field.name === name);
            if (indexField >= 0) {
                this.fields[indexField].value = value;
            } else {
                this.fields.push({ name, value });
            }
        });

        this.cacheData();
    }

    private setFormData() {
        this.fields.forEach((field) => {
            const input = this.field(field.name);
            if (input) {
                input.value = field.value;
            }
        });
    }

    protected setDefaultValue(data: {}) {
        _.each(data, (value, key) => {
            const input = this.field(key);
            if (input) {
                input.value = value;
            }
        });
    }

    private setDefaultValueForm() {
        if (this.defaultValue != null) {
            _.each(this.defaultValue, (value, key) => {
                const input = this.field(key);
                if (input) {
                    input.value = value;
                }
            });
        }
    }
}

export default QBForm;
