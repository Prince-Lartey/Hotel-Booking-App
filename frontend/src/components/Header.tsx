import { Link } from "react-router-dom"
import { Hotel } from "lucide-react"
import { useAppContext } from "../contexts/AppContext"
import SignOutButton from "./SignOutButton"

const Header = () => {
    const {isLoggedIn} = useAppContext()

    return (
        <div className="bg-black py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/" className="flex items-center gap-2"><Hotel size={48}/><span>Hotel.com</span></Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ? 
                        <>
                            <Link to="/my-bookings" className="flex items-center text-white px-3 font-bold hover:underline">My Bookings</Link>
                            <Link to="/my-hotels" className="flex items-center text-white px-3 font-bold hover:underline">My Hotels</Link>
                            <SignOutButton />
                        </> :
                        <Link to="/sign-in" className="flex bg-white items-center text-black px-3 font-bold hover:bg-gray-200 rounded-md">
                            Sign In
                        </Link>
                    }
                </span>
            </div>
        </div>
    )
}

export default Header