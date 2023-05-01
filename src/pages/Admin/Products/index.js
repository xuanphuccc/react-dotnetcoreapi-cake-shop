import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Products() {
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
            <div
                className={cx(
                    "px-4",
                    "py-4",
                    "border",
                    "border-gray",
                    "rounded"
                )}
            >
                {/* Card header */}
                <div
                    className={cx(
                        "d-flex",
                        "justify-space-between",
                        "align-items-center",
                        "pb-4",
                        "border-bottom",
                        "border-gray"
                    )}
                >
                    <h4>Tất cả sản phẩm</h4>
                    <button
                        className={cx(
                            "btn",
                            "btn-sm",
                            "btn-dark",
                            "rounded-sm",
                            "text-normal",
                            "font-primary",
                            "fs-14"
                        )}
                    >
                        Thêm sản phẩm
                    </button>
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
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Larry the Bird</td>
                                <td>@twitter</td>
                                <td>@fat</td>
                            </tr>
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
