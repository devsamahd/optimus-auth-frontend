import { apiSlice } from "../../app/api/apiSlice";

export const signupApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signup: builder.mutation({
            query: credentials => ({
                url: '/user/register',
                method: 'POST',
                body: {...credentials}
            })
        })
    })
})

export const {
    useSignupMutation
} = signupApiSlice