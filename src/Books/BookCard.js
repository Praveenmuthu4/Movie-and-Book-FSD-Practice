import { Counter } from '../componens/Counter';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Card, CardActions, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function BookCard({ pic, name, rating, info, id, editbtn, deletebtn }) {

    const ratingStyle = {
        color: rating >= 8 ? "green" : "red"
    };

    const [show, setShow] = useState(true);

    const navigate = useNavigate()

    return (
        <Card className='bookContainer'>

            <img className='bookPic' src={pic} alt={name} />

            <CardContent>
                <div className='bookHeader'>
                    <h2>{name}
                        <IconButton title="Toggle Summary" onClick={() => setShow(!show)} className="btn-sum btnn" color="primary" aria-label="toggle summary">
                            {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                        <IconButton color='primary'
                            onClick={() => navigate(`/books/${id}`)}>
                            <InfoIcon />
                        </IconButton>

                    </h2>
                    <h2 style={ratingStyle}>⭐{rating}</h2>
                </div>
                {show ? <p>{info}</p> : ""}
            </CardContent>

            <CardActions className='cardActions'>
                <Counter />
                {editbtn}
                {deletebtn}
            </CardActions>
        </Card>
    );
}