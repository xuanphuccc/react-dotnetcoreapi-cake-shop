import classNames from "classnames/bind";
import styles from "./Instruction.module.scss";
import images from "@/assets/images";
import Dropdown from "@/components/Dropdown";
import { useState } from "react";

const cx = classNames.bind(styles);

function Instruction() {
  const [activeTab, setActiveTab] = useState("delivery");

  return (
    <div>
      {/* ----- Home cover ----- */}
      <section className={cx("border-bottom", "relative")}>
        <div className={cx("home-cover")}>
          <img className={cx("home-cover-image")} src={images.instruction.instructionCover} alt="" />
        </div>
      </section>
      {/* ----- End Home cover ----- */}

      {/* ----- Instruction ----- */}
      <section className={cx("border-bottom", "py-64", "px-5")}>
        <div className={cx("px-4", "pb-5")}>
          <h1 className={cx("font-secondary", "fs-48", "fw-200", "text-italic", "text-center")}>Câu hỏi thường gặp</h1>
          <p className={cx("fs-18", "font-primary", "text-center", "mt-4")}>
            Bạn có thể tìm câu trả lời cho những câu hỏi thường gặp ở dưới đây.
          </p>
        </div>

        <div className={cx("w-100", "d-flex", "justify-center", "mb-5")}>
          <button
            onClick={() => {
              setActiveTab("delivery");
            }}
            className={cx("btn", "rounded", "fw-600", "font-primary", "py-3", "btn-gray", {
              active: activeTab === "delivery",
            })}
          >
            Về giao hàng
          </button>

          <button
            onClick={() => {
              setActiveTab("order");
            }}
            className={cx("btn", "rounded", "fw-600", "font-primary", "py-3", "btn-gray", {
              active: activeTab === "order",
            })}
          >
            Về đặt hàng
          </button>

          <button
            onClick={() => {
              setActiveTab("products");
            }}
            className={cx("btn", "rounded", "fw-600", "font-primary", "py-3", "btn-gray", {
              active: activeTab === "products",
            })}
          >
            Về sản phẩm
          </button>
        </div>

        {activeTab === "delivery" && (
          <div className={cx("max-width-xl")}>
            <Dropdown title="Phí giao hàng của LaFuong được tính như thế nào?">
              <p className={cx("fs-18")}>
                Chúng tôi cung cấp dịch vụ giao hàng nội thành Hà Nội (với khoảng cách dưới 12km tính từ địa chỉ của
                LaFuong tại ngõ 91 Nguyễn Chí Thanh - Đống Đa - Hà Nội).
              </p>
              <p className={cx("fs-18", "mt-4")}>
                Chúng tôi nhận giao hàng với đơn hàng có giá trị tối thiểu 200.000 ₫. Phí giao hàng chính xác sẽ được
                tính trong quá trình bạn đặt hàng.
              </p>
            </Dropdown>
            <Dropdown title="Tôi có thể chọn giờ giao hàng không?">
              <p className={cx("fs-18")}>
                Bạn có thể chọn một trong các khung giờ sau: từ 11h15-13h, 13h-15h, 15h-17h hoặc 18h-20h.
              </p>
            </Dropdown>
            <Dropdown border={false} title="Tôi có thể nhận được bánh đúng trong khung giờ tôi chọn chứ?">
              <p className={cx("fs-18")}>
                Chúng tôi luôn cố gắng hết sức để đảm bảo bánh được giao tới tay bạn trong khung giờ bạn chọn. Tuy nhiên
                sẽ có thể xảy ra những sự cố ngoài ý muốn do giao thông, thời tiết… dẫn đến việc giao hàng bị chậm trễ
                một chút. Nếu shipper không tới đúng hẹn, vui lòng liên hệ hotline để chúng tôi hỗ trợ bạn ngay lập tức
              </p>
            </Dropdown>
          </div>
        )}
        {activeTab === "order" && (
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
                Nếu bạn cần đặt gấp trong ngày, vui lòng liên hệ hotline 090 786 0330 để được phục vụ ngay, tuy nhiên
                mẫu bánh có thể hạn chế và không đủ toàn bộ mẫu.
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
        )}
      </section>
      {/* ----- End Instruction ----- */}
    </div>
  );
}

export default Instruction;
