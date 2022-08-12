import React, { useState, useRef } from 'react';

import useOnclickOutside from '~/utils/useOnclickOutside';

const ProfileItem = ({ info }) => {
    const [inEditMode, setInEditMode] = useState(false);

    const profileRef = useRef();

    const onDoubleClickHandler = () => setInEditMode(true);

    useOnclickOutside(profileRef, () => setInEditMode(false));

    const onViewNameKeyup = (event) => {
        const newName = event.target.value;
        if (event.key === 'Enter') {
            if (!newName) {
                setInEditMode(!inEditMode);
                return;
            }
            info.content = newName;
            setInEditMode(!inEditMode);
        } else if (event.key === 'Escape') {
            setInEditMode(false);
        }
    };

    return (
        <div
            ref={profileRef}
            className="profile__right__user__content__info__item"
            onDoubleClick={(e) => onDoubleClickHandler(e)}
        >
            <span>{info.title}</span>
            {inEditMode ? (
                <input type="text" autoFocus onKeyUp={(e) => onViewNameKeyup(e)} />
            ) : (
                <div>{info.content}</div>
            )}
        </div>
    );
};

export default ProfileItem;
