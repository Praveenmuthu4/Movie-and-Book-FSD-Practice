import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from "../global"
import { useFormik } from "formik";
import * as yup from "yup";


const userValidationSchema = yup.object({
  username: yup
    .string()
    .min(6)
    .required("Enter a Username!"),
  password: yup
    .string()
    .min(8)
    .required("Enter Password!")
})

export default function Login() {
  const navigate = useNavigate();

  const { handleBlur, handleChange, handleSubmit, errors, values, touched } = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      loginUser(values)
    }
  })

  const loginUser = (add) => {
    fetch(`${API}/users/login`, {
      method: "POST",
      body: JSON.stringify(add),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem("token",data.token)
        navigate("/movies")
      }
      )
  };
  const token = sessionStorage.getItem("token")
  return (
      <form onSubmit={handleSubmit} className='add-User'>
        
        {!token?<h2>Login First To Get Access</h2>:""}
        
        <TextField
          className="input"
          id="filled-basic"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          name="username"
          error={touched.username && errors.username}
          helperText={touched.username && errors.username ? errors.username : null}
          label="Enter your username"
          variant="filled"

        />

        <TextField
          className="input"
          id="filled-basic"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          error={touched.password && errors.password}
          helperText={touched.password && errors.password ? errors.password : null}
          label="password"
          variant="filled" />

        <Button 
        style={{ width: "80%" }} 
        className="add" 
        variant="contained" 
        type='submit'>Login
        </Button>
        <Button onClick={() => navigate("/signup")}>Create an account</Button>
      </form>
  )
}
