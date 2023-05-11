import classNames from "classnames/bind";
import styles from "./About.module.scss";
import images from "@/assets/images";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";

const cx = classNames.bind(styles);

function About() {
  return (
    <div className={cx("about-wrap")}>
      {/* ----- Home cover ----- */}
      <section className={cx("border-bottom", "relative")}>
        <div className={cx("home-cover")}>
          <img className={cx("home-cover-image")} src={images.about.aboutCover} alt="" />
        </div>
      </section>
      {/* ----- End Home cover ----- */}

      {/* ----- Section 2 ----- */}
      <section className={cx("border-bottom")}>
        <Row>
          <Col xs={24} lg={12}>
            <div className={cx("py-64", "px-32", "d-flex", "flex-column", "align-items-center")}>
              <p className={cx("fs-16", "fw-600", "text-uppercase", "text-center")}>Động lực của LAFUONG</p>

              <h2
                className={cx("mt-32", "font-secondary", "fw-200", "fs-42", "text-center", "text-italic", "maxw-450")}
              >
                Niềm hạnh phúc khi cùng nhau thưởng thức bánh
              </h2>
              <p className={cx("mt-32", "fs-16", "font-primary", "text-center", "maxw-480")}>
                Sự ra đời của LaFuong bắt nguồn từ niềm đam mê bất tận về bánh ngọt của một người đầu bếp và tư duy sáng
                tạo của một nhà thiết kế. Được định hình là thương hiệu bánh ngọt chuẩn Pháp, LaFuong trao tới bạn những
                chiếc bánh Entremet tinh tế, cùng nhiều loại bánh ngọt cao cấp và trên hết - niềm hạnh phúc khi thưởng
                thức bánh cùng những người mà bạn yêu thương.
              </p>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className={cx("section-img-wrap", "outline")}>
              <img className={cx("section-img")} src={images.about.about02} alt="" />
            </div>
          </Col>
        </Row>
      </section>
      {/* ----- End Section 2 ----- */}

      {/* ----- Section 3 ----- */}
      <section className={cx("border-bottom")}>
        <div className={cx("py-64", "px-32")}>
          <p className={cx("fs-16", "fw-600", "text-uppercase", "text-center", "mb-4")}>Tại sao chọn LAFUONG</p>
          <Row>
            <Col xs={24} lg={8}>
              <div className={cx("px-4", "py-32", "text-primary")}>
                <div className={cx("py-32", "pb-4")}>
                  <img className={cx("w-100")} src={images.about.illusQuality} alt="" />
                </div>
                <h2 className={cx("font-secondary", "fw-200", "fs-42", "text-italic", "text-center")}>Chất lượng</h2>
                <p className={cx("fs-16", "font-primary", "text-center", "mt-3")}>
                  Để mang lại trải nghiệm đáng nhớ trong từng chiếc bánh, sản phẩm của LaFuong được làm từ những nguyên
                  liệu được chọn lựa cẩn thận và hoàn thiện tỉ mỉ với những tiêu chuẩn cao cấp nhất.
                </p>
              </div>
            </Col>
            <Col xs={24} lg={8}>
              <div className={cx("px-4", "py-32", "text-primary")}>
                <div className={cx("py-32", "pb-4")}>
                  <img className={cx("w-100")} src={images.about.illusForEveryOne} alt="" />
                </div>
                <h2 className={cx("font-secondary", "fw-200", "fs-42", "text-italic", "text-center")}>Cho mọi người</h2>
                <p className={cx("fs-16", "font-primary", "text-center", "mt-3")}>
                  Bánh của LaFuong được nghiên cứu để phù hợp với khẩu vị của người Việt và luôn được đóng gói chỉn chu
                  để ai cũng có thể nhận về những niềm vui khi bánh được giao tới tận nơi.
                </p>
              </div>
            </Col>
            <Col xs={24} lg={8}>
              <div className={cx("px-4", "py-32", "text-primary")}>
                <div className={cx("py-32", "pb-4")}>
                  <img className={cx("w-100")} src={images.about.illusLoyal} alt="" />
                </div>
                <h2 className={cx("font-secondary", "fw-200", "fs-42", "text-italic", "text-center")}>Sự chân thành</h2>
                <p className={cx("fs-16", "font-primary", "text-center", "mt-3")}>
                  Đối với LaFuong, giá trị lớn nhất mà chúng tôi đề cao là sự chân thành. Niềm vui của mọi nguời khi
                  thưởng thức bánh, chính là nguồn động lực cho chúng tôi làm việc mỗi ngày.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      {/* ----- End Section 3 ----- */}

      {/* ----- Section 4 ----- */}
      <section className={cx("border-bottom")}>
        <Row>
          <Col xs={24} lg={12}>
            <div className={cx("section-img-wrap", "outline")}>
              <img className={cx("section-img")} src={images.about.entremetCake} alt="" />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className={cx("py-64", "px-32", "d-flex", "flex-column", "align-items-center")}>
              <p className={cx("fs-16", "fw-600", "text-uppercase", "text-center")}>Sản phẩm của LAFUONG</p>

              <h2
                className={cx("mt-32", "font-secondary", "fw-200", "fs-42", "text-center", "text-italic", "maxw-450")}
              >
                Bánh Entremet
              </h2>
              <p className={cx("mt-32", "fs-16", "font-primary", "text-center", "maxw-480")}>
                Là dòng bánh hiện đại và cao cấp nhất của Pháp, Entremet được tạo nên bởi nhiều tầng kết cấu đặc biệt và
                những kỹ thuật đòi hỏi tay nghề cao của người Chef. Mỗi chiếc bánh là sự hoà quyện của những lớp bạt xốp
                mềm, lớp kem thơm ngậy và hương vị đặc trưng của trái cây tươi.
              </p>
              <p className={cx("mt-32", "fs-16", "font-primary", "text-center", "maxw-480")}>
                Bạn sẽ tìm thấy ở LaFuong một chiếc bánh Entremet đặc biệt dành cho mọi dịp chúc mừng, hoặc cũng có thể
                là một nửa chiếc bánh Entremet để thưởng thức mỗi ngày một cách đơn giản, mà không cần đợi đến dịp gì.
              </p>

              <div className={cx("mt-32")}>
                <button className={cx("btn", "btn-dark")}>Xem sản phẩm</button>
              </div>
            </div>
          </Col>
        </Row>
      </section>
      {/* ----- End Section 4 ----- */}

      {/* ----- Section 5 ----- */}
      <section className={cx("border-bottom")}>
        <Row>
          <Col xs={{ span: 24, order: 2 }} lg={{ span: 12, order: 2 }}>
            <div className={cx("py-64", "px-32", "d-flex", "flex-column", "align-items-center", "outline")}>
              <h2 className={cx("font-secondary", "fw-200", "fs-42", "text-center", "text-italic", "maxw-450")}>
                Hành trình của một người yêu bánh
              </h2>
              <p className={cx("mt-32", "fs-16", "font-primary", "text-center", "maxw-480")}>
                Chef LaFuong là một đầu bếp bánh ngọt đã tốt nghiệp chuyên ngành bánh ngọt Pháp (Diplôme de Pâtisserie)
                tại Le Cordon Bleu - học viện ẩm thực hàng đầu thế giới với lịch sử gần 130 năm hình thành. Trải qua
                nhiều vị trí khác nhau tại các chuỗi bánh lớn ở Hà Nội, LaFuong đã dành trọn tình cảm cho sự tinh tế của
                bánh ngọt Pháp & đặt quyết tâm trở thành một Pastry Chef chuyên nghiệp.
              </p>
              <p className={cx("mt-32", "fs-16", "font-primary", "text-center", "maxw-480")}>
                Quay trở về để bắt đầu hành trình nghiên cứu khẩu vị cũng như thói quen thưởng thức bánh ngọt của người
                Việt, sự ra đời của LaFuong Pastry chính là để nối tiếp giấc mơ - mang trải nghiệm cao cấp của bánh ngọt
                Pháp đến gần hơn với mọi người.
              </p>

              <div className={cx("mt-32")}>
                <Link className={cx("btn", "btn-dark")}>Lafuongchef.com</Link>
              </div>
            </div>
          </Col>
          <Col xs={{ span: 24, order: 1 }} lg={{ span: 12, order: 2 }}>
            <div className={cx("section-img-wrap", "outline")}>
              <img className={cx("section-img")} src={images.about.lafuongChef} alt="" />
            </div>
          </Col>
        </Row>
      </section>
      {/* ----- End Section 5 ----- */}
    </div>
  );
}

export default About;
