import classNames from "classnames/bind";
import styles from "./Shop.module.scss";
import images from "@/assets/images";
import { Col, Row } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const cx = classNames.bind(styles);

function Shop() {
    const location = useLocation();
    const fragment = location.hash.substring(1);

    const cakeRef = useRef();
    const smallCakeRef = useRef();
    const accessoryRef = useRef();

    useEffect(() => {
        if (cakeRef.current && fragment === "cake") {
            cakeRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
        }
        if (smallCakeRef.current && fragment === "small-cake") {
            smallCakeRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
        }
        if (accessoryRef.current && fragment === "accessory") {
            accessoryRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
        }
    }, [fragment]);

    return (
        <div>
            {/* ----- Products section ----- */}
            <section ref={cakeRef} className={cx("border-bottom")}>
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
                        <Link
                            to={"/products/100"}
                            className={cx(
                                "px-5",
                                "pt-5",
                                "bg-light-gray",
                                "d-block",
                                "text-primary"
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
                        </Link>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Link
                            to={"/products/100"}
                            className={cx(
                                "px-5",
                                "pt-5",
                                "bg-light-gray",
                                "border-start",
                                "d-block",
                                "text-primary"
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
                        </Link>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Link
                            to={"/products/100"}
                            className={cx(
                                "px-5",
                                "pt-5",
                                "bg-light-gray",
                                "border-start",
                                "d-block",
                                "text-primary"
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
                        </Link>
                    </Col>
                </Row>
            </section>
            {/* ----- End Products section ----- */}

            {/* ----- Products section ----- */}
            <section ref={smallCakeRef} className={cx("border-bottom")}>
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
                        Bánh ngọt nhỏ
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
                        Half Entremet — Một nửa chiếc bánh Entremet được LaFuong
                        Pastry thiết kế & nghiên cứu riêng, để bạn có thể thưởng
                        thức bánh Entremet một cách đơn giản mỗi ngày mà không
                        cần phải chờ đợi đến dịp gì.
                    </p>
                </div>

                <Row>
                    <Col xs={24} sm={12} lg={8}>
                        <Link
                            to={"/products/100"}
                            className={cx(
                                "px-5",
                                "pt-5",
                                "bg-light-gray",
                                "d-block",
                                "text-primary"
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
                        </Link>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Link
                            to={"/products/100"}
                            className={cx(
                                "px-5",
                                "pt-5",
                                "bg-light-gray",
                                "border-start",
                                "d-block",
                                "text-primary"
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
                        </Link>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Link
                            to={"/products/100"}
                            className={cx(
                                "px-5",
                                "pt-5",
                                "bg-light-gray",
                                "border-start",
                                "d-block",
                                "text-primary"
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
                        </Link>
                    </Col>
                </Row>
            </section>
            {/* ----- End Products section ----- */}

            {/* ----- Products section ----- */}
            <section ref={accessoryRef} className={cx("border-bottom")}>
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
                        Phụ kiện
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
                        Mỗi chiếc bánh giống như một món quà. Tại LaFuong, chúng
                        tôi cung cấp nến, thiệp và phụ kiện trang trí được thiết
                        kế & tuyển chọn để trải nghiệm của bạn trở nên đặc biệt
                        hơn.
                    </p>
                </div>

                <Row>
                    <Col xs={24} sm={12} lg={8}>
                        <Link
                            to={"/products/100"}
                            className={cx(
                                "px-5",
                                "pt-5",
                                "bg-light-gray",
                                "d-block",
                                "text-primary"
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
                        </Link>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Link
                            to={"/products/100"}
                            className={cx(
                                "px-5",
                                "pt-5",
                                "bg-light-gray",
                                "border-start",
                                "d-block",
                                "text-primary"
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
                        </Link>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Link
                            to={"/products/100"}
                            className={cx(
                                "px-5",
                                "pt-5",
                                "bg-light-gray",
                                "border-start",
                                "d-block",
                                "text-primary"
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
                        </Link>
                    </Col>
                </Row>
            </section>
            {/* ----- End Products section ----- */}
        </div>
    );
}

export default Shop;
