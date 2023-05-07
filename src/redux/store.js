import cartSlice from "@/components/Layout/MainLayout/Cart/cartSlice";
import drawersSlide from "@/components/Layout/MainLayout/drawersSlide";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
    reducer: {
        drawers: drawersSlide.reducer,
        cart: cartSlice.reducer,
    },
});

// export default store;
