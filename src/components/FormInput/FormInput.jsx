import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import momo from '~/assets/images/momo.png';
import shopeePay from '~/assets/images/shopeepay.webp';
import vnPay from '~/assets/images/vnpay.png';
import zaloPay from '~/assets/images/zalopay.png';
import SelectMui from '../FormInput/SelectMui';
import SummaryPayment from '../SumaryPayment/SummaryPayment';
const FormInput = ({
    control,
    errors,
    city,
    district,
    ward,
    handleWardChange,
    handleDistrictChange,
    handleCityChange,
    isDirty,
    cartProducts,
}) => {
    const styleValidate = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: errors?.name && '#e95749',
            },
            '&:hover fieldset': {
                borderColor: errors?.name && '#e95749',
            },
            '& .MuiFormHelperText-root': {
                color: errors?.name && '#e95749',
            },
        },
    };
    return (
        <div className="custom-form">
            <div className="form">
                <div className="row">
                    <div className="col">
                        <h3 className="title">Thông tin khách hàng</h3>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <TextField
                                        inputProps={{
                                            style: { fontSize: 16 },
                                        }}
                                        fullWidth
                                        sx={styleValidate}
                                        id="outlined-basic"
                                        placeholder="Họ tên"
                                        errors={errors}
                                        helperText={errors.name?.message}
                                        variant="outlined"
                                        {...field}
                                    />
                                );
                            }}
                        />
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <TextField
                                        inputProps={{
                                            style: { fontSize: 16 },
                                        }}
                                        fullWidth
                                        type="number"
                                        sx={styleValidate}
                                        placeholder="Số điện thoại"
                                        errors={errors}
                                        helperText={errors.phone?.message}
                                        {...field}
                                        variant="outlined"
                                    />
                                );
                            }}
                        />

                        <SelectMui
                            data={city}
                            name="city"
                            control={control}
                            errors={errors.city?.message}
                            handleChange={handleCityChange}
                            placeholder="Tỉnh / Thành phố"
                        />
                        <SelectMui
                            data={district}
                            name="district"
                            errors={errors.district?.message}
                            control={control}
                            handleChange={handleDistrictChange}
                            placeholder="Quận / Huyện"
                        />
                        <SelectMui
                            data={ward}
                            name="ward"
                            errors={errors.ward?.message}
                            control={control}
                            handleChange={handleWardChange}
                            placeholder="Xã / Phường"
                        />
                        <Controller
                            name="location"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <TextField
                                        inputProps={{
                                            style: { fontSize: 16 },
                                        }}
                                        fullWidth
                                        sx={styleValidate}
                                        placeholder="Địa chỉ"
                                        errors={errors}
                                        helperText={errors.location?.message}
                                        {...field}
                                        variant="outlined"
                                    />
                                );
                            }}
                        />
                    </div>

                    <div className="col">
                        <h3 className="title">Phương thức thanh toán</h3>
                        <Controller
                            control={control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <RadioGroup className="col" {...field}>
                                    <FormControlLabel
                                        value="cod"
                                        control={<Radio />}
                                        label={
                                            <div className="payment">
                                                <span>Thanh toán khi nhận hàng(COD)</span>
                                            </div>
                                        }
                                    />
                                    <FormControlLabel
                                        value="vnpay"
                                        control={<Radio />}
                                        label={
                                            <div className="payment">
                                                <img src={vnPay} alt="" />
                                                <span>VNPAY</span>
                                            </div>
                                        }
                                    />
                                    <FormControlLabel
                                        value="shopeePay"
                                        control={<Radio />}
                                        label={
                                            <div className="payment">
                                                <img src={shopeePay} alt="" />
                                                <span>shopeePay</span>
                                            </div>
                                        }
                                    />
                                    <FormControlLabel
                                        value="momo"
                                        control={<Radio />}
                                        label={
                                            <div className="payment">
                                                <img src={momo} alt="" />
                                                <span>Ví momo</span>
                                            </div>
                                        }
                                    />
                                    <FormControlLabel
                                        value="zaloPay"
                                        control={<Radio />}
                                        label={
                                            <div className="payment">
                                                <img src={zaloPay} alt="" />
                                                <span>zaloPay</span>
                                            </div>
                                        }
                                    />
                                </RadioGroup>
                            )}
                        />
                    </div>
                    <div className="col">
                        <SummaryPayment cartProducts={cartProducts} />
                    </div>
                    <Button variant="contained" disabled={!isDirty} fullWidth size="large" type="submit">
                        Xác nhận
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FormInput;
