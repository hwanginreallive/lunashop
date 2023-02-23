import { yupResolver } from '@hookform/resolvers/yup';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import WarningIcon from '@mui/icons-material/Warning';
import { InputAdornment, TextField } from '@mui/material';
import Grow from '@mui/material/Grow';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { notifyError } from '~/components/Toasts/Toast';
import { useCreateAccountMutation } from '~/redux/api/auth/authApiSlice';
const SignIn = ({ changeView, login, setCredentials, dispatch }) => {
    const schema = yup.object({
        name: yup.string().required('Vui lòng nhập họ tên'),
        username: yup.string().required('Vui lòng nhập tên đăng nhập hoặc số điện thoại'),
        password: yup
            .string()
            .required('Vui lòng nhập mật khẩu')
            .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
            .test('', 'Mật khẩu phải có một chữ viết hoa', (value) =>
                [/[a-z]/, /[A-Z]/].every((pattern) => pattern.test(value)),
            ),
    });
    const {
        handleSubmit,
        formState: { errors },
        setError,
        control,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            username: '',
            password: '',
        },
    });

    const history = useNavigate();
    const [create, { isSuccess, isError, error }] = useCreateAccountMutation();

    const [typeInput, setTypeInput] = useState('password');
    const onSubmit = async (data) => {
        const response = await create(data);
        if (response.data) {
            const userData = await login({
                username: data.username,
                password: data.password,
            });
            if (userData) localStorage.setItem('token', JSON.stringify(userData.data));
            dispatch(
                setCredentials({
                    ...userData.data,
                    user: data.username,
                }),
            );
        }
    };
    const handleShowPass = () => {
        typeInput === 'password' ? setTypeInput('text') : setTypeInput('password');
    };

    useEffect(() => {
        if (isError) {
            notifyError('Tạo tài khoản thất bại!');
        }
    }, [isError]);

    useEffect(() => {
        if (error?.data) setError('username');
    }, [error]);

    return (
        <Grow in={!changeView} style={{ transformOrigin: '0 0 0' }} {...(!changeView ? { timeout: 1000 } : {})}>
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
                        name="name"
                        control={control}
                        render={({ field }) => {
                            return (
                                <TextField
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    placeholder="Họ tên"
                                    style={{
                                        minWidth: '300px',
                                    }}
                                    FormHelperTextProps={{
                                        style: {
                                            fontSize: '14px',
                                        },
                                    }}
                                    InputProps={{
                                        endAdornment: !!errors.name && (
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
                        name="username"
                        control={control}
                        render={({ field }) => {
                            return (
                                <TextField
                                    error={!!errors.username}
                                    helperText={error?.data ? 'Tên đăng nhập đã tồn tại ' : errors.username?.message}
                                    placeholder="Tên đăng nhập"
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
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
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
                                    {...field}
                                />
                            );
                        }}
                    />

                    <button type="submit" className="btn-submit">
                        Đăng ký
                    </button>
                </form>
            </div>
        </Grow>
    );
};

export default SignIn;
