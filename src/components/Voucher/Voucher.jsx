import React, { useState } from 'react';

import Helmet from '../Helmet/Helmet';
import InfoUser from '../User/infoUser';
import { Tabs, Tab } from '@mui/material';
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
                    <Tabs value={selectedTab} onChange={handleChange}>
                        <Tab label="Mới nhất" />
                        <Tab label="Phổ biến" />
                        <Tab label="Sắp hết hạn" />
                    </Tabs>
                </div>
            </div>
        </Helmet>
    );
};

export default Voucher;
