import express, { Request } from "express"
import verifyToken from "../middleware/auth"
import Hotel from "../models/hotel"
import { HotelType } from "../shared/types"

const router = express.Router()

router.get("/", verifyToken, async (req: any, res: any) => {
    try {
        const hotels = await Hotel.find({
            bookings: { $elemMatch: { userId: req.userId } },
        })

        const results = hotels.map((hotel) => {
            const userBookings = hotel.bookings.filter((booking) => booking.userId === req.userId)

            const hotelWithUserBokings: HotelType = {
                ...hotel.toObject(),
                bookings: userBookings,
            }
    
            return hotelWithUserBokings
        })

        res.status(200).send(results)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error fetching bookings"})
    }
})

export default router