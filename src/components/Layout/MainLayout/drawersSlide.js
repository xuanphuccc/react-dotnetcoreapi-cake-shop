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
        openCartDelivery: (state) => {
            state.cartStep = "delivery";
        },
        openCartDetail: (state) => {
            state.cartStep = "cart";
        },
    },
});
