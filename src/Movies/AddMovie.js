import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from "formik";
import * as yup from "yup";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef, useState } from 'react';
import { API } from "../global"

const movieValidationSchema = yup.object({
  pic: yup
    .string()
    .min(4)
    .required("Add the poster for the Movie!"),
  title: yup
    .string()
    .required("Add the title for the Movie!"),
  rating: yup
    .number()
    .min(0)
    .max(10)
    .required("Add the rating for the Movie!"),
  description: yup
    .string()
    .min(20)
    .required("Add the description for the Movie!"),
  url: yup
    .string()
    .min(10)
    .required("Add the url for the Movie Trailer!")
})

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function AddMovie() {

  const navigate = useNavigate();

  const { handleBlur, handleChange, handleSubmit, errors, values, touched } = useFormik({
    initialValues: {
      pic: '',
      title: '',
      rating: "",
      description: "",
      url: ""
    },
    validationSchema: movieValidationSchema,
    onSubmit: (values) => {
      newMovie(values)
    }
  })

  const token = sessionStorage.getItem("token")

  const newMovie = (add) => {
    token ?
      fetch(`${API}/movies`, {
        method: "POST",
        body: JSON.stringify([add]),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
        .then(() => navigate("/movies"))
      :
      navigate("/login")
  }


  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const isEmpty =(object)=>{
    return Object.keys(object).length === 0;
  }
  let emptyObj = isEmpty(errors);
  // console.log(emptyObj);

  return (
    <form onSubmit={handleSubmit} className='add-movie'>
      <h1 >Add Movie</h1>
      <TextField
        label="Enter poster url"
        variant="outlined"
        className="inputField"
        value={values.pic}
        onChange={handleChange}
        onBlur={handleBlur}
        name="pic"
        error={touched.pic && errors.pic}
        helperText={touched.pic && errors.pic ? errors.pic : null} />

      <TextField
        label="Enter movie Title"
        variant="outlined"
        className="inputField"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        name="title"
        error={touched.title && errors.title}
        helperText={touched.title && errors.title ? errors.title : null} />


      <TextField label="Enter movie Rating"
        variant="outlined"
        className="inputField"
        value={values.rating}
        onChange={handleChange}
        onBlur={handleBlur}
        name="rating"
        error={touched.rating && errors.rating}
        helperText={touched.rating && errors.rating ? errors.rating : null} />


      <TextField
        label="Enter movie Description"
        variant="outlined"
        className="inputField"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        name="description"
        error={touched.description && errors.description}
        helperText={touched.description && errors.description ? errors.description : null} />


      <TextField
        label="Trailer"
        variant="outlined"
        className="inputField"
        value={values.url}
        onChange={handleChange}
        onBlur={handleBlur}
        name="url"
        error={touched.url && errors.url}
        helperText={touched.url && errors.url ? errors.url : null} />

      <Button sx={{ margin: "auto" }} style={{ width: "50%" }} className="addMovie-btn" type='submit' variant="contained" onClick={handleClick}>
        Submit
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {emptyObj ? <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Movie Added Successfully!
        </Alert> : <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          There is an error!
        </Alert>}
      </Snackbar>

    </form>
  );
}
