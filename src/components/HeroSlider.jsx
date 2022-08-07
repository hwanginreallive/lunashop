import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdOutlineArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md';
import Button from './Button';

const HeroSlider = (props) => {
    const data = props.data;

    const timeOut = props.timeOut ? props.timeOut : 3000;

    const [activeSlide, setActiveSlide] = useState(0);

    const prevSlide = () => {
        const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1;
        setActiveSlide(index);
    };

    const nextSlide = useCallback(() => {
        const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1;
        setActiveSlide(index);
    }, [activeSlide, data]);

    useEffect(() => {
        if (props.auto) {
            const slideAuto = setInterval(() => {
                nextSlide();
            }, timeOut);
            return () => {
                clearInterval(slideAuto);
            };
        }
    }, [nextSlide, timeOut, props]);

    return (
        <div className="hero-slider">
            {data.map((item, index) => (
                <HeaderSliderItem key={index} item={item} active={index === activeSlide}></HeaderSliderItem>
            ))}
            {props.control ? (
                <div className="hero-slider__control">
                    <div className="hero-slider__control__item-left" onClick={prevSlide}>
                        <MdArrowBackIosNew></MdArrowBackIosNew>
                    </div>

                    <div className="hero-slider__control__item-right" onClick={nextSlide}>
                        <MdOutlineArrowForwardIos></MdOutlineArrowForwardIos>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

HeroSlider.propTypes = {
    data: PropTypes.array.isRequired,
    control: PropTypes.bool,
    auto: PropTypes.bool,
    timeOut: PropTypes.number,
};

const HeaderSliderItem = (props) => (
    <div className={`hero-slider__item ${props.active ? 'active' : ' '}`}>
        <div className="hero-slider__item__info">
            <div className={`hero-slider__item__info__title color-${props.item.color}`}>
                <span>{props.item.title}</span>
            </div>
            <div className="hero-slider__item__info__description">
                <span>{props.item.description}</span>
            </div>
            <div className={`hero-slider__item__info__btn color-${props.item.color}`}>
                <Link to={props.item.path}>
                    <Button backGroundColor={props.item.color} animate>
                        Xem chi tiết
                    </Button>
                </Link>
            </div>
        </div>
        <div className="hero-slider__item__image">
            <div className={`shape bg-${props.item.color}`}></div>
            <img src={props.item.img} alt={props.item.title} />
        </div>
    </div>
);

export default HeroSlider;
