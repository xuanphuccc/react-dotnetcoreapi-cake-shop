import classNames from "classnames/bind";
import styles from "./Select.module.scss";
import icons from "@/assets/icons";
import { useRef, useState } from "react";

const cx = classNames.bind(styles);

function Select({
  value,
  onChange,
  onSearch,
  options = [{ label: "", value: "" }],
  onBlur,
  placeholder = "",
  readOnly = false,
  icon,
}) {
  const [selectValue, setSelectValue] = useState({});
  const groupRef = useRef();

  const handleChange = (value) => {
    setSelectValue(value);

    if (typeof onChange === "function") {
      onChange(value);
    }

    if (groupRef.current) {
      groupRef.current.blur();
    }
  };

  const handleSearch = (e) => {
    setSelectValue({ label: e.target.value });

    if (typeof onChange === "function") {
      onChange({ label: e.target.value });
    }

    if (typeof onSearch === "function") {
      onSearch(e.target.value);
    }
  };

  return (
    <div ref={groupRef} tabIndex={-1} className={cx("input-group", "form-control-group")}>
      <input
        value={value?.label || selectValue?.label || ""}
        onChange={handleSearch}
        onBlur={() => {
          if (typeof onBlur === "function") {
            onBlur();
          }
        }}
        className={cx("select-input", "w-100")}
        type="text"
        placeholder={placeholder || ""}
        readOnly={readOnly}
      />

      {icon ? (
        <span className={cx("select-icon")}>{icon}</span>
      ) : (
        <img className={cx("select-icon", "rotate-90")} src={icons.arrowRight} alt="" />
      )}

      <ul className={cx("select-list")}>
        {options?.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              handleChange(item);
            }}
            className={cx("select-item", {
              active: item?.value === value?.value || item?.value === selectValue?.value,
            })}
          >
            {item?.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Select;
