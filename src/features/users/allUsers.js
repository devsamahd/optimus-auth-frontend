import { useGetUsersQuery } from "./usersApiSlice"

export default allUsers = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()
    return [users, isLoading]
}



