import classNames from "classnames/bind";
import styles from "./OrderDetails.module.scss";
import { Breadcrumb, Col, Divider, Row, Spin, Steps, Tag, Popconfirm } from "antd";
import { Link, useParams } from "react-router-dom";
import images from "@/assets/images";
import { useEffect, useMemo, useState } from "react";
import orderApi from "@/api/orderApi";
import dayjs from "dayjs";
import renderOrderStatus from "@/services/renderOrderStatus";
import { orderStatusEnum } from "@/enums";
import currencyConvert from "@/services/currencyConvert";

const cx = classNames.bind(styles);

function AdminOrderDetails() {
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});

  const { id } = useParams();

  // ----- Handle get order details -----
  useEffect(() => {
    const handleGetOrderDetails = async () => {
      try {
        const response = await orderApi.get(id);

        setOrderDetails(response.data?.data ?? {});
      } catch (error) {
        console.warn(error);
      }
    };

    handleGetOrderDetails();
  }, [id]);
  // ----- End handle get order details -----

  // ----- Handle change order status -----
  const orderStepChange = async (value) => {
    try {
      if (orderDetails.orderStatusId !== orderStatusEnum.CANCELLED) {
        setLoading(true);

        switch (value) {
          case 0:
            setLoading(false);
            break;
          case 1:
            if (orderDetails.orderStatusId !== orderStatusEnum.COMPLETED) {
              const deliveryResponse = await orderApi.delivery(id);

              setOrderDetails((prev) => ({
                ...prev,
                orderStatusId: deliveryResponse.data.data.orderStatusId,
              }));
            }

            setLoading(false);
            break;
          case 2:
            const completeResponse = await orderApi.complete(id);

            setOrderDetails((prev) => ({
              ...prev,
              orderStatusId: completeResponse.data.data.orderStatusId,
            }));

            setLoading(false);
            break;

          default:
            break;
        }
      }
    } catch (error) {
      console.warn(error);
      setLoading(false);
    }
  };
  // ----- End handle change order status -----

  // ----- Handle cancel order -----
  const handleCancelOrder = async () => {
    setLoading(true);

    try {
      if (orderDetails.orderStatusId !== orderStatusEnum.COMPLETED) {
        const response = await orderApi.cancel(id);

        setOrderDetails((prev) => ({
          ...prev,
          orderStatusId: response.data.data.orderStatusId,
        }));
      }

      setLoading(false);
    } catch (error) {
      console.warn(error);
      setLoading(false);
    }
  };
  // ----- Handle cancel order -----

  // ----- Handle render order status -----
  const orderStatus = useMemo(() => {
    return renderOrderStatus(orderDetails.orderStatusId);
  }, [orderDetails]);
  // ----- End handle render order status -----

  return (
    <div>
      {/* ----- Page header ----- */}
      <div className={cx("d-flex", "pb-5", "align-items-center", "justify-space-between")}>
        <h1 className={cx("font-primary", "fw-700")}>
          Đơn hàng #{id}
          <p className={cx("fs-16", "fw-400")}>{dayjs(orderDetails.createAt).format("DD/MM/YYYY HH:mm")}</p>
        </h1>
        <Breadcrumb
          className={cx("d-none", "d-md-block")}
          items={[
            {
              title: <Link to={"/admin/orders"}>Đơn hàng</Link>,
              key: "orders",
            },
            {
              title: "Chi tiết đơn hàng",
              key: "adminOrderDetails",
            },
          ]}
        />
      </div>
      {/* ----- Page header ----- */}

      <Row gutter={[16, 16]}>
        {/* --- Order details --- */}
        <Col xs={24} md={16}>
          <div className={cx("card")}>
            {/* Card header */}
            <h4 className={cx("card-title", "pb-2")}>
              Đơn hàng{" "}
              <Tag className={cx("ms-2")} color={orderStatus?.color}>
                {orderStatus?.name}
              </Tag>
            </h4>
            {/* End card header */}

            {/* Order items */}
            <div className={cx("w-100", "overflow-x-auto", "mt-2")}>
              <table className={cx("table", "bordered-header-only")}>
                <tbody>
                  {orderDetails?.items?.map((item) => (
                    <tr key={item.orderItemId}>
                      <td style={{ width: "54px" }} className={cx("py-1", "ps-0")}>
                        <img src={item?.product?.images[0]?.image || images.placeholder} alt="" />
                      </td>
                      <td>
                        <p className={cx("fw-500")}>{item?.product?.name || "N/A"}</p>
                        <p className={cx("fw-400", "text-secondary", "pt-2", "text-wrap")}>
                          Lời chúc: {item.wishes || "--"}
                        </p>
                      </td>
                      <td className={cx("fw-500")}>
                        {currencyConvert(item.price, false)}x{item.qty}
                      </td>
                      <td className={cx("text-end", "fw-500", "pe-0")}>
                        {currencyConvert(item.price * item.qty, false)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* End Order items */}

            <Divider className={cx("my-4")} />

            {/* Order total */}
            <Row>
              <Col xs={24} md={12}></Col>
              <Col xs={24} md={12}>
                <Row>
                  <Col span={12}>
                    <p className={cx("font-primary", "pb-1")}>Tổng tiền</p>
                    <p className={cx("font-primary", "pb-1")}>Vận chuyển</p>
                    <p className={cx("font-primary", "fw-600")}>Thành tiền</p>
                  </Col>
                  <Col span={12}>
                    <p className={cx("font-primary", "pb-1", "text-end")}>
                      {currencyConvert(orderDetails?.items?.reduce((total, item) => total + item.price * item.qty, 0))}
                    </p>
                    <p className={cx("font-primary", "pb-1", "text-end")}>
                      {currencyConvert(orderDetails.shippingFee)}
                    </p>
                    <p className={cx("font-primary", "fw-600", "text-end")}>
                      {currencyConvert(orderDetails.orderTotal)}
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* End Order total */}

            <Divider className={cx("my-4")} />

            <h4 className={cx("card-title", "pb-2")}>Trạng thái</h4>
            <Spin spinning={loading}>
              <Steps
                current={orderStatus?.step || 0}
                onChange={orderStepChange}
                items={[{ title: "Tạo đơn hàng" }, { title: "Giao hàng" }, { title: "Hoàn thành" }]}
              />

              <Divider className={cx("my-4")} />

              <div className={cx("d-flex", "justify-start")}>
                <Popconfirm
                  title="Huỷ đơn hàng"
                  description="Bạn có chắc chắn muốn huỷ đơn hàng"
                  onConfirm={handleCancelOrder}
                  okText="Đồng ý"
                  cancelText="Hủy"
                  disabled={
                    orderDetails?.orderStatusId === orderStatusEnum.CANCELLED ||
                    orderDetails?.orderStatusId === orderStatusEnum.COMPLETED
                  }
                >
                  <button
                    onClick={(e) => e.preventDefault()}
                    className={cx("btn", "btn-modern")}
                    disabled={
                      orderDetails?.orderStatusId === orderStatusEnum.CANCELLED ||
                      orderDetails?.orderStatusId === orderStatusEnum.COMPLETED
                    }
                  >
                    Huỷ đơn hàng
                  </button>
                </Popconfirm>
              </div>
            </Spin>
          </div>
        </Col>
        {/* --- End Order details --- */}

        {/* --- Shipping details --- */}
        <Col xs={24} md={8}>
          <div className={cx("card")}>
            <div>
              <h4 className={cx("card-title", "pb-2")}>Khách hàng</h4>
              <p className={cx("fs-14", "font-primary")}>{orderDetails.customerName || "Không có"}</p>
              <p className={cx("fs-14", "font-primary")}>{orderDetails.customerPhoneNumber}</p>
            </div>

            <Divider className={cx("my-4")} />

            <div>
              <h4 className={cx("card-title", "pb-2")}>Người nhận</h4>
              <p className={cx("fs-14", "font-primary")}>{orderDetails.recipientName || "Không có"}</p>
              <p className={cx("fs-14", "font-primary")}>{orderDetails.recipientPhoneNumber}</p>

              {orderDetails.isGift && (
                <Tag className={cx("mt-1")} color="blue">
                  Quà tặng
                </Tag>
              )}
            </div>

            <Divider className={cx("my-4")} />

            <div>
              <h4 className={cx("card-title", "pb-2")}>Thông tin giao hàng</h4>

              <p className={cx("fs-14", "fw-500", "font-primary", "pb-1")}>Địa chỉ</p>
              <p className={cx("fs-14", "font-primary")}>{orderDetails.address || "Không có"}</p>

              <p className={cx("fs-14", "fw-500", "font-primary", "pt-2", "pb-1")}>Ghi chú giao hàng</p>
              <p className={cx("fs-14", "font-primary")}>{orderDetails.deliveryNotes || "Không có"}</p>

              <p className={cx("fs-14", "fw-500", "font-primary", "pt-2", "pb-1")}>Ngày giao</p>
              <p className={cx("fs-14", "font-primary")}>
                {dayjs(orderDetails.createAt).format("DD/MM/YYYY")}
                {", khoảng "}
                {orderDetails.deliveryTime}
              </p>
            </div>
          </div>
        </Col>
        {/* --- End Shipping details --- */}
      </Row>
    </div>
  );
}

export default AdminOrderDetails;
