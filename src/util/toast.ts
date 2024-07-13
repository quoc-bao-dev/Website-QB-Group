import toastr from 'toastr';
toastr.options = {
    closeButton: true, // Hiển thị nút đóng
    debug: false, // Bật chế độ debug (true/false)
    newestOnTop: true, // Hiển thị toast mới nhất ở trên cùng
    progressBar: true, // Hiển thị progress bar
    positionClass: 'toast-top-right', // Vị trí hiển thị toast (top-right, top-left, bottom-right, bottom-left, top-full-width, bottom-full-width, top-center, bottom-center)
    preventDuplicates: false, // Ngăn không cho hiển thị toast trùng lặp
    showEasing: 'swing', // Hiệu ứng hiển thị
    hideEasing: 'linear', // Hiệu ứng ẩn đi
    showMethod: 'fadeIn', // Phương thức hiển thị (fadeIn, slideDown, show)
    hideMethod: 'fadeOut', // Phương thức ẩn đi (fadeOut, slideUp, hide)
    timeOut: 1000,
};

const toast = toastr;

export default toast;
