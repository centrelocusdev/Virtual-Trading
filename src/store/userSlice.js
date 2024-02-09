import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userProfilePicture: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addProfilePicture: (state,action) => {
            state.userProfilePicture = action.payload;
        }
    }
})

export const {addProfilePicture} = userSlice.actions;
export default userSlice.reducer;