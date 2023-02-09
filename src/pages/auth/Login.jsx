import { InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import logo from '~/assets/images/logo-3.png';

import { yupResolver } from '@hookform/resolvers/yup';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import WarningIcon from '@mui/icons-material/Warning';
import { useDispatch } from 'react-redux';
import { notifyError, notifySuccess } from '~/components/Toasts/Toast';
import { useLoginMutation } from '~/redux/api/auth/authApiSlice';
import { setCredentials } from '~/redux/api/auth/authSlice';
import { setLayout } from '~/redux/slices/layout/layoutConfigSlice';
const Login = () => {
    const schema = yup.object({
        username: yup.string().required('Địa chỉ email hoặc số điện thoại di động bạn đã nhập không đúng'),
    });
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const [typeInput, setTypeInput] = useState('password');

    const [login, { isSuccess, isError }] = useLoginMutation();

    const dispatch = useDispatch();

    const history = useNavigate();

    const onSubmit = async (data) => {
        const userData = await login(data);
        if (userData) localStorage.setItem('token', JSON.stringify(userData.data));
        dispatch(
            setCredentials({
                ...userData.data,
                user: data.username,
            }),
        );
    };

    const handleShowPass = () => {
        typeInput === 'password' ? setTypeInput('text') : setTypeInput('password');
    };

    useEffect(() => {
        if (isSuccess) {
            history('/');
            dispatch(
                setLayout({
                    header: true,
                    footer: true,
                }),
            );
            notifySuccess('Đăng nhập thành công!');
        }
    }, [isSuccess, dispatch, history]);

    useEffect(() => {
        if (isError) {
            notifyError('Đăng nhập thất bại!');
        }
    }, [isError]);

    return (
        <div className="box">
            <div className="title-box">
                <img src={logo} alt="" />
                <p>Đem cả thế giớ thời trang đến bạn</p>
            </div>
            <div className="form-box">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => {
                            return (
                                <TextField
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    placeholder="Nhập Email"
                                    style={{
                                        minWidth: '300px',
                                    }}
                                    FormHelperTextProps={{
                                        style: {
                                            fontSize: '14px',
                                        },
                                    }}
                                    InputProps={{
                                        endAdornment: !!errors.email && (
                                            <InputAdornment position="end">
                                                <WarningIcon
                                                    style={{
                                                        color: '#fa3c3c',
                                                    }}
                                                />
                                            </InputAdornment>
                                        ),
                                        style: {
                                            font: 'sans-serif',
                                            fontSize: '14px',
                                        },
                                    }}
                                    {...field}
                                />
                            );
                        }}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => {
                            return (
                                <TextField
                                    placeholder="Mật khẩu"
                                    type={typeInput}
                                    InputProps={{
                                        endAdornment: field.value && (
                                            <InputAdornment
                                                position="end"
                                                style={{ cursor: 'pointer' }}
                                                onClick={handleShowPass}
                                            >
                                                <RemoveRedEyeIcon />
                                            </InputAdornment>
                                        ),
                                        style: {
                                            font: 'sans-serif',
                                            fontSize: '14px',
                                        },
                                    }}
                                    style={{
                                        minWidth: '300px',
                                    }}
                                    {...field}
                                />
                            );
                        }}
                    />

                    <button type="submit" className="btn-submit">
                        Log In
                    </button>
                    <Link to="/">Forgotten Password</Link>
                </form>
                <hr />
                <div className="create-btn">
                    <Link to="/">Create new account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
