import { useFormik } from "formik";
import * as yup from "yup";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const formValidationSchema = yup.object({
    email: yup
        .string()
        .min(12, "Need a longer email")
        .required("Why not filled this email?"),

    password: yup
        .string()
        .min(8, "Need a longer password")
        .max(12, "Need a shorter password")
        .required('Why not filled this password?'),
})

export function BasicForm() {
    const {handleBlur,handleChange,handleSubmit,errors,values,touched} = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: formValidationSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    })
    return (
        <form className='basic-form' onSubmit={handleSubmit}>
            <TextField
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                placeholder='email'
                name="email" 
                error={touched.email && errors.email}
                helperText={touched.email && errors.email ? errors.email : null}/>
    
            <TextField
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                placeholder='password'
                name="password" 
                error={touched.password && errors.password}
                helperText={touched.password && errors.password ? errors.password : null}
                />
            
            <Button variant="contained" type="submit">submit</Button>

        </form>
    );
}
