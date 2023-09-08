import PropTypes from 'prop-types';

import EmptyProductSlide from './EmptyProductSlide';
import PurchaseItem from './PurchaseItem';

const Deny = ({ product }) => {
    return (
        <div>
            {product.length > 0 ? (
                product.map((item, index) => <PurchaseItem item={item} key={index} Deny></PurchaseItem>)
            ) : (
                <EmptyProductSlide />
            )}
        </div>
    );
};

Deny.propTypes = {
    product: PropTypes.array,
};

export default Deny;
