import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import icons from "@/assets/icons";
import images from "@/assets/images";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx("header")}>
            <nav
                className={cx(
                    "d-flex",
                    "align-items-center",
                    "justify-space-between",
                    "header-nav",
                    "border-y",
                    "relative"
                )}
            >
                <span
                    className={cx(
                        "d-inline-flex",
                        "align-items-center",
                        "px-4",
                        "px-md-5",
                        "border-end",
                        "h-100",
                        "cursor-pointer"
                    )}
                >
                    <img src={icons.menu} alt="" />
                    <span
                        className={cx(
                            "text-uppercase",
                            "fs-14",
                            "fw-600",
                            "ms-2",
                            "d-none",
                            "d-lg-inline"
                        )}
                    >
                        Menu
                    </span>
                </span>

                <Link
                    to={"/"}
                    className={cx(
                        "d-inline-flex",
                        "absolute",
                        "center-x",
                        "center-y"
                    )}
                >
                    <img
                        className={cx("header-logo")}
                        src={images.logo}
                        alt=""
                    />
                </Link>

                <span className={cx("h-100", "d-flex")}>
                    <Link
                        className={cx(
                            "text-primary",
                            "text-decoration-none",
                            "text-uppercase",
                            "fw-600",
                            "fs-14",
                            "px-5",
                            "border-start",
                            "d-none",
                            "d-lg-inline-flex",
                            "align-items-center"
                        )}
                    >
                        Đặt bánh
                    </Link>
                    <Link
                        className={cx(
                            "text-primary",
                            "text-decoration-none",
                            "text-uppercase",
                            "fw-600",
                            "fs-14",
                            "px-4",
                            "px-md-5",
                            "border-start",
                            "d-inline-flex",
                            "align-items-center"
                        )}
                    >
                        <img src={icons.cart} alt="" />
                        <span className={cx("ms-2", "d-none", "d-lg-inline")}>
                            Giỏ
                        </span>
                    </Link>
                </span>
            </nav>

            <div className={cx("maquee-wrap", "border-bottom")}>
                <div className={cx("maquee", "d-flex", "h-100")}>
                    <span className={cx("px-5", "maquee-item")}>
                        Giao hàng tận nơi tại Hà Nội
                    </span>
                    <span className={cx("px-5", "maquee-item")}>
                        Giao hàng tận nơi tại Hà Nội
                    </span>
                    <span className={cx("px-5", "maquee-item")}>
                        Giao hàng tận nơi tại Hà Nội
                    </span>
                    <span className={cx("px-5", "maquee-item")}>
                        Giao hàng tận nơi tại Hà Nội
                    </span>
                    <span className={cx("px-5", "maquee-item")}>
                        Giao hàng tận nơi tại Hà Nội
                    </span>
                    <span className={cx("px-5", "maquee-item")}>
                        Giao hàng tận nơi tại Hà Nội
                    </span>
                    <span className={cx("px-5", "maquee-item")}>
                        Giao hàng tận nơi tại Hà Nội
                    </span>
                    <span className={cx("px-5", "maquee-item")}>
                        Giao hàng tận nơi tại Hà Nội
                    </span>
                    <span className={cx("px-5", "maquee-item")}>
                        Giao hàng tận nơi tại Hà Nội
                    </span>
                    <span className={cx("px-5", "maquee-item")}>
                        Giao hàng tận nơi tại Hà Nội
                    </span>
                </div>
            </div>
        </header>
    );
}

export default Header;
