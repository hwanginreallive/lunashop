import React from 'react';
import InfoUser from './infoUser';
import Helmet from './Helmet';
import userImage from '~/assets/images/users/userdefault.jfif';

const profile = [
    {
        title: 'Tên Đăng Nhập',
    },
    {
        title: 'Tên',
    },
    {
        title: 'Email',
    },
    {
        title: 'Số điện thoại ',
    },

    {
        title: 'Giới Tính',
    },
    {
        title: 'Ngày sinh',
    },
];

const info = {
    username: 'noahtaylor',
    name: 'Nguyen Van A',
    email: 'NguyenVanA@gmail.com',
    phoneNumber: '033232323232',
    gender: 'Nam',
    date: '23/02/2000',
};

const Profile = () => {
    return (
        <Helmet title="Người dùng">
            <div className="profile">
                <div className="profile__left">
                    <InfoUser></InfoUser>
                </div>
                <div className="profile__right">
                    <div className="profile__right__user">
                        <div className="profile__right__user__title">
                            <h4>Hồ Sơ Của Tôi</h4>
                            <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
                        </div>
                        <div className="profile__right__user__content">
                            <div className="profile__right__user__content__info">
                                <div className="profile__right__user__content__info__item">
                                    <span>Tên Đăng Nhập</span>
                                    <div>{info.username}</div>
                                </div>
                                <div className="profile__right__user__content__info__item">
                                    <span>Tên</span>
                                    <div>
                                        <input type="text" value={info.name} />
                                    </div>
                                </div>
                                <div className="profile__right__user__content__info__item">
                                    <span>Email</span>
                                    <div>{info.email}</div>
                                </div>

                                <div className="profile__right__user__content__info__item">
                                    <span>Số điện thoại</span>
                                    <div>{info.phoneNumber}</div>
                                </div>
                                <div className="profile__right__user__content__info__item">
                                    <span>Giới tính</span>
                                    <div>{info.gender}</div>
                                </div>
                                <div className="profile__right__user__content__info__item">
                                    <span>Ngày Sinh</span>
                                    <div>{info.date}</div>
                                </div>
                            </div>
                            <div className="profile__right__user__content__img">
                                <img src={userImage} alt="" />
                                <button>Chọn ảnh</button>
                                <div className="title">
                                    <div>Dụng lượng file tối đa 1 MB</div>
                                    <div>Định dạng:.JPEG, .PNG</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Profile;
