import { Rating } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

import EmptyProductSlide from './EmptyProductSlide';
import PurchaseItem from './PurchaseItem';

const Shipped = ({ product }) => {
    const [value, setValue] = useState(5);

    return (
        <div>
            {product.length > 0 ? (
                product.map((item, index) => (
                    <div key={index}>
                        <PurchaseItem item={item} Shipped stardust>
                            <Rating
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </PurchaseItem>
                    </div>
                ))
            ) : (
                <EmptyProductSlide></EmptyProductSlide>
            )}
        </div>
    );
};

Shipped.propTypes = {
    product: PropTypes.array,
};

export default Shipped;
