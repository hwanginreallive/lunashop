import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button } from '@mui/material';
import numberWithCommas from '~/utils/numberWithCommas';

const ProductCard = (props) => {
    return (
        <div className="product-card">
            <Link to={`/catalog/${props.slug}`}>
                <div className="product-card__image">
                    {props?.images?.map((image, index) => (
                        <img key={index} src={image} alt="" />
                    ))}
                </div>
                <h3 className="product-card__name">{props.name}</h3>
                <div className="product-card__price">
                    {numberWithCommas(props.price)}
                    <span className="product-card__price__old">
                        <del>{numberWithCommas(399000)}</del>
                    </span>
                </div>
            </Link>
            <div className="product-card__btn">
                <Link to={`/catalog/${props.slug}`}>
                    <Button variant="contained" size="large">
                        chọn mua
                    </Button>
                </Link>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    images: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
};

export default ProductCard;
