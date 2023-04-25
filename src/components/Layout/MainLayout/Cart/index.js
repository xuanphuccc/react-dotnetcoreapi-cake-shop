import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import drawersSlide from "../drawersSlide";
import { cartStatusSelector, cartStepSelector } from "@/redux/selector";

import CartDetails from "./CartDetails";
import CartDelivery from "./CartDelivery";

const cx = classNames.bind(styles);

function Cart() {
    const dispatch = useDispatch();
    const cartStatus = useSelector(cartStatusSelector);
    const cartStep = useSelector(cartStepSelector);

    const handleCloseCart = () => {
        dispatch(drawersSlide.actions.closeCart());
        dispatch(drawersSlide.actions.openStepCart());
    };

    return (
        <div className={cx("menu")}>
            <div
                onClick={handleCloseCart}
                className={cx("overlay", { active: cartStatus })}
            ></div>
            <div
                className={cx("menu-wrapper", {
                    active: cartStatus,
                    close: !cartStatus,
                })}
            >
                {cartStep === "cart" && <CartDetails />}
                {cartStep === "delivery" && <CartDelivery />}
            </div>
        </div>
    );
}

export default Cart;