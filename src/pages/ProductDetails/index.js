import classNames from "classnames/bind";
import styles from "./ProductDetails.module.scss";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import icons from "@/assets/icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import images from "@/assets/images";
import { useEffect, useRef, useState } from "react";
import Dropdown from "@/components/Dropdown";

const cx = classNames.bind(styles);

function ProductDetails() {
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);

    const slider1Ref = useRef();
    const slider2Ref = useRef();

    useEffect(() => {
        if (slider1Ref.current) {
            setSlider1(slider1Ref.current);
        }

        if (slider2Ref.current) {
            setSlider2(slider2Ref.current);
        }
    }, [slider1Ref, slider2Ref]);

    return (
        <div className={cx("product-details-wrap")}>
            <section className={cx("border-bottom")}>
                <Row>
                    <Col xs={24} lg={12}>
                        <div
                            className={cx(
                                "carousel-wrap",
                                "border-bottom",
                                "border-end",
                                "relative"
                            )}
                        >
                            <Slider
                                adaptiveHeight={true}
                                asNavFor={slider2}
                                ref={slider1Ref}
                            >
                                <div>
                                    <img
                                        className={cx("slider-item")}
                                        src={images.home.product1}
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <img
                                        className={cx("slider-item")}
                                        src={images.home.product2}
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <img
                                        className={cx("slider-item")}
                                        src={images.home.product3}
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <img
                                        className={cx("slider-item")}
                                        src={images.home.product4}
                                        alt=""
                                    />
                                </div>
                            </Slider>

                            <div
                                style={{ width: "320px" }}
                                className={cx("sub-slider")}
                            >
                                <Slider
                                    asNavFor={slider1}
                                    ref={slider2Ref}
                                    slidesToShow={5}
                                    adaptiveHeight={true}
                                    variableWidth={true}
                                    focusOnSelect={true}
                                >
                                    <div>
                                        <img
                                            className={cx(
                                                "border",
                                                "cursor-pointer"
                                            )}
                                            height={64}
                                            width={64}
                                            src={images.home.product1}
                                            alt=""
                                        />
                                    </div>
                                    <div>
                                        <img
                                            className={cx(
                                                "border",
                                                "cursor-pointer",
                                                "border-start-hide"
                                            )}
                                            height={64}
                                            width={64}
                                            src={images.home.product2}
                                            alt=""
                                        />
                                    </div>
                                    <div>
                                        <img
                                            className={cx(
                                                "border",
                                                "cursor-pointer",
                                                "border-start-hide"
                                            )}
                                            height={64}
                                            width={64}
                                            src={images.home.product3}
                                            alt=""
                                        />
                                    </div>
                                    <div>
                                        <img
                                            className={cx(
                                                "border",
                                                "cursor-pointer",
                                                "border-start-hide"
                                            )}
                                            height={64}
                                            width={64}
                                            src={images.home.product4}
                                            alt=""
                                        />
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} lg={12}>
                        <div className={cx("product-details")}>
                            <div className={cx("d-flex", "align-items-center")}>
                                <img
                                    className={cx("me-1")}
                                    src={icons.arrowLeft}
                                    alt=""
                                />

                                <Link
                                    to={"/products#small-cake"}
                                    className={cx(
                                        "btn",
                                        "btn-link",
                                        "fs-16",
                                        "text-uppercase",
                                        "hover-hide-underline",
                                        "btn-back"
                                    )}
                                >
                                    Bánh sinh nhật
                                </Link>
                            </div>

                            <h1
                                className={cx(
                                    "fs-48",
                                    "fw-200",
                                    "text-italic",
                                    "font-secondary"
                                )}
                            >
                                A Gentle Blend
                            </h1>

                            {/* ----- Add to cart controls ----- */}
                            <div
                                className={cx(
                                    "mt-4",
                                    "d-flex",
                                    "align-items-center",
                                    "flex-wrap"
                                )}
                            >
                                <div className={cx("d-flex", "me-4", "mb-4")}>
                                    <button className={cx("btn", "btn-icon")}>
                                        <img src={icons.minus} alt="" />
                                    </button>
                                    <p className={cx("qty-number", "mx-1")}>
                                        1
                                    </p>
                                    <button className={cx("btn", "btn-icon")}>
                                        <img src={icons.plus} alt="" />
                                    </button>
                                </div>
                                <button
                                    className={cx("btn", "btn-dark", "mb-4")}
                                >
                                    <span>Thêm vào giỏ</span>
                                    <span> * </span>
                                    <span>515.000đ</span>
                                </button>
                            </div>
                            {/* ----- End Add to cart controls ----- */}

                            <div className={cx("pt-2")}>
                                {/* ----- Description ----- */}
                                <div className={cx("mb-5")}>
                                    <p
                                        className={cx(
                                            "fs-20",
                                            "fw-500",
                                            "font-primary",
                                            "py-2"
                                        )}
                                    >
                                        Cà phê & Cốt dừa
                                    </p>
                                    <p
                                        className={cx(
                                            "fs-18",
                                            "font-primary",
                                            "pt-2"
                                        )}
                                    >
                                        Lấy cảm hứng từ những hương vị quen
                                        thuộc, A Gentle Blend là sự kết hợp hài
                                        hoà giữa lớp kem mousse cà phê rang xay
                                        đậm đà, cùng lớp kem dừa thơm ngậy.
                                    </p>
                                    <p
                                        className={cx(
                                            "fs-18",
                                            "font-primary",
                                            "pt-2"
                                        )}
                                    >
                                        Với vẻ ngoài tinh tế được bao phủ bởi
                                        lớp nhung làm từ bơ cacao và trang trí
                                        bởi những chiếc lông vũ làm từ sô-cô-la
                                        nguyên chất. Đây là một chiếc bánh có vị
                                        ngọt vừa phải và rất phù hợp với những
                                        người yêu thích cà phê.
                                    </p>
                                </div>
                                {/* ----- End Description ----- */}

                                {/* ----- Flavor ----- */}
                                <section className={cx("py-2")}>
                                    <div
                                        className={cx(
                                            "border-top",
                                            "border-gray",
                                            "pt-4"
                                        )}
                                    >
                                        <p
                                            className={cx(
                                                "font-primary",
                                                "fs-16",
                                                "fw-600",
                                                "text-uppercase",
                                                "mb-2"
                                            )}
                                        >
                                            Cảm giác bánh
                                        </p>
                                        <span
                                            className={cx(
                                                "badge",
                                                "fs-18",
                                                "badge-outline",
                                                "badge-lg",
                                                "badge-text"
                                            )}
                                        >
                                            Đậm đà
                                        </span>
                                        <span
                                            className={cx(
                                                "badge",
                                                "fs-18",
                                                "badge-outline",
                                                "badge-lg",
                                                "badge-text"
                                            )}
                                        >
                                            Thơm ngậy
                                        </span>
                                    </div>
                                </section>
                                {/* ----- End Flavor ----- */}

                                {/* ----- Structure ----- */}
                                <section
                                    className={cx(
                                        "py-2",
                                        "product-details-section"
                                    )}
                                >
                                    <div
                                        className={cx(
                                            "border-top",
                                            "border-gray",
                                            "pt-4"
                                        )}
                                    >
                                        <p
                                            className={cx(
                                                "font-primary",
                                                "fs-16",
                                                "fw-600",
                                                "text-uppercase",
                                                "mb-2"
                                            )}
                                        >
                                            Cấu trúc vị bánh
                                        </p>

                                        <ul>
                                            <li>
                                                Lớp 01: Milk Chocolate Velvet
                                                Spray
                                            </li>
                                            <li>Lớp 02: Coffee Mousse</li>
                                            <li>Lớp 03: Coffee Sponge</li>
                                            <li>Lớp 04: Coconut Cream</li>
                                            <li>Lớp 05: Coffee Sponge</li>
                                        </ul>
                                    </div>
                                </section>
                                {/* ----- End Structure ----- */}

                                {/* ----- Size ----- */}
                                <section className={cx("py-2")}>
                                    <div
                                        className={cx(
                                            "border-top",
                                            "border-gray",
                                            "pt-4"
                                        )}
                                    >
                                        <p
                                            className={cx(
                                                "font-primary",
                                                "fs-16",
                                                "fw-600",
                                                "text-uppercase",
                                                "mb-2"
                                            )}
                                        >
                                            Kích thước
                                        </p>

                                        <p
                                            className={cx(
                                                "fs-18",
                                                "font-primary"
                                            )}
                                        >
                                            Đường kính: 18cm | Chiều cao: 5cm |
                                            Dành cho 5-10 người ăn
                                        </p>
                                    </div>
                                </section>
                                {/* ----- End Size ----- */}

                                {/* ----- Accessory ----- */}
                                <section
                                    className={cx(
                                        "py-2",
                                        "product-details-section"
                                    )}
                                >
                                    <div
                                        className={cx(
                                            "border-top",
                                            "border-gray",
                                            "pt-4"
                                        )}
                                    >
                                        <p
                                            className={cx(
                                                "font-primary",
                                                "fs-16",
                                                "fw-600",
                                                "text-uppercase",
                                                "mb-2"
                                            )}
                                        >
                                            Phụ kiện tặng kèm
                                        </p>

                                        <ul>
                                            <li>01 Chiếc nến sinh nhật</li>
                                            <li>
                                                01 Bộ đĩa và dĩa dành cho 10
                                                người
                                            </li>
                                            <li>01 Dao cắt bánh</li>
                                        </ul>
                                    </div>
                                </section>
                                {/* ----- End Accessory ----- */}

                                {/* ----- Instruction ----- */}
                                <section
                                    className={cx(
                                        "py-2",
                                        "product-details-section"
                                    )}
                                >
                                    <div
                                        className={cx(
                                            "border-top",
                                            "border-gray",
                                            "pt-4"
                                        )}
                                    >
                                        <p
                                            className={cx(
                                                "font-primary",
                                                "fs-16",
                                                "fw-600",
                                                "text-uppercase",
                                                "mb-2"
                                            )}
                                        >
                                            Hướng dẫn sử dụng
                                        </p>

                                        <ul>
                                            <li>
                                                Luôn giữ bánh trong hộp kín &
                                                bảo quản trong ngăn mát tủ lạnh
                                            </li>
                                            <li>
                                                Không nên để bánh ở nhiệt độ
                                                phòng quá 30 phút (Bánh sẽ bị
                                                chảy)
                                            </li>
                                            <li>Sử dụng trong vòng 03 ngày</li>
                                        </ul>
                                    </div>
                                </section>
                                {/* ----- End Instruction ----- */}
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>

            {/* ----- Questions ----- */}
            <section className={cx("border-bottom", "py-64", "px-5")}>
                <div className={cx("px-4", "pb-5")}>
                    <h1
                        className={cx(
                            "font-secondary",
                            "fs-48",
                            "fw-200",
                            "text-italic",
                            "text-center"
                        )}
                    >
                        Câu hỏi thường gặp
                    </h1>
                    <p
                        className={cx(
                            "fs-18",
                            "font-primary",
                            "text-center",
                            "mt-4"
                        )}
                    >
                        Bạn có thể tìm câu trả lời cho những câu hỏi thường gặp
                        ở dưới đây.
                    </p>
                </div>

                <div className={cx("max-width-xl")}>
                    <Dropdown title="Ngoài website thì tôi có thể đặt hàng bằng cách khác không?">
                        <p className={cx("fs-18")}>
                            Bạn có thể đặt bánh qua các hình thức sau
                        </p>
                        <p className={cx("fs-18")}>
                            Fanpage: facebook.com/LaFuong.Pastry
                        </p>
                        <p className={cx("fs-18")}>
                            Instagram: instagram.com/lafuong.pastry
                        </p>
                        <p className={cx("fs-18")}>
                            Hotline/Zalo: 090 786 0330
                        </p>
                    </Dropdown>
                    <Dropdown title="Thời gian đặt bánh trước tối thiểu là bao lâu?">
                        <p className={cx("fs-18")}>
                            Bạn nên đặt trước 1 ngày để có thể lựa chọn tất cả
                            các mẫu bánh.
                        </p>
                        <p className={cx("fs-18", "mt-4")}>
                            Nếu bạn cần đặt gấp trong ngày, vui lòng liên hệ
                            hotline 090 786 0330 để được phục vụ ngay, tuy nhiên
                            mẫu bánh có thể hạn chế và không đủ toàn bộ mẫu.
                        </p>
                    </Dropdown>
                    <Dropdown
                        border={false}
                        title="Tôi có thể mua bánh trực tiếp tại xưởng của LaFuong không?"
                    >
                        <p className={cx("fs-18")}>
                            Chúng tôi không bán sản phẩm có sẵn và không bán
                            trực tiếp tại xưởng. Do đặc thù sản phẩm bánh lạnh
                            cao cấp rất khó bảo quản trong quá trình giao hàng
                            nên hãy để các shipper chuyên nghiệp của chúng tôi
                            giao hàng đến tận tay bạn để đảm bảo bánh luôn có
                            được chất lượng tốt nhất.
                        </p>
                    </Dropdown>
                </div>
            </section>
            {/* ----- End Questions ----- */}
        </div>
    );
}

export default ProductDetails;
