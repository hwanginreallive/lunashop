import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
    Badge,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SwipeableDrawer,
} from '@mui/material';
import { AiFillHome, AiFillInfoCircle, AiFillSkin, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import logo from '~/assets/images/Logo-2.png';

import { BiBell, BiMenuAltLeft, BiNotepad, BiUser } from 'react-icons/bi';
import { FaBitcoin } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Discount from '~/assets/images/discount.png';
import { logOut } from '~/redux/api/auth/authSlice';
import { useGetCartByUserQuery } from '~/redux/api/cartApi/cartApi';
import { addManyItems, removeAllItems } from '~/redux/slices/shopping-cart/cartItemsSlide';
import SearchAppBar from '../Search/SearchAppBar';
import { notifySuccess } from '../Toasts/Toast';

const mainNav = [
    {
        display: 'Trang chủ',
        path: '/',
    },
    {
        display: 'Sản phẩm ',
        path: '/catalog',
    },
    {
        display: 'Hỗ trợ',
        path: '/support',
    },
];

const mainNavMobile = [
    {
        display: 'Trang chủ',
        path: '/',
        icon: <AiFillHome></AiFillHome>,
    },
    {
        display: 'Sản phẩm ',
        path: '/catalog',
        icon: <AiFillSkin></AiFillSkin>,
    },
    {
        display: 'Hỗ trợ',
        path: '/support',
        icon: <AiFillInfoCircle></AiFillInfoCircle>,
    },
    {
        display: 'Tài Khoản',
        path: '/user/profile',
        icon: <BiUser style={{ color: '#4267b2' }}></BiUser>,
    },
    {
        display: 'Đơn mua',
        path: '/user/purchase',
        icon: <BiNotepad style={{ color: '#4267b2' }}></BiNotepad>,
    },
    {
        display: 'Thông báo',
        path: '/user/notification',
        icon: <BiBell style={{ color: 'red' }}></BiBell>,
    },
    {
        display: 'Kho voucher',
        path: '/user/voucher',
        icon: <img style={{ height: '24px', width: '24px', color: 'red' }} src={Discount} alt="voucher" />,
    },
    {
        display: 'Coin',
        path: '/user/coin',
        icon: <FaBitcoin style={{ color: '#f6a42d' }}></FaBitcoin>,
    },
];

const Header = () => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const history = useNavigate();

    const [drawer, setDrawer] = useState(false);

    const activeNav = mainNav.findIndex((e) => e.path === pathname);
    const activeNavMobile = mainNavMobile.findIndex((e) => e.path === pathname);

    const userCookies = JSON.parse(localStorage?.getItem('token'));
    const cartItemsLocal = JSON.parse(localStorage?.getItem('cartItems'));

    const cartItems = useSelector((state) => state.cartItems.value);
    const { data } = useGetCartByUserQuery({ id: userCookies?.id }, { refetchOnMountOrArgChange: true });
    let dataStore;

    if (userCookies) {
        dataStore = cartItems?.reduce((total, item) => total + Number(item.quantity), 0);
    } else {
        dataStore = cartItemsLocal?.reduce((total, item) => total + Number(item.quantity), 0);
    }

    const handleLogOut = () => {
        history('/', { replace: true });
        dispatch(logOut());
        dispatch(removeAllItems());
        localStorage.removeItem('token');
        notifySuccess('Đăng xuất thành công');
    };

    useEffect(() => {
        if (data?.length > 0 && cartItems.length === 0) {
            const dataFiler = data.map((item) => {
                return {
                    id: item.product._id,
                    color: item.color,
                    size: item.size,
                    price: item.price,
                    quantity: item.quantity,
                };
            });
            dispatch(addManyItems(dataFiler));
        }
        // eslint-disable-next-line
    }, [data]);

    const handleDrawer = () => {
        setDrawer(!drawer);
    };

    return (
        <div className="header">
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>

                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={handleDrawer}>
                        <IconButton size="large">
                            <BiMenuAltLeft sx={{ padding: 0 }} />
                        </IconButton>
                        <SwipeableDrawer open={drawer} onClose={() => setDrawer(false)} onOpen={() => setDrawer(true)}>
                            <div className="swipeable-logo">
                                <img src={logo} alt="" />
                            </div>
                            <List>
                                {mainNavMobile.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        disablePadding
                                        className={`header__menu__item header__menu__left__item ${
                                            index === activeNavMobile ? 'active' : ''
                                        }`}
                                        sx={{ padding: 0 }}
                                    >
                                        <Link to={item.path}>
                                            <ListItemButton sx={{}}>
                                                <ListItemIcon sx={{ fontSize: 24, minWidth: 40 }}>
                                                    {item.icon}
                                                </ListItemIcon>
                                                <div style={{ width: 100 }}>
                                                    <ListItemText primary={item.display} />
                                                </div>
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                ))}

                                {userCookies && (
                                    <Button
                                        sx={{
                                            '&:hover': { color: 'white' },
                                            marginLeft: '16px',
                                        }}
                                        variant="contained"
                                        onClick={handleLogOut}
                                    >
                                        Đăng Xuất
                                    </Button>
                                )}
                            </List>
                        </SwipeableDrawer>
                    </div>
                    <div className="header__menu__left">
                        {mainNav.map((item, index) => (
                            <div
                                key={index}
                                className={`header__menu__item header__menu__left__item ${
                                    index === activeNav ? 'active' : ''
                                }`}
                            >
                                <Link to={item.path}>
                                    <span> {item.display}</span>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item ">
                            <SearchAppBar />
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                                <Badge
                                    sx={{
                                        '&:hover .MuiBadge-badge': { color: 'white' },
                                    }}
                                    badgeContent={dataStore}
                                    color="primary"
                                >
                                    <div className="icon">
                                        <AiOutlineShoppingCart />
                                    </div>
                                </Badge>
                            </Link>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            {userCookies ? (
                                <Link to="/user/profile">
                                    <div className="icon">
                                        <AiOutlineUser />
                                    </div>
                                </Link>
                            ) : (
                                <Link to="/login">
                                    <Button
                                        sx={{
                                            '&:hover': { color: 'white' },
                                        }}
                                        variant="contained"
                                    >
                                        Đăng nhập
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
