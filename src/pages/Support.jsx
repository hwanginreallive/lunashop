import React from 'react';

import Helmet from '~/components/Helmet';

import { AiOutlineSearch } from 'react-icons/ai';

const questions = [
    {
        question: '[Cảnh báo lừa đảo] Mua sắm an toàn cùng LunaShop',
    },
    {
        question: '[Thành viên mới] Quy trình trả hàng hoàn tiền của LunaShop',
    },
    {
        question: '[Tài khoản LunaShop] Tại sao tôi không nhận được Mã xác minh (OTP)?',
    },
    {
        question:
            '[Thông tin vận chuyển] Làm sao để liên hệ Đơn vị vận chuyển/tra cứu thông tin vận chuyển/hối giao hàng?',
    },
    {
        question: '[Thành viên mới] Cách theo dõi tình trạng vận chuyển của đơn hàng?',
    },
    {
        question: '[Lỗi] Tại sao tài khoản LunaShop của tôi bị khóa/bị giới hạn?',
    },
    {
        question: '[Thành viên mới] Điều kiện Trả hàng/Hoàn tiền của LunaShop',
    },
    {
        question: '[Mua hàng] Các câu hỏi thường gặp trên LunaShop',
    },
    {
        question: '[Thành viên mới] Làm sao để mua hàng / đặt hàng trên ứng dụng LunaShop?',
    },
];

const Support = () => {
    return (
        <Helmet title="Hỗ trợ">
            <div className="support">
                <div className="support__search">
                    <div className="support__search__content">
                        <h2 className="support__search__content__title">
                            {' '}
                            Xin chào, Luna Shop có thể giúp gì cho bạn?{' '}
                        </h2>
                        <div className="support__search__content__input">
                            <input type="text" placeholder="Nhập từ khóa hoặc nội dung cần hỗ trợ" />
                            <i className="support__search__content__input__icon">
                                <AiOutlineSearch></AiOutlineSearch>
                            </i>
                        </div>
                    </div>
                </div>
                <div className="support__question">
                    <h2 className="support__question__title">Câu hỏi thường gặp</h2>
                    <div className="support__questions__list">
                        {questions.map((question, index) => (
                            <div key={index} className="support__category__item">
                                <div className="question">{question.question}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Support;
