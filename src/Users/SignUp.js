import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { API } from "../global"
import LoginIcon from '@mui/icons-material/Login';
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
    .matches(/^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[#!@%&]).{8,}$/g,"Password must include capital letter,small letter,number and special characters")
    .required("Enter Password!"),
  email: yup
    .string()
    .matches("@gmail.com")
    .required("Enter Email!")
})

export default function SignUp() {
  const navigate = useNavigate();

  const { handleBlur, handleChange, handleSubmit, errors, values, touched } = useFormik({
    initialValues: {
      username: '',
      password: '',
      email:""
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      newUser(values)
    }
  })

  const newUser = (add) => {
    fetch(`${API}/users/signup`, {
      method: "POST",
      body: JSON.stringify(add),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json())
      .then(() => navigate("/"));
  };
  
  return (
    <form onSubmit={handleSubmit} className='add-User'>
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
        variant="filled" />

      <TextField
        className="input"
        id="filled-basic"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        name="password"
        error={touched.password && errors.password}
        helperText={touched.password && errors.password ? errors.password : null}
        label="Password"
        variant="filled" />

      <TextField
        className="input"
        id="filled-basic"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        name="email"
        error={touched.email && errors.email}
        helperText={touched.email && errors.email ? errors.email : null}
        label="Email"
        variant="filled" />

      <Button
        style={{ width: "80%" }}
        className="add"
        type='submit'
        variant="contained">Signup
      </Button>

      <p>If you already have an account ?
        <Button>
          <LoginIcon
            onClick={() => navigate("/login")} />
        </Button>
      </p>
    </form>
  )
}
