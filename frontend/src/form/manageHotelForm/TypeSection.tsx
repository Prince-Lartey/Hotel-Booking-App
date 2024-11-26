import { useFormContext } from "react-hook-form"
import { hotelTypes } from "../../config/hotel-options-config"
import { HotelFormData } from "./ManageHotelForm"

const TypeSection = () => {
    const { register, watch, formState: { errors, touchedFields } } = useFormContext<HotelFormData>()
    const typeWatch = watch("type")

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Type</h2>
            <div className="grid grid-cols-5 gap-2">
                {hotelTypes.map((type) => (
                    <label className={typeWatch === type ? "cursor-pointer bg-black text-sm rounded-full px-4 py-2 font-semibold text-white" : "cursor-pointer bg-gray-300 hover:bg-gray-400 text-sm rounded-full px-4 py-2 font-semibold"}>
                        <input type="radio" value={type} {...register("type", { required: "Hotel Type is required" })} className="hidden"/>
                        <span>{type}</span>
                    </label>
                ))}
            </div>
            {errors.type && touchedFields.type && <p className='flex text-xs text-red-500 font-semibold'>{errors.type.message}</p>}
        </div>
    )
}

export default TypeSection
