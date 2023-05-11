import classNames from "classnames/bind";
import styles from "./Modal.module.scss";
import icons from "@/assets/icons";

const cx = classNames.bind(styles);

function Modal({ title = "This is modal title", open = true, onOk, onCancel, children }) {
  const handleOnOk = (e) => {
    e.preventDefault();
    if (typeof onOk === "function") {
      onOk();
    }
  };

  const handleOnCancel = (e) => {
    e.preventDefault();
    if (typeof onCancel === "function") {
      onCancel();
    }
  };

  return (
    <div className={cx("modal", { active: open })}>
      <div onClick={onCancel} className={cx("overlay")}></div>
      <div className={cx("modal-wrapper")}>
        <div className={cx("modal-header")}>
          <h2 className={cx("modal-title")}>{title}</h2>
          <img onClick={handleOnCancel} className={cx("modal-close")} src={icons.times} alt="" />
        </div>

        <form>
          <div className={cx("modal-content")}>{children}</div>

          <div className={cx("modal-controls")}>
            <button onClick={handleOnOk} className={cx("btn", "btn-dark", "w-50")}>
              Xác nhận
            </button>
            <button onClick={handleOnCancel} className={cx("btn", "w-50")}>
              Không
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
