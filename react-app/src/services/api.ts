import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
    endpoints: (builder) => ({
        getToDoById: builder.query<Todo, number>({
            query: (id) => `todo/${id}`,
        }),
        getToDos: builder.query<Todo[], void>({
            query: () => `todos`
        }),
        createTodo: builder.mutation<void, Omit<Todo, 'id'>>({
            query: (body) => ({
                url: `todos`,
                method: 'POST',
                body,
            }),
        }),
    }),
})


export const { useGetToDoByIdQuery, useLazyGetToDoByIdQuery, useGetToDosQuery, useCreateTodoMutation } = api

