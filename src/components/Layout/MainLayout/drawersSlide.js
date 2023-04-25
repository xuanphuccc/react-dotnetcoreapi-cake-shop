import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: "drawers",
    initialState: {
        isOpenMenu: false,
        isOpenCart: false,
        cartStep: "cart",
    },
    reducers: {
        closeMenu: (state, action) => {
            state.isOpenMenu = false;
        },
        openMenu: (state) => {
            state.isOpenMenu = true;
        },
        closeCart: (state) => {
            state.isOpenCart = false;
        },
        openCart: (state) => {
            state.isOpenCart = true;
        },
        openStepDelivery: (state) => {
            state.cartStep = "delivery";
        },
        openStepCart: (state) => {
            state.cartStep = "cart";
        },
    },
});
