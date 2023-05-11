import AdminLayout from "@/components/Layout/AdminLayout";
import MainLayout from "@/components/Layout/MainLayout";

import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetails from "@/pages/ProductDetails";
import OrderDetails from "@/pages/OrderDetails";
import About from "@/pages/About";
import Instruction from "@/pages/Instruction";

import Dashboard from "@/pages/Admin/Dashboard";
import Orders from "@/pages/Admin/Orders";
import AdminOrderDetails from "@/pages/Admin/AdminOrderDetails";
import Products from "@/pages/Admin/Products";
import ProductEdit from "@/pages/Admin/ProductEdit";
import Categories from "@/pages/Admin/Categories";
import CategoryEdit from "@/pages/Admin/CategoryEdit";
import ShippingMethods from "@/pages/Admin/ShippingMethods";
import ShippingMethodEdit from "@/pages/Admin/ShippingMethodEdit";

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
  {
    path: "/admin/orders/details/:id",
    component: AdminOrderDetails,
    layout: AdminLayout,
  },
  { path: "/admin/products", component: Products, layout: AdminLayout },
  {
    path: "/admin/products/:action/:id",
    component: ProductEdit,
    layout: AdminLayout,
  },
  { path: "/admin/categories", component: Categories, layout: AdminLayout },
  {
    path: "/admin/categories/:action/:id",
    component: CategoryEdit,
    layout: AdminLayout,
  },
  {
    path: "/admin/shipping-methods",
    component: ShippingMethods,
    layout: AdminLayout,
  },
  {
    path: "/admin/shipping-methods/:action/:id",
    component: ShippingMethodEdit,
    layout: AdminLayout,
  },
];

export { publicRoutes, privateRoutes };
