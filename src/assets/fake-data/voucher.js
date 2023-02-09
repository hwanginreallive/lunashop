export const vouchers = [
    {
        id: 1,
        type: 'freeShip',
        title: 'FreeShip Extra',
        voucherValue: '30k',
        startDate: '2023/2/23',
        endDate: '2023/3/23',
        voucherCode: 'FREESHIP123',
        detail: ' Sử dụng mã giảm phí vận chuyển (tối đa 30K) cho đơn hàng bất kì từ 0Đ thoả điều kiện ưu đãi tại Shop.',
        equipment: 'iOS, Android, PC',
        payments: 'Tất cả các hình thức thanh toán',
        logistics: ['Hỏa Tốc', 'Nhanh', 'Tiết kiệm'],
        incentives:
            'Lượt sử dụng có hạn. Nhanh tay kẻo lỡ bạn nhé! Mã Miễn phí vận chuyển | Tất cả hình thức thanh toán',
    },
    {
        id: 2,
        type: 'freeShip',
        title: 'Miễn phí vận chuyển',
        voucherValue: '20k',
        startDate: '2023-2-23',
        endDate: '2023-5-23',
        voucherCode: 'FREESHIPNORMAL',
        detail: ' Sử dụng mã giảm phí vận chuyển (tối đa 20K) cho đơn hàng bất kì từ 0Đ thoả điều kiện ưu đãi tại Shop.',
        payments: 'Tất cả các hình thức thanh toán',
        logistics: ['Hỏa Tốc', 'Nhanh', 'Tiết kiệm'],
        incentives:
            'Lượt sử dụng có hạn. Nhanh tay kẻo lỡ bạn nhé! Mã Miễn phí vận chuyển | Tất cả hình thức thanh toán',
        equipment: 'iOS, Android, PC',
    },
    {
        id: 3,
        type: 'refund',
        voucherValue: '30k',
        title: 'Hoàn xu Extra',
        startDate: '2023-2-23',
        endDate: '2023-4-12',
        voucherCode: 'REFUND11',
        detail: ' Sử dụng mã hoàn xu, hoàn trả tối đa 30K cho đơn hàng bất kì từ 0Đ thoả điều kiện ưu đãi tại Shop.',
        equipment: 'iOS, Android, PC',
        logistics: ['Hỏa Tốc', 'Nhanh', 'Tiết kiệm'],
        payments: 'Tất cả các hình thức thanh toán',
        incentives: 'Lượt sử dụng có hạn. Nhanh tay kẻo lỡ bạn nhé! Hoàn 30k xu Đơn Tối Thiểu ₫50k Tối đa 100k Xu',
    },
    {
        id: 4,
        type: 'refund',
        voucherValue: '20k',
        title: 'Hoàn xu Extra',
        startDate: '2023-2-23',
        endDate: '2023-7-12',
        voucherCode: 'REFUND112',
        logistics: ['Hỏa Tốc', 'Nhanh', 'Tiết kiệm'],
        detail: ' Sử dụng mã hoàn xu, hoàn trả tối đa 20K cho đơn hàng bất kì từ 0Đ thoả điều kiện ưu đãi tại Shop.',
        equipment: 'iOS, Android, PC',
        payments: 'Tất cả các hình thức thanh toán',
        incentives: 'Lượt sử dụng có hạn. Nhanh tay kẻo lỡ bạn nhé! Hoàn 20k xu Đơn Tối Thiểu ₫50k Tối đa 100k Xu',
    },
    {
        id: 5,
        type: 'discount',
        title: 'Mã Giảm Giá',
        voucherValue: '30k',
        startDate: '2023-2-23 12:00:00 ',
        endDate: '2023-2-23 13:00:00',
        voucherCode: 'FREESHIP123',
        logistics: ['Hỏa Tốc', 'Nhanh', 'Tiết kiệm'],
        detail: ' Sử dụng mã giảm giá (tối đa 30K) cho đơn hàng bất kì từ 0Đ thoả điều kiện ưu đãi tại Shop.',
        equipment: 'iOS, Android, PC',
        payments: 'Tất cả các hình thức thanh toán',
        incentives: 'Lượt sử dụng có hạn. Nhanh tay kẻo lỡ bạn nhé! Hoàn 20k xu Đơn Tối Thiểu ₫50k Tối đa 100k Xu',
    },
    {
        id: 6,
        type: 'discount',
        title: 'Mã Giảm Giá',
        voucherValue: '20k',
        startDate: '2023-2-23 12:00:00',
        endDate: '2023-2-23 12:10:00',
        voucherCode: 'FREESHIPNORMAL',
        logistics: ['Hỏa Tốc', 'Nhanh', 'Tiết kiệm'],
        detail: ' Sử dụng mã giảm giá (tối đa 20K) cho đơn hàng bất kì từ 0Đ thoả điều kiện ưu đãi tại Shop.',
        equipment: 'iOS, Android, PC',
        payments: 'Tất cả các hình thức thanh toán',
        incentives: 'Lượt sử dụng có hạn. Nhanh tay kẻo lỡ bạn nhé! Hoàn 20k xu Đơn Tối Thiểu ₫50k Tối đa 100k Xu',
    },
];

const getAllVoucher = () => vouchers;

const getVoucherById = (id) => vouchers.find((item) => item.id === id);

const getVoucherByType = (type) => vouchers.filter((item) => item.type === type);

const voucherData = {
    getAllVoucher,
    getVoucherById,
    getVoucherByType,
};

export default voucherData;
