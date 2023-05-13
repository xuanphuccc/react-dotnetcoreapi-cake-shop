// import { createSelector } from "@reduxjs/toolkit";

export const menuStatusSelector = (state) => {
  return state.mainLayout.isOpenMenu;
};

export const cartStatusSelector = (state) => {
  return state.mainLayout.isOpenCart;
};

export const cartStepSelector = (state) => {
  return state.mainLayout.cartStep;
};

export const wishesModalStatusSelector = (state) => {
  return state.mainLayout.isOpenWishesModal;
};

export const selectedCartItemSelector = (state) => {
  return state.mainLayout.selectedCartItem;
};

export const cartItemsSelector = (state) => {
  return state.cart.items ?? [];
};

export const cartSelector = (state) => {
  return state.cart ?? {};
};
