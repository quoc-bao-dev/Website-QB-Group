import { Order } from '../interface/order';

const sortItemsByStatus = (items: Order[]): Order[] => {
    // Định nghĩa thứ tự sắp xếp
    const order = ['pending', 'confirmed', 'shipped', 'delivered', 'completed', 'canceled'];

    // Sắp xếp mảng dựa trên thứ tự định nghĩa
    return items.sort((a, b) => {
        const statusA = a.status;
        const statusB = b.status;
        return order.indexOf(statusA) - order.indexOf(statusB);
    });
};

export const indexStatus = (status: string) => {
    const order = ['pending', 'confirmed', 'shipped', 'delivered', 'completed', 'canceled'];
    return order.indexOf(status);
};

export default sortItemsByStatus;
