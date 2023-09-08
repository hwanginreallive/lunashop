import Helmet from '~/components/Helmet/Helmet';

import { AiOutlineSearch } from 'react-icons/ai';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

const questions = [
    {
        question: '[Cảnh báo lừa đảo] Mua sắm an toàn cùng LunaShop',
        answer: (
            <ul>
                <li>
                    Đơn hàng ảo là đơn hàng không có thông tin (mã vận đơn, mã đơn hàng) trên bất kỳ hệ thống đặt hàng
                    trực tuyến nào mà bạn đang sử dụng
                </li>
                <li>
                    Đơn hàng giả mạo đơn hàng đã tạo tại shop là đơn hàng có thông tin giao nhận gần như trùng khớp với
                    đơn hàng (thông tin người nhận, mô tả sản phẩm, số tiền thu hộ...) gần nhất bạn đã/vừa tạo tại shop,
                    tuy nhiên đơn hàng này lại không có ghi nhận mã vận đơn/mã đơn hàng trên hệ thống shop
                </li>
                <li>
                    Đơn hàng giả mạo đơn hàng quà tặng từ shop là đơn hàng được thông báo là quà tặng từ chương trình
                    khuyến mãi nào đó của shop và khi giao đến bạn sẽ có phát sinh thêm phí thu hộ
                </li>
            </ul>
        ),
    },
    {
        question: '[Thành viên mới] Quy trình trả hàng hoàn tiền của LunaShop',
        answer: (
            <ul>
                <li>
                    Người mua sẽ không thể gửi yêu cầu Trả hàng/Hoàn tiền sau khi bấm nút "Đã nhận được hàng" hoặc quá
                    thời gian quy định. Xem thêm điều kiện Trả Hàng/Hoàn Tiền
                </li>
                <li>
                    Người mua cần thực hiện các bước Trả hàng/Hoàn tiền đúng hạn. Nếu không, yêu cầu Trả hàng/Hoàn tiền
                    của bạn sẽ bị hủy tự động/được xử lý theo quy định của shop
                </li>
                <li>Shop sẽ cập nhật tình trạng Trả hàng/Hoàn tiền thường xuyên. Tham khảo hướng dẫn chi tiết</li>
                <li>
                    Shop khuyến khích Người mua và Người bán liên hệ trao đổi với nhau về các phát sinh liên quan đến
                    đơn hàng để nhận được giải quyết nhanh chóng và hiệu quả nhất
                </li>
                <li>
                    Shop chưa hỗ trợ các yêu cầu Trả hàng/Hoàn tiền thuộc về cảm quan/không ưng ý/thay đổi quyết định
                    mua hàng
                </li>
                <li>Trong mọi trường hợp khiếu nại, quyết định của Shop sẽ là quyết định cuối cùng.</li>
            </ul>
        ),
    },
    {
        question: '[Tài khoản LunaShop] Tại sao tôi không nhận được Mã xác minh (OTP)?',
        answer: (
            <>
                <span>1. Lỗi kết nối hoặc lỗi đường truyền</span>
                <p>
                    - Kiểm tra lại kết nối mạng (đối với tin nhắn Zalo) và sóng dịch vụ viễn thông (đối với tin nhắn
                    SMS, Cuộc gọi tự động) trên điện thoại của bạn đảm bảo đủ mạnh.
                </p>
                <p>- Yêu cầu gửi lại Mã xác thực OTP (cho phép tối đa 04 lần)</p>

                <span>2. Số điện thoại liên kết tài khoản không chính xác</span>
                <p>
                    Số điện thoại đúng để nhận được mã xác thực phải là số điện thoại bạn đã dùng để đăng ký tài khoản
                    Shopee. Bạn vui lòng kiểm tra lại thông tin này trong mục Tài khoản của tôi nhằm đảm bảo tài khoản
                    Shopee và số điện thoại liên kết với tài khoản Shopee là chính xác
                </p>

                <span>3. Vượt quá giới hạn số lượt yêu cầu gửi Mã OTP</span>
                <p>
                    Thông báo Yêu cầu OTP không thành công (D06) sẽ được hiển thị khi bạn đã vượt quá số lượt yêu cầu
                    gửi Mã xác thực OTP cho phép (tối đa 04 lần). Giới hạn này được đưa ra nhằm mục đích hạn chế rủi ro
                    tài khoản bị đánh cắp thông tin
                </p>
                <p>Trong trường hợp này, vui lòng đợi 30 phút và thử yêu cầu gửi lại Mã xác thực OTP</p>

                <span>4. Các nguyên nhân khác</span>
                <p>Tài khoản Shopee của bạn không được đăng nhập quá 180 ngày, ...</p>
            </>
        ),
    },
    {
        question:
            '[Thông tin vận chuyển] Làm sao để liên hệ Đơn vị vận chuyển/tra cứu thông tin vận chuyển/hối giao hàng?',
        answer: (
            <ul>
                <li>
                    Hiện Shopee chưa hỗ trợ giao/lấy hàng theo giờ cụ thể hoặc sớm hơn thời gian giao hàng dự kiến được
                    hiển thị trên hành trình đơn hàng
                </li>
                <li>Shopee chưa hỗ trợ cung cấp số điện thoại của shipper/nhân viên giao hàng.</li>
                <li>
                    Trong trường hợp cần yêu cầu kiểm tra tình trạng đơn hàng cập nhật chưa đúng hoặc khiếu nại về các
                    sự cố khi giao/nhận hàng, vui lòng liên hệ với Nhân viên hỗ trợ Shopee
                </li>
            </ul>
        ),
    },
    {
        id: 4,
        question: '[Lỗi] Tại sao tài khoản LunaShop của tôi bị khóa/bị giới hạn?',
        answer: (
            <ul>
                <li>Do hệ thống phát hiện bạn đã đăng nhập vào nhiều tài khoản bằng cùng một thiết bị</li>
                <li>Tạo đơn hàng ảo, đánh giá ảo</li>
                <li>Lạm dụng mã giảm giá, các chương trình trợ giá hoặc khuyến mãi tại Shopee</li>
                <li>Có các hành vi gian lận, lừa đảo gây ảnh hưởng tiêu cực đến người dùng/ chính sách Shopee</li>
            </ul>
        ),
    },
    {
        id: 5,
        question: '[Thành viên mới] Điều kiện Trả hàng/Hoàn tiền của LunaShop',
        answer: (
            <ul style={{ listStyle: 'none' }}>
                <li>
                    <span>1. Thời gian để gửi yêu cầu trả hàng/hoàn tiền cho Shopee</span>
                    <p>7 ngày kể từ lúc đơn hàng được cập nhật trạng thái Lấy hàng thành công</p>
                </li>
                <li>
                    <span>2. Lý do trả hàng/hoàn tiền</span>
                    <p>Hàng nhận được bị thiếu/sai/bể vỡ/không hoạt động/khác mô tả/đã qua sử dụng/giả nhái</p>
                    <p>Chưa nhận được hàng nhưng Shipper đã cập nhật giao hàng thành công</p>
                    <p>Chưa nhận được hàng sau thời gian giao hàng dự kiến</p>
                </li>
                <li>
                    <span>3. Bằng chứng cần cung cấp</span>
                    <p>Hình ảnh/video rõ nét, không mờ, nhòe</p>
                    <p>Chụp/quay cận cảnh lỗi của sản phẩm</p>
                    <p>
                        Cung cấp thêm lịch sử Chat hoặc bằng chứng khác thể hiện bạn đã trao đổi với Người bán (nếu có)
                    </p>
                </li>
                <li>
                    <span>4. Tình trạng của hàng trả lại</span>
                    <p>Đóng gói tất cả sản phẩm cần trả cẩn thận, kỹ càng</p>
                    <p>
                        Gửi trả toàn bộ sản phẩm (bao gồm tất cả phụ kiện đi kèm, hóa đơn VAT, tem phiếu bảo hành... nếu
                        có)
                    </p>
                    <p>Sản phẩm gửi trả phải trong tình trạng như khi nhận hàng</p>
                </li>
                <li>
                    <span>5. Phí trả hàng</span>
                    <p>
                        Nếu bạn chọn lấy hàng hoàn trả tại nhà/trả hàng tại bưu cục ngay trên ứng dụng Shopee: bạn được
                        miễn phí trả hàng
                    </p>
                    <p>Nếu bạn chọn Tự sắp xếp trả hàng: Bạn cần trả trước phí trả hàng cho đơn vị vận chuyển</p>
                </li>
            </ul>
        ),
    },
    {
        id: 6,
        question: '[Mua hàng] Các câu hỏi thường gặp trên LunaShop',
        answer: '[Cảnh báo lừa đảo] Mua sắm an toàn cùng LunaShop',
    },
    {
        id: 7,
        question: '[Thành viên mới] Làm sao để mua hàng / đặt hàng trên ứng dụng LunaShop?',
        answer: '[Cảnh báo lừa đảo] Mua sắm an toàn cùng LunaShop',
    },
];

const Support = () => {
    return (
        <Helmet title="Hỗ trợ">
            <div className="support">
                <div className="support__search">
                    <div className="support__search__content">
                        <h2 className="support__search__content__title">Xin chào, Luna Shop có thể giúp gì cho bạn?</h2>
                        <div className="support__search__content__input">
                            <input type="text" placeholder="Nhập từ khóa hoặc nội dung cần hỗ trợ" />
                            <i className="support__search__content__input__icon">
                                <AiOutlineSearch></AiOutlineSearch>
                            </i>
                        </div>
                    </div>
                </div>
                <div className="support__question">
                    <h2 className="support__question__title">Câu hỏi thường gặp</h2>
                    <div className="support__questions__list">
                        {questions.map((question, index) => (
                            <Accordion
                                key={index}
                                sx={{
                                    '&.MuiAccordion-root:before': {
                                        backgroundColor: 'white',
                                    },
                                }}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontSize: 16 }}>
                                    {question.question}
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div style={{ fontSize: 14, lineHeight: '2rem' }}>{question.answer}</div>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Support;
