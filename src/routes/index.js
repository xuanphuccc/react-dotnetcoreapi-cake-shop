import AdminLayout from "@/components/Layout/AdminLayout";
import MainLayout from "@/components/Layout/MainLayout";
import About from "@/pages/About";
import Categories from "@/pages/Admin/Cateogories";
import Dashboard from "@/pages/Admin/Dashboard";
import Orders from "@/pages/Admin/Orders";
import Products from "@/pages/Admin/Products";
import Home from "@/pages/Home";
import Instruction from "@/pages/Instruction";
import OrderDetails from "@/pages/OrderDetails";
import ProductDetails from "@/pages/ProductDetails";
import Shop from "@/pages/Shop";

const publicRoutes = [
    { path: "/", component: Home, layout: MainLayout },
    { path: "/about", component: About, layout: MainLayout },
    { path: "/instruction", component: Instruction, layout: MainLayout },
    { path: "/products", component: Shop, layout: MainLayout },
    { path: "/products/:id", component: ProductDetails, layout: MainLayout },
    { path: "/confirm", component: OrderDetails, layout: null },
];

const privateRoutes = [
    { path: "/admin", component: Dashboard, layout: AdminLayout },
    { path: "/admin/orders", component: Orders, layout: AdminLayout },
    { path: "/admin/products", component: Products, layout: AdminLayout },
    { path: "/admin/categories", component: Categories, layout: AdminLayout },
];

export { publicRoutes, privateRoutes };
