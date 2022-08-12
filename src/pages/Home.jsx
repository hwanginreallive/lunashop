import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from '~/components/Helmet';
import HeroSlider from '~/components/HeroSlider';
import Section, { SectionTitle, SectionBody } from '~/components/Section';
import PolicyCard from '~/components/PolicyCard';
import Grid from '~/components/Grid';

import heroSliderData from '~/assets/fake-data/hero-slider';
import policy from '~/assets/fake-data/policy';
import productData from '~/assets/fake-data/products';
import ProductCard from '~/components/ProductCard';
import banner from '~/assets/images/banner.png';
import SliderProduct from '~/components/SliderProduct';

const Home = () => {
    return (
        <Helmet title="Trang chủ">
            <HeroSlider data={heroSliderData} control={true} auto={true} timeOut={5000}></HeroSlider>
            {/* Policy-card */}
            <Section>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {policy.map((item, index) => (
                            <Link to="/policy" key={index}>
                                <PolicyCard
                                    name={item.name}
                                    description={item.description}
                                    icon={item.icon}
                                ></PolicyCard>
                            </Link>
                        ))}
                    </Grid>
                </SectionBody>
            </Section>

            {/* item of week */}
            <Section>
                <SectionTitle>Top sản phẩm bán chạy trong tuần</SectionTitle>
                <SectionBody>
                    <SliderProduct></SliderProduct>
                </SectionBody>
            </Section>

            {/* new item */}
            <Section>
                <SectionTitle>Sản phẩm mới</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {productData.getProducts(4).map((item, index) => (
                            <ProductCard
                                key={index}
                                img01={item.image01}
                                img02={item.image02}
                                name={item.title}
                                price={Number(item.price)}
                                slug={item.slug}
                            ></ProductCard>
                        ))}
                    </Grid>
                </SectionBody>
            </Section>
            <Section>
                <SectionBody>
                    <Link to="/catalog">
                        <img src={banner} alt="" />
                    </Link>
                </SectionBody>
            </Section>
            {/* popular  */}
            <Section>
                <SectionTitle>Phổ biến</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
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
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
    );
};

export default Home;
