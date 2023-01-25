import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pencilReducer from './Redux-slices/pencilSlice';
import userReducer from './Redux-slices/userSlice';
import imagesSlice from "./Redux-slices/imagesSlice";

const rootReducer = combineReducers({
    user: userReducer,
    pencil: pencilReducer,
    images: imagesSlice
})

const store = configureStore({
    reducer: rootReducer  
});   

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
