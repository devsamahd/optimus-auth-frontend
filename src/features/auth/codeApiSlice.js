import { apiSlice } from "../../app/api/apiSlice";

export const codeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        verify: builder.mutation({
            query: credentials => ({
                url: '/user/confirmverficationcode',
                method: 'POST',
                body: {...credentials}
            })
        })
    })
})
export const sendCodeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        send: builder.mutation({
            query: credentials => ({
                url: '/user/sendVerificationCode',
                method: 'POST',
                body: {...credentials}
            })
        })
    })
})

export const {
    useVerifyMutation
} = codeApiSlice
export const {
    useSendMutation
} = sendCodeApiSlice