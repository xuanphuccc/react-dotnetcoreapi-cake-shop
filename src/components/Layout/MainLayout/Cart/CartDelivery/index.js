import classNames from "classnames/bind";
import styles from "./CartDelivery.module.scss";
import icons from "@/assets/icons";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch } from "react-redux";
import drawersSlide from "../../drawersSlide";
import Select from "@/components/Select";
import { useMemo, useState } from "react";
import { Checkbox, DatePicker } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import axios from "axios";

const cx = classNames.bind(styles);

function CartDelivery() {
    const [deliveryTime, setdeliveryTime] = useState({});
    const [addressOptions, setAddressOptions] = useState([]);
    const [address, setAddress] = useState("");
    const [isPresent, setIsPresent] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCloseCart = () => {
        dispatch(drawersSlide.actions.closeCart());
        dispatch(drawersSlide.actions.openStepCart());
    };

    const handleChangeStepToCart = () => {
        dispatch(drawersSlide.actions.openStepCart());
    };

    // ----- Handle search address -----
    const handleSearchAddress = useMemo(() => {
        return debounce((value) => {
            if (value) {
                axios
                    .get(
                        `https://api.radar.io/v1/search/autocomplete?query=${value}` +
                            `&near=21.027849%2C105.802306&limit=5&country=vn`,
                        {
                            headers: {
                                Authorization: process.env["REACT_APP_MAP_API"],
                            },
                        }
                    )
                    .then((response) => {
                        setAddressOptions(
                            response.data.addresses.map((item) => ({
                                label:
                                    (item.placeLabel
                                        ? item.placeLabel + ", "
                                        : "") + item.formattedAddress,
                                value: item,
                            }))
                        );
                    })
                    .catch((error) => {
                        console.warn(error);
                    });
            }
        }, 1000);
    }, []);
    // ----- End Handle search address -----

    // ----- Handle input change -----
    const handleDeliveryTimeChange = (value) => {
        setdeliveryTime(value);
    };

    const handleAddressInputChange = (value) => {
        handleSearchAddress(value);
    };

    const handleSelectAddressChange = (value) => {
        setAddress(value);
    };

    const handleIsPresentChange = (e) => {
        setIsPresent(e.target.checked);
    };
    // ----- Handle input change -----

    // ----- Handle order -----
    const handleOrder = () => {
        navigate("/confirm");
    };
    // ----- Handle order -----

    return (
        <div className={cx("w-100", "d-flex", "flex-column")}>
            {/* ----- Header ----- */}
            <div
                className={cx(
                    "px-32",
                    "py-4",
                    "d-flex",
                    "justify-space-between",
                    "align-items-center"
                )}
            >
                <h2
                    className={cx(
                        "font-secondary",
                        "fw-200",
                        "fs-36",
                        "text-italic"
                    )}
                >
                    Giao hàng
                </h2>
                <img
                    onClick={handleCloseCart}
                    className={cx("cursor-pointer")}
                    src={icons.times}
                    alt=""
                />
            </div>
            {/* ----- End Header ----- */}

            {/* ----- Delivery form ----- */}
            <div className={cx("px-32", "pb-32", "scroll-y")}>
                <div className={cx("form-group")}>
                    <label className={cx("form-label")} htmlFor="name">
                        Tên người đặt
                    </label>
                    <input
                        id="name"
                        className={cx("form-control", "w-100")}
                        type="text"
                    />
                </div>

                <div className={cx("form-group")}>
                    <label className={cx("form-label")} htmlFor="phone">
                        Số điện thoại người đặt
                    </label>
                    <input
                        id="phone"
                        className={cx("form-control", "w-100")}
                        type="text"
                    />
                    <p className={cx("fs-12", "font-primary", "pt-1")}>
                        Vui lòng điền chính xác số điện thoại để LaFuong liên hệ
                        xác nhận đơn hàng.
                    </p>
                </div>

                <div className={cx("form-group")}>
                    <label className={cx("form-label")} htmlFor="phone">
                        Ngày giao
                    </label>
                    <div className={cx("border", "border-gray")}>
                        <DatePicker
                            defaultValue={dayjs(Date.now())}
                            className={cx("date-picker")}
                            size="large"
                            bordered={false}
                            placeholder="Chọn ngày giao"
                        />
                    </div>
                    <p className={cx("fs-12", "font-primary", "pt-1")}>
                        Nếu cần đặt bánh gấp trong ngày, xin liên hệ hotline:
                        090 786 0330
                    </p>
                </div>

                <div className={cx("form-group")}>
                    <label className={cx("form-label")} htmlFor="">
                        Khung giờ giao
                    </label>

                    <Select
                        value={deliveryTime}
                        onChange={handleDeliveryTimeChange}
                        options={[
                            { label: "11h15 - 13h00", value: "11h15 - 13h00" },
                            { label: "13h00 - 15h00", value: "13h00 - 15h00" },
                            { label: "15h00 - 17h00", value: "15h00 - 17h00" },
                            { label: "18h00 - 20h00", value: "18h00 - 20h00" },
                        ]}
                        placeholder="Chọn khung giờ giao"
                        readOnly={true}
                    />
                </div>

                <div className={cx("form-group")}>
                    <label className={cx("form-label")} htmlFor="address">
                        Giao tới địa chỉ
                    </label>
                    <Select
                        value={address}
                        onChange={handleSelectAddressChange}
                        onSearch={handleAddressInputChange}
                        options={addressOptions}
                        placeholder="Nhập địa chỉ giao hàng"
                        icon={<Unicons.UilSearch size="20" />}
                    />
                </div>

                <div className={cx("form-group")}>
                    <label className={cx("form-label")} htmlFor="note">
                        Ghi chú giao hàng (tuỳ chọn)
                    </label>
                    <input
                        id="note"
                        className={cx("form-control", "w-100")}
                        type="text"
                        placeholder="Ghi chú toà, đường,..."
                    />
                </div>

                {/* Is present input */}
                <div className={cx("form-group", "pt-2", "pb-2")}>
                    <Checkbox
                        checked={isPresent}
                        onChange={handleIsPresentChange}
                        id="checkbox"
                    />
                    <label
                        className={cx("form-label", "ms-2")}
                        htmlFor="checkbox"
                    >
                        Bạn muốn tặng bánh cho người khác?
                    </label>
                </div>
                {/* End Is present input */}

                {isPresent && (
                    <div>
                        <div className={cx("form-group")}>
                            <label
                                className={cx("form-label")}
                                htmlFor="receiverName"
                            >
                                Tên người nhận
                            </label>
                            <input
                                id="receiverName"
                                className={cx("form-control", "w-100")}
                                type="text"
                            />
                        </div>

                        <div className={cx("form-group")}>
                            <label
                                className={cx("form-label")}
                                htmlFor="receiverPhone"
                            >
                                Số điện thoại người nhận
                            </label>
                            <input
                                id="receiverPhone"
                                className={cx("form-control", "w-100")}
                                type="text"
                            />
                        </div>
                    </div>
                )}
            </div>
            {/* ----- End Delivery form ----- */}

            {/* ----- Total and order ----- */}
            <div
                className={cx("px-32", "pt-2", "pb-5", "border-top", "mt-auto")}
            >
                <div
                    className={cx(
                        "d-flex",
                        "justify-space-between",
                        "align-items-center",
                        "pt-2",
                        "pb-0"
                    )}
                >
                    <span
                        className={cx(
                            "fs-14",
                            "font-primary",
                            "fw-600",
                            "text-uppercase"
                        )}
                    >
                        Tổng tiền sản phẩm
                    </span>
                    <span className={cx("font-primary", "fs-16")}>
                        660.000đ
                    </span>
                </div>
                <div
                    className={cx(
                        "d-flex",
                        "justify-space-between",
                        "align-items-center",
                        "pt-2",
                        "pb-4"
                    )}
                >
                    <span
                        className={cx(
                            "fs-14",
                            "font-primary",
                            "fw-600",
                            "text-uppercase"
                        )}
                    >
                        Phí vận chuyển
                    </span>
                    <span className={cx("font-primary", "fs-16")}>0đ</span>
                </div>

                <div className={cx("w-100", "d-flex", "align-items-center")}>
                    <button
                        onClick={handleChangeStepToCart}
                        className={cx("btn", "btn-icon")}
                    >
                        <img src={icons.arrowLeft} alt="" />
                    </button>
                    <button
                        onClick={handleOrder}
                        className={cx("btn", "btn-dark", "w-100")}
                    >
                        Đặt hàng
                    </button>
                </div>
            </div>
            {/* ----- End Total and order ----- */}
        </div>
    );
}

export default CartDelivery;
