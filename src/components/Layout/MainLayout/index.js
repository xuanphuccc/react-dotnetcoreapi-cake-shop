import { useEffect } from "react";
import Cart from "./Cart";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";
import { useLocation } from "react-router-dom";

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
        <div className="main-layout">
            <Header />
            <Menu />
            <Cart />
            {children}
            <Footer />
        </div>
    );
}

export default MainLayout;
