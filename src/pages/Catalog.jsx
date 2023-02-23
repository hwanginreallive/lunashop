import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@mui/material';
import Checkbox from '~/components/CheckBox/Checkbox';
import Helmet from '~/components/Helmet/Helmet';
import InfinityList from '~/components/InfinityList/InfinityList';

import category from '~/assets/fake-data/category';
import colors from '~/assets/fake-data/product-colors';
import sizes from '~/assets/fake-data/product-size';

import { CircularProgress, SwipeableDrawer } from '@mui/material';
import { BiX } from 'react-icons/bi';
import { useGetListProductsQuery } from '~/redux/api/productApi/productApi';

const Catalog = () => {
    const { data: productList, isLoading, isSuccess } = useGetListProductsQuery();

    const initFilter = {
        category: [],
        color: [],
        size: [],
    };

    const [products, setProducts] = useState(productList || []);
    const [filter, setFilter] = useState(initFilter);
    const [drawer, setDrawer] = useState(false);

    const clearFilter = () => setFilter(initFilter);

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case 'CATEGORY':
                    setFilter({ ...filter, category: [...filter.category, item.categorySlug] });
                    break;
                case 'COLOR':
                    setFilter({ ...filter, color: [...filter.color, item.key] });
                    break;
                case 'SIZE':
                    setFilter({ ...filter, size: [...filter.size, item.key] });
                    break;
                default:
            }
        } else {
            switch (type) {
                case 'CATEGORY':
                    const newCategory = filter.category.filter((e) => e !== item.categorySlug);
                    setFilter({ ...filter, category: newCategory });
                    break;
                case 'COLOR':
                    const newColor = filter.color.filter((e) => e !== item.key);
                    setFilter({ ...filter, color: newColor });
                    break;
                case 'SIZE':
                    const newSize = filter.size.filter((e) => e !== item.key);
                    setFilter({ ...filter, size: newSize });
                    break;
                default:
            }
        }
    };

    const updateProducts = useCallback(() => {
        let temp = productList;
        if (filter.category.length > 0) {
            temp = temp.filter((e) => filter.category.includes(e.category));
        }

        if (filter.color.length > 0) {
            temp = temp.filter((e) => {
                const check = e.colors.find((color) => filter.color.includes(color.key));
                return check !== undefined;
            });
        }

        if (filter.size.length > 0) {
            temp = temp.filter((e) => {
                const check = e.sizes.find((size) => filter.size.includes(size.key));
                return check !== undefined;
            });
        }
        setProducts(temp);
    }, [filter, productList]);

    useEffect(() => {
        updateProducts();
    }, [updateProducts]);

    const filterRef = useRef(null);

    const showHideFilter = () => {
        filterRef.current.classList.toggle('active');
        setDrawer(!drawer);
    };

    return (
        <Helmet title="Sản phẩm">
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <i className="catalog__filter__exit" onClick={showHideFilter}>
                        <BiX></BiX>
                    </i>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">Danh mục sản phẩm</div>
                        <div className="catalog__filter__widget__content">
                            {category.map((item, index) => (
                                <div key={index} className="catalog__filter__widget__content__item">
                                    <Checkbox
                                        onChange={(input) => filterSelect('CATEGORY', input.checked, item)}
                                        label={item.display}
                                        checked={filter.category.includes(item.categorySlug)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">Màu sắc</div>
                        <div className="catalog__filter__widget__content">
                            {colors.map((item, index) => (
                                <div key={index} className="catalog__filter__widget__content__item">
                                    <Checkbox
                                        onChange={(input) => filterSelect('COLOR', input.checked, item)}
                                        label={item.value}
                                        checked={filter.color.includes(item.key)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">Kích cỡ</div>
                        <div className="catalog__filter__widget__content">
                            {sizes.map((item, index) => (
                                <div key={index} className="catalog__filter__widget__content__item">
                                    <Checkbox
                                        onChange={(input) => filterSelect('SIZE', input.checked, item)}
                                        label={item.value}
                                        checked={filter.size.includes(item.key)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button variant="contained" size="large" onClick={clearFilter}>
                                Xóa bộ lọc
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__toggle">
                    <Button variant="contained" size="large" onClick={showHideFilter}>
                        Filter
                        <SwipeableDrawer
                            open={drawer}
                            onClose={() => setDrawer(false)}
                            onOpen={() => setDrawer(true)}
                        />
                    </Button>
                </div>

                <div className="catalog__content">
                    {!isLoading && isSuccess ? <InfinityList data={products} /> : <CircularProgress />}
                </div>
            </div>
        </Helmet>
    );
};

export default Catalog;
