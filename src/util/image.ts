import { BASE_URL } from '../config/config';

export const toImage = (file: string) => `${BASE_URL}image/${file}`;

export function extractFileName(url: string): string | null {
    try {
        // Sử dụng URL API để phân tích URL
        const urlObject = new URL(url);

        // Lấy phần cuối của đường dẫn (path)
        const pathSegments = urlObject.pathname.split('/');
        const fileName = pathSegments[pathSegments.length - 1];

        // Giải mã các ký tự mã hóa URL (nếu có)
        return decodeURIComponent(fileName);
    } catch (error: any) {
        console.error('Invalid URL:', error.message);
        return null;
    }
}
