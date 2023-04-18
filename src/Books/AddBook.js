import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from "formik";
import * as yup from "yup";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef, useState } from 'react';
import { API } from "../global"

const bookValidationSchema = yup.object({
    poster: yup
        .string()
        .min(4)
        .required("Add the poster for the book!"),
    name: yup
        .string()
        .required("Add the name for the book!"),
    rating: yup
        .number()
        .min(0)
        .max(10)
        .required("Add the rating for the book!"),
    summary: yup
        .string()
        .min(20)
        .required("Add the summary for the book!"),
    trailer: yup
        .string()
        .min(4)
        .required("Add the trailer for the book Trailer!")
})

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export function AddBook() {

    const navigate = useNavigate();

    const { handleBlur, handleChange, handleSubmit, errors, values, touched } = useFormik({
        initialValues: {
            poster: '',
            name: '',
            rating: "",
            summary: "",
            trailer: ""
        },
        validationSchema: bookValidationSchema,
        onSubmit: (values) => {
            newbook(values)
        }
    })

    const token = sessionStorage.getItem("token")

    const newbook = (add) => {
        token ?
            fetch(`${API}/books`, {
                method: "POST",
                body: JSON.stringify([add]),
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
            })
                .then(() => navigate("/books"))
            :
            navigate("/login")
    };

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function isEmpty(object) {
        return Object.keys(object).length === 0;
    }
    let emptyObj = isEmpty(errors);
    //   console.log(emptyObj);

    return (
        <form onSubmit={handleSubmit} className='add-book'>
            <h1>Add Book</h1>
            <TextField
                label="Enter poster trailer"
                variant="outlined"
                className="inputField"
                value={values.poster}
                onChange={handleChange}
                onBlur={handleBlur}
                name="poster"
                error={touched.poster && errors.poster}
                helperText={touched.poster && errors.poster ? errors.poster : null} />

            <TextField
                label="Enter book name"
                variant="outlined"
                className="inputField"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                name="name"
                error={touched.name && errors.name}
                helperText={touched.name && errors.name ? errors.name : null} />


            <TextField label="Enter book Rating"
                variant="outlined"
                className="inputField"
                value={values.rating}
                onChange={handleChange}
                onBlur={handleBlur}
                name="rating"
                error={touched.rating && errors.rating}
                helperText={touched.rating && errors.rating ? errors.rating : null} />


            <TextField
                label="Enter book summary"
                variant="outlined"
                className="inputField"
                value={values.summary}
                onChange={handleChange}
                onBlur={handleBlur}
                name="summary"
                error={touched.summary && errors.summary}
                helperText={touched.summary && errors.summary ? errors.summary : null} />


            <TextField
                label="Trailer"
                variant="outlined"
                className="inputField"
                value={values.trailer}
                onChange={handleChange}
                onBlur={handleBlur}
                name="trailer"
                error={touched.trailer && errors.trailer}
                helperText={touched.trailer && errors.trailer ? errors.trailer : null} />

            <Button sx={{ margin: "auto" }} style={{ width: "50%" }} className="addbook-btn" type='submit' variant="contained" onClick={handleClick}>
                Submit
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                {emptyObj ? <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Book Added Successfully!
                </Alert> : <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    There is an error!
                </Alert>}
            </Snackbar>
        </form>
    );
}