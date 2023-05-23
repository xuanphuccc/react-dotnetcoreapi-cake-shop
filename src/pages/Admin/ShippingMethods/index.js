import classNames from "classnames/bind";
import styles from "./ShippingMethods.module.scss";
import { Breadcrumb, Spin, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import images from "@/assets/images";
import shippingMethodApi from "@/api/shippingMethodApi";
import currencyConvert from "@/services/currencyConvert";

const cx = classNames.bind(styles);

function ShippingMethods() {
  const [loading, setLoading] = useState(false);
  const [shippingMethods, setShippingMethods] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const handleGetAllShippingMethods = async () => {
      setLoading(true);

      try {
        const response = await shippingMethodApi.getAll();

        setShippingMethods(response.data?.data ?? []);
        setLoading(false);

        console.log(response.data);
      } catch (error) {
        console.warn(error);
      }
    };

    handleGetAllShippingMethods();
  }, []);

  return (
    <div>
      {/* ----- Page header ----- */}
      <div className={cx("d-flex", "pb-5", "align-items-center", "justify-space-between")}>
        <h1 className={cx("font-primary", "fw-700")}>Vận chuyển</h1>
        <Breadcrumb
          className={cx("d-none", "d-md-block")}
          items={[
            {
              title: <Link to={"/admin"}>Trang chủ</Link>,
              key: "home",
            },
            { title: "Vận chuyển", key: "shipping-methods" },
          ]}
        />
      </div>
      {/* ----- Page header ----- */}

      {/* ----- Card ----- */}
      <div className={cx("card")}>
        {/* Card header */}
        <div className={cx("d-flex", "justify-space-between", "align-items-center", "px-2", "pb-4")}>
          <h4 className={cx("card-title")}>Tất cả PT vận chuyển</h4>
          <Link to={"/admin/shipping-methods/create/0"} className={cx("btn", "btn-modern", "btn-dark")}>
            Thêm vận chuyển
          </Link>
        </div>
        {/* End card header */}

        {/* Table */}
        <Spin spinning={loading}>
          <div className={cx("w-100", "overflow-x-auto")}>
            <table className={cx("table", "table-hover", "bordered-header-only")}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Logo</th>
                  <th>Tên pt vận chuyển</th>
                  <th>Số km đầu</th>
                  <th>Giá km đầu</th>
                  <th>Giá mỗi km tiếp theo</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {shippingMethods?.map((shippingMethod, index) => (
                  <tr
                    onClick={() => {
                      navigate(`/admin/shipping-methods/update/${shippingMethod.shippingMethodId}`);
                    }}
                    className={cx("cursor-pointer")}
                    key={shippingMethod.shippingMethodId}
                  >
                    <td>{index + 1}</td>
                    <td className={cx("py-2")}>
                      <img
                        className={cx("object-fit-contain")}
                        src={shippingMethod.logo || images.placeholder}
                        alt=""
                      />
                    </td>
                    <td>{shippingMethod.name}</td>
                    <td>{shippingMethod.initialDistance}</td>
                    <td>{currencyConvert(shippingMethod.initialCharge)}</td>
                    <td>{currencyConvert(shippingMethod.additionalCharge)}</td>
                    <td>
                      {shippingMethod.isDefault ? <Tag color="cyan">Mặc định</Tag> : <Tag color="default">Đã ẩn</Tag>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Spin>
        {/* End table */}
      </div>
      {/* ----- End card ----- */}
    </div>
  );
}

export default ShippingMethods;
