import { MovieCard } from './MovieCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { API } from "../global"


export function MovieList() {

    const navigate = useNavigate();

    const [list, setList] = useState([]);

    const token = sessionStorage.getItem("token")

    const getMovies = () => {
        token ?
            fetch(`${API}/movies`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                }
            })
                .then((data) => data.json())
                .then((movies) => setList(movies))
            :
            navigate("/login")
    };

    useEffect(() => getMovies());

    const deleteMovie = (id) => {
        fetch(`${API}/movies/` + id, {
            method: "DELETE"
        })
            .then(() => getMovies());
    };



    return (
        <div>
            <div className='movieList-container'>
                {list ? list.map((movie) => (
                    <MovieCard
                        pic={movie.pic}
                        name={movie.title}
                        rating={movie.rating}
                        info={movie.description}
                        key={movie._id}
                        id={movie._id}
                        editbtn={<IconButton sx={{ marginLeft: "auto" }} title="Edit Movie" onClick={() => navigate("/movie/edit/" + movie._id)}><EditIcon color="primary" /></IconButton>}
                        deletebtn={<IconButton title="Delete Movie" onClick={() => deleteMovie(movie._id)}><DeleteIcon color="error" /></IconButton>} />))
                    : <h1>Loading...</h1>}
            </div>
        </div>
    );

}
