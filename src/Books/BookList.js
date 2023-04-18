import { BookCard } from './BookCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { API } from "../global"


export function BookList() {

    const navigate = useNavigate();
    const token = sessionStorage.getItem("token")
    const [list, setList] = useState([]);

    const getBooks = () => {
        token ?
            fetch(`${API}/books`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                }
            })
                .then((data) => data.json())
                .then((books) => setList(books))
            :
            navigate("/login")


    };

    useEffect(() => getBooks());

    const deleteBook = (id) => {
        fetch(`${API}/books/` + id, {
            method: "DELETE"
        })
            .then(() => getBooks());
    };

    return (
        <div>
            <div className='bookList-container'>
                {list.map((book) => (
                    <BookCard
                        pic={book.poster}
                        name={book.name}
                        rating={book.rating}
                        info={book.summary}
                        key={book._id}
                        id={book._id}
                        editbtn={<IconButton sx={{ marginLeft: "auto" }} title="Edit book" onClick={() => navigate("/book/edit/" + book._id)}><EditIcon color="primary" /></IconButton>}
                        deletebtn={<IconButton title="Delete book" onClick={() => deleteBook(book._id)}><DeleteIcon color="error" /></IconButton>} />))}
            </div>
        </div>
    );

}