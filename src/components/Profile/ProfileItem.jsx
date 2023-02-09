import { useRef } from 'react';

import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';
import useOnclickOutside from '~/Hooks/useOnclickOutside';

const ProfileItem = ({ control, inEditMode, setInEditMode, loginUser, isDirty, isShowButton }) => {
    const profileRef = useRef();
    const onDoubleClickHandler = () => setInEditMode(true);

    useOnclickOutside(profileRef, () => setInEditMode(false));

    const onViewNameKeyup = (event) => {
        const newName = event.target.value.trim();
        if (event.key === 'Enter') {
            if (!newName) {
                setInEditMode(!inEditMode);
                return;
            }
            loginUser.content = newName;
            setInEditMode(!inEditMode);
        } else if (event.key === 'Escape') {
            setInEditMode(false);
        }
    };

    return (
        <div className="profile__right__user__content__info" ref={profileRef}>
            <div className="profile__right__user__content__info__item" onDoubleClick={(e) => onDoubleClickHandler(e)}>
                <span>Tên Đăng Nhập</span>
                <div>{loginUser?.username}</div>
            </div>

            <Controller
                name="name"
                control={control}
                render={({ field }) => {
                    return (
                        <div
                            className="profile__right__user__content__info__item"
                            onDoubleClick={(e) => onDoubleClickHandler(e)}
                        >
                            <span>Họ tên</span>

                            {inEditMode ? (
                                <input type="text" {...field} onKeyUp={(e) => onViewNameKeyup(e)} />
                            ) : (
                                <div>{field?.value}</div>
                            )}
                        </div>
                    );
                }}
            />

            <Controller
                control={control}
                name="email"
                render={({ field }) => {
                    return (
                        <div
                            className="profile__right__user__content__info__item"
                            onDoubleClick={(e) => onDoubleClickHandler(e)}
                        >
                            <span>Email</span>

                            {inEditMode ? (
                                <input type="text" {...field} onKeyUp={(e) => onViewNameKeyup(e)} />
                            ) : (
                                <div>{field?.value}</div>
                            )}
                        </div>
                    );
                }}
            />
            <Controller
                control={control}
                name="phone"
                render={({ field }) => {
                    return (
                        <div
                            className="profile__right__user__content__info__item"
                            onDoubleClick={(e) => onDoubleClickHandler(e)}
                        >
                            <span>phone</span>

                            {inEditMode ? (
                                <input type="text" {...field} onKeyUp={(e) => onViewNameKeyup(e)} />
                            ) : (
                                <div>{field?.value}</div>
                            )}
                        </div>
                    );
                }}
            />
            <Controller
                control={control}
                name="gender"
                render={({ field }) => {
                    return (
                        <div
                            className="profile__right__user__content__info__item"
                            onDoubleClick={(e) => onDoubleClickHandler(e)}
                        >
                            <span>Giới tính</span>

                            {inEditMode ? (
                                <input type="text" {...field} onKeyUp={(e) => onViewNameKeyup(e)} />
                            ) : (
                                <div>{field?.value}</div>
                            )}
                        </div>
                    );
                }}
            />

            <Controller
                control={control}
                name="date"
                render={({ field }) => {
                    return (
                        <div
                            className="profile__right__user__content__info__item"
                            onDoubleClick={(e) => onDoubleClickHandler(e)}
                        >
                            <span>Ngày Sinh</span>

                            {inEditMode ? (
                                <input
                                    type="date"
                                    {...field}
                                    value={dayjs(field?.value).format('YYYY-MM-DD')}
                                    onKeyUp={(e) => onViewNameKeyup(e)}
                                />
                            ) : (
                                <div>{dayjs(field?.value).format('DD/MM/YYYY')}</div>
                            )}
                        </div>
                    );
                }}
            />

            <Controller
                control={control}
                name="location"
                render={({ field }) => {
                    return (
                        <div
                            className="profile__right__user__content__info__item"
                            onDoubleClick={(e) => onDoubleClickHandler(e)}
                        >
                            <span>Địa chỉ</span>

                            {inEditMode ? (
                                <input type="text" {...field} onKeyUp={(e) => onViewNameKeyup(e)} />
                            ) : (
                                <div>{field?.value}</div>
                            )}
                        </div>
                    );
                }}
            />
            {(inEditMode || isShowButton) && (
                <Button type="submit" disabled={!isDirty} variant="contained">
                    Cập nhật
                </Button>
            )}
        </div>
    );
};

export default ProfileItem;
