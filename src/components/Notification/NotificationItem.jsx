import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

const NotificationItem = ({ product }) => {
    const [showProductInfo, setShowProductInfo] = useState(false);

    return (
        <>
            <div className="item">
                <div className="item__img">
                    <Link to={`/catalog/${product.slug}`}>
                        <img src={product.image01} alt="" />
                    </Link>
                </div>
                <div className="item__content" onClick={() => setShowProductInfo(!showProductInfo)}>
                    <div className="item__content__title">
                        {showProductInfo ? (
                            <div className="product-info">
                                <div className="product-info__title">Hành trình đơn hàng</div>
                            </div>
                        ) : (
                            <>
                                <h5>{product.display}</h5>
                                <div>
                                    Kiện hàng <label>SPXVN022409588646</label> của đơn hàng{' '}
                                    <label>22062706KFD2HF</label>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="item__content__button">
                        <Button variant="contained" size="large">
                            Xem chi tiết đơn hàng
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationItem;
