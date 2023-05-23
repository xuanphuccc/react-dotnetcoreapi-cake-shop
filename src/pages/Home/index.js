import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import images from "@/assets/images";
import { Link } from "react-router-dom";
import { Col, Row, Spin } from "antd";
import { useSelector } from "react-redux";
import { categoriesSelector, isLoadingSelector } from "@/redux/selector";

const cx = classNames.bind(styles);

function Home() {
  const categories = useSelector(categoriesSelector);
  const loading = useSelector(isLoadingSelector);

  return (
    <div className={cx("home-wrap")}>
      {/* Home cover */}
      <section className={cx("border-bottom", "relative")}>
        <div className={cx("home-cover")}>
          <img className={cx("home-cover-image")} src={images.home.homeCover} alt="" />
        </div>

        <Link to={"/products"} className={cx("btn", "absolute", "center-x", "home-cover-btn")}>
          Tất cả sản phẩm
        </Link>
      </section>
      {/* End Home cover */}

      {/* Section 2 */}
      <section className={cx("border-bottom")}>
        <Row>
          <Col xs={24} lg={12}>
            <div className={cx("py-64", "px-32", "d-flex", "flex-column", "align-items-center")}>
              <p className={cx("fs-16", "fw-600", "text-uppercase", "text-center")}>LAFUONG là</p>

              <h2
                className={cx("mt-32", "font-secondary", "fw-200", "fs-42", "text-center", "text-italic", "maxw-450")}
              >
                Lựa chọn lý tưởng cho bánh ngọt chuẩn Pháp
              </h2>
              <p className={cx("mt-32", "fs-16", "font-primary", "text-center", "maxw-480")}>
                Dành nhiều tình cảm đặc biệt cho bánh ngọt Pháp, chúng tôi quyết tâm tạo nên thương hiệu LaFuong Pastry
                để mang tới cho mọi người một trải nghiệm thưởng thức bánh thật tinh tế và tận tâm.
              </p>
              <p className={cx("mt-32", "fs-16", "font-primary", "text-center", "maxw-480")}>
                Hãy một lần nếm thử bánh của LaFuong để cảm nhận những tình cảm và nỗ lực của chúng tôi, tất cả nằm ở sự
                hoà quyện của hương vị và kết cấu đặc biệt trong từng chiếc bánh.
              </p>

              <div className={cx("mt-32")}>
                <Link to={"/about"} className={cx("btn", "btn-dark")}>
                  Về LAFUONG
                </Link>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className={cx("section-img-wrap", "outline")}>
              <img className={cx("section-img")} src={images.home.whisperWhite} alt="" />
            </div>
          </Col>
        </Row>
      </section>
      {/* End Section 2 */}

      {/* Categories section */}

      <section className={cx("border-bottom")}>
        <Row>
          {categories?.map((category) => (
            <Col xs={24} lg={8} key={category.categoryId}>
              <Link
                to={"/products/#cake"}
                className={cx("d-block", "px-32", "py-32", "text-primary", "border-start", "category-img")}
              >
                <h2 className={cx("font-secondary", "fw-200", "fs-42", "text-italic")}>{category.name}</h2>
                <p className={cx("fs-16", "font-primary", "mt-3")}>{category.title}</p>
                <div className={cx("py-64")}>
                  <img className={cx("w-100")} src={category.image || images.placeholder} alt="" />
                </div>
                <div className={cx("w-100", "d-flex", "justify-end")}>
                  <span className={cx("btn", "btn-link")}>Xem tất cả</span>
                </div>
              </Link>
            </Col>
          ))}
        </Row>

        {loading && (
          <div className={cx("py-64", "d-flex", "justify-center")}>
            <Spin></Spin>
          </div>
        )}
      </section>

      {/* Categories section */}

      {/* Products section */}
      <section className={cx("border-bottom")}>
        <div className={cx("py-64", "px-32", "d-flex", "flex-column", "align-items-center")}>
          <h2 className={cx("font-secondary", "fw-200", "fs-42", "text-center", "text-italic")}>Sản phẩm</h2>
          <p style={{ maxWidth: 540 }} className={cx("mt-32", "fs-16", "font-primary", "text-center")}>
            Sản phẩm đặc trưng của LaFuong Pastry là bánh Entremet – dòng bánh lạnh cao cấp nhất của Pháp, với sự hài
            hòa của các tầng hương vị và kết cấu đặc biệt trong từng chiếc bánh.
          </p>

          <div className={cx("d-flex", "justify-center", "mt-32")}>
            <Link to={"/products"} className={cx("btn", "btn-dark")}>
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
      {/* End Products section */}

      {/* Section 4 */}
      <section className={cx("border-bottom")}>
        <Row>
          <Col xs={24} lg={12}>
            <div className={cx("section-img-wrap", "outline")}>
              <img className={cx("section-img")} src={images.home.cooking} alt="" />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className={cx("py-64", "px-32", "d-flex", "flex-column", "align-items-center")}>
              <h2 className={cx("font-secondary", "fw-200", "fs-42", "text-center", "text-italic", "maxw-450")}>
                Sự sáng tạo đến từ những hương vị tự nhiên
              </h2>
              <p className={cx("mt-32", "fs-16", "font-primary", "text-center", "maxw-480")}>
                Từ vải và dâu rừng, trà Earl Grey và cam hay xoài và lá dứa.., những chiếc bánh Entremet của LaFuong là
                sự kết hợp sáng tạo của nhiều tầng hương vị tự nhiên và mới lạ. Dù bạn là ai, chúng tôi mong rằng, bạn
                sẽ luôn tìm được chiếc bánh phù hợp với khẩu vị của riêng mình tại LaFuong.
              </p>

              <div className={cx("mt-32")}>
                <Link to={"/products"} className={cx("btn", "btn-dark")}>
                  Xem sản phẩm
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </section>
      {/* End Section 4 */}

      {/* Section 5 */}
      <section className={cx("border-bottom")}>
        <Row>
          <Col xs={{ span: 24, order: 2 }} lg={{ span: 12, order: 1 }}>
            <div className={cx("py-64", "px-32", "d-flex", "flex-column", "align-items-center")}>
              <h2 className={cx("font-secondary", "fw-200", "fs-42", "text-center", "text-italic", "maxw-450")}>
                Không chỉ là chiếc bánh, mà là một món quà
              </h2>
              <p className={cx("mt-32", "fs-16", "font-primary", "text-center", "maxw-480")}>
                Bánh của LaFuong không dành để ăn một mình, vì chúng tôi tin rằng mỗi chiếc bánh được gửi đi đều là món
                quà mà bạn có thể sẻ chia với những người quan trọng.
              </p>
              <p className={cx("mt-32", "fs-16", "font-primary", "text-center", "maxw-480")}>
                Từ chiếc hộp, cây nến, tấm bưu thiệp hay cách chúng tôi trao tới bạn tận tay món quà ấy, đều sẽ được
                LaFuong chuẩn bị thật chu đáo.
              </p>

              <div className={cx("mt-32")}>
                <Link to={"/instruction"} className={cx("btn", "btn-dark")}>
                  Cách đặt bánh
                </Link>
              </div>
            </div>
          </Col>
          <Col xs={{ span: 24, order: 1 }} lg={{ span: 12, order: 2 }}>
            <div className={cx("section-img-wrap", "outline")}>
              <img className={cx("section-img")} src={images.home.packaging} alt="" />
            </div>
          </Col>
        </Row>
      </section>
      {/* End Section 5 */}
    </div>
  );
}

export default Home;
