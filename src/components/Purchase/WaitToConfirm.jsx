import PropTypes from 'prop-types';

import EmptyProductSlide from './EmptyProductSlide';
import PurchaseItem from './PurchaseItem';
const WaitToConfirm = ({ product }) => {
    return (
        <div>
            {product.length > 0 ? (
                product.map((item, index) => <PurchaseItem item={item} key={index} Confirm></PurchaseItem>)
            ) : (
                <EmptyProductSlide />
            )}
        </div>
    );
};

WaitToConfirm.propTypes = {
    product: PropTypes.array,
};

export default WaitToConfirm;
