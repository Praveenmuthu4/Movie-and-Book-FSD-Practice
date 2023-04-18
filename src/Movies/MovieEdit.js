import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Backbtn } from "../componens/Backbtn";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../global"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef } from 'react';

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
        .min(4)
        .required("Add the url for the Movie Trailer!")
})

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function MovieEdit() {

    // const [update, setUpdate] = useState({ pic: movie.pic, title: movie.title, rating: movie.rating, description: movie.description, url: movie.url });
    const { id } = useParams();

    useEffect(() => {
        fetch(`${API}/movies/${id}`, {
            method: "GET"
        })
            .then((data) => data.json())
            .then((movies) => setMoviee(movies));
    }, [id]);

    const [movie, setMoviee] = useState(null);
    // const {pic,title,rating,description,url} = movie
    console.log(movie)

    return movie ? <MovieUpdate movie={movie} /> : <h2>Loading ....</h2>
}



function MovieUpdate({ movie }) {

    const navigate = useNavigate();

    const { id } = useParams();

    const { handleBlur, handleChange, handleSubmit, errors, values, touched } = useFormik({
        initialValues: {
            pic: movie.pic,
            title: movie.title,
            rating: movie.rating,
            description: movie.description,
            url: movie.url
        },
        validationSchema: movieValidationSchema,
        onSubmit: (values) => {
            updatedMovie(values)
        }
    })

    const updatedMovie = (update) => {
        fetch(`${API}/movies/${id}`, {
            method: "PUT",
            body: JSON.stringify(update),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(() => navigate("/movies"));
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

    return (
        <form onSubmit={handleSubmit} className='update-movie'>
            <TextField
                className="input"
                label="Enter poster url"
                variant="filled"
                value={movie.pic}
                onChange={handleChange}
                onBlur={handleBlur}
                name="pic"
                error={touched.pic && errors.pic}
                helperText={touched.pic && errors.pic ? errors.pic : null} />

            <TextField
                className="input"
                label="Enter movie Title"
                variant="filled"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                name="title"
                error={touched.title && errors.title}
                helperText={touched.title && errors.title ? errors.title : null} />

            <TextField
                className="input"
                label="Enter movie Rating"
                variant="filled"
                value={values.rating}
                onChange={handleChange}
                onBlur={handleBlur}
                name="rating"
                error={touched.rating && errors.rating}
                helperText={touched.rating && errors.rating ? errors.rating : null} />

            <TextField
                className="input"
                label="Enter movie Description"
                variant="filled"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                name="description"
                error={touched.description && errors.description}
                helperText={touched.description && errors.description ? errors.description : null} />

            <TextField
                className="input"
                label="Enter movie Trailer url"
                variant="filled"
                value={values.url}
                onChange={handleChange}
                onBlur={handleBlur}
                name="url"
                error={touched.url && errors.url}
                helperText={touched.url && errors.url ? errors.url : null} />

            <Button
                style={{ width: "20%" }}
                className="update"
                color="success"
                variant="contained"
                type='submit'
                onClick={handleClick}>UPDATE Movie

            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                {emptyObj ? <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Movie Updated Successfully!
                </Alert> : <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    There is an error!
                </Alert>}
            </Snackbar>
            <Backbtn />

        </form>
    );
}
