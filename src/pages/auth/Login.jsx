import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import WarningIcon from '@mui/icons-material/Warning';
import { Button, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import logo from '~/assets/images/logo-3.png';
import { notifyError, notifySuccess } from '~/components/Toasts/Toast';
import { useLoginMutation } from '~/redux/api/auth/authApiSlice';
import { setCredentials } from '~/redux/api/auth/authSlice';
import { setLayout } from '~/redux/slices/layout/layoutConfigSlice';
import { removeAllItems } from '~/redux/slices/shopping-cart/cartItemsSlide';
import SignIn from './sign-in';

import Grow from '@mui/material/Grow';
const Login = () => {
    const schema = yup.object({
        username: yup.string().required('Tên tài khoản hoặc số điện thoại di động bạn đã nhập không đúng'),
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
    const [changeView, setChangeView] = useState(true);

    const [login, { isSuccess, isError }] = useLoginMutation();

    const dispatch = useDispatch();

    const history = useNavigate();

    const onSubmit = async (data) => {
        const userData = await login(data);
        if (userData.data) {
            localStorage.setItem('token', JSON.stringify(userData.data));
            dispatch(
                setCredentials({
                    ...userData.data,
                    user: data.username,
                }),
            );
            dispatch(removeAllItems());
        }
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
                <Button
                    sx={{
                        position: 'absolute',
                        top: -100,
                        left: 0,
                    }}
                    startIcon={<ArrowBackIcon fontSize="small" />}
                    onClick={() => history(-1)}
                >
                    Quay lại
                </Button>
                <img src={logo} alt="" />
                <p>Đem cả thế giớ thời trang đến bạn</p>
            </div>

            <div className="form-box">
                <div className="button">
                    <Button
                        size="large"
                        variant={changeView ? 'contained' : 'text'}
                        onClick={() => setChangeView(true)}
                    >
                        Đăng nhập
                    </Button>
                    <Button
                        size="large"
                        variant={!changeView ? 'contained' : 'text'}
                        onClick={() => setChangeView(false)}
                    >
                        Đăng ký
                    </Button>
                </div>

                {changeView ? (
                    <Grow
                        in={changeView}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(changeView ? { timeout: 1000 } : {})}
                    >
                        <div>
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
                                                error={!!errors.username}
                                                helperText={errors.username?.message}
                                                autoComplete="current-username"
                                                label="Nhập Email"
                                                style={{
                                                    minWidth: '300px',
                                                }}
                                                FormHelperTextProps={{
                                                    style: {
                                                        fontSize: '14px',
                                                    },
                                                }}
                                                InputProps={{
                                                    endAdornment: !!errors.username && (
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
                                                sx={{
                                                    '.css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
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
                                                label="Mật khẩu"
                                                type={typeInput}
                                                autoComplete="current-password"
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
                                                sx={{
                                                    '.css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
                                                        fontSize: '14px',
                                                    },
                                                }}
                                                {...field}
                                            />
                                        );
                                    }}
                                />

                                <button type="submit" className="btn-submit">
                                    Đăng nhập
                                </button>
                                <Link to="/"> Quên mật khẩu</Link>
                            </form>
                        </div>
                    </Grow>
                ) : (
                    <SignIn
                        setChangeView={setChangeView}
                        dispatch={dispatch}
                        setCredentials={setCredentials}
                        login={login}
                    />
                )}
            </div>
        </div>
    );
};

export default Login;
