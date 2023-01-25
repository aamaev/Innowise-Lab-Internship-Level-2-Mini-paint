import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../interfaces/interfaces";

const initialState: UserState= {
    uid: null,
    email: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserUid(state, action: PayloadAction<string | null>){
            state.uid = action.payload;
        },
        setUserEmail(state, action: PayloadAction<string | null>){
            state.email = action.payload;
        }
    }
});

export default userSlice.reducer;
export const { setUserEmail, setUserUid } = userSlice.actions;