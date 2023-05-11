import classNames from "classnames/bind";
import styles from "./Dropdown.module.scss";
import icons from "@/assets/icons";
import { useState } from "react";

const cx = classNames.bind(styles);

function Dropdown({ children, title = "This is dropdown", border = true }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={cx("dropdown-wrap", {
        active: isOpen,
        close: !isOpen,
      })}
    >
      {/* ----- Header ----- */}
      <div onClick={handleToggleDropdown} className={cx("dropdown-header")}>
        <p className={cx("dropdown-title")}>{title}</p>
        <img className={cx("dropdown-icon")} src={icons.arrowRight} alt="" />
      </div>
      {/* ----- End header ----- */}

      {/* ----- Content ----- */}
      <div className={cx("dropdown-content", { "border-bottom": border })}>{children}</div>
      {/* ----- End content ----- */}
    </div>
  );
}

export default Dropdown;
