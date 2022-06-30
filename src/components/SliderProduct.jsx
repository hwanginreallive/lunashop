import React from 'react';
import productData from '~/assets/fake-data/products';
import ProductCard from './ProductCard';
import { FcNext, FcPrevious } from 'react-icons/fc';
import Slider from 'react-slick';
import { BiNoEntry } from 'react-icons/bi';

const SliderProduct = () => {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={className} style={{ fontSize: '2.5rem' }} onClick={onClick}>
                <FcNext></FcNext>
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={className} style={{ fontSize: '2.5rem' }} onClick={onClick}>
                <FcPrevious></FcPrevious>
            </div>
        );
    }

    var settings = {
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <SampleNextArrow className="next" />,
        prevArrow: <SamplePrevArrow className="prev" />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <Slider {...settings}>
            {productData.getProducts(8).map((item, index) => (
                <ProductCard
                    key={index}
                    img01={item.image01}
                    img02={item.image02}
                    name={item.title}
                    price={Number(item.price)}
                    slug={item.slug}
                ></ProductCard>
            ))}
        </Slider>
    );
};

export default SliderProduct;
