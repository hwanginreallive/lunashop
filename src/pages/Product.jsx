import React, { useEffect } from 'react';

import Helmet from '~/components/Helmet/Helmet';
import Section, { SectionTitle, SectionBody } from '~/components/Section/Section';
import Grid from '~/components/Grid/Grid';
import ProductCard from '~/components/Product/ProductCard';
import ProductView from '~/components/Product/ProductView';

import productData from '~/assets/fake-data/products';

const Product = (props) => {
    const product = productData.getProductBySlug(props.match.params.slug);

    const relateProducts = productData.getProducts(8);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);

    return (
        <Helmet title={product.title}>
            <Section>
                <SectionBody>
                    <ProductView product={product} />
                </SectionBody>
                <Section>
                    <SectionTitle>Kham pha them</SectionTitle>
                    <SectionBody>
                        <Grid col={4} mdCol={2} smCol={1} gap={20}>
                            {relateProducts.map((item, index) => (
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
            </Section>
        </Helmet>
    );
};

export default Product;
