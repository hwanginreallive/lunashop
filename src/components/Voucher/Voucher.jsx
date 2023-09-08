import { useState } from 'react';

import { Fab, Tab, Tabs, TextField } from '@mui/material';

import { AiOutlineSearch } from 'react-icons/ai';
import voucherData from '~/assets/fake-data/voucher';
import VoucherDialog from '~/components/ViewDialog/VoucherDialog';
import Helmet from '../Helmet/Helmet';
import InfoUser from '../User/infoUser';
import VoucherItems from './VoucherItems/VoucherItems';

const Voucher = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [dialogVoucherOpen, setDialogVoucherOpen] = useState(false);
    const [voucherId, setVoucherId] = useState('');

    const { getAllVoucher, getVoucherByType, getVoucherById } = voucherData;

    const dataAllVoucher = getAllVoucher();
    const dataFreeShip = getVoucherByType('freeShip');
    const dataRefund = getVoucherByType('refund');
    const dataDiscount = getVoucherByType('discount');
    const dataVoucherById = getVoucherById(voucherId);

    const handleOpenDialog = (id) => {
        setDialogVoucherOpen(true);
        setVoucherId(id);
    };

    const handleCloseDialog = () => {
        setDialogVoucherOpen(false);
    };

    const handleChange = (_event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Helmet title="Mã giảm giá">
            <div className="profile">
                <div className="profile__left">
                    <InfoUser />
                </div>
                <div className="profile__right">
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
                        {selectedTab === 0 && (
                            <VoucherItems data={dataAllVoucher} handleOpenDialog={handleOpenDialog} />
                        )}
                        {selectedTab === 1 && <VoucherItems data={dataFreeShip} handleOpenDialog={handleOpenDialog} />}
                        {selectedTab === 2 && <VoucherItems data={dataRefund} handleOpenDialog={handleOpenDialog} />}
                        {selectedTab === 3 && <VoucherItems data={dataDiscount} handleOpenDialog={handleOpenDialog} />}
                    </div>
                    <VoucherDialog
                        dataVoucherById={dataVoucherById}
                        handleCloseDialog={handleCloseDialog}
                        dialogVoucherOpen={dialogVoucherOpen}
                    />
                </div>
            </div>
        </Helmet>
    );
};

export default Voucher;
