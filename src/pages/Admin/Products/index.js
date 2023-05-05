import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import { Breadcrumb, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import images from "@/assets/images";
import productApi from "@/api/productApi";
import currencyConvert from "@/services/currencyConvert";

const cx = classNames.bind(styles);

function Products() {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const handleGetAllProducts = async () => {
            try {
                var allProducts = await productApi.getAll();

                setProducts(allProducts.data.data);
                console.log(allProducts);
            } catch (error) {
                console.warn(error);
            }
        };

        handleGetAllProducts();
    }, []);

    return (
        <div>
            {/* ----- Page header ----- */}
            <div
                className={cx(
                    "d-flex",
                    "pb-5",
                    "align-items-center",
                    "justify-space-between"
                )}
            >
                <h1 className={cx("font-primary", "fw-700")}>Sản phẩm</h1>
                <Breadcrumb
                    className={cx("d-none", "d-md-block")}
                    items={[
                        {
                            title: <Link to={"/admin"}>Trang chủ</Link>,
                            key: "home",
                        },
                        { title: "Sản phẩm", key: "products" },
                    ]}
                />
            </div>
            {/* ----- Page header ----- */}

            {/* ----- Card ----- */}
            <div className={cx("card")}>
                {/* Card header */}
                <div
                    className={cx(
                        "d-flex",
                        "justify-space-between",
                        "align-items-center",
                        "px-2",
                        "pb-4"
                    )}
                >
                    <h4 className={cx("card-title")}>Tất cả sản phẩm</h4>
                    <Link
                        to={"/admin/products/create/0"}
                        className={cx("btn", "btn-modern", "btn-dark")}
                    >
                        Thêm sản phẩm
                    </Link>
                </div>
                {/* End card header */}

                {/* Table */}
                <div className={cx("w-100", "overflow-x-auto")}>
                    <table
                        className={cx(
                            "table",
                            "table-hover",
                            "bordered-header-only"
                        )}
                    >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá bán</th>
                                <th>Trạng thái</th>
                                <th>Danh mục</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((product, index) => (
                                <tr
                                    onClick={() => {
                                        navigate(
                                            `/admin/products/update/${product.productId}`
                                        );
                                    }}
                                    className={cx("cursor-pointer")}
                                    key={product.productId}
                                >
                                    <td>{index + 1}</td>
                                    <td className={cx("py-2")}>
                                        <img
                                            src={
                                                product.images[0].image ||
                                                images.placeholder
                                            }
                                            alt=""
                                        />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{currencyConvert(product.price)}</td>
                                    <td>
                                        {product.isDisplay ? (
                                            <Tag color="cyan">Đang bán</Tag>
                                        ) : (
                                            <Tag color="default">Đã ẩn</Tag>
                                        )}
                                    </td>
                                    <td>{product?.category?.name || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* End table */}
            </div>
            {/* ----- End card ----- */}
        </div>
    );
}

export default Products;
