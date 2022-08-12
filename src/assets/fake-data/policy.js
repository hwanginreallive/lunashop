import { MdLocalShipping, MdCreditCard } from 'react-icons/md';
import { RiVipCrownFill } from 'react-icons/ri';
import { AiOutlineFileProtect } from 'react-icons/ai';

const policy = [
    {
        name: 'Miễn phí giao hàng',
        description: 'Miễn phí ship với đơn hàng > 239K',
        icon: <MdLocalShipping></MdLocalShipping>,
    },
    {
        name: 'Thanh toán COD',
        description: 'Thanh toán khi nhận hàng (COD)',
        icon: <MdCreditCard></MdCreditCard>,
    },
    {
        name: 'Khách hàng VIP',
        description: 'Ưu đãi dành cho khách hàng VIP',
        icon: <RiVipCrownFill></RiVipCrownFill>,
    },
    {
        name: 'Hỗ trợ bảo hành',
        description: 'Đổi, sửa đồ tại tất cả store',
        icon: <AiOutlineFileProtect></AiOutlineFileProtect>,
    },
];

export default policy;
