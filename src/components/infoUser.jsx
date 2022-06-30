import React, { useRef } from 'react';
import profileInfos from '~/assets/fake-data/users';
import { Link, useLocation } from 'react-router-dom';
import 'boxicons';
import userImage from '~/assets/images/users/userdefault.jfif';

const InfoUser = () => {
    const { pathname } = useLocation();
    const activeInfo = profileInfos.findIndex((e) => e.path === pathname);

    const infoUserRef = useRef(null);
    return (
        <>
            <div className="profile__left__avt">
                <img src={userImage} alt="" />
                <div className="profile__left__avt__title">
                    <h3>Noah Taylor</h3>
                    <div>
                        <i>
                            <box-icon type="solid" name="pencil"></box-icon>
                        </i>
                        <span>Sửa hồ sơ</span>
                    </div>
                </div>
            </div>
            <div className="profile__left__info">
                <div className="info-user">
                    {profileInfos.map((info, index) => (
                        <Link to={`${info.path}`} key={index}>
                            <div
                                ref={infoUserRef}
                                className={`info-user__item  ${index === activeInfo ? 'active' : ''} `}
                            >
                                <box-icon type=" solid" name={info.icon}></box-icon>
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
