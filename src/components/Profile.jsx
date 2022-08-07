import React, { useState } from 'react';
import InfoUser from './infoUser';
import Helmet from './Helmet';
import userImage from '~/assets/images/users/userdefault.jfif';
import ProfileItem from './ProfileItem';

const infos = [
    {
        title: 'Tên Đăng Nhập',
        content: 'noahtaylor',
    },
    {
        title: 'Tên',
        content: 'Nguyen Van A',
    },
    {
        title: 'Email',
        content: 'NguyenVanA@gmail.com',
    },
    {
        title: 'Số điện thoại ',
        content: '033232323232',
    },
    {
        title: 'Giới Tính',
        content: 'Nam',
    },
    {
        title: 'Ngày sinh',
        content: '23/02/2000',
    },
];

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
                                {infos.map((info, index) => (
                                    <ProfileItem key={index} info={info}></ProfileItem>
                                ))}
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
