import QBForm from './lib/QBForm';

class FormTestComponent extends QBForm {
    protected markup: () => string = () => {
        return /*html*/ `
        <form>
            <input type="text" id="name" name="name" />
            ${this.error('name') ? `<p>${this.error('name')?.message} error</p>` : ''}
            <br/>
            <input type="text" id="email" name="email" />
            ${this.error('email') ? `<p>${this.error('email')?.message} error</p>` : ''}
            <br/>
            <input type="text" id="phone" name="phone" />
            ${this.error('phone') ? `<p>${this.error('phone')?.message} error</p>` : ''}
            <br/>
            <input type="checkbox"  name="checkbox"/>
            <input type="text" id="phone-2" name="phone-2" />

            <button type="submit">Submit</button>
        </form>
        `;
    };

    protected schema(): void {
        this.register('name', (value) => {
            if (!value) {
                return 'Name is required';
            }
        });
        this.register('email', (value) => {
            if (!value) {
                return 'Email is required';
            }
        });
        this.register('phone', (value) => {
            if (!value) {
                return 'Phone is required';
            }
        });
    }

    protected addEventListener(): void {
        this.signEvent('button', 'click', (e) => {
            const data = this.getDataForm();
            console.log(data);
        });
    }
}

export default FormTestComponent;
