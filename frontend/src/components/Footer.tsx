import { Hotel } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className="bg-black py-10">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/" className="flex items-center gap-2"><Hotel size={32}/><span>Aptly</span></Link>
                </span>
                <span className="text-white font-bold tracking-tight flex gap-4">
                    <p className="cursor-pointer">Privacy Policy</p>
                    <p className="cursor-pointer">Terms of Service</p>
                </span>
            </div>
        </div>
    )
}

export default Footer
