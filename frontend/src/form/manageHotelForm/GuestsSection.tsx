import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"


const GuestsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>()

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Guests</h2>
            <div className="grid grid-cols-2 xs:grid-cols-1 p-6 gap-5 bg-gray-300">
                <label className="text-gray-700 text-sm font-semibold">
                    Adults
                    <input className="border rounded w-full py-2 px-3 font-normal" type="number" min={1} {...register("adultCount", {required: "Number of adults is required"})} />

                    {errors.adultCount?.message && <p className='flex text-xs text-red-500'>{errors.adultCount?.message}</p>}
                </label>

                <label className="text-gray-700 text-sm font-semibold">
                    Children
                    <input className="border rounded w-full py-2 px-3 font-normal" type="number" min={0} {...register("childCount", {required: "Number of children is required"})} />
                    
                    {errors.childCount?.message && <p className='flex text-xs text-red-500'>{errors.childCount?.message}</p>}
                </label>
            </div>
        </div>
    )
}

export default GuestsSection
