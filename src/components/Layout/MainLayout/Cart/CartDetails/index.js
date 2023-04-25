import classNames from "classnames/bind";
import styles from "./CartDetails.module.scss";
import images from "@/assets/images";
import { Link } from "react-router-dom";
import icons from "@/assets/icons";
import { useDispatch } from "react-redux";
import drawersSlide from "../../drawersSlide";

const cx = classNames.bind(styles);

function CartDetails() {
    const dispatch = useDispatch();

    const handleCloseCart = () => {
        dispatch(drawersSlide.actions.closeCart());
    };

    const handleChangeStepToDelivery = () => {
        dispatch(drawersSlide.actions.openStepDelivery());
    };

    return (
        <div className={cx("w-100", "d-flex", "flex-column")}>
            <div
                className={cx(
                    "px-32",
                    "py-4",
                    "d-flex",
                    "justify-space-between",
                    "align-items-center"
                )}
            >
                <h2
                    className={cx(
                        "font-secondary",
                        "fw-200",
                        "fs-36",
                        "text-italic"
                    )}
                >
                    Giỏ hàng
                </h2>
                <img
                    onClick={handleCloseCart}
                    className={cx("cursor-pointer")}
                    src={icons.times}
                    alt=""
                />
            </div>

            <div className={cx("py-2")}>
                <div className={cx("px-32", "pb-4", "d-flex")}>
                    <img
                        className={cx("cart-item-img")}
                        src={images.home.product4}
                        alt=""
                    />
                    <div className={cx("ms-4", "w-100")}>
                        <div
                            className={cx(
                                "w-100",
                                "d-flex",
                                "justify-space-between"
                            )}
                        >
                            <Link
                                className={cx(
                                    "fs-18",
                                    "fw-500",
                                    "text-primary",
                                    "text-decoration-none"
                                )}
                            >
                                <span>Lily's Valley</span>
                                <span> x 1</span>
                            </Link>
                            <button className={cx("btn", "btn-link")}>
                                Xoá
                            </button>
                        </div>
                        <p className={cx("font-primary", "fs-16")}>
                            Vani, Anh đào & Dâu tây
                        </p>
                        <div className={cx("py-1")}>
                            <button className={cx("btn", "btn-sm", "btn-dark")}>
                                Viết lời chúc
                            </button>
                        </div>
                        <p className={cx("py-1", "font-primary")}>660.000đ</p>
                    </div>
                </div>
            </div>

            <div
                className={cx("px-32", "pt-2", "pb-5", "border-top", "mt-auto")}
            >
                <div
                    className={cx(
                        "d-flex",
                        "justify-space-between",
                        "align-items-center",
                        "pt-2",
                        "pb-4"
                    )}
                >
                    <span
                        className={cx(
                            "fs-14",
                            "font-primary",
                            "fw-600",
                            "text-uppercase"
                        )}
                    >
                        Tổng 1 sản phẩm
                    </span>
                    <span className={cx("font-primary", "fs-16")}>
                        660.000đ
                    </span>
                </div>
                <div className={cx("w-100")}>
                    <button
                        onClick={handleChangeStepToDelivery}
                        className={cx("btn", "btn-dark", "w-100")}
                    >
                        Tiếp tục
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartDetails;
