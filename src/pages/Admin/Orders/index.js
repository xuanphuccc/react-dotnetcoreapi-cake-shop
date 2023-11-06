import classNames from "classnames/bind";
import { Breadcrumb, Button, Collapse, Input, Pagination, Popover, Radio, Space, Spin, Tag } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { debounce } from "lodash";
import * as Unicons from "@iconscout/react-unicons";

import styles from "./Orders.module.scss";
import currencyConvert from "@/services/currencyConvert";
import orderApi from "@/api/orderApi";
import renderOrderStatus from "@/services/renderOrderStatus";
import { orderStatus } from "@/enums";

const cx = classNames.bind(styles);
const { Panel } = Collapse;

function Orders() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const [queryParams, setQueryParams] = useSearchParams();
  const [allQueryParams, setAllQueryParams] = useState({});
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const pageSize = 10;
    const page = queryParams.get("page");
    const search = queryParams.get("search");
    const sort = queryParams.get("sort");
    const status = queryParams.get("status");

    // Get all orders
    const handleGetAllOrders = async () => {
      setLoading(true);

      try {
        var response = await orderApi.getAll({
          status,
          pageSize,
          page: page || 1,
          search,
          sort,
        });

        setOrders(response.data?.data ?? []);
        setTotalPages(response.data?.totalPage * 10 || 1);
        setLoading(false);
      } catch (error) {
        console.warn(error);
      }
    };
    handleGetAllOrders();
  }, [queryParams]);

  // --------- Filter change ---------
  // Get all query params
  useEffect(() => {
    const allParams = {};
    queryParams.forEach((value, key) => {
      allParams[key] = value;
    });

    setAllQueryParams(allParams);
  }, [queryParams]);

  // Delay search
  const handleDebounceSearch = useMemo(() => {
    return debounce((value) => {
      setQueryParams({ ...allQueryParams, search: value });
    }, 1000);
  }, [setQueryParams, allQueryParams]);

  const handleSearchParamChange = (e) => {
    handleDebounceSearch(e.target.value);
  };

  const handleSortParamChange = (e) => {
    let value = e.target.value;
    setQueryParams({ ...allQueryParams, sort: value });
  };

  const handleStatusParamChange = (e) => {
    let value = e.target.value;
    setQueryParams({ ...allQueryParams, status: value });
  };

  const handlePageParamChange = (page) => {
    setQueryParams({ ...allQueryParams, page: page });
  };
  // --------- End Filter change ---------

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

        {/* Search and filter */}
        <div className={cx("w-100", "pt-2", "pb-2")}>
          <Space.Compact block>
            <Input onChange={handleSearchParamChange} placeholder="Tìm kiếm" prefix={<Unicons.UilSearch size="16" />} />
            <Popover
              title="Filter"
              placement="bottom"
              trigger="click"
              content={
                <>
                  <Collapse defaultActiveKey={1} size="small" ghost accordion expandIconPosition="end">
                    <Panel header="Trạng thái" key="1">
                      <Radio.Group onChange={handleStatusParamChange}>
                        <Space size="small" direction="vertical">
                          {orderStatus.map((status) => (
                            <Radio key={status.orderStatusId} value={status.orderStatusId}>
                              {status.name}
                            </Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </Panel>

                    <Panel header="Sắp xếp" key="2">
                      <Radio.Group onChange={handleSortParamChange}>
                        <Space size="small" direction="vertical">
                          <Radio value={"creationTimeDesc"}>Mới hơn</Radio>
                          <Radio value={"creationTimeAsc"}>Cũ hơn</Radio>
                          <Radio value={"nameAsc"}>Tên A - Z</Radio>
                          <Radio value={"nameDesc"}>Tên Z - A</Radio>
                        </Space>
                      </Radio.Group>
                    </Panel>
                  </Collapse>
                </>
              }
            >
              <Button className={cx("d-flex", "align-items-center")} icon={<Unicons.UilFilter size="16" />}>
                <span className={cx("ps-1")}>Filter</span>
              </Button>
            </Popover>
          </Space.Compact>
        </div>
        {/* End Search and filter */}

        {/* Table */}
        <Spin spinning={loading}>
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
                      <Tag color={renderOrderStatus(order.orderStatusId).color}>
                        {renderOrderStatus(order.orderStatusId).name}
                      </Tag>
                    </td>
                    <td>{currencyConvert(order.orderTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Spin>
        {/* End table */}

        {/* Paging */}
        <div className={cx("mt-4", "d-flex", "justify-end", "align-items-center", "pagination")}>
          <Pagination
            current={queryParams.get("page") || 1}
            onChange={handlePageParamChange}
            total={totalPages}
            size="small"
            simple
          />
        </div>
      </div>
      {/* ----- End card ----- */}
    </div>
  );
}

export default Orders;
