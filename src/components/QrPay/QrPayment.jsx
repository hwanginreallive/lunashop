import qrPay from '~/assets/images/qr_image.png';
const QrPayment = ({ totalPrice }) => {
    return (
        <div className="qr-payment">
            <div className="left">
                <h2 className="title">Thông tin đơn hàng</h2>
                <div className="box-payment">
                    <div className="label">Số tiền thanh toán</div>
                    <div className="content">{totalPrice}</div>
                </div>
                <div className="box-payment">
                    <div className="label">Giá trị đơn hàng</div>
                    <div className="content">{totalPrice}</div>
                </div>
                <div className="box-payment">
                    <div className="label">Phí giao dịch</div>
                    <div className="content">0VND</div>
                </div>
                <div className="box-payment">
                    <div className="label">Mã đơn hàng</div>
                    <div className="content">000003539</div>
                </div>
                <div className="box-payment">
                    <div className="label">Nhà cung cấp</div>
                    <div className="content">CÔNG TY CỔ PHẦN THƯƠNG MẠI LUNA</div>
                </div>
            </div>
            <div className="right">
                <h2 className="title">Quét mã qua ứng dụng Ngân hàng/ Ví điện tử</h2>
                <div className="content">
                    <img src={qrPay} />
                </div>
            </div>
        </div>
    );
};

export default QrPayment;
