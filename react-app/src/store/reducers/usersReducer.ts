import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState{
    _id: number
    name: string
    email: string
}

const initialState: UserState = {
    _id: 0,
    name: "",
    email: ""
}

export const userSlice =  createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser:(state, action: PayloadAction<UserState>) => {
            state = action.payload
            return state
        },
        resetUser: (state) =>{
            state = initialState
            return state
        }
    }
})

export const  {setUser, resetUser} = userSlice.actions
export default userSlice.reducer
