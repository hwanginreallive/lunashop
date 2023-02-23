const SummaryPayment = ({ cartProducts }) => {
    const totalPrice = cartProducts.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.product.price),
        0,
    );
    return (
        <div className="summary-payment">
            <h2 className="title">Tóm tắt đơn hàng</h2>
            {cartProducts.map((item) => (
                <div key={item._id} className="summary-payment__box">
                    <img src={item.product.images[0]} alt="image123" />
                    <div className="item">
                        <span>Giá sản phẩm: </span>
                        <span>{item.product.price}</span>
                    </div>
                    <div className="item">
                        <span>Số lượng: </span>
                        <span>{item.quantity}</span>
                    </div>
                    <div className="item">
                        <span>Tổng tiền: </span>
                        <span>{item.product.price * item.quantity}</span>
                    </div>
                </div>
            ))}

            <div className="total-price">
                <div className="item">
                    <span>Vận chuyển: </span>
                    <span>30000</span>
                </div>
                <div className="item">
                    <span>Tổng cộng: </span>
                    <span> {totalPrice + 30000}</span>
                </div>
            </div>
        </div>
    );
};

export default SummaryPayment;
