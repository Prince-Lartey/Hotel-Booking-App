import * as yup from "yup"

// Minimum six characters, at least one uppercase letter, one lowercase letter and one number
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/

export const basicSchema = yup.object().shape({
    name: yup.string().min(2).required('Required'),
    email: yup.string().email("Please enter a valid email").required(),
    age: yup.number().integer().positive().required('Required'),
    password: yup.string().min(8).matches(passwordRules, { message: "Please create a stronger password" }).required("Required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Required"),
    acceptedTos: yup.boolean().oneOf([true], "Please accept the terms of service")
})