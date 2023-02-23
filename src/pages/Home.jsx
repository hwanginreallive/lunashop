import { Link } from 'react-router-dom';

import Grid from '~/components/Grid/Grid';
import Helmet from '~/components/Helmet/Helmet';
import HeroSlider from '~/components/HeroSlider/HeroSlider';
import PolicyCard from '~/components/PolicyCard/PolicyCard';
import ProductCard from '~/components/Product/ProductCard';
import SliderProduct from '~/components/Product/SliderProduct';
import Section, { SectionBody, SectionTitle } from '~/components/Section/Section';

import heroSliderData from '~/assets/fake-data/hero-slider';
import policy from '~/assets/fake-data/policy';
import productData from '~/assets/fake-data/products';
import banner from '~/assets/images/banner.png';

import { useGetListProductsQuery } from '~/redux/api/productApi/productApi';
const Home = () => {
    const { data } = useGetListProductsQuery() || [];

    const dataBySectionPopular = productData.getProductBySection(data, 'hot');

    return (
        <Helmet title="Trang chủ">
            <HeroSlider data={heroSliderData} control={true} auto={true} timeOut={5000} />
            {/* Policy-card */}
            <Section>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {policy.map((item, index) => (
                            <Link to="/policy" key={index}>
                                <PolicyCard name={item.name} description={item.description} icon={item.icon} />
                            </Link>
                        ))}
                    </Grid>
                </SectionBody>
            </Section>

            {/* item of week */}
            <Section>
                <SectionTitle>Top sản phẩm bán chạy trong tuần</SectionTitle>
                <SectionBody>
                    <SliderProduct productData={data} />
                </SectionBody>
            </Section>

            {/* new item */}
            <Section>
                <SectionTitle>Sản phẩm mới</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {data?.map((item, index) => (
                            <ProductCard
                                key={index}
                                images={item.images}
                                name={item.title}
                                price={Number(item.price)}
                                slug={item.slug}
                            />
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
                        {dataBySectionPopular?.map((item, index) => (
                            <ProductCard
                                key={index}
                                images={item.images}
                                name={item.title}
                                price={Number(item.price)}
                                slug={item.slug}
                            />
                        ))}
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
    );
};

export default Home;
