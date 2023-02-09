import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import productData from '~/assets/fake-data/products';
import CartItem from '../CartItem/CartItem';
import FormInput from '../FormInput/FormInput';
import QrPayment from '../QrPay/QrPayment';

const steps = ['Kiểm tra giỏ hàng', 'Địa chỉ', 'Thanh toán'];

export default function StepCard() {
    const schema = yup.object({
        name: yup.string().required('Vui lòng nhập họ tên'),
        phone: yup.string().required('Vui lòng nhập số điện thoại'),
        address: yup.string().required('Vui lòng nhập địa chỉ'),
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
            city: '',
            district: '',
            ward: '',
            paymentMethod: 'cod',
        },
    });
    const [activeStep, setActiveStep] = useState(0);
    const cartItems = useSelector((state) => state.cartItems.value);

    const [cartProducts, setCartProduct] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [, setSelectedCity] = useState('');
    const [, setSelectedDistrict] = useState('');
    const [, setSelectedWard] = useState('');
    useEffect(() => {
        setCartProduct(productData.getCartItemsInfo(cartItems));
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0));
        setTotalPrice(cartItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0));
    }, [cartItems]);

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
        const dataPush = {
            ...data,
            city: filterCity.Name,
            district: filterDistrict.Name,
            ward: filterWard.Name,
        };
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        setSelectedDistrict('');

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
                <>
                    {cartProducts.map((item, index) => (
                        <CartItem item={item} key={index} delete></CartItem>
                    ))}
                </>
            ) : activeStep === 1 ? (
                <FormInput
                    control={control}
                    errors={errors}
                    handleDistrictChange={handleDistrictChange}
                    handleCityChange={handleCityChange}
                    handleWardChange={handleWardChange}
                    city={city}
                />
            ) : (
                <QrPayment totalPrice={totalPrice} />
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
                    type={activeStep === 2 ? 'submit' : 'button'}
                    variant="contained"
                    size="medium"
                >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>
        </form>
    );
}
