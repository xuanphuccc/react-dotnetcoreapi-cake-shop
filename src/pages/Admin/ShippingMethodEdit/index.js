import classNames from "classnames/bind";
import styles from "./ShippingMethodEdit.module.scss";
import { Breadcrumb, Button, Col, Image, Input, Radio, Row, Spin } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Unicons from "@iconscout/react-unicons";
import images from "@/assets/images";
import { useEffect, useRef, useState } from "react";
import { uploadFile } from "@/firebase/service";
import shippingMethodApi from "@/api/shippingMethodApi";

const cx = classNames.bind(styles);

function ShippingMethodEdit() {
    const [loading, setLoading] = useState(false);

    const [shippingName, setShippingName] = useState("");
    const [shippingInitialDistance, setShippingInitialDistance] = useState("");
    const [shippingInitialCharge, setShippingInitialCharge] = useState("");
    const [shippingAdditionalCharge, setShippingAdditionalCharge] =
        useState("");
    const [shippingLogo, setShippingLogo] = useState({
        image: null,
        preview: "",
    });
    const [shippingIsDefault, setShippingIsDefault] = useState(false);

    const inputImageRef = useRef();
    const navigate = useNavigate();
    const { action, id } = useParams();

    // ----- Handle input change -----
    const handleShippingNameChange = (e) => {
        setShippingName(e.target.value);
    };

    const handleShippingInitialDistanceChange = (e) => {
        setShippingInitialDistance(e.target.value);
    };

    const handleShippingInitialChargeChange = (e) => {
        setShippingInitialCharge(e.target.value);
    };

    const handleShippingAdditionalChargeChange = (e) => {
        setShippingAdditionalCharge(e.target.value);
    };

    const handleShippingLogoChange = (e) => {
        setShippingLogo({
            image: e.target.files[0],
            preview: URL.createObjectURL(e.target.files[0]),
        });
    };

    const handleShippingIsDefaultChange = (e) => {
        setShippingIsDefault(e.target.value);
    };
    // ----- End Handle input change -----

    // ----- Handle create -----
    const generateData = async () => {
        const data = {
            name: shippingName,
            initialCharge: Number(shippingInitialCharge),
            initialDistance: Number(shippingInitialDistance),
            additionalCharge: Number(shippingAdditionalCharge),
            logo: shippingLogo.image,
            isDefault: shippingIsDefault,
        };

        if (data.logo && typeof data.logo != "string") {
            // Upload image and get image url
            const uploadedImage = await uploadFile(
                data.logo,
                "images/shippingMethods"
            );
            data.logo = uploadedImage.url;
        }

        return data;
    };

    const handleCreateShippingMethod = async (e) => {
        e.preventDefault();

        if (
            shippingName &&
            shippingInitialCharge &&
            shippingInitialDistance &&
            shippingAdditionalCharge
        ) {
            setLoading(true);

            try {
                const data = await generateData();

                const response = await shippingMethodApi.create(data);

                console.log(response);

                setTimeout(() => {
                    setLoading(false);
                    navigate("/admin/shipping-methods");
                }, 400);
            } catch (error) {
                console.warn(error);
                setLoading(false);
            }
        }
    };
    // ----- End Handle create -----

    // ----- Handle update -----
    useEffect(() => {
        const handleGetShippingMethodForUpdate = async () => {
            if (action === "update" && id) {
                try {
                    const response = await shippingMethodApi.get(id);
                    const shippingMethod = response.data.data;
                    console.log(shippingMethod);

                    setShippingName(shippingMethod.name);
                    setShippingInitialDistance(shippingMethod.initialDistance);
                    setShippingInitialCharge(shippingMethod.initialCharge);
                    setShippingAdditionalCharge(
                        shippingMethod.additionalCharge
                    );
                    setShippingLogo({
                        image: shippingMethod.logo,
                        preview: shippingMethod.logo,
                    });
                    setShippingIsDefault(shippingMethod.isDefault);
                } catch (error) {
                    console.warn(error);
                }
            }
        };
        handleGetShippingMethodForUpdate();
    }, [action, id]);

    // Update category
    const handleUpdateShippingMethod = async (e) => {
        e.preventDefault();

        if (
            action === "update" &&
            id &&
            shippingName &&
            shippingInitialCharge &&
            shippingInitialDistance &&
            shippingAdditionalCharge
        ) {
            setLoading(true);

            try {
                const data = await generateData();

                const response = await shippingMethodApi.update(id, data);

                console.log(response);

                setTimeout(() => {
                    setLoading(false);
                    navigate("/admin/shipping-methods");
                }, 400);
            } catch (error) {
                console.warn(error);
                setLoading(false);
            }
        }
    };
    // ----- End Handle update -----

    // ----- Handle delete -----
    const handleDeleteShippingMethod = async (e) => {
        e.preventDefault();

        if (action === "update" && id) {
            setLoading(true);

            try {
                const response = await shippingMethodApi.delete(id);

                console.log(response);

                setTimeout(() => {
                    setLoading(false);
                    navigate("/admin/shipping-methods");
                }, 400);
            } catch (error) {
                console.warn(error);
                setLoading(false);
            }
        }
    };
    // ----- End Handle delete -----

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
                <h1 className={cx("font-primary", "fw-700")}>
                    Thêm vận chuyển
                </h1>
                <Breadcrumb
                    className={cx("d-none", "d-md-block")}
                    items={[
                        {
                            title: (
                                <Link to={"/admin/shipping-methods"}>
                                    Vận chuyển
                                </Link>
                            ),
                            key: "categories",
                        },
                        { title: "Thêm vận chuyển", key: "shipping-create" },
                    ]}
                />
            </div>
            {/* ----- Page header ----- */}

            <Row gutter={[16, 16]}>
                <Col xs={24} md={16}>
                    {/* ----- Card ----- */}
                    <div className={cx("card")}>
                        {/* Card header */}
                        <h4 className={cx("card-title", "pb-2")}>
                            Vận chuyển
                            <span className={cx("card-icon")}>
                                <Unicons.UilAnchor color="#0958d9" size="16" />
                            </span>
                        </h4>
                        {/* End card header */}

                        <form>
                            <div className={cx("form-group")}>
                                <label
                                    className={cx("form-label", "pt-0", "pb-1")}
                                    htmlFor=""
                                >
                                    Tên phương thức vận chuyển
                                </label>
                                <Input
                                    onChange={handleShippingNameChange}
                                    value={shippingName}
                                    placeholder="Nhập tên phương thức vận chuyển"
                                />
                            </div>

                            <div className={cx("form-group")}>
                                <label
                                    className={cx("form-label", "pt-2", "pb-1")}
                                    htmlFor=""
                                >
                                    Số km đầu
                                </label>
                                <Input
                                    onChange={
                                        handleShippingInitialDistanceChange
                                    }
                                    value={shippingInitialDistance}
                                    placeholder="Nhập số km đầu"
                                />
                            </div>

                            <div className={cx("form-group")}>
                                <label
                                    className={cx("form-label", "pt-2", "pb-1")}
                                    htmlFor=""
                                >
                                    Giá km đầu
                                </label>
                                <Input
                                    onChange={handleShippingInitialChargeChange}
                                    value={shippingInitialCharge}
                                    placeholder="Nhập giá km đầu"
                                />
                            </div>

                            <div className={cx("form-group")}>
                                <label
                                    className={cx("form-label", "pt-2", "pb-1")}
                                    htmlFor=""
                                >
                                    Giá mỗi km tiếp theo
                                </label>
                                <Input
                                    onChange={
                                        handleShippingAdditionalChargeChange
                                    }
                                    value={shippingAdditionalCharge}
                                    placeholder="Nhập giá mỗi km tiếp theo"
                                />
                            </div>

                            <div className={cx("form-group")}>
                                <label
                                    className={cx(
                                        "form-label",
                                        "pt-2",
                                        "pb-1",
                                        "d-block"
                                    )}
                                    htmlFor=""
                                >
                                    Logo
                                </label>
                                <input
                                    onChange={handleShippingLogoChange}
                                    ref={inputImageRef}
                                    type="file"
                                    accept="image/png, image/gif, image/jpeg"
                                    name=""
                                    id=""
                                    hidden
                                />
                                <Button
                                    onClick={() => {
                                        inputImageRef.current.click();
                                    }}
                                    icon={<Unicons.UilUpload size="14" />}
                                >
                                    <span className={cx("ps-2")}>
                                        Tải ảnh lên
                                    </span>
                                </Button>
                            </div>

                            <div className={cx("form-group")}>
                                <label
                                    className={cx("form-label", "pt-2", "pb-1")}
                                    htmlFor=""
                                >
                                    Trạng thái
                                </label>

                                <div>
                                    <Radio.Group
                                        onChange={handleShippingIsDefaultChange}
                                        value={shippingIsDefault}
                                    >
                                        <Radio
                                            value={true}
                                            className={cx(
                                                "d-block",
                                                "font-primary"
                                            )}
                                        >
                                            Mặc định
                                        </Radio>
                                        <Radio
                                            value={false}
                                            className={cx(
                                                "d-block",
                                                "font-primary",
                                                "mt-2"
                                            )}
                                        >
                                            Ẩn
                                        </Radio>
                                    </Radio.Group>
                                </div>
                            </div>

                            <div className={cx("pt-5")}>
                                <Spin spinning={loading}>
                                    {action === "update" ? (
                                        <>
                                            <button
                                                onClick={
                                                    handleUpdateShippingMethod
                                                }
                                                className={cx(
                                                    "btn",
                                                    "btn-modern",
                                                    "btn-dark"
                                                )}
                                            >
                                                Cập nhật
                                            </button>
                                            <button
                                                onClick={
                                                    handleDeleteShippingMethod
                                                }
                                                className={cx(
                                                    "btn",
                                                    "btn-modern",
                                                    "btn-warning"
                                                )}
                                            >
                                                Xoá
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={handleCreateShippingMethod}
                                            className={cx(
                                                "btn",
                                                "btn-modern",
                                                "btn-dark"
                                            )}
                                        >
                                            Thêm vận chuyển
                                        </button>
                                    )}
                                    <Link
                                        to={"/admin/shipping-methods"}
                                        className={cx("btn", "btn-modern")}
                                    >
                                        Huỷ
                                    </Link>
                                </Spin>
                            </div>
                        </form>
                    </div>
                    {/* ----- End card ----- */}
                </Col>
                <Col xs={24} md={8}>
                    {/* ----- Card ----- */}
                    <div className={cx("card")}>
                        {/* Card header */}
                        <div className={cx("pb-2")}>
                            <h4
                                className={cx(
                                    "fs-16",
                                    "fw-600",
                                    "font-primary"
                                )}
                            >
                                Logo
                            </h4>
                        </div>
                        {/* End card header */}

                        <Image
                            src={shippingLogo.preview || images.placeholder}
                            className={cx("rounded-sm")}
                        />
                    </div>
                    {/* ----- End card ----- */}
                </Col>
            </Row>
        </div>
    );
}

export default ShippingMethodEdit;
