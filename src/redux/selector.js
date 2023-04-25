// import { createSelector } from "@reduxjs/toolkit";

export const menuStatusSelector = (state) => {
    return state.drawers.isOpenMenu;
};

export const cartStatusSelector = (state) => {
    return state.drawers.isOpenCart;
};

export const cartStepSelector = (state) => {
    return state.drawers.cartStep;
};