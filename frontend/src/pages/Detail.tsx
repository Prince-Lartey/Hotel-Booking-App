import { useParams } from "react-router-dom"
import * as apiClient from "../api-client"
import { useQuery } from "react-query"
import { AiFillStar } from "react-icons/ai"

const Detail = () => {
    const { hotelId } = useParams()

    const { data: hotel } = useQuery("fetchHotelById", () => apiClient.fetchHotelById(hotelId as string), { enabled: !!hotelId })

    if (!hotel) {
        <></>
    }

    return (
        <div className="space-y-6">
            <div>
                <span>
                    {Array.from({ length: hotel.starRating }).map(() => (
                        <AiFillStar className="fill-yellow-400"/>
                    ))}
                </span>
            </div>
        </div>
    )
}

export default Detail
