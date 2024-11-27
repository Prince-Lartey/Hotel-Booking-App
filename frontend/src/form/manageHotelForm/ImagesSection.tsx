import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"


const ImagesSection = () => {
    const { register, watch, setValue, formState: { errors } } = useFormContext<HotelFormData>()

    const existingImageUrls = watch("imageUrls")

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl: string) => {
        event.preventDefault()

        setValue("imageUrls", existingImageUrls.filter((url) => url !== imageUrl))
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                {existingImageUrls && (
                    <div className="grid grid-cols-6 gap-4">
                        {existingImageUrls.map((url) => (
                            <div className="relative group">
                                <img src={url} className="min-h-full object-cover"/>
                                <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white text-sm" onClick={(event) => handleDelete(event, url)}>Delete Image</button>
                            </div>
                        ))}
                    </div>
                )}
                <input type="file" multiple accept="image/*" className="w-full text-gray-700 font-normal" {...register("imageFiles", {
                    validate: (imageFiles) => {
                        const totalLength = imageFiles.length + (existingImageUrls?.length || 0)

                        if(totalLength === 0) {
                            return "At least one image should be added."
                        }

                        if (totalLength > 6) {
                            return "Total number of images can not be more than 6"
                        }

                        return true
                    }
                })} />
            </div>
            {errors.imageFiles && <p className='flex text-xs text-red-500 font-semibold'>{errors.imageFiles.message}</p>}
        </div>
    )
}

export default ImagesSection
