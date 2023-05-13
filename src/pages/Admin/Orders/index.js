import classNames from "classnames/bind";
import { Breadcrumb, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import styles from "./Orders.module.scss";
import currencyConvert from "@/services/currencyConvert";
import orderApi from "@/api/orderApi";
import renderOrderStatus from "@/services/renderOrderStatus";

const cx = classNames.bind(styles);

function Orders() {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const handleGetAllProducts = async () => {
      try {
        var response = await orderApi.getAll();

        setOrders(response.data?.data ?? []);
        console.log(response);
      } catch (error) {
        console.warn(error);
      }
    };

    handleGetAllProducts();
  }, []);

  return (
    <div>
      {/* ----- Page header ----- */}
      <div className={cx("d-flex", "pb-5", "align-items-center", "justify-space-between")}>
        <h1 className={cx("font-primary", "fw-700")}>Đơn hàng</h1>
        <Breadcrumb
          className={cx("d-none", "d-md-block")}
          items={[
            {
              title: <Link to={"/admin"}>Trang chủ</Link>,
              key: "home",
            },
            { title: "Đơn hàng", key: "orders" },
          ]}
        />
      </div>
      {/* ----- Page header ----- */}

      {/* ----- Card ----- */}
      <div className={cx("card")}>
        {/* Card header */}
        <div className={cx("d-flex", "justify-space-between", "align-items-center", "px-2", "pb-4")}>
          <h4 className={cx("card-title")}>Tất cả đơn hàng</h4>
          <Link className={cx("btn", "btn-modern", "btn-dark")}>Thêm đơn hàng</Link>
        </div>
        {/* End card header */}

        {/* Table */}
        <div className={cx("w-100", "overflow-x-auto")}>
          <table className={cx("table", "table-hover", "bordered-header-only")}>
            <thead>
              <tr>
                <th>#</th>
                <th>Đơn hàng</th>
                <th>Ngày đặt</th>
                <th>Khách hàng</th>
                <th>Số điện thoại</th>
                <th>Trạng thái</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => (
                <tr
                  onClick={() => {
                    navigate(`/admin/orders/details/${order.orderId}`);
                  }}
                  className={cx("cursor-pointer")}
                  key={order.orderId}
                >
                  <td className={cx("py-4")}>{index + 1}</td>
                  <td>#{order.orderId}</td>
                  <td>{dayjs(order.createAt).format("DD/MM/YYYY HH:mm")}</td>
                  <td>{order.customerName}</td>
                  <td>{order.customerPhoneNumber}</td>
                  <td>
                    <Tag color={renderOrderStatus(order.orderStatus).color}>
                      {renderOrderStatus(order.orderStatus).name}
                    </Tag>
                  </td>
                  <td>{currencyConvert(order.orderTotal)}</td>
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

export default Orders;
