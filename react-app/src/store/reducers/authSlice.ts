import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState{
    _id: number | null
    name: string | null
    email: string | null
} 

const initialState: AuthState = {
    _id: null,
    name: null,
    email: null
}

export const authSlice =  createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser:(state, action: PayloadAction<AuthState>) => {
            state._id = action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
            return state
        },
        resetUser: (state) =>{
            state = initialState
            return state
        }
    }
})

export const selectUser = (state: RootState) => state.auth

export const  {setUser, resetUser} = authSlice.actions
export default authSlice.reducer