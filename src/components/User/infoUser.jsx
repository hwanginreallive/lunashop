import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import profileInfos from '~/assets/fake-data/users';

import userImage from '~/assets/images/users/userdefault.jfif';

import { FaPen } from 'react-icons/fa';

const InfoUser = () => {
    const { pathname } = useLocation();
    const activeNav = profileInfos.findIndex((e) => e.path === pathname);

    return (
        <>
            <div className="profile__left__avt">
                <img src={userImage} alt="" />
                <div className="profile__left__avt__title">
                    <h3>Noah Taylor</h3>
                    <div>
                        <i>
                            <FaPen></FaPen>
                        </i>
                        <span>Sửa hồ sơ</span>
                    </div>
                </div>
            </div>
            <div className="profile__left__info">
                <div className="info-user">
                    {profileInfos.map((info, index) => (
                        <Link to={`${info.path}`} key={index}>
                            <div className={`info-user__item ${index === activeNav ? 'active' : ''}`}>
                                <i>{info.icon}</i>
                                <span className="title"> {info.title} </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default InfoUser;
