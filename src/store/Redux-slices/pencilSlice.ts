import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PencilState } from "../../interfaces/interfaces";

const initialState: PencilState = {
    lineColor: 'black',
    lineWidth: 1,
    type: '',
}

export const pencilSlice = createSlice({
    name: 'pencil',
    initialState,
    reducers: {
        setLineColor(state, action: PayloadAction<string>){
            state.lineColor = action.payload;
        },
        setLineWidth(state, action: PayloadAction<number>){
            state.lineWidth = action.payload;
        },
        setType(state, action: PayloadAction<string>){
            state.type = action.payload;
        },
    }
});

export default pencilSlice.reducer;
export const { setLineColor, setLineWidth, setType } = pencilSlice.actions;