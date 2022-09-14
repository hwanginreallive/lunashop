import React, { useState } from 'react';

import { Tabs, Tab, Typography, TextField, Fab } from '@mui/material';

import Helmet from '../Helmet/Helmet';
import InfoUser from '../User/infoUser';
import AllVouchers from './VouchersContent/AllVouchers';
import RefundVoucher from './VouchersContent/RefundVoucher';
import FreeShipVoucher from './VouchersContent/FreeShipVoucher';
import DiscountVoucher from './VouchersContent/DiscountVoucher';
import { AiOutlineSearch } from 'react-icons/ai';
const Voucher = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    return (
        <Helmet title="Mã giảm giá">
            <div className="profile">
                <div className="profile__left">
                    <InfoUser></InfoUser>
                </div>
                <div className="profile__right">
                    <Typography variant="h5">Kho voucher</Typography>
                    <div className="profile__right__search">
                        <div className="profile__right__search__input">
                            <TextField
                                id="outlined-basic"
                                label="Nhập mã voucher"
                                variant="outlined"
                                style={{ width: '60%' }}
                            />
                            <div className="profile__right__search__input__btn">
                                <Fab color="primary">
                                    <AiOutlineSearch style={{ fontSize: 26 }} />
                                </Fab>
                            </div>
                        </div>
                    </div>
                    <div className="profile__right__nav">
                        <Tabs value={selectedTab} onChange={handleChange}>
                            <Tab label="Tất cả" />
                            <Tab label="FreeShip" />
                            <Tab label="Hoàn Xu" />
                            <Tab label="Giảm giá" />
                        </Tabs>
                    </div>
                    <div className="profile__right__content">
                        {selectedTab === 0 && <AllVouchers></AllVouchers>}
                        {selectedTab === 1 && <FreeShipVoucher></FreeShipVoucher>}
                        {selectedTab === 2 && <RefundVoucher></RefundVoucher>}
                        {selectedTab === 3 && <DiscountVoucher></DiscountVoucher>}
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Voucher;
