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
import { removeItem } from '~/redux/slices/shopping-cart/cartItemsSlide';
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
        district: yup.string().required('Vui lòng chọn tỉnh / thành phố'),
        ward: yup.string().required('Vui lòng chọn quận / huyện'),
    });
    const {
        handleSubmit,
        formState: { errors, isDirty },
        control,
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

    const [create, { isError, isSuccess }] = useCreateOrderMutation();
    const { data: dataCart, refetch } = useGetCartByUserQuery(
        { id: userCookies?.id },
        { refetchOnMountOrArgChange: true },
    );

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
    useEffect(() => {
        if (dataCart) {
            const dataCartFilter = dataCart.filter((item) => item.isOrder === false);
            setCartProduct(dataCartFilter);
        }
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
        dispatch(
            removeItem({
                ...cartProducts[0],
            }),
        );
        const cartTotal = cartProducts.reduce(
            (total, item) => total + Number(item.quantity) * Number(item.product.price),
            0,
        );
        const cartId = cartProducts.map((item) => item._id);
        const dataPush = {
            ...data,
            cart: cartId,
            price: cartTotal + 30000,
            user: userCookies.id,
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
        if (isSuccess) {
            notifySuccess('đặt hàng thành công');
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
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel
                                sx={{
                                    '.MuiStepLabel-labelContainer span ': {
                                        fontSize: '16px',
                                    },
                                }}
                                {...labelProps}
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

                <Button
                    onClick={handleNext}
                    // type={activeStep === 2 ? 'submit' : 'button'}
                    variant="contained"
                    size="medium"
                >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>
        </form>
    );
}
