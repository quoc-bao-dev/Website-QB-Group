// Lấy dữ liệu từ form
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

// Đọc nội dung của tệp
function readFile(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);

        reader.readAsText(file); // Đọc tệp dưới dạng text, có thể thay bằng readAsDataURL hoặc readAsArrayBuffer nếu cần
    });
}

export { getFormData, readFile };
