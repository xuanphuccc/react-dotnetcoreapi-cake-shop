import classNames from "classnames/bind";
import styles from "./ProductDetails.module.scss";
import { Col, Row, Spin } from "antd";
import { Link, useParams } from "react-router-dom";
import icons from "@/assets/icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import images from "@/assets/images";
import { useEffect, useRef, useState } from "react";
import Dropdown from "@/components/Dropdown";
import productApi from "@/api/productApi";
import currencyConvert from "@/services/currencyConvert";
import Paragraph from "@/components/Paragraph";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "@/components/Layout/MainLayout/Cart/cartSlice";
import { cartItemsSelector } from "@/redux/selector";
import mainLayoutSlide from "@/components/Layout/MainLayout/mainLayoutSlide";

const cx = classNames.bind(styles);

function ProductDetails() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});

  const [cartProductQty, setCartProductQty] = useState(1);

  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  const slider1Ref = useRef();
  const slider2Ref = useRef();

  const { id } = useParams();

  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSelector);

  // ----- Handle config slider -----
  useEffect(() => {
    if (slider1Ref.current) {
      setSlider1(slider1Ref.current);
    }

    if (slider2Ref.current) {
      setSlider2(slider2Ref.current);
    }
  }, [slider1Ref, slider2Ref]);
  // ----- End handle config slider -----

  // ----- Handle get product -----
  useEffect(() => {
    const handleGetProduct = async () => {
      setLoading(true);

      try {
        const response = await productApi.get(id);

        console.log(response.data.data);

        setProduct(response.data?.data ?? {});
        setLoading(false);
      } catch (error) {
        console.warn(error);
      }
    };

    handleGetProduct();
  }, [id]);
  // ----- End handle get product -----

  // ----- Handle cart qty change -----
  const handleIncreaseQty = () => {
    setCartProductQty((prev) => {
      if (prev < 20) {
        return prev + 1;
      }

      return prev;
    });
  };

  const handleDecreaseQty = () => {
    setCartProductQty((prev) => {
      if (prev > 1) {
        return prev - 1;
      }

      return prev;
    });
  };
  // ----- End Handle cart qty change -----

  // ----- Handle add product to cart -----
  const handleAddProductToCart = () => {
    // If the cart does not have this product -> add this product
    if (!cartItems.some((item) => item.productId === product.productId)) {
      // Add this product
      dispatch(
        cartSlice.actions.addItem({
          productId: product.productId,
          name: product.name,
          title: product.title,
          image: product?.images[0]?.image,
          qty: cartProductQty,
          price: product.price,
          wishes: "",
        }),
      );

      // Open cart
      dispatch(mainLayoutSlide.actions.openCart());
    } else {
      // Else increase item qty
      dispatch(
        cartSlice.actions.increaseItemQty({
          productId: product.productId,
          qty: cartProductQty,
        }),
      );

      // Open cart
      dispatch(mainLayoutSlide.actions.openCart());
    }
  };
  // ----- End handle add product to cart -----
  return (
    <div>
      <section className={cx("border-bottom")}>
        <Spin spinning={loading}>
          <Row>
            {/* ----- Product images ----- */}
            <Col xs={24} lg={12}>
              <div className={cx("carousel-wrap", "border-bottom", "border-end", "relative")}>
                <Slider adaptiveHeight={true} asNavFor={slider2} ref={slider1Ref}>
                  {product?.images?.map((image) => (
                    <div key={image.productImageId}>
                      <img className={cx("slider-item")} src={image.image || images.placeholder} alt="" />
                    </div>
                  ))}
                </Slider>

                <div style={{ width: "320px" }} className={cx("sub-slider")}>
                  <Slider
                    asNavFor={slider1}
                    ref={slider2Ref}
                    slidesToShow={5}
                    adaptiveHeight={true}
                    variableWidth={true}
                    focusOnSelect={true}
                  >
                    {product?.images?.map((image, index) => (
                      <div key={image.productImageId}>
                        <img
                          className={cx("border", "cursor-pointer", {
                            "border-start-hide": index !== 0,
                          })}
                          height={64}
                          width={64}
                          src={image.image || images.placeholder}
                          alt=""
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </Col>
            {/* ----- End product images ----- */}

            <Col xs={24} lg={12}>
              <div className={cx("product-details")}>
                {/* ----- Back button ----- */}
                <div className={cx("d-flex", "align-items-center")}>
                  <img className={cx("me-1", "btn-back-icon")} src={icons.arrowLeft} alt="" />

                  <Link
                    to={"/products#cake"}
                    className={cx("btn", "btn-link", "fs-16", "text-uppercase", "hover-hide-underline", "btn-back")}
                  >
                    {product?.category?.name || "Sản phẩm"}
                  </Link>
                </div>
                {/* ----- End back button ----- */}

                <h1 className={cx("fs-48", "fw-200", "text-italic", "font-secondary")}>{product?.name}</h1>

                {/* ----- Add to cart controls ----- */}
                <div className={cx("mt-4", "d-flex", "align-items-center", "flex-wrap")}>
                  <div className={cx("d-flex", "me-4", "mb-4")}>
                    <button onClick={handleDecreaseQty} className={cx("btn", "btn-icon")}>
                      <img src={icons.minus} alt="" />
                    </button>

                    <p className={cx("qty-number", "mx-1")}>{cartProductQty}</p>

                    <button onClick={handleIncreaseQty} className={cx("btn", "btn-icon")}>
                      <img src={icons.plus} alt="" />
                    </button>
                  </div>
                  <button onClick={handleAddProductToCart} className={cx("btn", "btn-dark", "mb-4")}>
                    <span>Thêm vào giỏ</span>
                    <span> • </span>
                    <span>{currencyConvert(product?.price * cartProductQty)}</span>
                  </button>
                </div>
                {/* ----- End Add to cart controls ----- */}

                <div className={cx("pt-2")}>
                  {/* ----- Description ----- */}
                  <div className={cx("mb-5")}>
                    <p className={cx("fs-20", "fw-500", "font-primary", "py-2")}>{product?.title}</p>
                    <div className={cx("fs-18", "font-primary", "pt-2")}>
                      <Paragraph value={product?.description} />
                    </div>
                  </div>
                  {/* ----- End Description ----- */}

                  {/* ----- Taste ----- */}
                  {product?.taste && (
                    <section className={cx("py-2")}>
                      <div className={cx("border-top", "border-gray", "pt-4")}>
                        <p className={cx("font-primary", "fs-16", "fw-600", "text-uppercase", "mb-2")}>Cảm giác bánh</p>
                        {product?.taste?.split(", ")?.map((item, index) => (
                          <span key={index} className={cx("badge", "fs-18", "badge-outline", "badge-lg", "badge-text")}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}
                  {/* ----- End Taste ----- */}

                  {/* ----- Structure ----- */}
                  {product?.texture && (
                    <section className={cx("py-2", "product-details-section")}>
                      <div className={cx("border-top", "border-gray", "pt-4")}>
                        <p className={cx("font-primary", "fs-16", "fw-600", "text-uppercase", "mb-2")}>
                          Cấu trúc vị bánh
                        </p>

                        <Paragraph value={product?.texture} />
                      </div>
                    </section>
                  )}
                  {/* ----- End Structure ----- */}

                  {/* ----- Size ----- */}
                  {product?.size && (
                    <section className={cx("py-2")}>
                      <div className={cx("border-top", "border-gray", "pt-4")}>
                        <p className={cx("font-primary", "fs-16", "fw-600", "text-uppercase", "mb-2")}>Kích thước</p>

                        <p className={cx("fs-18", "font-primary")}>{product?.size}</p>
                      </div>
                    </section>
                  )}
                  {/* ----- End Size ----- */}

                  {/* ----- Accessory ----- */}
                  {product?.accessories && (
                    <section className={cx("py-2", "product-details-section")}>
                      <div className={cx("border-top", "border-gray", "pt-4")}>
                        <p className={cx("font-primary", "fs-16", "fw-600", "text-uppercase", "mb-2")}>
                          Phụ kiện tặng kèm
                        </p>

                        <Paragraph value={product?.accessories} />
                      </div>
                    </section>
                  )}
                  {/* ----- End Accessory ----- */}

                  {/* ----- Instruction ----- */}
                  {product?.instructions && (
                    <section className={cx("py-2", "product-details-section")}>
                      <div className={cx("border-top", "border-gray", "pt-4")}>
                        <p className={cx("font-primary", "fs-16", "fw-600", "text-uppercase", "mb-2")}>
                          Hướng dẫn sử dụng
                        </p>

                        <Paragraph value={product?.instructions} />
                      </div>
                    </section>
                  )}
                  {/* ----- End Instruction ----- */}
                </div>
              </div>
            </Col>
          </Row>
        </Spin>
      </section>

      {/* ----- Questions ----- */}
      <section className={cx("border-bottom", "py-64", "px-5")}>
        <div className={cx("px-4", "pb-5")}>
          <h1 className={cx("font-secondary", "fs-48", "fw-200", "text-italic", "text-center")}>Câu hỏi thường gặp</h1>
          <p className={cx("fs-18", "font-primary", "text-center", "mt-4")}>
            Bạn có thể tìm câu trả lời cho những câu hỏi thường gặp ở dưới đây.
          </p>
        </div>

        <div className={cx("max-width-xl")}>
          <Dropdown title="Ngoài website thì tôi có thể đặt hàng bằng cách khác không?">
            <p className={cx("fs-18")}>Bạn có thể đặt bánh qua các hình thức sau</p>
            <p className={cx("fs-18")}>Fanpage: facebook.com/LaFuong.Pastry</p>
            <p className={cx("fs-18")}>Instagram: instagram.com/lafuong.pastry</p>
            <p className={cx("fs-18")}>Hotline/Zalo: 090 786 0330</p>
          </Dropdown>
          <Dropdown title="Thời gian đặt bánh trước tối thiểu là bao lâu?">
            <p className={cx("fs-18")}>Bạn nên đặt trước 1 ngày để có thể lựa chọn tất cả các mẫu bánh.</p>
            <p className={cx("fs-18", "mt-4")}>
              Nếu bạn cần đặt gấp trong ngày, vui lòng liên hệ hotline 090 786 0330 để được phục vụ ngay, tuy nhiên mẫu
              bánh có thể hạn chế và không đủ toàn bộ mẫu.
            </p>
          </Dropdown>
          <Dropdown border={false} title="Tôi có thể mua bánh trực tiếp tại xưởng của LaFuong không?">
            <p className={cx("fs-18")}>
              Chúng tôi không bán sản phẩm có sẵn và không bán trực tiếp tại xưởng. Do đặc thù sản phẩm bánh lạnh cao
              cấp rất khó bảo quản trong quá trình giao hàng nên hãy để các shipper chuyên nghiệp của chúng tôi giao
              hàng đến tận tay bạn để đảm bảo bánh luôn có được chất lượng tốt nhất.
            </p>
          </Dropdown>
        </div>
      </section>
      {/* ----- End Questions ----- */}
    </div>
  );
}

export default ProductDetails;
