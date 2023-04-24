import MainLayout from "@/components/Layout/MainLayout";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Instruction from "@/pages/Instruction";
import ProductDetails from "@/pages/ProductDetails";
import Shop from "@/pages/Shop";

const publicRoutes = [
    { path: "/", component: Home, layout: MainLayout },
    { path: "/about", component: About, layout: MainLayout },
    { path: "/instruction", component: Instruction, layout: MainLayout },
    { path: "/products", component: Shop, layout: MainLayout },
    { path: "/products/:id", component: ProductDetails, layout: MainLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
