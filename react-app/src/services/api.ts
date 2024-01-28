import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authapi = createApi({
    reducerPath: 'authapi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/auth/" }),
    endpoints: (builder) => ({
        getToDoById: builder.query<Todo, number>({
            query: (id) => `todo/${id}`,
        }),
        getToDos: builder.query<Todo[], void>({
            query: () => `todos`
        }),
        createUser: builder.mutation({
            query: (body) => ({
                url: `/register`,
                method: 'POST',
                body,
            }),
        }),
    }),
})


export const { useGetToDoByIdQuery, useLazyGetToDoByIdQuery, useGetToDosQuery, useCreateUserMutation } = authapi

