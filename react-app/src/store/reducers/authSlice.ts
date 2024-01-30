import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import Cookies from 'universal-cookie'

// const cookies = new Cookies()

export interface AuthState {
    user: {
        _id: string | null
        name: string | null
        email: string | null
    }
    access_token: string | null
    refresh_token: string | null
}

const initialState: AuthState = {
    user: {
        _id: null,
        name: null,
        email: null,
    },
    access_token: null,
    refresh_token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthState>) => {
            const { user, access_token, refresh_token } = action.payload
            console.log(user)
            // cookies.set('access_token', access_token, { path: '/' })
            // cookies.set('refresh_token', refresh_token, { path: '/' })
            localStorage.setItem(
                "user",
                JSON.stringify({
                    user
                })
            )
            state.user = user
            state.access_token = access_token
            state.refresh_token = refresh_token
            return state
        },
        logoutUser: (state) => {
            // cookies.remove('access_token')
            // cookies.remove('refresh_token')
            localStorage.clear()
            state = initialState
            return state
        }
    }
})

export const selectAuth = (state: RootState) => state.auth

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.access_token
export const selectCurrentRefreshToken = (state: RootState) => state.auth.refresh_token
export const { setUser, logoutUser } = authSlice.actions
export default authSlice.reducer