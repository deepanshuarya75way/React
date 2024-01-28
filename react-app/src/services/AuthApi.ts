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
        })
    })
})

export const { useLoginUserMutation } = authApi