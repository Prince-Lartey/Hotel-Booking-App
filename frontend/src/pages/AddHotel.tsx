import { useMutation } from "react-query"
import ManageHotelForm from "../form/manageHotelForm/ManageHotelForm"
// import toastr from 'toastr'
import { useAppContext } from "../contexts/AppContext"
import * as apiClient from "../api-client"

const AddHotel = () => {
    const {showToast} = useAppContext()

    const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
        onSuccess: () => {
            // toastr.success('Hotel Saved!')
            showToast({ message: "Hotel Saved!", type: "SUCCESS"})
        },
        onError: () => {
            // toastr.error('Error Saving Hotel')
            showToast({ message: "Error Saving Hotel", type: "ERROR"})
        }
    })

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData)
    }
    return <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>
}

export default AddHotel
