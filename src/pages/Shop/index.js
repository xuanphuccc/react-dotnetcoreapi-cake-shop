import classNames from "classnames/bind";
import styles from "./Shop.module.scss";
import images from "@/assets/images";
import { Col, Row } from "antd";

const cx = classNames.bind(styles);

function Shop() {
    return (
        <div className={cx("home-wrap")}>
            {/* ----- Products section ----- */}
            <section className={cx("border-bottom")}>
                <div
                    className={cx(
                        "py-64",
                        "px-32",
                        "d-flex",
                        "flex-column",
                        "align-items-center",
                        "border-bottom"
                    )}
                >
                    <h2
                        className={cx(
                            "font-secondary",
                            "fw-200",
                            "fs-48",
                            "text-center",
                            "text-italic"
                        )}
                    >
                        Bánh sinh nhật
                    </h2>
                    <p
                        style={{ maxWidth: 512 }}
                        className={cx(
                            "mt-2",
                            "fs-18",
                            "font-primary",
                            "text-center"
                        )}
                    >
                        Sản phẩm đặc trưng của LaFuong Pastry là bánh Entremet –
                        dòng bánh lạnh cao cấp nhất của Pháp, với sự hài hoà của
                        các tầng hương vị và kết cấu đặc biệt trong từng chiếc
                        bánh.
                    </p>
                </div>

                <Row>
                    <Col xs={24} sm={12} lg={8}>
                        <div className={cx("px-5", "pt-5", "bg-light-gray")}>
                            <h2
                                className={cx(
                                    "fs-24",
                                    "fw-400",
                                    "font-primary"
                                )}
                            >
                                Secret Garden
                            </h2>
                            <p
                                className={cx(
                                    "fs-18",
                                    "fw-400",
                                    "font-primary"
                                )}
                            >
                                Xoài, Lá dứa & Phô mai
                            </p>
                            <p
                                className={cx(
                                    "fs-18",
                                    "fw-400",
                                    "font-primary"
                                )}
                            >
                                590.000 đ
                            </p>

                            <img
                                className={cx("w-100", "d-block")}
                                src={images.home.product1}
                                alt=""
                            />

                            <div
                                className={cx("d-flex", "justify-end", "pb-5")}
                            >
                                <span
                                    className={cx("btn", "btn-link", "fs-16")}
                                >
                                    Xem thêm
                                </span>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <div
                            className={cx(
                                "px-5",
                                "pt-5",
                                "bg-light-gray",
                                "border-start"
                            )}
                        >
                            <h2
                                className={cx(
                                    "fs-24",
                                    "fw-400",
                                    "font-primary"
                                )}
                            >
                                Secret Garden
                            </h2>
                            <p
                                className={cx(
                                    "fs-18",
                                    "fw-400",
                                    "font-primary"
                                )}
                            >
                                Xoài, Lá dứa & Phô mai
                            </p>
                            <p
                                className={cx(
                                    "fs-18",
                                    "fw-400",
                                    "font-primary"
                                )}
                            >
                                590.000 đ
                            </p>

                            <img
                                className={cx("w-100", "d-block")}
                                src={images.home.product2}
                                alt=""
                            />

                            <div
                                className={cx("d-flex", "justify-end", "pb-5")}
                            >
                                <span
                                    className={cx("btn", "btn-link", "fs-16")}
                                >
                                    Xem thêm
                                </span>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <div
                            className={cx(
                                "px-5",
                                "pt-5",
                                "bg-light-gray",
                                "border-start"
                            )}
                        >
                            <h2
                                className={cx(
                                    "fs-24",
                                    "fw-400",
                                    "font-primary"
                                )}
                            >
                                Secret Garden
                            </h2>
                            <p
                                className={cx(
                                    "fs-18",
                                    "fw-400",
                                    "font-primary"
                                )}
                            >
                                Xoài, Lá dứa & Phô mai
                            </p>
                            <p
                                className={cx(
                                    "fs-18",
                                    "fw-400",
                                    "font-primary"
                                )}
                            >
                                590.000 đ
                            </p>

                            <img
                                className={cx("w-100", "d-block")}
                                src={images.home.product3}
                                alt=""
                            />

                            <div
                                className={cx("d-flex", "justify-end", "pb-5")}
                            >
                                <span
                                    className={cx("btn", "btn-link", "fs-16")}
                                >
                                    Xem thêm
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
            {/* ----- End Products section ----- */}
        </div>
    );
}

export default Shop;
