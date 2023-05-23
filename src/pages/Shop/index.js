import classNames from "classnames/bind";
import styles from "./Shop.module.scss";
import images from "@/assets/images";
import { Col, Row, Spin } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import currencyConvert from "@/services/currencyConvert";
import Paragraph from "@/components/Paragraph";
import { useSelector } from "react-redux";
import { categoriesSelector, isLoadingSelector, productsSelector } from "@/redux/selector";

const cx = classNames.bind(styles);

function Shop() {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const categories = useSelector(categoriesSelector);
  const products = useSelector(productsSelector);
  const loading = useSelector(isLoadingSelector);

  useEffect(() => {
    const handleGetInformations = async () => {
      try {
        const categoriesWithProducts = categories.map((category) => {
          const categoryProducts = products.filter((product) => product?.category?.categoryId === category.categoryId);

          return {
            ...category,
            products: categoryProducts,
          };
        });

        console.log(categoriesWithProducts);

        setProductsByCategory(categoriesWithProducts);
      } catch (error) {
        console.warn(error);
      }
    };

    handleGetInformations();
  }, [products, categories]);

  return (
    <div>
      {productsByCategory.map((category) => (
        <section key={category.categoryId} className={cx("border-bottom")}>
          <div className={cx("py-64", "px-32", "d-flex", "flex-column", "align-items-center", "border-bottom")}>
            <h2 className={cx("font-secondary", "fw-200", "fs-48", "text-center", "text-italic")}>{category.name}</h2>
            <div style={{ maxWidth: 512 }} className={cx("mt-2", "fs-18", "font-primary", "text-center")}>
              <Paragraph value={category.description} />
            </div>
          </div>

          <Row>
            {category?.products?.map((product) => {
              if (product.isDisplay) {
                return (
                  <Col xs={24} sm={12} lg={8} key={product.productId}>
                    <Link
                      to={`/products/${product.productId}`}
                      className={cx("px-5", "pt-5", "bg-light-gray", "d-block", "text-primary", "border")}
                    >
                      <h2 className={cx("fs-24", "fw-400", "font-primary")}>{product.name}</h2>
                      <p className={cx("fs-18", "fw-400", "font-primary")}>{product.title}</p>
                      <p className={cx("fs-18", "fw-400", "font-primary")}>{currencyConvert(product.price)}</p>

                      <img
                        className={cx("w-100", "d-block")}
                        src={product?.images[0]?.image || images.placeholder}
                        alt=""
                      />

                      <div className={cx("d-flex", "justify-end", "pb-5")}>
                        <span className={cx("btn", "btn-link", "fs-16")}>Xem thêm</span>
                      </div>
                    </Link>
                  </Col>
                );
              }

              return false;
            })}
          </Row>
        </section>
      ))}

      {loading && (
        <div className={cx("py-64", "d-flex", "justify-center")}>
          <Spin></Spin>
        </div>
      )}
    </div>
  );
}

export default Shop;
