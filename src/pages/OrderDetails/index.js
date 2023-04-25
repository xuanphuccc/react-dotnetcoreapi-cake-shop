import classNames from "classnames/bind";
import styles from "./OrderDetails.module.scss";
import images from "@/assets/images";
import { Col, Radio, Row } from "antd";

const cx = classNames.bind(styles);

function OrderDetails() {
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
                <div className={cx("border", "px-32", "py-32")}>
                    {/* ----- Header ------ */}
                    <div className={cx("pb-32", "border-bottom")}>
                        <h2
                            className={cx(
                                "fs-42",
                                "fw-200",
                                "font-secondary",
                                "text-italic",
                                "text-center",
                                "pb-3"
                            )}
                        >
                            Hướng dẫn thanh toán
                        </h2>
                        <p className={cx("fs-16", "font-primary", "mt-2")}>
                            Xin vui lòng chuyển khoản thanh toán vào tài khoản
                            sau và ấn nút hoàn tất đơn hàng. LaFuong Pastry sẽ
                            gọi điện xác nhận đơn hàng của bạn trong thời gian
                            sớm nhất.
                        </p>
                    </div>
                    {/* ----- End Header ------ */}

                    {/* ----- Choose bank ----- */}
                    <div className={cx("py-5", "border-bottom")}>
                        <p
                            className={cx(
                                "fs-14",
                                "fw-600",
                                "font-primary",
                                "text-uppercase",
                                "mb-2"
                            )}
                        >
                            Chọn ngân hàng
                        </p>

                        <div
                            className={cx(
                                "px-2",
                                "py-2",
                                "d-flex",
                                "align-items-center",
                                "payment-item"
                            )}
                        >
                            <Radio />
                            <img
                                className={cx("payment-img", "ms-2")}
                                src={images.vibBank}
                                alt=""
                            />
                            <p className={cx("fs-16", "font-primary", "ms-3")}>
                                Ngân hàng VIB (Ngân hàng Quốc Tế)
                            </p>
                        </div>

                        <div
                            className={cx(
                                "px-2",
                                "py-2",
                                "d-flex",
                                "align-items-center",
                                "payment-item",
                                "mt-1"
                            )}
                        >
                            <Radio />
                            <img
                                className={cx("payment-img", "ms-2")}
                                src={images.mbBank}
                                alt=""
                            />
                            <p className={cx("fs-16", "font-primary", "ms-3")}>
                                Ngân hàng MB bank (Ngân hàng Quân Đội)
                            </p>
                        </div>
                    </div>
                    {/* ----- End Choose bank ----- */}

                    {/* ----- Payment information ----- */}
                    <div className={cx("py-5", "border-bottom")}>
                        <p
                            className={cx(
                                "fs-14",
                                "fw-600",
                                "font-primary",
                                "text-uppercase",
                                "mb-2"
                            )}
                        >
                            Thông tin chuyển khoản
                        </p>

                        <Row className={cx("pt-2")}>
                            <Col span={8}>
                                <p className={cx("fs-16", "font-primary")}>
                                    Ngân hàng
                                </p>
                            </Col>
                            <Col span={16}>
                                <p className={cx("fs-16", "font-primary")}>
                                    Ngân hàng MB bank (Ngân hàng Quân Đội)
                                </p>
                            </Col>
                        </Row>
                        <Row className={cx("mt-2")}>
                            <Col span={8}>
                                <p className={cx("fs-16", "font-primary")}>
                                    Số tài khoản
                                </p>
                            </Col>
                            <Col span={16}>
                                <p className={cx("fs-16", "font-primary")}>
                                    8393969999
                                </p>
                            </Col>
                        </Row>
                        <Row className={cx("mt-2")}>
                            <Col span={8}>
                                <p className={cx("fs-16", "font-primary")}>
                                    Chủ tài khoản
                                </p>
                            </Col>
                            <Col span={16}>
                                <p
                                    className={cx(
                                        "fs-16",
                                        "font-primary",
                                        "text-uppercase"
                                    )}
                                >
                                    NGUYEN THU PHUONG
                                </p>
                            </Col>
                        </Row>
                        <Row className={cx("mt-2")}>
                            <Col span={8}>
                                <p className={cx("fs-16", "font-primary")}>
                                    Số tiền
                                </p>
                            </Col>
                            <Col span={16}>
                                <p className={cx("fs-16", "font-primary")}>
                                    720.000 ₫
                                </p>
                            </Col>
                        </Row>
                        <Row className={cx("mt-2")}>
                            <Col span={8}>
                                <p className={cx("fs-16", "font-primary")}>
                                    Nội dung
                                </p>
                            </Col>
                            <Col span={16}>
                                <p className={cx("fs-16", "font-primary")}>
                                    ABC 0355831522
                                </p>
                            </Col>
                        </Row>
                    </div>
                    {/* ----- End payment information ----- */}

                    <div>
                        <p
                            className={cx(
                                "fs-16",
                                "font-primary",
                                "mt-32",
                                "mb-4"
                            )}
                        >
                            Mọi thắc mắc cần hỗ trợ vui lòng liên hệ hotline:
                            090 786 0330 (9am-9pm)
                        </p>
                        <button className={cx("btn", "btn-dark", "w-100")}>
                            Hoàn tất đơn hàng
                        </button>
                    </div>
                </div>

                <div
                    className={cx("border", "px-32", "py-32", "mt-32", "mb-32")}
                >
                    <h2
                        className={cx(
                            "fs-42",
                            "fw-200",
                            "font-secondary",
                            "text-italic",
                            "text-center",
                            "pb-3"
                        )}
                    >
                        Đơn hàng của bạn
                    </h2>

                    <Row>
                        <Col span={12}>
                            <p
                                className={cx(
                                    "fs-14",
                                    "fw-600",
                                    "font-primary",
                                    "text-uppercase",
                                    "mb-1"
                                )}
                            >
                                Người đặt
                            </p>

                            <p className={cx("fs-16", "font-primary")}>
                                Trần Văn A
                            </p>
                            <p className={cx("fs-16", "font-primary")}>
                                0123456789
                            </p>
                        </Col>
                        <Col span={12}>
                            <p
                                className={cx(
                                    "fs-14",
                                    "fw-600",
                                    "font-primary",
                                    "text-uppercase",
                                    "mb-1"
                                )}
                            >
                                Người đặt
                            </p>

                            <p className={cx("fs-16", "font-primary")}>
                                Trần Văn A
                            </p>
                            <p className={cx("fs-16", "font-primary")}>
                                0123456789
                            </p>
                        </Col>
                    </Row>

                    <div className={cx("mt-4")}>
                        <p
                            className={cx(
                                "fs-14",
                                "fw-600",
                                "font-primary",
                                "text-uppercase",
                                "mb-1"
                            )}
                        >
                            Địa chỉ giao hàng
                        </p>

                        <p className={cx("fs-16", "font-primary")}>
                            Phường phương canh- Nam Từ Liên, 41 Ngõ 324 Phương
                            Canh, Hòe Thị, Phương Canh, Từ Liêm, Hà Nội
                        </p>
                    </div>

                    <div className={cx("mt-4")}>
                        <p
                            className={cx(
                                "fs-14",
                                "fw-600",
                                "font-primary",
                                "text-uppercase",
                                "mb-1"
                            )}
                        >
                            Giao ngày
                        </p>

                        <p className={cx("fs-16", "font-primary")}>
                            27/04/2023, khoảng 13h00 - 15h00
                        </p>
                    </div>

                    <div className={cx("mt-4")}>
                        <p
                            className={cx(
                                "fs-14",
                                "fw-600",
                                "font-primary",
                                "text-uppercase",
                                "mb-1"
                            )}
                        >
                            Đơn hàng
                        </p>

                        <div className={cx("border", "px-3", "py-2")}>
                            <div
                                className={cx(
                                    "d-flex",
                                    "justify-space-between"
                                )}
                            >
                                <p className={cx("fs-16", "font-primary")}>
                                    Lily's Valley x 01
                                </p>
                                <p className={cx("fs-16", "font-primary")}>
                                    660.000 ₫
                                </p>
                            </div>
                            <p className={cx("fs-14", "font-primary")}>
                                Vani, Anh đào & Dâu tây
                            </p>
                        </div>
                    </div>

                    <div className={cx("mt-4")}>
                        <div
                            className={cx(
                                "d-flex",
                                "align-items-center",
                                "justify-space-between"
                            )}
                        >
                            <p
                                className={cx(
                                    "fs-14",
                                    "fw-600",
                                    "font-primary",
                                    "text-uppercase",
                                    "mb-1"
                                )}
                            >
                                Tổng sản phẩm
                            </p>
                            <p className={cx("fs-16", "font-primary")}>
                                660.000 ₫
                            </p>
                        </div>
                        <div
                            className={cx(
                                "d-flex",
                                "align-items-center",
                                "justify-space-between",
                                "pt-2"
                            )}
                        >
                            <p
                                className={cx(
                                    "fs-14",
                                    "fw-600",
                                    "font-primary",
                                    "text-uppercase",
                                    "mb-1"
                                )}
                            >
                                Phí vận chuyển (11.38 km)
                            </p>
                            <p className={cx("fs-16", "font-primary")}>
                                60.000 ₫
                            </p>
                        </div>
                        <div
                            className={cx(
                                "d-flex",
                                "align-items-center",
                                "justify-space-between",
                                "pt-2"
                            )}
                        >
                            <p
                                className={cx(
                                    "fs-14",
                                    "fw-600",
                                    "font-primary",
                                    "text-uppercase",
                                    "mb-1"
                                )}
                            >
                                Tổng tiền
                            </p>
                            <p className={cx("fs-18", "font-primary")}>
                                720.000 ₫
                            </p>
                        </div>
                    </div>

                    <div className={cx("mt-4")}>
                        <button className={cx("btn", "w-100")}>
                            Thay đổi thông tin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
