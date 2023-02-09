import { useEffect, useState } from 'react';

import Helmet from '../Helmet/Helmet';
import InfoUser from '../User/infoUser';
import ProfileItem from './ProfileItem';

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Button, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useForm } from 'react-hook-form';
import userImage from '~/assets/images/users/userdefault.jfif';
import { notifyError, notifySuccess } from '~/components/Toasts/Toast';
import { storage } from '~/firebase';
import { useGetUserByIdQuery, useUpdateUserMutation } from '~/redux/api/userApi/userApi';
const Profile = () => {
    const loginUser = localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token')) : null;

    const { data } = useGetUserByIdQuery(
        { id: loginUser.id },
        {
            refetchOnMountOrArgChange: true,
        },
    );

    const [updateUser, { isSuccess, isError }] = useUpdateUserMutation();
    const [inEditMode, setInEditMode] = useState(false);
    const [isShowButton, setIsShowButton] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);
    const [isLoadingImg, setIsLoadingImg] = useState(false);

    const {
        handleSubmit,
        control,
        reset,
        formState: { isDirty },
        setValue,
    } = useForm({
        defaultValues: {
            id: '',
            name: '',
            email: '',
            date: '',
            gender: '',
            phone: '',
            location: '',
            avatar: '',
        },
    });

    const onSubmit = (data) => {
        setInEditMode(false);
        setIsShowButton(false);
        delete data._id;
        updateUser({
            ...data,
            id: loginUser.id,
        });
    };

    useEffect(() => {
        setValue('avatar', imgUrl, { shouldDirty: true });
    }, [imgUrl, isShowButton, setValue]);

    const handleUploadImage = (e) => {
        setIsLoadingImg(true);
        const imageUpload = e.target.files[0];
        const imageRef = ref(storage, `avatar/${imageUpload?.name}`);

        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            console.log('🚀 ~ file: Profile.jsx ~ line 41 ~ uploadBytes ~ Upload', imageUpload);
            getDownloadURL(snapshot.ref).then((url) => {
                setImgUrl(url);
                setIsLoadingImg(false);
            });
        });
        setIsShowButton(true);
    };

    useEffect(() => {
        reset(data);
        setImgUrl(data?.avatar);
    }, [data, reset, setImgUrl]);

    useEffect(() => {
        if (isSuccess) {
            notifySuccess('Cập nhật người dùng thành công');
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            notifyError('Cập nhật người dùng thất bại');
        }
    }, [isError]);

    return (
        <Helmet title="Người dùng">
            <form className="profile" onSubmit={handleSubmit(onSubmit)}>
                <div className="profile__left">
                    <InfoUser />
                </div>
                <div className="profile__right">
                    <div className="profile__right__user">
                        <div className="profile__right__user__title">
                            <h4>Hồ Sơ Của Tôi</h4>
                            <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
                        </div>
                        <div className="profile__right__user__content">
                            <ProfileItem
                                control={control}
                                inEditMode={inEditMode}
                                setInEditMode={setInEditMode}
                                isDirty={isDirty}
                                loginUser={loginUser}
                                isShowButton={isShowButton}
                            />

                            <div className="profile__right__user__content__img">
                                {isLoadingImg ? <CircularProgress /> : <img src={imgUrl ? imgUrl : userImage} alt="" />}

                                <div className="button">
                                    <Button variant="contained" component="label">
                                        Chọn ảnh
                                        <input hidden type="file" onChange={(e) => handleUploadImage(e)} />
                                    </Button>
                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                        <input
                                            hidden
                                            accept="image/*"
                                            type="file"
                                            onChange={(e) => handleUploadImage(e)}
                                        />
                                        <PhotoCamera />
                                    </IconButton>
                                </div>

                                <div className="title">
                                    <div>Dụng lượng file tối đa 1 MB</div>

                                    <div>Định dạng:.JPEG, .PNG</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Helmet>
    );
};

export default Profile;
