import { useParams } from 'react-router-dom';
import productData from '~/assets/fake-data/products';
import Grid from '~/components/Grid/Grid';
import Helmet from '~/components/Helmet/Helmet';
import ProductCard from '~/components/Product/ProductCard';
import ProductView from '~/components/Product/ProductView';
import Section, { SectionBody, SectionTitle } from '~/components/Section/Section';
import { useGetListProductsQuery } from '~/redux/api/productApi/productApi';
const Product = () => {
    const { data } = useGetListProductsQuery();
    const { slug } = useParams();

    const product = productData.getProductBySlug(data, slug);
    const productSection = productData.getProductBySection(data, product?.category);
    return (
        <Helmet title={product?.title}>
            <Section>
                <SectionBody>
                    <ProductView product={product} />
                </SectionBody>
                <Section>
                    <SectionTitle>Kham pha them</SectionTitle>
                    <SectionBody>
                        <Grid col={4} mdCol={2} smCol={1} gap={20}>
                            {productSection?.map((item, index) => (
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
            </Section>
        </Helmet>
    );
};

export default Product;
