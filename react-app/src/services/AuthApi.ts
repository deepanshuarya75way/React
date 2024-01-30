import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthState, logoutUser, setUser, selectCurrentUser, selectCurrentRefreshToken } from "../store/reducers/authSlice";
import { useAppSelector } from "../hooks/hooks";
const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: 'include'
})

const baseQueryReauth = async (args: any, api:any , extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions)
    if(result?.error?.error === "jwt expired"){
        const refreshResult = await baseQuery('/refresh_token', api, extraOptions)
        if(refreshResult?.data){
            const user = useAppSelector(selectCurrentUser)
            const refresh_token = useAppSelector(selectCurrentRefreshToken)
            console.log(refreshResult.data)
            api.dispatch(setUser({user , refresh_token, ...refreshResult.data  }))
        }else{
            api.dispatch(logoutUser())
        }
    }
    return result
}

 
export const authApi = createApi({
    reducerPath: "authapi",
    baseQuery: baseQueryReauth,
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body: { email: string, password: string }) => {
                return {
                    url: `auth/login`,
                    method: "POST",
                    body,
                }
            }
        }),
        registerUser: builder.mutation({
            query: (body: {username: string, firstName: string, lastName: string, email: string, password: string, confirmPassword: string }) => {
                return {
                    url: `auth/register`,
                    method: "POST",
                    body,
                }
            }
        }),
        logOutUser: builder.query<void, void>({
            query: () => ({
                url: 'auth/logout',
                method: 'get'
            }),
        }),
        getTodo: builder.query<Object, void >({
            query: ()=>({
                url: '/user',
                method: 'get'
            })
        })
    })
})

export const { useLoginUserMutation, useRegisterUserMutation, useLogOutUserQuery, useLazyLogOutUserQuery, useGetTodoQuery, useLazyGetTodoQuery } = authApi