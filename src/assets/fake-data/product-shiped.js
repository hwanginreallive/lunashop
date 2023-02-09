import product_07_image_01 from '../images/products/product-07_1.jpg';
import product_07_image_02 from '../images/products/product-07_2.jpg';

export const products_shipped = [
    {
        color: 'white',
        id: 1,
        price: 189000,
        product: {
            title: 'Áo somi caro 07',
            price: 194000,
            image01: product_07_image_01,
            image02: product_07_image_02,
            categorySlug: 'ao-somi',
            colors: ['white', 'red', 'orange', 'blue'],
            slug: 'ao-somi-caro-07',
            size: ['l', 'xl'],
            description:
                'Sự hiện diện của những chiếc áo thun basic cổ tròn trong tủ đồ của bạn chính là chìa khóa giúp cho bạn có thêm nhiều outfit thú vị mà lại không cần đến quá nhiều món đồ Áo thun nữ cotton cổ tròn basic chính là vũ khí tiện dụng cho các chị em trong trang phục hàng ngày!<br><br><br>Thiết kế đơn giản, form dáng tiện lợi của áo thun PPN4502 Tại sao chỉ với 1 chiếc áo thun nữ basic mà bạn có thể phối với 10 bộ độ khác nhau? Câu trả lời nằm ở chính sự đơn giản của chúng Càng đơn giản, bạn lại càng dễ mix & match với những món đồ khác nhauÁo thun nữ PPM4502 có thiết kế cổ tròn đơn giản, nhẹ nhàng tôn da Tay cáo, form áo cũng không hề cầu kỳ, rất dễ mặc với nhiều thân hình khác nhau Đặc biệt hơn, màu sắc của chiếc áo phông nữ cổ tròn này cũng rất nhã nhặn, trung tính, trơn màu Sự tối giản từ thiết kế, đường may đến bảng màu giúp các chị em không cần đắn đo quá nhiều khi lựa chọn Chất liệu cotton 95% được xử lý nghiêm ngặt, quy trình và công nghệ hiện đại nên mang tới cho chiếc áo sự thoải mái, mềm mại, thoáng mát ngay khi chạm vào Cùng với đó, áo thun nữ cotton cổ tròn Yody có khả năng thâm shuts mồ hôi rất tốt nên người mặc không bị cảm giác bí bách, dính dính trên da khi đổ mồ hôi vào mùa hè Bên cạnh đó, sản phẩm cũng chưa 5% spandex - loại sợi giúp co giãn, đàn hồi hiệu quả thích hợp mặc tới nhiều môi trường, ngay cả khi vận động <br><br><br> Sự hiện diện của những chiếc áo thun basic cổ tròn trong tủ đồ của bạn chính là chìa khóa giúp cho bạn có thêm nhiều outfit thú vị mà lại không cần đến quá nhiều món đồ Áo thun nữ cotton cổ tròn basic chính là vũ khí tiện dụng cho các chị em trong trang phục hàng ngày!<br><br><br>Thiết kế đơn giản, form dáng tiện lợi của áo thun PPN4502 Tại sao chỉ với 1 chiếc áo thun nữ basic mà bạn có thể phối với 10 bộ độ khác nhau? Câu trả lời nằm ở chính sự đơn giản của chúng Càng đơn giản, bạn lại càng dễ mix & match với những món đồ khác nhauÁo thun nữ PPM4502 có thiết kế cổ tròn đơn giản, nhẹ nhàng tôn da Tay cáo, form áo cũng không hề cầu kỳ, rất dễ mặc với nhiều thân hình khác nhau Đặc biệt hơn, màu sắc của chiếc áo phông nữ cổ tròn này cũng rất nhã nhặn, trung tính, trơn màu Sự tối giản từ thiết kế, đường may đến bảng màu giúp các chị em không cần đắn đo quá nhiều khi lựa chọn Chất liệu cotton 95% được xử lý nghiêm ngặt, quy trình và công nghệ hiện đại nên mang tới cho chiếc áo sự thoải mái, mềm mại, thoáng mát ngay khi chạm vào Cùng với đó, áo thun nữ cotton cổ tròn Yody có khả năng thâm shuts mồ hôi rất tốt nên người mặc không bị cảm giác bí bách, dính dính trên da khi đổ mồ hôi vào mùa hè Bên cạnh đó, sản phẩm cũng chưa 5% spandex - loại sợi giúp co giãn, đàn hồi hiệu quả thích hợp mặc tới nhiều môi trường, ngay cả khi vận động',
        },
        quantity: 1,
        size: 's',
        slug: 'ao-somi-caro-07',
    },
];

const getAllProductsShiped = () => products_shipped;

const getProducts = (count) => {
    const start = Math.floor(Math.random() * count);
    return products_shipped.slice(start, start + count);
};

const getProductShipedByID = (id) => products_shipped.find((e) => e.id === id);

const getCartItemsInfo = (cartItems) => {
    let res = [];
    if (cartItems.length > 0) {
        cartItems.forEach((e) => {
            let product = getProductShipedByID(e.id);
            res.push({
                ...e,
                product: product,
            });
        });
    }
    // console.log(res)
    // console.log('sorted')
    // console.log(res.sort((a, b) => a.slug > b.slug ? 1 :(a.slug < b.slug ? -1 : 0)))
    return res.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
};

const productShipedData = {
    getAllProductsShiped,
    getProducts,
    getProductShipedByID,
    getCartItemsInfo,
};

export default productShipedData;