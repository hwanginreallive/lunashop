import PropTypes from 'prop-types';
import EmptyProductSlide from './EmptyProductSlide';
import PurchaseItem from './PurchaseItem';
const Shipping = ({ product }) => {
    return (
        <div>
            {product.length > 0 ? (
                product.map((item, index) => (
                    <div key={index}>
                        <PurchaseItem item={item} Shipping></PurchaseItem>
                    </div>
                ))
            ) : (
                <EmptyProductSlide />
            )}
        </div>
    );
};

Shipping.propTypes = {
    product: PropTypes.array,
};

export default Shipping;
