import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export interface AuthState{
    _id: number | null
    name: string | null
    email: string | null
    access_token: string | null
    refresh_token: string | null
} 

const initialState: AuthState = {
    _id: null,
    name: null,
    email: null,
    access_token: null,
    refresh_token: null
}

export const authSlice =  createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser:(state, action: PayloadAction<AuthState>) => {
            cookies.set('access_token', action.payload.access_token, { path: '/' })
            cookies.set('refresh_token', action.payload.refresh_token, { path: '/' })
            localStorage.setItem(
                "user",
                JSON.stringify({
                    _id: action.payload._id,
                    name: action.payload.name,
                    access_token: action.payload.access_token,
                    refresh_token: action.payload.refresh_token
                })
            )
            state._id = action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
            return state
        },
        logoutUser: (state) =>{
            cookies.remove('access_token')
            cookies.remove('refresh_token')
            localStorage.clear()
            state = initialState
            return state
        }
    }
})

export const selectAuth = (state: RootState) => state.auth

export const  {setUser, logoutUser} = authSlice.actions
export default authSlice.reducer