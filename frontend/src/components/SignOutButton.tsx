import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext"

const SignOutButton = () => {
    const queryClient = useQueryClient()
    const {showToast} = useAppContext()

    const mutation = useMutation(apiClient.logOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
            showToast({ message: "Signed Out!", type: "SUCCESS"})
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR"})
        }
    })

    const handleClick = () => {
        mutation.mutate()
    }

    return (
        <button onClick={handleClick} className="flex bg-white items-center text-black px-3 font-bold hover:bg-gray-200 rounded-md">Log Out</button>
    )
}

export default SignOutButton
