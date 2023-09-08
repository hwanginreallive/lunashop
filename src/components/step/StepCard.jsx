import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useGetCartByUserQuery } from '~/redux/api/cartApi/cartApi';
import { useCreateOrderMutation } from '~/redux/api/orderApi/orderApi';
import { useGetListProductsQuery } from '~/redux/api/productApi/productApi';
import { useGetUserByIdQuery } from '~/redux/api/userApi/userApi';
import { removeAllItems } from '~/redux/slices/shopping-cart/cartItemsSlide';
import FormInput from '../FormInput/FormInput';
import QrPayment from '../QrPay/QrPayment';
import { notifySuccess } from '../Toasts/Toast';
const steps = ['Địa chỉ', 'Thanh toán'];

export default function StepCard() {
    const schema = yup.object({
        name: yup.string().required('Vui lòng nhập họ tên'),
        phone: yup.string().required('Vui lòng nhập số điện thoại'),
        location: yup.string().required('Vui lòng nhập địa chỉ'),
        city: yup.string().required('Vui lòng chọn tỉnh / thành phố'),
        district: yup.string().required('Vui lòng chọn quận / huyện'),
        ward: yup.string().required('Vui lòng chọn xã / phường'),
    });
    const {
        handleSubmit,
        formState: { errors, isDirty },
        control,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            phone: '',
            address: '',
            location: '',
            city: '',
            district: '',
            ward: '',
            paymentMethod: 'cod',
        },
    });

    const userCookies = localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token')) : null;
    const userCart = JSON.parse(localStorage.getItem('cartItems'));

    const [create, { isError, isSuccess }] = useCreateOrderMutation();
    const { data: dataCart, refetch } = useGetCartByUserQuery(
        { id: userCookies?.id },
        { refetchOnMountOrArgChange: true },
    );
    const { data: listCart } = useGetListProductsQuery({ refetchOnMountOrArgChange: true }) || [];
    const { data: userData } = useGetUserByIdQuery({ id: userCookies?.id }, { refetchOnMountOrArgChange: true }) || [];

    const [cartProducts, setCartProduct] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [, setSelectedCity] = useState('');
    const [, setSelectedDistrict] = useState('');
    const [, setSelectedWard] = useState('');

    const dispatch = useDispatch();

    const history = useNavigate();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep < 2 ? prevActiveStep + 1 : prevActiveStep));
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const onSubmit = (data) => {
        const filterCity = city.find((item) => item.Id === data.city);
        const filterDistrict = filterCity.Districts.find((item) => item.Id === data.district);
        const filterWard = filterDistrict.Wards.find((item) => item.Id === data.ward);

        const cartTotal = cartProducts.reduce(
            (total, item) => total + Number(item.quantity) * Number(item.product.price),
            0,
        );
        const cartId = cartProducts.map((item) => item._id);
        const dataPush = {
            ...data,
            cart: cartId,
            price: cartTotal + 30000,
            user: userCookies?.id,
            address: [
                {
                    city: filterCity.Name,
                },
                {
                    district: filterDistrict.Name,
                },
                {
                    ward: filterWard.Name,
                },
            ],
        };
        delete dataPush.city;
        delete dataPush.district;
        delete dataPush.ward;
        create(dataPush);
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        const selectedData = city.filter((city) => city.Id === e.target.value)[0];
        setDistrict(selectedData.Districts);
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        const selectedData = district.filter((district) => district.Id === e.target.value)[0];
        setWard(selectedData.Wards);
    };

    const handleWardChange = (event) => {
        setSelectedWard(event.target.value);
    };

    useEffect(() => {
        if (dataCart) {
            const dataCartFilter = dataCart.filter((item) => item.isOrder === false);
            setCartProduct(dataCartFilter);
        } else if (listCart) {
            const dataStore = userCart?.map((cart) => {
                const data = listCart.find((item) => item._id === cart.id);
                return {
                    product: data,
                    _id: userCart._id,
                    ...cart,
                };
            });
            setCartProduct(dataStore);
        }
        // eslint-disable-next-line
    }, [dataCart]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json',
            );
            const data = await response.json();
            setCity(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (userData) {
            setValue('name', userData?.name);
            setValue('phone', userData?.phone);
        }
        // eslint-disable-next-line
    }, [userData]);

    useEffect(() => {
        if (isSuccess) {
            notifySuccess('đặt hàng thành công');
            dispatch(removeAllItems());
            history('/');
            refetch();
        }
        // eslint-disable-next-line
    }, [isSuccess]);

    useEffect(() => {
        if (isError) notifySuccess('đặt hàng thất bại');
    }, [isError]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="step-card">
            <Stepper
                sx={{
                    padding: '30px 0',
                }}
                activeStep={activeStep}
            >
                {steps.map((label) => {
                    return (
                        <Step key={label}>
                            <StepLabel
                                sx={{
                                    '.MuiStepLabel-labelContainer span ': {
                                        fontSize: '16px',
                                    },
                                }}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === 0 ? (
                <FormInput
                    control={control}
                    errors={errors}
                    handleDistrictChange={handleDistrictChange}
                    handleCityChange={handleCityChange}
                    handleWardChange={handleWardChange}
                    city={city}
                    district={district}
                    ward={ward}
                    isDirty={isDirty}
                    cartProducts={cartProducts}
                />
            ) : (
                <QrPayment />
            )}
            <div className="step-card__btn">
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    size="medium"
                    variant="contained"
                >
                    Back
                </Button>

                <Button onClick={handleNext} variant="contained" size="medium">
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>
        </form>
    );
}
