import { useFormik } from "formik"
import { signInSchema } from "../schema/Schema"
import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext"
import { Link, useNavigate } from "react-router-dom"

export type SignInFormData = {
    email: string
    password: string
}

const SignIn = () => {
    const navigate = useNavigate()
    const {showToast} = useAppContext()
    const queryClient = useQueryClient()

    const { values, errors, touched, isSubmitting, handleSubmit, handleChange, handleBlur } = useFormik<SignInFormData>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: signInSchema,
        onSubmit: (values) => {
            mutation.mutate(values)
        },
    })

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({ message: "Sign In Successful!!", type: "SUCCESS"})
            await queryClient.invalidateQueries("validateToken");
            navigate("/")
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR"})
        }
    })

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold">Sign In to your Account</h2>
            
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

            <span className="flex items-center justify-between">
                <span className="text-sm">Not Registered? <Link to="/register" className="text-gray-500 hover:underline">Create an account here!</Link></span>
                <button type="submit" disabled={isSubmitting} className={isSubmitting ? "bg-slate-700 text-white p-2 font-bold text-xl opacity-[0.35]" : "bg-slate-700 text-white p-2 font-bold text-xl hover:bg-slate-500"}>Sign In</button>
            </span>
        </form>
    )
}

export default SignIn
