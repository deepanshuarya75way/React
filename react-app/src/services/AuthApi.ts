import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authapi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/auth/",
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body: { email: string, password: string }) => {
                return {
                    url: `/login`,
                    method: "POST",
                    body,
                }
            }
        }),
        registerUser: builder.mutation({
            query: (body: {username: string, firstName: string, lastName: string, email: string, password: string, confirmPassword: string }) => {
                return {
                    url: `/register`,
                    method: "POST",
                    body,
                }
            }
        }),
        logOutUser: builder.query({
            query: () => ({
                url: '/logout',
                method: 'get'
            }),
        })
    })
})

export const { useLoginUserMutation, useRegisterUserMutation, useLogOutUserQuery, useLazyLogOutUserQuery } = authApi