import { RegisterformData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelType } from '../../Backend/src/shared/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

export const register = async (formData: RegisterformData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    })

    const responseBody = await response.json()
    // console.log(responseBody)

    if (!response.ok) {
        throw new Error(responseBody.message)
    }
    return responseBody
}

export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/signIn`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    })

    const responseBody = await response.json()
    // console.log(responseBody)

    if (!response.ok) {
        throw new Error(responseBody.message)
    }
    return responseBody
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error("Token invalid")
    }

    return response.json()
}

export const logOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST"
    })

    if (!response.ok) {
        throw new Error("Error during sign out")
    }
}

export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData
    })

    if (!response.ok) {
        throw new Error("Failed to add hotel")
    }

    return response.json()
}

export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error("Error fetching hotels")
    }

    return response.json()
}