import classNames from "classnames/bind";
import styles from "./ShippingMethodEdit.module.scss";
import { Breadcrumb, Button, Col, Image, Input, Radio, Row, Spin, Popconfirm } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Unicons from "@iconscout/react-unicons";
import images from "@/assets/images";
import { useEffect, useRef, useState } from "react";
import { uploadFile } from "@/firebase/service";
import shippingMethodApi from "@/api/shippingMethodApi";
import Validator from "@/validator/validator";

const cx = classNames.bind(styles);

function ShippingMethodEdit() {
  const [loading, setLoading] = useState(false);

  const [shippingName, setShippingName] = useState("");
  const [shippingInitialDistance, setShippingInitialDistance] = useState("");
  const [shippingInitialCharge, setShippingInitialCharge] = useState("");
  const [shippingAdditionalCharge, setShippingAdditionalCharge] = useState("");
  const [shippingLogo, setShippingLogo] = useState({
    image: null,
    preview: "",
  });
  const [shippingIsDefault, setShippingIsDefault] = useState(false);

  // Error messages
  const [nameError, setNameError] = useState("");
  const [initialDistanceError, setInitialDistanceError] = useState("");
  const [initialChargeError, setInitialChargeError] = useState("");
  const [additionalChargeError, setAdditionalChargeError] = useState("");

  const inputImageRef = useRef();
  const navigate = useNavigate();
  const { action, id } = useParams();

  // ----- Handle input change -----
  const handleShippingNameChange = (e) => {
    setShippingName(e.target.value);

    // Clear error
    setNameError("");
  };

  const handleShippingInitialDistanceChange = (e) => {
    setShippingInitialDistance(e.target.value);

    // Clear error
    setInitialDistanceError("");
  };

  const handleShippingInitialChargeChange = (e) => {
    setShippingInitialCharge(e.target.value);

    // Clear error
    setInitialChargeError("");
  };

  const handleShippingAdditionalChargeChange = (e) => {
    setShippingAdditionalCharge(e.target.value);

    // Clear error
    setAdditionalChargeError("");
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

  // ----- Handle validate input -----
  const handleValidateName = () => {
    return Validator({
      setErrorMessage: setNameError,
      rules: [Validator.isRequired(shippingName, "Vui lòng nhập tên phương thức vận chuyển")],
    });
  };

  const handleValidateInitialDistance = () => {
    return Validator({
      setErrorMessage: setInitialDistanceError,
      rules: [Validator.isRequired(shippingInitialDistance, "Vui lòng nhập số km đầu")],
    });
  };

  const handleValidateInitialCharge = () => {
    return Validator({
      setErrorMessage: setInitialChargeError,
      rules: [Validator.isRequired(shippingInitialCharge, "Vui lòng nhập giá km đầu")],
    });
  };

  const handleValidateAdditionalCharge = () => {
    return Validator({
      setErrorMessage: setAdditionalChargeError,
      rules: [Validator.isRequired(shippingAdditionalCharge, "Vui lòng nhập giá mỗi km tiếp theo")],
    });
  };
  // ----- End Handle validate input -----

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
      const uploadedImage = await uploadFile(data.logo, "images/shippingMethods");
      data.logo = uploadedImage.url;
    }

    return data;
  };

  const handleCreateShippingMethod = async (e) => {
    e.preventDefault();

    if (
      handleValidateName() &&
      handleValidateInitialDistance() &&
      handleValidateInitialCharge() &&
      handleValidateAdditionalCharge()
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
          const shippingMethod = response.data?.data ?? {};

          console.log(shippingMethod);

          setShippingName(shippingMethod.name);
          setShippingInitialDistance(shippingMethod.initialDistance);
          setShippingInitialCharge(shippingMethod.initialCharge);
          setShippingAdditionalCharge(shippingMethod.additionalCharge);
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
      handleValidateName() &&
      handleValidateInitialDistance() &&
      handleValidateInitialCharge() &&
      handleValidateAdditionalCharge()
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
      <div className={cx("d-flex", "pb-5", "align-items-center", "justify-space-between")}>
        <h1 className={cx("font-primary", "fw-700")}>Thêm vận chuyển</h1>
        <Breadcrumb
          className={cx("d-none", "d-md-block")}
          items={[
            {
              title: <Link to={"/admin/shipping-methods"}>Vận chuyển</Link>,
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
              <div
                className={cx("form-group", {
                  error: nameError,
                })}
              >
                <label className={cx("form-label", "pt-0", "pb-1")} htmlFor="">
                  Tên phương thức vận chuyển
                </label>
                <Input
                  value={shippingName}
                  onChange={handleShippingNameChange}
                  onBlur={handleValidateName}
                  placeholder="Nhập tên phương thức vận chuyển"
                  status={nameError && "error"}
                />
                <p className={cx("error-text")}>{nameError}</p>
              </div>

              <div
                className={cx("form-group", {
                  error: initialDistanceError,
                })}
              >
                <label className={cx("form-label", "pt-2", "pb-1")} htmlFor="">
                  Số km đầu
                </label>
                <Input
                  value={shippingInitialDistance}
                  onChange={handleShippingInitialDistanceChange}
                  onBlur={handleValidateInitialDistance}
                  type="number"
                  placeholder="Nhập số km đầu"
                  status={initialDistanceError && "error"}
                />
                <p className={cx("error-text")}>{initialDistanceError}</p>
              </div>

              <div
                className={cx("form-group", {
                  error: initialChargeError,
                })}
              >
                <label className={cx("form-label", "pt-2", "pb-1")} htmlFor="">
                  Giá km đầu
                </label>
                <Input
                  value={shippingInitialCharge}
                  onChange={handleShippingInitialChargeChange}
                  onBlur={handleValidateInitialCharge}
                  type="number"
                  placeholder="Nhập giá km đầu"
                  status={initialChargeError && "error"}
                />
                <p className={cx("error-text")}>{initialChargeError}</p>
              </div>

              <div
                className={cx("form-group", {
                  error: additionalChargeError,
                })}
              >
                <label className={cx("form-label", "pt-2", "pb-1")} htmlFor="">
                  Giá mỗi km tiếp theo
                </label>
                <Input
                  value={shippingAdditionalCharge}
                  onChange={handleShippingAdditionalChargeChange}
                  onBlur={handleValidateAdditionalCharge}
                  type="number"
                  placeholder="Nhập giá mỗi km tiếp theo"
                  status={additionalChargeError && "error"}
                />
                <p className={cx("error-text")}>{additionalChargeError}</p>
              </div>

              <div className={cx("form-group")}>
                <label className={cx("form-label", "pt-2", "pb-1", "d-block")} htmlFor="">
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
                  <span className={cx("ps-2")}>Tải ảnh lên</span>
                </Button>
              </div>

              <div className={cx("form-group")}>
                <label className={cx("form-label", "pt-2", "pb-1")} htmlFor="">
                  Trạng thái
                </label>

                <div>
                  <Radio.Group onChange={handleShippingIsDefaultChange} value={shippingIsDefault}>
                    <Radio value={true} className={cx("d-block", "font-primary")}>
                      Mặc định
                    </Radio>
                    <Radio value={false} className={cx("d-block", "font-primary", "mt-2")}>
                      Ẩn
                    </Radio>
                  </Radio.Group>
                </div>
              </div>

              <div className={cx("pt-5")}>
                <Spin spinning={loading}>
                  {action === "update" ? (
                    <>
                      <button onClick={handleUpdateShippingMethod} className={cx("btn", "btn-modern", "btn-dark")}>
                        Cập nhật
                      </button>
                      <Popconfirm
                        title="Xoá đơn vị vận chuyển"
                        description="Bạn có chắc chắn muốn xoá đơn vị vận chuyển"
                        onConfirm={handleDeleteShippingMethod}
                        okText="Đồng ý"
                        cancelText="Hủy"
                      >
                        <button onClick={(e) => e.preventDefault()} className={cx("btn", "btn-modern", "btn-warning")}>
                          Xoá
                        </button>
                      </Popconfirm>
                    </>
                  ) : (
                    <button onClick={handleCreateShippingMethod} className={cx("btn", "btn-modern", "btn-dark")}>
                      Thêm vận chuyển
                    </button>
                  )}
                  <Link to={"/admin/shipping-methods"} className={cx("btn", "btn-modern")}>
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
              <h4 className={cx("fs-16", "fw-600", "font-primary")}>Logo</h4>
            </div>
            {/* End card header */}

            <Image src={shippingLogo.preview || images.placeholder} className={cx("rounded-sm")} />
          </div>
          {/* ----- End card ----- */}
        </Col>
      </Row>
    </div>
  );
}

export default ShippingMethodEdit;
