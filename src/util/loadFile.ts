const loadFile = async (): Promise<File> => {
    return new Promise<File>((resolve) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = () => {
            resolve(input.files![0]);
        };
        input.click();
    });
};

export default loadFile;
