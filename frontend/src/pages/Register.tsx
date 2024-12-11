import { useFormik } from "formik"
import { registerSchema } from "../schema/Schema"
import * as apiClient from "../api-client"
import { useMutation, useQueryClient } from "react-query"
import { useAppContext } from "../contexts/AppContext"
import { Link, useNavigate } from "react-router-dom"

export type RegisterformData = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}

const Register = () => {
    const navigate = useNavigate()
    const {showToast} = useAppContext()
    const queryClient = useQueryClient()

    const { values, errors, touched, isSubmitting, handleSubmit, handleChange, handleBlur } = useFormik<RegisterformData>({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: registerSchema,
        onSubmit: (values) => {
            mutation.mutate(values)
        },
    })

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({ message: "Registration Successful!!", type: "SUCCESS"})
            await queryClient.invalidateQueries("validateToken");
            navigate("/")
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR"})
        }
    })

    return (
        <div className="flex items-center justify-center w-full">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-bold">Create an Account</h2>
                <div className="flex flex-col md:flex-row gap-5">
                    <label htmlFor="firstName" className="text-gray-700 text-sm font-bold flex-1">
                        First Name
                        <input id="firstName" type="text" name="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} className={errors.firstName && touched.firstName ? "border-2 rounded w-full py-1 px-2 font-normal border-red-600" : "border rounded w-full py-1 px-2 font-normal"}/>
                        {errors.firstName && touched.firstName && <p className='flex text-xs text-red-500'>{errors.firstName}</p>}
                    </label>

                    <label htmlFor="lastName" className="text-gray-700 text-sm font-bold flex-1">
                        Last Name
                        <input id="lastName" type="text" name="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur} className={errors.lastName && touched.lastName ? "border-2 rounded w-full py-1 px-2 font-normal border-red-600" : "border rounded w-full py-1 px-2 font-normal"}/>
                        {errors.lastName && touched.lastName && <p className='flex text-xs text-red-500'>{errors.lastName}</p>}
                    </label>
                </div>

                <label htmlFor="email" className="text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input id="email" type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className={errors.email && touched.email ? "border-2 rounded w-full py-1 px-2 font-normal border-red-600" : "border rounded w-full py-1 px-2 font-normal"}/>
                    {errors.email && touched.email && <p className='flex text-xs text-red-500'>{errors.email}</p>}
                </label>

                <label htmlFor="password" className="text-gray-700 text-sm font-bold flex-1">
                    Password
                    <input id="password" type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className={errors.password && touched.password ? "border-2 rounded w-full py-1 px-2 font-normal border-red-600" : "border rounded w-full py-1 px-2 font-normal"}/>
                    {errors.password && touched.password && <p className='flex text-xs text-red-500'>{errors.password}</p>}
                </label>

                <label htmlFor="confirmPassword" className="text-gray-700 text-sm font-bold flex-1">
                    Confirm Password
                    <input id="confirmPassword" type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} className={errors.confirmPassword && touched.confirmPassword ? "border-2 rounded w-full py-1 px-2 font-normal border-red-600" : "border rounded w-full py-1 px-2 font-normal"}/>
                    {errors.confirmPassword && touched.confirmPassword && <p className='flex text-xs text-red-500'>{errors.confirmPassword}</p>}
                </label>

                <span className="flex items-center justify-between">
                    <span className="text-sm">Already have an account? <Link to="/sign-in" className="text-gray-500 hover:underline">Sign in here!</Link></span>
                    <button type="submit" disabled={isSubmitting} className={isSubmitting ? "bg-slate-700 text-white p-2 font-bold text-xl opacity-[0.35]" : "bg-slate-700 text-white p-2 font-bold text-xl hover:bg-slate-500"}>Create Account</button>
                </span>
            </form>
        </div>
    )
}

export default Register