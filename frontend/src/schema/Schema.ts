import * as yup from "yup"

// Minimum six characters, at least one uppercase letter, one lowercase letter and one number
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/

export const registerSchema = yup.object({
    firstName: yup.string().min(2, "First name must be at least 2 characters").required("First name is required"),
    lastName: yup.string().min(2, "Last name must be at least 2 characters").required("Last name is required"),
    email: yup.string().email("Email must be a valid email address").required("A valid email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").matches(passwordRules, { message: "Password should consist of at least an uppercase letter, a lowercase letter and a number" }).required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm password is required")
})

export const signInSchema = yup.object({
    email: yup.string().email("Email must be a valid email address").required("A valid email is required"),
    password: yup.string().required("Password is required"),
})