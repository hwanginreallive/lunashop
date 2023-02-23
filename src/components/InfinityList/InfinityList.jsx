import Grid from '../Grid/Grid';
import ProductCard from '../Product/ProductCard';
const InfinityList = (props) => {
    return (
        <div>
            <Grid col={3} mdCol={2} smCol={1} gap={20}>
                {props.data?.map((item, index) => (
                    <ProductCard
                        key={index}
                        images={item.images}
                        name={item.title}
                        price={Number(item.price)}
                        slug={item.slug}
                    />
                ))}
            </Grid>
        </div>
    );
};

export default InfinityList;
