import { Link, useLocation } from 'react-router-dom';

import userImage from '~/assets/images/users/userdefault.jfif';

import { FaPen } from 'react-icons/fa';

import { Button } from '@mui/material';
import { BiBell, BiNotepad, BiUser } from 'react-icons/bi';
import { FaBitcoin } from 'react-icons/fa';
import Discount from '~/assets/images/discount.png';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '~/redux/api/auth/authSlice';
import { useGetUserByIdQuery } from '~/redux/api/userApi/userApi';
import { removeAllItems } from '~/redux/slices/shopping-cart/cartItemsSlide';
import { notifySuccess } from '../Toasts/Toast';

const profileInfos = [
    {
        title: 'Tài khoản của tôi',
        icon: <BiUser style={{ color: '#4267b2' }} />,
        path: '/user/profile',
    },
    {
        title: 'Đơn mua ',
        icon: <BiNotepad style={{ color: '#4267b2' }} />,
        path: '/user/purchase',
    },
    {
        title: 'Thông báo',
        icon: <BiBell style={{ color: 'red' }} />,
        path: '/user/notification',
    },
    {
        title: 'Kho voucher',
        icon: <img style={{ height: '24px', width: '24px', color: 'red' }} src={Discount} alt="voucher" />,
        path: '/user/voucher',
    },
    {
        title: 'Xu',
        icon: <FaBitcoin style={{ color: '#f6a42d' }} />,
        path: '/user/coin',
    },
];

const InfoUser = () => {
    const history = useNavigate();
    const dispatch = useDispatch();

    const userCookies = JSON.parse(localStorage?.getItem('token'));

    const { data } = useGetUserByIdQuery({ id: userCookies.id });

    const handleLogOut = () => {
        history('/', { replace: true });
        dispatch(logOut());
        dispatch(removeAllItems());
        localStorage.removeItem('token');
        notifySuccess('Đăng xuất thành công');
    };

    const { pathname } = useLocation();
    const activeNav = profileInfos.findIndex((e) => e.path === pathname);
    return (
        <>
            <div className="profile__left__avt">
                <img src={userImage} alt="" />
                <div className="profile__left__avt__title">
                    <h3>{data?.name}</h3>
                    <div>
                        <i>
                            <FaPen />
                        </i>
                        <span>Sửa hồ sơ</span>
                    </div>
                </div>
            </div>
            <div className="profile__left__info">
                <div className="info-user">
                    {profileInfos.map((info, index) => (
                        <Link to={info.path} key={index}>
                            <div className={`info-user__item ${index === activeNav ? 'active' : ''}`}>
                                <i>{info.icon}</i>
                                <span className="title"> {info.title} </span>
                            </div>
                        </Link>
                    ))}
                    <Button variant="contained" onClick={handleLogOut}>
                        Đăng xuất
                    </Button>
                </div>
            </div>
        </>
    );
};

export default InfoUser;
