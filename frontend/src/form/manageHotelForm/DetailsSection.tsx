import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"


const DetailsSection = () => {
    const { register, formState: { errors, touchedFields} } = useFormContext<HotelFormData>()

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>

            <label htmlFor="name" className="text-gray-700 text-sm font-bold flex-1">
                Name
                <input id="name" type="text" className="border rounded w-full py-1 px-2 font-normal" {...register("name", { required: "Hotel name is required" })}/>
                {errors.name && touchedFields.name && <p className='flex text-xs text-red-500 font-semibold'>{errors.name.message}</p>}
            </label>

            <div className="flex gap-4 ">
                <label htmlFor="city" className="text-gray-700 text-sm font-bold flex-1">
                    City
                    <input id="city" type="text" className="border rounded w-full py-1 px-2 font-normal" {...register("city", { required: "Hotel city is required" })}/>
                    {errors.city && touchedFields.city && <p className='flex text-xs text-red-500 font-semibold'>{errors.city.message}</p>}
                </label>

                <label htmlFor="country" className="text-gray-700 text-sm font-bold flex-1">
                    Country
                    <input id="country" type="text" className="border rounded w-full py-1 px-2 font-normal" {...register("country", { required: "Country of hotel is required" })}/>
                    {errors.country && touchedFields.country && <p className='flex text-xs text-red-500 font-semibold'>{errors.country.message}</p>}
                </label>
            </div>

            <label htmlFor="description" className="text-gray-700 text-sm font-bold flex-1">
                Description
                <textarea id="description" rows={10} className="border rounded w-full py-1 px-2 font-normal" {...register("description", { required: "Hotel description is required" })}/>
                {errors.description && touchedFields.description && <p className='flex text-xs text-red-500 font-semibold'>{errors.description.message}</p>}
            </label>

            <label htmlFor="pricePerNight" className="text-gray-700 text-sm font-bold max-w-[50%]">
                Price Per Night
                <input id="pricePerNight" type="number" className="border rounded w-full py-1 px-2 font-normal" {...register("pricePerNight", { required: "Price per night of hotel is required" })}/>
                {errors.pricePerNight && touchedFields.pricePerNight && <p className='flex text-xs text-red-500 font-semibold'>{errors.pricePerNight.message}</p>}
            </label>

            <label htmlFor="starRating" className="text-gray-700 text-sm font-bold max-w-[50%]">
                Star Rating
                <select {...register("starRating", { required: "Rating of hotel is required" })} className="border rounded w-full py-1 px-2 font-normal text-gray-700">
                    <option value="" className="text-sm font-bold">
                        Select as Rating
                    </option>
                    {[1,2,3,4,5].map((num) => (
                        <option value={num}>{num}</option>
                    ))}
                </select>
                {errors.starRating && touchedFields.starRating && <p className='flex text-xs text-red-500 font-semibold'>{errors.starRating.message}</p>}
            </label>
        </div>
    )
}

export default DetailsSection
