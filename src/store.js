import { configureStore } from "@reduxjs/toolkit";
import pdfSlice from "./slice";

const store = configureStore({
    reducer:{
        pdf: pdfSlice.reducer
    }
})
export default store