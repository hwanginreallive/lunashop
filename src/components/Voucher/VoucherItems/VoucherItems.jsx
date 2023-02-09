import React from 'react';
import { useState } from 'react';
import { Typography, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './VoucherItems.scss';
import VoucherIMG from '~/assets/images/voucher-extra.png';
const VoucherItems = ({ data, handleOpenDialog }) => {
    return (
        <>
            {data.map(({ type, title, voucherValue, startDate, endDate, id }) => {
                const transformStartDate = new Date(startDate);
                const transformEndDate = new Date(endDate);
                const diffDay = (transformEndDate.getTime() - transformStartDate.getTime()) / (1000 * 3600 * 24);
                const diffHour = transformEndDate.getHours() - transformStartDate.getHours();
                const diffMinus = transformEndDate.getMinutes() - transformStartDate.getMinutes();

                return (
                    <div className="voucher-item" key={id}>
                        <div className="voucher-item__left" style={{ backgroundColor: type === 'refund' && '#ee4d2d' }}>
                            <div className="voucher-item__left__label">
                                <Typography variant="subtitle2">Số lượng có hạn</Typography>
                            </div>
                            {type === 'refund' ? (
                                <img src={VoucherIMG} style={{ width: 56 }} alt="voucher"></img>
                            ) : (
                                <div className="voucher-item__left__content">
                                    <Typography variant="h5">{title}</Typography>
                                </div>
                            )}
                        </div>
                        <div className="voucher-item__right">
                            <div className="voucher-item__right__content">
                                <div className="voucher-item__right__content__title">
                                    <Typography variant="h7">Số lượng có hạn</Typography>
                                </div>
                                <div className="voucher-item__right__content__label">
                                    <Button variant="outlined" disableRipple={true}>
                                        {voucherValue}
                                    </Button>
                                </div>
                                <div className="voucher-item__right__content__info">
                                    <Typography variant="subtitle1" style={{ color: '#ff424f' }}>
                                        {diffDay >= 1
                                            ? ` Còn lại ${diffDay} Ngày`
                                            : diffHour >= 1
                                            ? ` Còn lại ${diffHour} giờ`
                                            : ` Còn lại ${diffMinus} phút`}
                                    </Typography>
                                </div>
                            </div>
                            <div className="voucher-item__right__btn">
                                <Button endIcon={<NavigateNextIcon />}>{' Dùng ngay '}</Button>
                                <Button style={{ color: '#ee4d2d' }} onClick={() => handleOpenDialog(id)}>
                                    Điều kiện
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

VoucherItems.propTypes = {};

export default VoucherItems;
