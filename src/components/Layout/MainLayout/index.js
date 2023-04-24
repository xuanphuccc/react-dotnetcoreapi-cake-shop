import Footer from "./Footer";
import Header from "./Header";

function MainLayout({ children }) {
    return (
        <div className="main-layout">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default MainLayout;
