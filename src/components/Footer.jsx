import React from 'react';

import { Link } from 'react-router-dom';

import Grid from './Grid';

import logo from '~/assets/images/Logo-2.png';

const footerAboutLink = [
    {
        display: 'Giới thiệu',
        path: '/about',
    },
    {
        display: 'Liên hệ',
        path: '/contact',
    },
    {
        display: 'tuyển dụng',
        path: '/about',
    },
    {
        display: 'tin tức',
        path: '/about',
    },
    {
        display: 'hệ thống cửa hàng',
        path: '/about',
    },
];

const footerCustomerLink = [
    {
        display: 'Chính sách đổi trả',
        path: '/about',
    },
    {
        display: 'chính sách bảo hành',
        path: '/contact',
    },
    {
        display: 'chính sách hoàn trả',
        path: '/about',
    },
    {
        display: 'chính sách bảo hành',
        path: '/about',
    },
    {
        display: 'Chính sách hoàn tiền',
        path: '/about',
    },
];

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <Grid col={4} mdCol={2} smCol={1} gap={10}>
                    <div>
                        <div className="footer__title">Tổng đài hỗ trợ</div>
                        <div className="footer__content">
                            <p>
                                Liên hệ khách hàng <strong>030330123</strong>
                            </p>
                            <p>
                                Theo dõi đơn hàng <strong>030330123</strong>
                            </p>
                            <p>
                                Khiếu nại, góp ý <strong>030330123</strong>
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">About Us</div>
                        <div className="footer__content">
                            {footerAboutLink.map((item, index) => (
                                <p key={index}>
                                    <Link to={item.path}>{item.display}</Link>
                                </p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">Chăm sóc khách hàng</div>
                        <div className="footer__content">
                            {footerCustomerLink.map((item, index) => (
                                <p key={index}>
                                    <Link to={item.path}>{item.display}</Link>
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="footer__about">
                        <p>
                            <Link to="/">
                                <img src={logo} className="footer__logo" alt="" />
                            </Link>
                        </p>
                        <p>
                            Ngành công nghiệp thời trang đang ngày càng phát triển mạnh mẽ trên thế giới. Mỗi năm các
                            nhà mốt đưa ra nhiều bộ sưu tập mới, hấp dẫn, giúp cho ngành thời trang ngày càng phát
                            triển.
                        </p>
                    </div>
                </Grid>
            </div>
        </footer>
    );
};

export default Footer;
