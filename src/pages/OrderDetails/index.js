import classNames from "classnames/bind";
import styles from "./OrderDetails.module.scss";
import images from "@/assets/images";
import { Col, Radio, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "@/redux/selector";
import currencyConvert from "@/services/currencyConvert";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import cartSlice from "@/components/Layout/MainLayout/Cart/cartSlice";

const cx = classNames.bind(styles);

function OrderDetails() {
  const dispatch = useDispatch();
  const cartInfo = useSelector(cartSelector);
  const navigate = useNavigate();

  const handleConfirmOrder = async () => {
    // Clear cart
    dispatch(cartSlice.actions.clearCart());
    navigate("/");
  };

  return (
    <div>
      <div
        style={{
          maxWidth: 720,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div className={cx("w-100", "text-center", "py-5")}>
          <img style={{ width: 123 }} src={images.logo} alt="" />
        </div>
        <div className={cx("border", "px-4", "px-sm-32", "py-32")}>
          {/* ----- Header ------ */}
          <div className={cx("pb-32", "border-bottom")}>
            <h2 className={cx("fs-42", "fw-200", "font-secondary", "text-italic", "text-center", "pb-3")}>
              Hướng dẫn thanh toán
            </h2>
            <p className={cx("fs-16", "font-primary", "mt-2")}>
              Xin vui lòng chuyển khoản thanh toán vào tài khoản sau và ấn nút hoàn tất đơn hàng. LaFuong Pastry sẽ gọi
              điện xác nhận đơn hàng của bạn trong thời gian sớm nhất.
            </p>
          </div>
          {/* ----- End Header ------ */}

          {/* ----- Choose bank ----- */}
          <div className={cx("py-5", "border-bottom")}>
            <p className={cx("fs-14", "fw-600", "font-primary", "text-uppercase", "mb-2")}>Chọn ngân hàng</p>

            <div className={cx("px-2", "py-2", "d-flex", "align-items-center", "payment-item", "mt-1")}>
              <Radio checked />
              <img className={cx("payment-img", "ms-2")} src={images.mbBank} alt="" />
              <p className={cx("fs-16", "font-primary", "ms-3")}>Ngân hàng MB bank (Ngân hàng Quân Đội)</p>
            </div>
          </div>
          {/* ----- End Choose bank ----- */}

          {/* ----- Payment information ----- */}
          <div className={cx("py-5", "border-bottom")}>
            <p className={cx("fs-14", "fw-600", "font-primary", "text-uppercase", "mb-2")}>Thông tin chuyển khoản</p>

            <Row className={cx("pt-2")}>
              <Col span={8}>
                <p className={cx("fs-16", "font-primary")}>Ngân hàng</p>
              </Col>
              <Col span={16}>
                <p className={cx("fs-16", "font-primary")}>Ngân hàng MB bank (Ngân hàng Quân Đội)</p>
              </Col>
            </Row>
            <Row className={cx("mt-2")}>
              <Col span={8}>
                <p className={cx("fs-16", "font-primary")}>Số tài khoản</p>
              </Col>
              <Col span={16}>
                <p className={cx("fs-16", "font-primary")}>8393969999</p>
              </Col>
            </Row>
            <Row className={cx("mt-2")}>
              <Col span={8}>
                <p className={cx("fs-16", "font-primary")}>Chủ tài khoản</p>
              </Col>
              <Col span={16}>
                <p className={cx("fs-16", "font-primary", "text-uppercase")}>NGUYEN THU PHUONG</p>
              </Col>
            </Row>
            <Row className={cx("mt-2")}>
              <Col span={8}>
                <p className={cx("fs-16", "font-primary")}>Số tiền</p>
              </Col>
              <Col span={16}>
                <p className={cx("fs-16", "font-primary")}>
                  {currencyConvert(cartInfo.itemsTotal + cartInfo.shippingCost)}
                </p>
              </Col>
            </Row>
            <Row className={cx("mt-2")}>
              <Col span={8}>
                <p className={cx("fs-16", "font-primary")}>Nội dung</p>
              </Col>
              <Col span={16}>
                <p className={cx("fs-16", "font-primary")}>LF{cartInfo.customerPhoneNumber}</p>
              </Col>
            </Row>
          </div>
          {/* ----- End payment information ----- */}

          <div>
            <p className={cx("fs-16", "font-primary", "mt-32", "mb-4")}>
              Mọi thắc mắc cần hỗ trợ vui lòng liên hệ hotline: 090 786 0330 (9am-9pm)
            </p>
            <button onClick={handleConfirmOrder} className={cx("btn", "btn-dark", "w-100")}>
              Hoàn tất đặt hàng
            </button>
          </div>
        </div>

        <div className={cx("border", "px-4", "px-sm-32", "py-32", "mt-32", "mb-32")}>
          <h2 className={cx("fs-42", "fw-200", "font-secondary", "text-italic", "text-center", "pb-3")}>
            Đơn hàng của bạn
          </h2>

          <Row>
            <Col span={12}>
              <p className={cx("fs-14", "fw-600", "font-primary", "text-uppercase", "mb-1")}>Người đặt</p>

              <p className={cx("fs-16", "font-primary")}>{cartInfo.customerName}</p>
              <p className={cx("fs-16", "font-primary")}>{cartInfo.customerPhoneNumber}</p>
            </Col>
            <Col span={12}>
              <p className={cx("fs-14", "fw-600", "font-primary", "text-uppercase", "mb-1")}>Người nhận</p>

              <p className={cx("fs-16", "font-primary")}>{cartInfo.recipientName}</p>
              <p className={cx("fs-16", "font-primary")}>{cartInfo.recipientPhoneNumber}</p>
            </Col>
          </Row>

          <div className={cx("mt-4")}>
            <p className={cx("fs-14", "fw-600", "font-primary", "text-uppercase", "mb-1")}>Địa chỉ giao hàng</p>

            <p className={cx("fs-16", "font-primary")}>{cartInfo.address}</p>
          </div>

          <div className={cx("mt-4")}>
            <p className={cx("fs-14", "fw-600", "font-primary", "text-uppercase", "mb-1")}>Giao ngày</p>

            <p className={cx("fs-16", "font-primary")}>
              {dayjs(cartInfo.deliveryDate).format("DD/MM/YYYY")}, khoảng {cartInfo.deliveryTime}
            </p>
          </div>

          <div className={cx("mt-4")}>
            <p className={cx("fs-14", "fw-600", "font-primary", "text-uppercase", "mb-1")}>Đơn hàng</p>

            {cartInfo?.items?.map((item) => (
              <div key={item.productId} className={cx("border", "px-3", "py-2", "mb-2")}>
                <div className={cx("d-flex", "justify-space-between")}>
                  <p className={cx("fs-16", "font-primary")}>
                    {item.name} x {item.qty}
                  </p>
                  <p className={cx("fs-16", "font-primary")}>{currencyConvert(item.price * item.qty)}</p>
                </div>
                <p className={cx("fs-14", "font-primary")}>{item.title}</p>
              </div>
            ))}
          </div>

          <div className={cx("mt-4")}>
            <div className={cx("d-flex", "align-items-center", "justify-space-between")}>
              <p className={cx("fs-14", "fw-600", "font-primary", "text-uppercase", "mb-1")}>Tổng sản phẩm</p>
              <p className={cx("fs-16", "font-primary")}>{currencyConvert(cartInfo.itemsTotal)}</p>
            </div>
            <div className={cx("d-flex", "align-items-center", "justify-space-between", "pt-2")}>
              <p className={cx("fs-14", "fw-600", "font-primary", "text-uppercase", "mb-1")}>
                Phí vận chuyển ({cartInfo.distance} km)
              </p>
              <p className={cx("fs-16", "font-primary")}>{currencyConvert(cartInfo.shippingCost)}</p>
            </div>
            <div className={cx("d-flex", "align-items-center", "justify-space-between", "pt-2")}>
              <p className={cx("fs-14", "fw-600", "font-primary", "text-uppercase", "mb-1")}>Tổng tiền</p>
              <p className={cx("fs-18", "font-primary")}>
                {currencyConvert(cartInfo.itemsTotal + cartInfo.shippingCost)}
              </p>
            </div>
          </div>

          <div className={cx("mt-4")}>
            <button className={cx("btn", "w-100")}>Thay đổi thông tin</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
