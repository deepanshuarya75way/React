import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = "http://localhost:3000/auth/";


interface UserState {
    userDetails: any,
    SignupStatus: string,
    SignupError: string
}

const initialState = {
    userDetails: [],
    SignupStatus: "",
    SignupError: ""

}



export const createuser = createAsyncThunk("auth/register", async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post(baseURL + "/register", user)
        return response?.data;
    }
    catch (error: any) {
        console.log(error);
        return rejectWithValue(error?.response?.data)
    }
})

const SignupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(createuser.pending, (state, action) => {
            return {
                ...state,
                SignupStatus: "pending",
                SignupError: ""

            }
        })
        builder.addCase(createuser.rejected, (state, action) => {
            return {
                ...state,
                SignupStatus: "rejected",
                SignupError: action.payload
            }
        })
        [createuser.fulfilled]: (state, action) => {
            return {
                ...state,
                userDetails: [action.payload, ...state.userDetails],
                SignupStatus: "success",
                SignupError: ""

            }
        },
        [createuser.rejected]: (state, action) => {
            return {
                ...state,
                SignupStatus: "rejected",
                SignupError: action.payload

            }
        },
    }
})

export default SignupSlice.reducer;