import classNames from "classnames/bind";
import styles from "./Select.module.scss";
import icons from "@/assets/icons";
import { useRef, useState } from "react";

const cx = classNames.bind(styles);

function Select({
    value,
    onChange,
    options = [{ label: "", value: "" }],
    placeholder = "",
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

    return (
        <div ref={groupRef} tabIndex={-1} className={cx("input-group")}>
            <input
                value={value?.label || selectValue?.label || ""}
                className={cx("select-input", "w-100")}
                type="text"
                placeholder={placeholder || ""}
                readOnly
            />
            <img className={cx("select-icon")} src={icons.arrowRight} alt="" />

            <ul className={cx("select-list")}>
                {options?.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => {
                            handleChange(item);
                        }}
                        className={cx("select-item", {
                            active:
                                item?.value === value?.value ||
                                item?.value === selectValue?.value,
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
