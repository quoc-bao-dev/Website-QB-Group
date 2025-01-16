import QBComponent from '../../lib/QBComponent';
type stars = number;
class Star extends QBComponent<stars> {
    protected markup: () => string = () => {
        // Giả sử this.props là giá trị số sao (có thể là số thập phân)
        const rating = this.props as number;

        // Xác định số sao đầy đủ và số sao nửa phần
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;

        // Xây dựng HTML cho sao
        let starsHtml = '';

        // Thêm sao đầy đủ
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fa-solid fa-star"></i>';
        }

        // Thêm sao nửa phần nếu có
        if (hasHalfStar) {
            starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
        }

        // Thêm sao rỗng cho đến tổng số 5 sao
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="fa-regular fa-star"></i>';
        }

        return /*html*/ `
        <div class="flex gap-1 w-fit text-xs items-center text-yellow-400">
            ${starsHtml}
        </div>
    `;
    };
}

export default Star;
