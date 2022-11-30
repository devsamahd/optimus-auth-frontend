import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { logOut, setCredentials } from '../../features/auth/authSlice'


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:122',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token
        if(token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReAuth = async(args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if(result?.error?.status === 403) {
        console.log('sending refresh token')

        const refreshResult = await baseQuery('/user/refresh', api, extraOptions)
        if(refreshResult?.data){
            const user = api.getState().auth.user
            api.dispatch(setCredentials({...refreshResult.data, user}))

            result = await baseQuery(args, api, extraOptions)

        }else{
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: builder => ({  
    })
})