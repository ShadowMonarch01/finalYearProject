import { configureStore } from "@reduxjs/toolkit";
import studentReducer from '../rtkSlices/stuexSlice'
export const store = configureStore({
    reducer:{
        student: studentReducer
    }
})