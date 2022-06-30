import React, { useState } from 'react';
import { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '~/assets/images/Logo-2.png';
import { AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart, AiOutlineClose } from 'react-icons/ai';
import { BiMenuAltLeft } from 'react-icons/bi';

import useOnclickOutside from '~/utils/useOnclickOutside';
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

const Header = () => {
    const { pathname } = useLocation();
    const activeNav = mainNav.findIndex((e) => e.path === pathname);

    const headerRef = useRef(null);

    const searchRef = useRef();
    const [showSearch, setShowSearch] = useState(false);
    useOnclickOutside(searchRef, () => setShowSearch(false));

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        });

        return () => {
            window.removeEventListener('scroll');
        };
    }, []);

    const menuLeft = useRef(null);

    const menuToggle = () => menuLeft.current.classList.toggle('active');

    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="header__menu">
                    <div onClick={menuToggle} className="header__menu__mobile-toggle">
                        <BiMenuAltLeft />
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div onClick={menuToggle} className="header__menu__left__mobile-close">
                            <AiOutlineClose />
                        </div>
                        {mainNav.map((item, index) => (
                            <div
                                key={index}
                                className={`header__menu__item header__menu__left__item ${
                                    index === activeNav ? 'active' : ''
                                }`}
                                onClick={menuToggle}
                            >
                                <Link to={item.path}>
                                    <span> {item.display}</span>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="header__menu__right">
                        <div
                            onClick={() => setShowSearch(true)}
                            className="header__menu__item header__menu__right__item "
                        >
                            {showSearch ? (
                                <div ref={searchRef} className="form-search">
                                    <input type="text" />
                                </div>
                            ) : (
                                ''
                            )}
                            <div className="icon">
                                <AiOutlineSearch className="icon-search" />
                            </div>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                                <div className="icon">
                                    <AiOutlineShoppingCart />
                                </div>
                            </Link>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/user/profile">
                                <div className="icon">
                                    <AiOutlineUser></AiOutlineUser>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
