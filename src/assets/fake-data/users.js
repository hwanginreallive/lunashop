import { BiUser, BiNotepad, BiBell } from 'react-icons/bi';
import { FaBitcoin } from 'react-icons/fa';
import Discount from '~/assets/images/discount.png';

const profileInfos = [
    {
        title: 'Tài khoản của tôi',
        icon: <BiUser style={{ color: '#4267b2' }}></BiUser>,
        path: '/user/profile',
    },
    {
        title: 'Đơn mua ',
        icon: <BiNotepad style={{ color: '#4267b2' }}></BiNotepad>,
        path: '/user/purchase',
    },
    {
        title: 'Thông báo',
        icon: <BiBell style={{ color: 'red' }}></BiBell>,
        path: '/user/notification',
    },
    {
        title: 'Kho voucher',
        icon: <img style={{ height: '24px', width: '24px', color: 'red' }} src={Discount} />,
        path: '/user/voucher',
    },
    {
        title: 'Xu',
        icon: <FaBitcoin style={{ color: '#f6a42d' }}></FaBitcoin>,
        path: '/user/coin',
    },
];

export default profileInfos;
