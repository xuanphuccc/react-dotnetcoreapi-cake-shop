import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";
import { useEffect } from "react";
import Cart from "./Cart";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    const location = useLocation();

    useEffect(() => {
        if (!location.hash) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        }
    }, [location]);

    return (
        <div className={cx("main-layout")}>
            <Header />
            <Menu />
            <Cart />
            <div className={cx("content-wrapper")}>{children}</div>
            <Footer />
        </div>
    );
}

export default MainLayout;
