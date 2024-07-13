// Giải mã Base64 URL
function base64UrlDecode(str: string): string {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    return atob(padded);
}

// Giải mã payload từ token
export function decodeTokenPayload(token: string): object | null {
    try {
        const payloadPart = token.split('.')[1];
        const decodedPayload = base64UrlDecode(payloadPart);
        return JSON.parse(decodedPayload);
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
}
