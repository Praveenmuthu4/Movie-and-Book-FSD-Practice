import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Backbtn } from "../componens/Backbtn";
import { useFormik } from "formik";
import * as yup from "yup";
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

export function BookEdit() {

    // const [update, setUpdate] = useState({ poster: book.poster, name: book.name, rating: book.rating, summary: book.summary, trailer: book.trailer });

    const { id } = useParams();

    useEffect(() => {
        fetch(`${API}/books/${id}`, {
            method: "GET"
        })
            .then((data) => data.json())
            .then((books) => setBook(books));
    }, [id]);

    const [book, setBook] = useState(null);
    // const {poster,name,rating,summary,trailer} = book
    console.log(book)

    return book ? <BookUpdate book={book} /> : <h2>Loading ....</h2>
}


function BookUpdate({ book }) {

    const navigate = useNavigate();

    const { id } = useParams();

    const { handleBlur, handleChange, handleSubmit, errors, values, touched } = useFormik({
        initialValues: {
            poster: book.poster,
            name: book.name,
            rating: book.rating,
            summary: book.summary,
            trailer: book.trailer
        },
        validationSchema: bookValidationSchema,
        onSubmit: (values) => {
            updatedBook(values)
        }
    })

    const updatedBook = (update) => {
        fetch(`${API}/books/${id}`, {
            method: "PUT",
            body: JSON.stringify(update),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(() => navigate("/books"));
    };

    return (
        <form onSubmit={handleSubmit} className='update-book'>
            <TextField
                className="input"
                label="Enter poster trailer"
                variant="filled"
                value={book.poster}
                onChange={handleChange}
                onBlur={handleBlur}
                name="poster"
                error={touched.poster && errors.poster}
                helperText={touched.poster && errors.poster ? errors.poster : null} />

            <TextField
                className="input"
                label="Enter book name"
                variant="filled"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                name="name"
                error={touched.name && errors.name}
                helperText={touched.name && errors.name ? errors.name : null} />

            <TextField
                className="input"
                label="Enter book Rating"
                variant="filled"
                value={values.rating}
                onChange={handleChange}
                onBlur={handleBlur}
                name="rating"
                error={touched.rating && errors.rating}
                helperText={touched.rating && errors.rating ? errors.rating : null} />

            <TextField
                className="input"
                label="Enter book summary"
                variant="filled"
                value={values.summary}
                onChange={handleChange}
                onBlur={handleBlur}
                name="summary"
                error={touched.summary && errors.summary}
                helperText={touched.summary && errors.summary ? errors.summary : null} />

            <TextField
                className="input"
                label="Enter book Trailer trailer"
                variant="filled"
                value={values.trailer}
                onChange={handleChange}
                onBlur={handleBlur}
                name="trailer"
                error={touched.trailer && errors.trailer}
                helperText={touched.trailer && errors.trailer ? errors.trailer : null} />

            <Button
                style={{ width: "20%" }}
                className="update"
                color="success"
                variant="contained"
                type='submit'>UPDATE Book</Button>

            <Backbtn />

        </form>
    );
}