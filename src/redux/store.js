import drawersSlide from "@/components/Layout/MainLayout/drawersSlide";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
    reducer: {
        drawers: drawersSlide.reducer,
    },
});

// export default store;
