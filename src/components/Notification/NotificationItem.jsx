import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

const NotificationItem = (props) => {
    return (
        <div className="item">
            <div className="item__img">
                <Link to={`/catalog/${props.product.slug}`}>
                    <img src={props.product.image01} alt="" />
                </Link>
            </div>
            <div className="item__title">
                <h5>{props.product.display}</h5>
                <div>
                    Kiện hàng <label>SPXVN022409588646</label> của đơn hàng <label>22062706KFD2HF</label>
                    <div>Đã giao thành công đến bạn</div>
                </div>
            </div>
            <Link to={`/catalog/${props.product.slug}`}>
                <Button variant="contained" size="large">
                    Xem chi tiết đơn hàng
                </Button>
            </Link>
        </div>
    );
};

export default NotificationItem;
