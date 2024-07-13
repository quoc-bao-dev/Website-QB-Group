class FormContext {
    private sign: { [key: string]: () => any } = {};

    signForm(formName: string, cb: () => any) {
        this.sign[formName] = cb;
    }

    async getForm(formName: string) {
        const data = await this.sign[formName]();
        return data;
    }
}

export default new FormContext();
